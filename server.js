var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan")
var mongoose = require("mongoose");
var bodyParser = require("body-parser")
//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

//Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

//Initialze express
var app = express();

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Routes

// Serve index.handlebars to the root route.
app.get("/", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", {
        results: dbArticle
      });
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


// A GET route for scraping the newschoolers website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.newschoolers.com/home").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article.ns-card .col-sm-8").each(function (i, element) {
      // Save an empty result object
      var result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        // .children("div.row")
        // .children("div.col-sm-8")
        .children("h1.ns-card-title")
        .children("a")
        .text();
      result.summary = $(this)
        .children("p")
        .text();
      result.link = $(this)
        .children("h1.ns-card-title")
        .children("a")
        .attr("href");
      console.log(result)
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          // console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    res.redirect("/");
  });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});