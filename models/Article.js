var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create a new ArticleSchema object
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `title` is required and of type String
  summary: {
    type: String,
    required: true,
    unique: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true,
    unique: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  // `comment` is an object that stores a Comment id
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with an associated Comment
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
});

ArticleSchema.plugin(uniqueValidator);

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;