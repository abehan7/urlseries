const {
  launchBrowser,
  contents,
  gotoPage,
  dict,
  clickNextPage,
} = require("../hooks/crawler");
const db = require("../models");

const getDictionaryUrls = async (req, res) => {
  const { num } = req.params;
  const { url, resource } = req.body;
  const browser = await launchBrowser();
  const page = await gotoPage(browser, url);
  const resultUrls = [];

  // loop to get urls from dictionary
  // 1페이지 => 15개 url 추출
  for (let i = 0; i < num; i++) {
    console.log(i);
    let urls = await dict.getUrls(page);
    resultUrls.push(...urls);
    // click next page
    await clickNextPage(page, "#paginate strong + a");
  }

  // save to db
  await db.DictionaryUrls.create({
    dictionary_url_dummy: resultUrls,
    resource,
    start_url: url,
  });

  res.send("crawling done");
  //   close browser
  await browser.close();
  await browser.disconnect();
};

const fetchContents = async (req, res) => {
  const { urls } = req.body;
  const browser = await launchBrowser();
  const page = await gotoPage(browser);
  const resultContents = [];

  for (let i = 0; i < urls.length; i++) {
    console.log(i);
    await page.goto(urls[i]);
    const title = await contents.getTitle(page);
    const memo = await contents.getMemo(page);
    const hashtags = await contents.getHashtags(page);
    resultContents.push({
      title,
      memo,
      hashtags,
    });
  }

  await db.Contents.create(resultContents);
  await browser.close();
  await browser.disconnect();
  res.send("crawling done");
};

module.exports = {
  getDictionaryUrls,
  fetchContents,
};
