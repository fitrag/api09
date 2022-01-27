const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/apk_mod/game/:page", (req, res) => {
  const page = parseInt(req.params.page);
  let url =
    page == 1
      ? "https://moddroid.co/games/"
      : "https://moddroid.co/games/page/" + page;
  try {
    axios.get(url).then((response) => {
      const $ = cheerio.load(response.data);
      const content = $("#primary");

      let apk = [];
      const obj = {};

      obj.next_page = page + 1;
      obj.current_page = page;
      obj.prev_page = page == 1 ? page : page - 1;

      content.find(".row > .col-12").each((id, el) => {
        let judul = $(el).find("a").find("h3").text().trim();
        let img = $(el)
          .find("a")
          .find(".flex-shrink-0 > img")
          .attr("src")
          .replace("-80x80", "");
        let info = $(el).find("a").find("div.align-items-center").text().trim();
        let link = $(el)
          .find("a")
          .attr("href")
          .replace("https://moddroid.co/", "")
          .replace(".html", "");
        apk.push({
          judul,
          img,
          info,
          link,
        });

        obj.data = apk;
      });

      res.json(obj);
    });
  } catch {}
});

router.get("/apk_mod/search/:query/:page", (req, res) => {
  const page = parseInt(req.params.page);
  const query = req.params.query;
  let url =
    page == 1
      ? "https://moddroid.com/?s=" + query
      : "https://moddroid.com/page/" + page + "?s=" + query;
  try {
    axios.get(url).then((response) => {
      const $ = cheerio.load(response.data);
      const content = $("#primary");

      let apk = [];
      const obj = {};

      obj.next_page = page + 1;
      obj.current_page = page;
      obj.prev_page = page == 1 ? page : page - 1;

      content.find(".row > .col-12").each((id, el) => {
        let judul = $(el).find("a").find("h3").text().trim();
        let img = $(el)
          .find("a")
          .find(".flex-shrink-0 > img")
          .attr("src")
          .replace("-80x80", "");
        let info = $(el).find("a").find("div.align-items-center").text().trim();
        let link = $(el)
          .find("a")
          .attr("href")
          .replace("https://moddroid.com/", "")
          .replace(".html", "");
        apk.push({
          judul,
          img,
          info,
          link,
        });

        obj.data = apk;
      });

      res.json(obj);
    });
  } catch {}
});

router.get("/apk_mod/detail/:slug", (req, res) => {
  const slug = req.params.slug;
  try {
    axios.get("https://moddroid.co/" + slug + ".html").then((response) => {
      const $ = cheerio.load(response.data);
      const content = $(".container");

      const obj = {};

      content.find("#primary").each((id, el) => {
        obj.judul = $(el).find("h1").text().trim();
        obj.img = $(el).find(".row > div.col-12:first-child > img").attr("src");
        obj.nama = $(el)
          .find(
            ".row > div.col-12:nth-child(2) > table > tbody > tr:first-child > td"
          )
          .text()
          .trim();
        obj.publisher = $(el)
          .find(
            ".row > div.col-12:nth-child(2) > table > tbody > tr:nth-child(2) > td"
          )
          .text()
          .trim();
        obj.genre = $(el)
          .find(
            ".row > div.col-12:nth-child(2) > table > tbody > tr:nth-child(3) > td"
          )
          .text()
          .trim();
        obj.size = $(el)
          .find(
            ".row > div.col-12:nth-child(2) > table > tbody > tr:nth-child(4) > td"
          )
          .text()
          .trim();
        obj.latest_version = $(el)
          .find(
            ".row > div.col-12:nth-child(2) > table > tbody > tr:nth-child(5) > td"
          )
          .text()
          .trim();
        obj.mod = $(el)
          .find(
            ".row > div.col-12:nth-child(2) > table > tbody > tr:nth-child(6) > td"
          )
          .text()
          .trim();
        obj.update = $(el)
          .find(
            ".row > div.col-12:nth-child(2) > table > tbody > tr:nth-child(8) > td"
          )
          .text()
          .trim();
        obj.description = $(el).find(".entry-content").html();
        obj.link = $(el)
          .find(".btn-secondary")
          .attr("href")
          .replace("https://moddroid.co/download/", "");
      });

      res.json(obj);
    });
  } catch {}
});

router.get("/apk_mod/link/:slug", (req, res) => {
  const slug = req.params.slug;
  try {
    axios.get("https://moddroid.co/download/" + slug).then((response) => {
      const $ = cheerio.load(response.data);
      const content = $(".container");

      const obj = {};
      let link = [];

      content
        .find("#primary > #accordion-downloads > div.mb-3")
        .each((id, el) => {
          let link_download = $(el)
            .find(".collapse > .btn-secondary")
            .attr("href")
            .replace("https://moddroid.co/download/", "");
          link.push({
            link_download,
          });
        });

      res.json(link);
    });
  } catch {}
});

router.get("/apk_mod/download/:slug/:id", (req, res) => {
  const slug = req.params.slug;
  const id = req.params.id;
  try {
    axios
      .get("https://moddroid.co/download/" + slug + "/" + id)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const content = $(".container");

        const obj = {};

        content.find("#primary").each((id, el) => {
          obj.link_download = $(el).find("#download > a").attr("href");
        });

        res.json(obj);
      });
  } catch {}
});

router.get("/apk_mod/apps/:page", (req, res) => {
  const page = parseInt(req.params.page);
  let url =
    page == 1
      ? "https://moddroid.co/apps/"
      : "https://moddroid.co/apps/page/" + page;
  try {
    axios.get(url).then((response) => {
      const $ = cheerio.load(response.data);
      const content = $("#primary");

      let apk = [];

      const obj = {};

      obj.next_page = page + 1;
      obj.current_page = page;
      obj.prev_page = page == 1 ? page : page - 1;

      content.find(".row > .col-12").each((id, el) => {
        let judul = $(el).find("a").find("h3").text().trim();
        let img = $(el)
          .find("a")
          .find(".flex-shrink-0 > img")
          .attr("src")
          .replace("-80x80", "");
        let info = $(el).find("a").find("div.align-items-center").text().trim();
        let link = $(el)
          .find("a")
          .attr("href")
          .replace("https://moddroid.com/", "")
          .replace(".html", "");
        apk.push({
          judul,
          img,
          info,
          link,
        });

        obj.data = apk;
      });

      res.json(obj);
    });
  } catch {}
});

module.exports = router;
