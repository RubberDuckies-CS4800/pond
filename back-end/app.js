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

  // Lodash test code
  const names = ['gus', 'x']
  const puppies = _.concat(names, 'appa', 4);
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
    return [1, 1]
  } else {
    const prev = computeFibb(index - 1)
    return [prev[1], prev[0] + prev[1]]
  }
}

app.get("/fibbonacci/:index", (req, res) => {
  const idx = parseInt(req.params['index'])
  if (isNaN(idx) || idx < 1) {
    res.status(400).send('index must be a number >= 1')
    return
  }
  res.status(200).send('' + computeFibb(idx)[1])
})
