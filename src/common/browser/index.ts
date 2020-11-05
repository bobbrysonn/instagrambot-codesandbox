import * as path from "path";
import * as puppeteer from "puppeteer";
import * as api from "./api";
import { GetPage, CloseBrowser, CreateBrowser } from "src/common/interfaces";
import { logger } from "src/common/utils";

const getUrl = (endpoint: string): string =>
  `https://www.instagram.com${endpoint}`;

const createBrowser: CreateBrowser = async () => {
  let browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  logger("Successfully created Chromium instance");

  const getPage: GetPage = async function getPage(endpoint, fn) {
    let page: puppeteer.Page;
    let result;

    try {
      const url = getUrl(endpoint);
      console.log(url);
      page = await browser.newPage();
      logger("Successfully got a new page");

      await page.goto(url, { waitUntil: "load" });
      logger(`Successfully went to url: ${url}`);
      page.on("console", (msg) => {
        const leng = msg.args().length;
        for (let i = 0; i < leng; i += 1) {
          console.log(`${i}: ${msg.args()[i]}`);
        }
      });
      logger("Page came online");
      await page.addScriptTag({
        path: path.join(__dirname, "../../../src/common/scraper/scraper.js")
      });

      result = await fn(page);
      await page.close();
    } catch (e) {
      if (page) {
        await page.close();
      }

      throw e;
    }

    return result;
  };

  const close: CloseBrowser = async function close() {
    await browser.close();
    logger("Successfully closes web browser");
    browser = null;
  };

  return {
    getPage,
    close,
    ...api
  };
};

export { createBrowser };
