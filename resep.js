const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

router.get('/resep/:page', (req,res) => {
    const page = parseInt(req.params.page)
    let url = (page == 1) ? 'https://resepkoki.co/resep-artikel/' : 'https://resepkoki.co/resep-artikel/page/' + page
    try{

        axios.get(url)
        .then(response => {
            const $ = cheerio.load(response.data)
            const content = $(".bSeCont")

            let resep = []

            content.find(".left > .gr-i").each((id, el) => {
                let judul = $(el).find(".awr > .entry-title").find("a").text()
                let slug = $(el).find(".awr > .entry-title").find("a").attr("href").replace("https://resepkoki.co/","").replace("/","")
                let capt = $(el).find(".awr").find("p").text().trim()
                let img = $(el).find(".fwit").css("background-image").replace("url('","").replace("')","");
                resep.push({
                    judul,
                    img,
                    capt,
                    slug
                })
            })

            res.json(resep)
        })

    }catch{

    }
})

router.get('/resep/detail/:slug', (req, res) => {
    const slug = req.params.slug
    try{

        axios.get("https://resepkoki.co/" + slug)
        .then(response => {
            const $ = cheerio.load(response.data)
            const content = $(".bSeCont")

            const obj = {}

            content.find(".left > .awr").each((id, el) => {
                $(el).find(".awr-i > .code-block").remove()
                obj.judul = $(el).find(".entry-title").text().trim()
                obj.text = $(el).find(".awr-i").html()
            })

            res.json(obj)
        })

    }catch{

    }
})

module.exports = router