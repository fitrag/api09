const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/wallpaper/:page", (req, res) => {
  const page = parseInt(req.params.page);
  let url =
    page == 1
      ? "https://3dandroidwallpaper.com/wallpaper/anime/page/1"
      : "https://3dandroidwallpaper.com/wallpaper/anime/page/" + page;
  try {
    axios.get(url).then((response) => {
      const $ = cheerio.load(response.data);
      const content = $(".main");

      let wallpaper = [];

      content.find("article").each((id, el) => {
        const slug = $(el)
          .find(".thumbnails > a")
          .attr("href")
          .replace("https://3dandroidwallpaper.com/", "")
          .replace("/", "");
        const img = $(el).find(".thumbnails > a > img").attr("src").replace("https", "http");
        const judul = $(el).find(".text-center > h2 > a").text().trim();
        const reso = $(el)
          .find(".text-center > .meta > .fa-desktop")
          .text()
          .trim();

        wallpaper.push({
          img,
          judul,
          reso,
          slug,
        });
      });

      res.json(wallpaper);
    });
  } catch {}
});

router.get("/wallpaper/detail/:slug", (req, res) => {
  const slug = req.params.slug;
  try {
    axios.get("https://3dandroidwallpaper.com/" + slug).then((response) => {
      const $ = cheerio.load(response.data);
      const content = $("section.col-md-9");

      const obj = {};
      let related = [];

      obj.judul = content
        .find("article:first-child > #featured > h1.title")
        .text()
        .trim();
      obj.link = content
        .find("article:first-child > .text-center:last-child > a")
        .attr("href");

      content.find("article.wrap-loop").each((id, el) => {
        const img = $(el).find(".thumbnails > a > img").attr("src");
        const judul = $(el).find(".text-center > h2 > a").text();
        const reso = $(el)
          .find(".text-center > .meta > .fa-desktop")
          .text()
          .trim();
        const slug = $(el)
          .find(".thumbnails > a")
          .attr("href")
          .replace("https://3dandroidwallpaper.com/", "")
          .replace("/", "");
        related.push({
          img,
          judul,
          reso,
          slug,
        });
      });

      obj.related = related;

      res.json(obj);
    });
  } catch {}
});

module.exports = router;
