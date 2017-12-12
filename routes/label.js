var express = require('express');
var noteConnection = require('../public/js/db/noteConnection');
var labelConnection = require('../public/js/db/labelConnection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    labelConnection.getAllLabel(req.session.username,function (data) {
        res.render('noteDetail',{labels:data});
    })

});

/*router.post('/picture',function (req,res,next){
    console.log("uploading...")
    console.log(req.body)
    return;
    userConnection.savePicture(req.body.upload,function (data) {
        res.render('sign', { user:data});
    });
})
*/

router.post('/item', function (req,res,next) {
    labelConnection.addLabel(req.body.labelName,req.body.labelDescription,req.session.username,function (data) {
        labelConnection.getLabel(req.session.username,req.body.labelName,function (label) {
            res.json(label)
        })
    })
})
router.post('/updateItem', function (req,res,next) {
    labelConnection.updateLabel(req.body.labelId,req.body.labelName,req.body.labelDescription,function (data) {
        res.end(req.body.labelId);
    })
})
router.get('/item', function (req,res,next) {
    labelConnection.getLabelById(req.query.labelId,function (data) {
        res.json(data);
    })
})
router.get('/items', function (req,res,next) {
    labelConnection.searchLabel(req.session.username,req.query.labelName,function (data) {
        res.json(data);
    })
})

router.delete('/item', function (req,res,next) {

    labelConnection.deleteLabel(req.query.labelId,function (data) {
        res.json(data);
    })
})
module.exports = router;
