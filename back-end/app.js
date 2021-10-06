// To run, use "nodemon app" in the terminal

const express = require("express");

const app = express();

// example layout for GET
// app.get('/path', (req, res) => {
// })

app.use(express.static('../front-end/dist/'));

// listen for requests
app.listen(8000);
