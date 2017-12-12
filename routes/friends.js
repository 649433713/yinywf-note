var express = require('express');
var userConnection = require('../public/js/db/userConnection');
var noteConnection = require('../public/js/db/noteConnection' )
var notebookConnection = require('../public/js/db/notebookConnection' )
var labelConnection = require('../public/js/db/labelConnection' )
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('friends');
})
router.get('/users', function(req, res, next) {
    userConnection.
    res.render('friends');
})
module.exports = router;
