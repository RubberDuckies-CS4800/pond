// Ctrl + c to stop the app
// To run, use "nodemon app" in the terminal

const path = require("path")
const { v4: uuidV4 } = require("uuid")
const _ = require("lodash")
const express = require("express")
const app = express()
const http = require("http")
const server = http.Server(app)

require('./socket')(server)

// Serve frontend files. This is the folder that `npm build` generates when run
// in the frontend.
app.use(express.static("../front-end/dist/"))

// Serve additional pages in the app by returning the compiled app. Vue compiles
// all pages to a single html file.
app.get("*", (req, res) => {
	res.sendFile(path.resolve("../front-end/dist/index.html"))
})

module.exports = server
