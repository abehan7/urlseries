import puppeteer from "puppeteer";
import express from "express";

const app = express();

app.listen(process.env.PORT || 3002, () => {
  console.log("💥💥CRAWLING SERVER RUNNING");
});
