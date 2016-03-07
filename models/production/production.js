/ Load required packages
var mongoose = require('mongoose');

// Define our video schema
var VideoSchema = new mongoose.Schema({
  title: String,
  shortDesc: String,
  thumb: String,
  src: String,
  youtubeID: String,
  vimeo: String,
  isActive: Boolean
});

var SubCategorySchema = new mongoose.Schema({
	name: String,
	id: Number,
	videos: [VideoSchema]
});

var CategorySchema = new mongoose.Schema({
	name: String,
	id: Number,
	shortDesc: String,
	subItems: [SubCategorySchema]
});

var ProdSchema = new mongoose.Schema({
	name: String,
	subItems: [CategorySchema]
});

// Export the Mongoose model
module.exports = mongoose.model('Prod', ProdSchema);
