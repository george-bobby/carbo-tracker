const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const scrapeAmazon = async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = "https://www.amazon.in/s?k=sustainable+products";
  console.log(`Navigating to ${searchUrl}...`);
  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

  console.log("Scraping product data...");
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(".s-main-slot .s-result-item");
    const scrapedData = [];

    productElements.forEach((item) => {
      const price = item.querySelector(".a-price-whole")?.innerText || "N/A";
      const rating = item.querySelector(".a-icon-alt")?.innerText.split(" ")[0] || "N/A";
      const imageUrl = item.querySelector(".s-image")?.src || "";
      const productUrl =
        item.querySelector(".a-link-normal")?.href &&
        "https://www.amazon.in" + item.querySelector(".a-link-normal").getAttribute("href");

      if (imageUrl && productUrl) {
        scrapedData.push({ price, rating, imageUrl, productUrl });
      }
    });

    return scrapedData;
  });

  console.log(`Scraped ${products.length} products.`);

  // Write the scraped data to `amazon-products.json`
  const filePath = path.join(__dirname, "shop", "amazon-products.json");
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to amazon-products.json.`);

  await browser.close();
  console.log("Browser closed.");
};

scrapeAmazon().catch((err) => {
  console.error("An error occurred:", err);
});
