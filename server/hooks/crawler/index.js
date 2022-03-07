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
    // console.log("get title");
    await page.waitForSelector(".headword");
    const title = await page.evaluate(() => {
      const _title = document.querySelector(".headword").innerText;
      return _title;
    });
    // console.log(title);
    return title;
  },

  getMemo: async (page) => {
    try {
      const waitOptions = { timeout: 3 * 1000 };
      // console.log("get memo");
      await page.waitForSelector("p.txt", waitOptions);
      const contents = await page.evaluate(() => {
        const _contents = document.querySelector("p.txt").innerText;
        return _contents;
      });
      // console.log(contents);

      return contents.slice(0, 200);
    } catch (error) {
      const getException = async () => {
        console.log("get memo failed");
        await page.waitForSelector(".section_wrap");
        const contents = await page.evaluate(() => {
          const _contents = document
            .querySelector(".section_wrap")
            .innerText.slice(0, 200);
          return _contents;
        });
        return contents;
      };
      const contents = await getException();
      return contents;
    }
  },

  getHashtags: async (page) => {
    // console.log("get  hashtags");
    await page.waitForSelector(".headword");
    const hashtags = await page.evaluate(() => {
      const _hashtags = document.querySelector(".headword").innerText;
      return _hashtags;
    });

    const arr_hashtags = [`#${hashtags}`, "#네이버", "#백과사전", "#역사"];
    // console.log(arr_hashtags);

    return arr_hashtags;
  },
};

// const

const clickNextPage = async (page, cssSelector = "paginate strong + a") => {
  await page.waitForSelector(cssSelector);
  await page.click(cssSelector);
};

module.exports = { launchBrowser, gotoPage, dict, clickNextPage, contents };
