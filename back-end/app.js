// To run, use "nodemon app" in the terminal

const express = require("express");
const path = require("path");

const app = express();

// example layout for GET
// app.get('/path', (req, res) => {
// })

app.use(express.static('../front-end/dist/'));

// Serve additional pages in the app by returning the compiled app. Vue compiles
// all pages to a single html file.
app.get('*', (req, res) => {
  res.sendFile(path.resolve('../front-end/dist/index.html'))
})

// listen for requests
app.listen(8000);
