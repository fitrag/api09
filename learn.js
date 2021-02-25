const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

const URL = 'https://insidelearn.com/'

router.get('/course/:page', (req,res) => {
    const page = parseInt(req.params.page)
    let url = (page == 1) ? 'https://insidelearn.com/courses/all' : 'https://insidelearn.com/courses/all?page=' + page
    try{

        axios.get(url)
        .then(response => {
            const $ = cheerio.load(response.data)
            const content = $(".job-post-main")

            let course = []

            content.find(".job-post-wrapper > .single-job-post").each((id, el) => {
                let img = $(el).find(".col-md-3 > a").find("img").attr('src')
                let rate = $(el).find(".col-md-3 > .ribbon > span").text()
                let judul = $(el).find(".col-md-9 > .job-title").find("a").text()
                let link = $(el).find(".col-md-9 > .job-title").find("a").attr('href').replace(URL, "")
                let category = $(el).find(".col-md-9 > .job-info > .company").find("a").text().trim()

                course.push({
                    judul,
                    category,
                    link,
                    img,
                    rate
                })
            })

            res.json(course)
        })

    }catch{

    }
})

router.get('/course/detail/:slug', (req, res) => {
    const slug = req.params.slug
    try{

        axios.get("https://insidelearn.com/" + slug)
        .then(response => {
            const $ = cheerio.load(response.data)
            const content = $("#job-page")

            const obj = {}

            content.find(".container > .row > .col-md-8").each((id, el) => {
                obj.judul = $(el).find(".company-info > .col-md-12 > .job-company-info").find("h1").text()
                obj.img = $(el).find(".job-details > .col-md-12 > .embed-responsive").find("img").attr('src')
                $(el).find(".job-details > .col-md-12 > .pt15").find('.alert').remove()
                obj.content = $(el).find(".job-details > .col-md-12 > .pt15").html()
            })

            content.find(".container > .row > .col-md-8 > .job-details > .col-md-12").each((id, el) => {
                obj.link = $(el).find('.btn-purplex').attr('href')
            })

            res.json(obj)
        })

    }catch{

    }
})

module.exports = router