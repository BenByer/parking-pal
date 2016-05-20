var models = require('../models');
var middleware = require('../lib/middleware');

module.exports = function(app) {
  app.get('/dashboard', middleware.ensureAuthenticated, function(req, res){
    models.ParkingSpot.findAll({ where: {UserId: req.user.id}}).then(function(spots) {
      var ps = { parkingSpots: spots };
      // TODO: get the spots.availability value.
      var data = { user: req.user, parkingSpots: spots};
      console.log("dashboard.js  app.get('/dashboard'", spots.availabilty);
      res.render('dashboard', data);
    }).catch(function(error){
      console.log(JSON.stringify(error));
    });


  });
}

