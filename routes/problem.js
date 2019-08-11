const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const router = express.Router();

const BASE_URL = "https://projecteuler.net/"

router.get("/", (req, res, next) => {
  res.status(200).send("You weren't supposed to end up here");
});

router.get("/:num", (req, res, next) => {
  let url = BASE_URL + "problem=" + req.params.num;
  fetch(url)
    .then(checkStatus)
    .then(response => {
      const $ = cheerio.load(response);
      let json = {
        "title": $("h2").text(),
        "description": $(".problem_content").text(),
        "problem-number": req.params.num,
        "link": url
      }
      res.status(200).json(json);
    })
    .catch(console.log);
});

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300 || response.status === 0) {
    return response.text();
  } else {
    return Promise.reject(new Error(response.status + ": " + response.statusText));
  }
}

module.exports = router;
