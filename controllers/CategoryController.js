// Create a new route for photography
var Category = require('../models/production-category');

// Create endpoint /api/ProductionCategories for GETS -- All categories
exports.getAllProductionCategories = function(req, res) {
  // Use the Ber model to find all beer
  Category.find(function(err, category) {
    if (err)
      res.send(err);

    console.log(category);

    res.json(category);
  });
};

// Create endpoint /api/production/category/id for GETS -- category by _id
exports.getProductionCategory = function(req, res) {
  // Use the Ber model to find all beer



  Category.findById({_id: req.params.id}, function(err, category) {
    if (err)
      res.send(err);

    res.json(category);
  });
};

// Create endpoint /api/production for POSTS -- new category
exports.postProductionCategory = function(req, res) {
  // Create a new instance of the Beer model
  var _cat = new Category();
  _cat.name = req.body.name;
  _cat.sortOrder = req.body.sortOrder;
  _cat.shortDesc = req.body.shortDesc;
  var _sub = JSON.parse(req.body.subItems);

  for (var i = 0; i < _sub.length; i++){
    var subItem = _sub[i];
    var subItemObj = {
      name: subItem['name'],
      sortOrder: subItem['sortOrder'],
      videos: []
    }

    var _videos = subItem.videos;
    for (var j in _videos){
      var video = _videos[j];
      var videoObj = { 
        title: video['title'], 
        shortDesc: video['shortDesc'], 
        thumb: video['thumb'], 
        src: video['src'], 
        youtubeID: video['youtubeID'], 
        vimeo: video['vimeo'], 
        isActive: video['isActive']
      }
      subItemObj.videos.push(videoObj);
    } 

    _cat.subItems.push(subItemObj);
  } 
  
  // Save the photo and check for errors
  _cat.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Category has been added to Production!', data: _cat });
  });
};

// Create endpoint /api/production/category/id for PUT -- category by _id
exports.putProductionCategory = function(req, res) {
  // Use the Ber model to find all beer
  Category.findById({_id: req.params.id}, function(err, category) {
    if (err)
      res.send(err);

    res.json(category);
  });
};


// Create endpoint /api/production/category/id for DELETE -- category by _id
exports.deleteProductionCategory = function(req, res) {
  // Use the Ber model to find all beer
  Category.findOne({_id: req.params.id}, function(err, category) {
    if (err)
      res.send(err);

    res.json(category);
  });
};
