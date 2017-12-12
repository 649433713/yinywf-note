var express = require('express');
var sqliteConnection = require('../public/js/sqliteConnection');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  sqliteConnection.getAllUser(function (data) {
      res.render('index', { title: 'Express' ,user: data});
  });

});

router.post('/register',function (req,res,next){

    res.render('index', { title: 'Express' ,user: req.body.Name});
})

module.exports = router;
