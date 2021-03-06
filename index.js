const cors = require('cors')
const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()

const berita = require('./berita')
const insidelearn = require('./learn.js')
const resep = require('./resep')

app.use(cors())

app.use("/api", berita)
app.use("/api", insidelearn)
app.use("/api", resep)

app.listen(PORT, () => {
    console.log("Server running " + PORT)
})
