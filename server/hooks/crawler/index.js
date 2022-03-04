const puppeteer = require("puppeteer");

const launchBrowser = async () => {
  console.log("launch browser");
  const options = {
    headless: true,
    args: [
      "--fast-start",
      "--disable-web-security",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
      "--disable-extensions",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
    ignoreHTTPSErrors: true,
  };
  const browser = await puppeteer.launch(options);
  console.log("launch browser done✅");
  return browser;
};

const gotoPage = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  console.log("gotoPage done✅");
  return page;
};

const dict = {
  getUrls: async (page) => {
    await page.waitForSelector(".list_wrap .title a");
    const urls = await page.evaluate(() => {
      const baseUrl = "https://terms.naver.com";
      const arr_url = document.querySelectorAll(".list_wrap .title a");
      const urls = [];

      arr_url.forEach((url, index) => {
        (index + 2) % 2 === 0 && urls.push(baseUrl + url.getAttribute("href"));
      });

      return urls;
    });

    console.log("get urls done✅");

    return urls;
  },
};

const contents = {
  getTitle: async (page) => {
    await page.waitForSelector(".title_area .title_text");
    const title = await page.evaluate(() => {
      const title = document.querySelector(".title_area .title_text").innerText;
      return title;
    });
  },

  getMemo: async (page) => {
    await page.waitForSelector(".contents_area");
    const contents = await page.evaluate(() => {
      const contents = document.querySelector(".contents_area").innerText;
      return contents;
    });
  },

  getHashtags: async (page) => {
    await page.waitForSelector(".tag_area .tag_list");
    const hashtags = await page.evaluate(() => {
      const hashtags = document.querySelector(".tag_area .tag_list").innerText;
      return hashtags;
    });
  },
};

// const

const clickNextPage = async (page, cssSelector = "paginate strong + a") => {
  await page.waitForSelector(cssSelector);
  await page.click(cssSelector);
};

module.exports = { launchBrowser, gotoPage, dict, clickNextPage, contents };
