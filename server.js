// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var categoryController = require('./controllers/CategoryController');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var ejs = require('ejs');
var session = require('express-session');
var oauth2Controller = require('./controllers/oauth2');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/lightregions');

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Create our Express router
var router = express.Router();

//Add routed endpoints
//endpoint for /production category top level
router.route('/ProductionCategory')
	.get(authController.isAuthenticated, categoryController.getAllProductionCategories)
  .post(authController.isAuthenticated, categoryController.postProductionCategory)

//endpoint for production category specific
router.route('/ProductionCategory/:id')
	.get(authController.isAuthenticated, categoryController.getProductionCategory)
  .put(authController.isAuthenticated, categoryController.putProductionCategory)
  .delete(authController.isAuthenticated, categoryController.deleteProductionCategory)

//endpoint for /users 
router.route('/users')
	.get(authController.isAuthenticated, userController.getUsers)
	.post(authController.isAuthenticated, userController.postUsers)

//endpoint for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

  // Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes with /api
app.use('/api', router);

// Use environment defined port or 3000
var port = process.env.PORT || 3000;
// Start the server
app.listen(port);