var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan")
var mongoose = require("mongoose");

//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

//Require all models
var db = require("./models");

var PORT = 3000;

//Initialze express
var app = express();

//Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});