// Load required packages
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
	sortOrder: Number,
	videos: [VideoSchema]
});

var ProductionCategorySchema = new mongoose.Schema({
	name: String,
	sortOrder: Number,
	shortDesc: String,
	subItems: [SubCategorySchema]
});

// Export the Mongoose model
module.exports = mongoose.model('ProductionCategories', ProductionCategorySchema); //relates to db.lightregions.cats
//module.exports = mongoose.model('cats', ProductionCategorySchema);  //relates to db.lightregions.prods
//module.exports = mongoose.model('subs', SubCategorySchema);
//module.exports = mongoose.model('videos', VideoSchema);


