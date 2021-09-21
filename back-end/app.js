// To run, use "nodemon app" in the terminal (might have to do npm install nodemon)
// Ctrl + c to stop the app

const express = require("express");

// Lodash for A4
const _ = require("lodash");


const app = express();

// listen for requests
app.listen(8000);

// example layout for GET
// app.get('/path', (req, res) => {
// })

app.get("/", (req, res) => {
  // throws "ForbiddenError"
  // res.sendFile("../front-end/public/index.html", { root: __dirname });

  res.sendFile("./views/index.html", { root: __dirname });
  console.log("home page accessed");
});

app.get("/simba", (req, res) => {
  res.sendFile("./views/simba.html", { root: __dirname });
  console.log("i love simba!");

  // Lodash test code
  const names = ['gus', 'x']
  const puppies = _.concat(names, 'appa', 4);
  console.log(puppies);
});
