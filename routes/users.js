var express = require('express');
var userConnection = require('../public/js/db/userConnection');
var noteConnection = require('../public/js/db/noteConnection' )
var notebookConnection = require('../public/js/db/notebookConnection' )
var labelConnection = require('../public/js/db/labelConnection' )
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('sign');
});

router.post('/register',function (req,res,next){
  userConnection.addUser(req.body.Name,req.body.Password,req.body.Email,req.body.PhoneNumber,function (data) {
      res.render('sign', { user:data});
  });
})
router.post('/login',function (req,res) {
    userConnection.login(req.body.Username,req.body.Password,function (username) {
         if(username!==null){
             req.session.username = username;
             noteConnection.getRecentNotes(username,function (recentNotes) {
                 notebookConnection.getAllNotebook(username,function (notebooks) {
                     labelConnection.getAllLabel(username,function (labels) {
                         res.render('noteDetail',{username:username,recentNotes:recentNotes,notebooks:notebooks,labels:labels});
                     })

                 })
             })

         }
         else {
             req.session.error = '用户名或密码错误';
             res.render('sign',{ errMsg:'用户名或密码错误'})
         }
    })
})
router.get('/friends',function (req,res,next){
    res.render('friends');
})
module.exports = router;
