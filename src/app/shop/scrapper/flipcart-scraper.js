const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const scrapeFlipkart = async () => {
  console.log("Launching browser for Flipkart...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = "https://www.flipkart.com/search?q=sustainable+products";
  console.log(`Navigating to ${searchUrl}...`);

  // Retry logic for navigation
  const navigateWithRetry = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
        return; // Exit if successful
      } catch (error) {
        console.error(`Attempt ${i + 1} failed: ${error.message}`);
        if (i === retries - 1) throw error; // Rethrow if last attempt
      }
    }
  };

  await navigateWithRetry(searchUrl);

  console.log("Scraping product data from Flipkart...");
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll("div._1AtVbE > div");
    const scrapedData = [];

    productElements.forEach((item) => {
      const title = item.querySelector("a.IRpwTa")?.innerText || "N/A";
      const price = item.querySelector("div._30jeq3")?.innerText || "N/A";
      const rating = item.querySelector("div._3LWZlK")?.innerText || "N/A";
      const imageUrl = item.querySelector("img._396cs4")?.src || "";
      const productUrl =
        item.querySelector("a.IRpwTa")?.href &&
        "https://www.flipkart.com" + item.querySelector("a.IRpwTa").getAttribute("href");

      if (imageUrl && productUrl) {
        scrapedData.push({ title, price, rating, imageUrl, productUrl });
      }
    });

    return scrapedData;
  });

  console.log(`Scraped ${products.length} products from Flipkart.`);
  
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const filePath = path.join(dataDir, "flipkart-products.json");
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to flipkart-products.json.`);

  await browser.close();
};

// Run the scraper immediately
scrapeFlipkart().catch((error) => {
  console.error("An error occurred while scraping Flipkart:", error);
});