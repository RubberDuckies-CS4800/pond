// Ctrl + c to stop the app
// To run, use "nodemon app" in the terminal

const express = require("express");

const app = express();

// listen for requests
app.listen(8000);

app.get("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
    console.log("home page accessed");
});
