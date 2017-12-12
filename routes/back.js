var express = require('express');
var userConnection = require('../public/js/db/userConnection');
var noteConnection = require('../public/js/db/noteConnection' )
var notebookConnection = require('../public/js/db/notebookConnection' )
var labelConnection = require('../public/js/db/labelConnection' )
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    userConnection.getAllUser(function (data) {
        res.render('back',{users:data});
    })
})
router.get('/users', function(req, res, next) {
   userConnection.searchUser(req.query.username,function (data) {
       res.json(data);
   })
})
module.exports = router;
