const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const scrapeAmazon = async () => {
  console.log("Launching browser for Amazon...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = "https://www.amazon.in/s?k=sustainable+products";
  console.log(`Navigating to ${searchUrl}...`);
  await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  console.log("Scraping product data from Amazon...");
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(".s-main-slot .s-result-item");
    const scrapedData = [];

    productElements.forEach((item) => {
      if (scrapedData.length < 100) { // Limit to 20 products
        const price = item.querySelector(".a-price-whole")?.innerText || "N/A";
        const rating = item.querySelector(".a-icon-alt")?.innerText.split(" ")[0] || "N/A";
        const imageUrl = item.querySelector(".s-image")?.src || "";
        const productUrl =
          item.querySelector(".a-link-normal")?.href &&
          "https://www.amazon.in" + item.querySelector(".a-link-normal").getAttribute("href");

        if (imageUrl && productUrl) {
          scrapedData.push({ price, rating, imageUrl, productUrl });
        }
      }
    });

    return scrapedData;
  });

  console.log(`Scraped ${products.length} products from Amazon.`);
  const filePath = path.join(__dirname, "amazon-products.json");
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to amazon-products.json.`);

  await browser.close();
};

const scrapeFlipkart = async () => {
  console.log("Launching browser for Flipkart...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = "https://www.flipkart.com/search?q=sustainable+products";
  console.log(`Navigating to ${searchUrl}...`);
  await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  console.log("Scraping product data from Flipkart...");
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll("._1AtVbE");
    const scrapedData = [];

    productElements.forEach((item) => {
      if (scrapedData.length < 20) { // Limit to 20 products
        const price = item.querySelector("._30jeq3")?.innerText || "N/A";
        const rating = item.querySelector("._3LWZlK")?.innerText || "N/A";
        const imageUrl = item.querySelector("._396cs4")?.src || "";
        const productUrl =
          item.querySelector("a")?.href &&
          `https://www.flipkart.com${item.querySelector("a").getAttribute("href")}`;

        if (imageUrl && productUrl) {
          scrapedData.push({ price, rating, imageUrl, productUrl });
        }
      }
    });

    return scrapedData;
  });

  console.log(`Scraped ${products.length} products from Flipkart.`);
  const filePath = path.join(__dirname, "flipkart-products.json");
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to flipkart-products.json.`);

  await browser.close();
};

const scrapeMyntra = async () => {
  console.log("Launching browser for Myntra...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = "https://www.myntra.com/sustainable-products";
  console.log(`Navigating to ${searchUrl}...`);
  await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  try {
    await page.waitForSelector(".myntra-popup-dismiss", { timeout: 5000 });
    await page.click(".myntra-popup-dismiss");
    console.log("Dismissed Myntra pop-up.");
  } catch (error) {
    console.log("No pop-up found on Myntra.");
  }

  console.log("Scraping product data from Myntra...");
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(".product-base");
    const scrapedData = [];

    productElements.forEach((item) => {
      if (scrapedData.length < 20) { // Limit to 20 products
        const price = item.querySelector(".product-discountedPrice")?.innerText || "N/A";
        const rating = "N/A"; // Myntra does not prominently display ratings
        const imageUrl = item.querySelector("img")?.src || "";
        const productUrl = item.querySelector("a")?.href || "";

        if (imageUrl && productUrl) {
          scrapedData.push({ price, rating, imageUrl, productUrl });
        }
      }
    });

    return scrapedData;
  });

  console.log(`Scraped ${products.length} products from Myntra.`);
  const filePath = path.join(__dirname, "./data/myntra-products.json");
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to myntra-products.json.`);

  await browser.close();
};

const scrapeSnapdeal = async () => {
  console.log("Launching browser for Snapdeal...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = "https://www.snapdeal.com/search?keyword=sustainable+products";
  console.log(`Navigating to ${searchUrl}...`);
  await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  console.log("Scraping product data from Snapdeal...");
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(".product-tuple-listing");
    const scrapedData = [];

    productElements.forEach((item) => {
      if (scrapedData.length < 20) { // Limit to 20 products
        const price = item.querySelector(".product-price")?.innerText || "N/A";
        const rating = "N/A"; // Snapdeal does not prominently display ratings
        const imageUrl = item.querySelector("img")?.src || "";
        const productUrl = item.querySelector("a")?.href || "";

        if (imageUrl && productUrl) {
          scrapedData.push({ price, rating, imageUrl, productUrl });
        }
      }
    });

    return scrapedData;
  });

  console.log(`Scraped ${products.length} products from Snapdeal.`);
  const filePath = path.join(__dirname, "snapdeal-products.json");
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to snapdeal-products.json.`);

  await browser.close();
};

const runScrapers = async () => {
  await scrapeAmazon();
  await scrapeFlipkart();
  await scrapeMyntra();
  await scrapeSnapdeal();
};

// Schedule to run every 6 hours
setInterval(runScrapers, 6 * 60 * 60 * 1000);

// Run immediately on startup
runScrapers();
