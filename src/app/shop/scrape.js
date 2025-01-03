const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const schedule = require("node-schedule");

// Utility function to save data to a JSON file
const saveDataToFile = (fileName, data) => {
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Saved ${data.length} products to ${fileName}.`);
};

// Scrape Amazon
const scrapeAmazon = async () => {
  console.log("Scraping Amazon...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = "https://www.amazon.in/s?k=sustainable+products";

  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

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

  saveDataToFile("amazon-products.json", products);
  await browser.close();
};

// Scrape Flipkart
const scrapeFlipkart = async () => {
  console.log("Scraping Flipkart...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = "https://www.flipkart.com/search?q=sustainable+products";

  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll('._1AtVbE');
    const scrapedData = [];
    productElements.forEach((item) => {
      const price = item.querySelector('._30jeq3')?.innerText || "N/A";
      const rating = item.querySelector('._3LWZlK')?.innerText || "N/A";
      const imageUrl = item.querySelector('._396cs4')?.src || "";
      const productUrl =
        item.querySelector("a")?.href &&
        "https://www.flipkart.com" + item.querySelector("a").getAttribute("href");

      if (imageUrl && productUrl) {
        scrapedData.push({ price, rating, imageUrl, productUrl });
      }
    });
    return scrapedData;
  });

  saveDataToFile("flipkart-products.json", products);
  await browser.close();
};

// Scrape Myntra
const scrapeMyntra = async () => {
  console.log("Scraping Myntra...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = "https://www.myntra.com/sustainable-products";

  try {
    await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

    const products = await page.evaluate(() => {
      const productElements = document.querySelectorAll('.product-base');
      const scrapedData = [];
      productElements.forEach((item) => {
        const price = item.querySelector('.product-price')?.innerText || "N/A";
        const imageUrl = item.querySelector('img')?.src || "";
        const productUrl =
          item.querySelector("a")?.href &&
          "https://www.myntra.com" + item.querySelector("a").getAttribute("href");

        if (imageUrl && productUrl) {
          scrapedData.push({ price, imageUrl, productUrl });
        }
      });
      return scrapedData;
    });

    saveDataToFile("myntra-products.json", products);
  } catch (error) {
    console.error("Myntra scraping failed:", error.message);
  }

  await browser.close();
};

// Scrape Snapdeal
const scrapeSnapdeal = async () => {
  console.log("Scraping Snapdeal...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = "https://www.snapdeal.com/search?keyword=sustainable+products";

  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(".product-tuple-listing");
    const scrapedData = [];
    productElements.forEach((item) => {
      const price = item.querySelector(".product-price")?.innerText || "N/A";
      const imageUrl = item.querySelector(".product-image img")?.src || "";
      const productUrl = item.querySelector("a")?.href || "";

      if (imageUrl && productUrl) {
        scrapedData.push({ price, imageUrl, productUrl });
      }
    });
    return scrapedData;
  });

  saveDataToFile("snapdeal-products.json", products);
  await browser.close();
};

// Scrape BigBasket
const scrapeBigBasket = async () => {
  console.log("Scraping BigBasket...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = "https://www.bigbasket.com/ps/?q=sustainable+products";

  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(".prod-view");
    const scrapedData = [];
    productElements.forEach((item) => {
      const price = item.querySelector(".discnt-price")?.innerText || "N/A";
      const imageUrl = item.querySelector("img")?.src || "";
      const productUrl = item.querySelector("a")?.href || "";

      if (imageUrl && productUrl) {
        scrapedData.push({ price, imageUrl, productUrl });
      }
    });
    return scrapedData;
  });

  saveDataToFile("bigbasket-products.json", products);
  await browser.close();
};

// Run all scrapers
const runAllScrapers = async () => {
  await scrapeAmazon();
  await scrapeFlipkart();
  await scrapeMyntra();
  await scrapeSnapdeal();
  await scrapeBigBasket();
};

// Schedule the scrapers to run every 6 hours
schedule.scheduleJob("0 */6 * * *", () => {
  console.log("Starting scheduled scraping...");
  runAllScrapers().catch((err) => console.error("Error during scraping:", err));
});

// Run scrapers immediately
runAllScrapers();
