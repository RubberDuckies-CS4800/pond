// To run, use "nodemon app" in the terminal

const express = require("express");

var bodyParser = require('body-parser')

const app = express();

// listen for requests
app.listen(8000);

app.use(bodyParser.json())

var messages = [{message: 'hello it\'s A4'}]

// example layout for GET
// app.get('/path', (req, res) => {
// })

var validator = require('validator');

app.get("/emails/:email", (req, res) => {
  res.sendFile("./assets/emails.json", { root: __dirname });
  let email = req.params.email;
  if(validator.isEmail(email)) {
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
  messages.push(req.body)
  res.sendStatus(200)
});

//display current time
app.get("/time", (req, res) => {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

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
});

app.get("/collins-test", (req, res) => {
  console.log("my first HTTP request, fun!");
  console.log("the request status code is: " + res.statusCode);

  res.sendFile("./views/index.html", { root: __dirname });

  var cowsay = require("cowsay");
  console.log(cowsay.say({
    text : "Pond is the greatest web app ever!",
    e : "oO",
    T : "U "
  }));
});
