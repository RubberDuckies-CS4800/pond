// To run, use "nodemon app" in the terminal (might have to do npm install nodemon)
// Ctrl + c to stop the app
// To run, use "nodemon app" in the terminal

const express = require("express");

// Lodash for A4
const _ = require("lodash");

var bodyParser = require("body-parser");

const app = express();

// listen for requests
app.listen(8000);

app.use(bodyParser.json());

var messages = [{ message: "hello it's A4" }];

var validator = require("validator");

app.get("/emails/:email", (req, res) => {
  res.sendFile("./assets/emails.json", { root: __dirname });
  let email = req.params.email;
  if (validator.isEmail(email)) {
    console.log(email + " is a valid email.");
  } else {
    console.log(email + " is NOT a valid email.");
  }
});

app.get("/a4", (req, res) => {
  res.sendFile("./views/a4.html", { root: __dirname });
});

//A4
app.post("/a4", (req, res) => {
  messages.push(req.body);
  res.sendStatus(200);
});

//display current time
app.get("/time", (req, res) => {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  res.sendFile("./views/index.html", { root: __dirname });
  console.log(time);
});

app.get("/", (req, res) => {
  // throws "ForbiddenError"
  // res.sendFile("../front-end/public/index.html", { root: __dirname });

  res.sendFile("./views/index.html", { root: __dirname });
  console.log("home page accessed");
});

app.get("/simba", (req, res) => {
  res.sendFile("./views/simba.html", { root: __dirname });
  console.log("i love simba!");
  console.log("this is a test of nodemon");

  // Lodash test code
  const names = ["gus", "x"];
  const puppies = _.concat(names, "appa", 4);
  console.log(puppies);
});

app.get("/pixar", (req, res) => {
  console.log(req);
  res.sendFile("./views/pixar.html", { root: __dirname });
});

app.get("/pixar_characters", (req, res) => {
  console.log(req);
  res.sendFile("./assets/characters.json", { root: __dirname });
});

function computeFibb(index) {
  if (index == 1) {
    return [1, 1];
  } else {
    const prev = computeFibb(index - 1);
    return [prev[1], prev[0] + prev[1]];
  }
}

app.get("/fibbonacci/:index", (req, res) => {
  const idx = parseInt(req.params["index"]);
  if (isNaN(idx) || idx < 1) {
    res.status(400).send("index must be a number >= 1");
    return;
  }
  res.status(200).send("" + computeFibb(idx)[1]);
});

app.get("/collins-test", (req, res) => {
  console.log("my first HTTP request, fun!");
  console.log("the request status code is: " + res.statusCode);

  res.sendFile("./views/index.html", { root: __dirname });

  var cowsay = require("cowsay");
  console.log(
    cowsay.say({
      text: "Pond is the greatest web app ever!",
      e: "oO",
      T: "U ",
    })
  );
});
