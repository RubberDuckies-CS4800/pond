// To run, use "nodemon app" in the terminal

const express = require("express");

const app = express();

// listen for requests
app.listen(8000);

// example layout for GET
// app.get('/path', (req, res) => {
// })


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
});
