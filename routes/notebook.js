var express = require('express');
var noteConnection = require('../public/js/db/noteConnection');
var notebookConnection = require('../public/js/db/notebookConnection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('noteDetail');
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
    notebookConnection.addNotebook(req.body.notebookName,req.body.notebookDescription,req.session.username,function (data) {
        notebookConnection.getNotebook(req.session.username,req.body.notebookName,function (notebook) {
            res.json(notebook)
        })
    })
})
router.post('/updateItem', function (req,res,next) {
    notebookConnection.updateNotebook(req.body.notebookId,req.body.notebookName,req.body.notebookDescription,function (data) {
        res.end(req.body.notebookId)
    })
})
router.get('/item', function (req,res,next) {
    notebookConnection.getNotebookById(req.query.notebookId,function (data) {
        res.json(data);
    })
})
router.get('/items', function (req,res,next) {
    notebookConnection.searchNotebook(req.session.username,req.query.notebookName,function (data) {
        res.json(data);
    })
})

router.delete('/item', function (req,res,next) {

    notebookConnection.deleteNotebook(req.query.notebookId,function (data) {
        notebookConnection.getAllNotebook(req.session.username,function (notebooks) {
            res.render('noteDetail',{notebooks:notebooks})
        })
    })
})
module.exports = router;
