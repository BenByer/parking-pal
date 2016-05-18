module.exports = function(app) {

    app.get('/homeowner', function (req, res) {
      var data = { user: req.user}
      res.render('homeowner', data);
  });



  app.post('/homeowner', ensureAuthenticated, function(req, res) {

     var data = { user: req.user}
      res.render('homeowner', data);

    var parkingSpot = models.ParkingSpots.create({
      address: req.body.address,
      availability_date: req.body.availability_date,
      rental_length: req.body.rental_length,
      rental_price: req.body.rental_price,
      start_time: req.body.start_time,
      end_time: req.body.end_time

    }).then (function(parkingSpot) {
    console.log(parkingSpot);
    // req.login(parkingSpot, function(err){
    //    if (req.session.redirectUrl) {
    //      res.redirect(req.session.redirectUrl);
    //      req.session.redirectUrl = null
    //      return 
    //    }
    //   else
    //     return res.redirect('/');  
      });  
});
  
// Simple route middleware to ensure user is authenticated.
    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      req.session.redirectUrl = req.url
      req.session.error = 'Please sign in!';
      res.redirect('/login');
    }
}

