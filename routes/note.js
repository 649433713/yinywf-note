var express = require('express');
var noteConnection = require('../public/js/db/noteConnection');
var labelOfNoteConnection = require('../public/js/db/labelOfNoteConnection')
var labelConnection = require('../public/js/db/labelConnection')
var notebookConnection = require('../public/js/db/notebookConnection');
var router = express.Router();
var fs = require('fs')
var formidable = require('formidable')
var path = require('path')

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
router.get('/notesOfNotebook', function (req,res,next) {
    noteConnection.getAllNoteOfNotebook(req.query.notebookId,function (data) {
        res.json(data);
    })
})
router.get('/notesOfLabel', function (req,res,next) {
    labelOfNoteConnection.getNoteOfLabel(req.query.labelId,function (data) {
        res.json(data);
    })
})
router.get('/noteDetail', function (req,res,next) {
    noteConnection.getNoteById(req.query.noteId,function (data) {
        res.json(data);
    })
})

router.get('/labels', function (req,res,next) {
    labelOfNoteConnection.getLabelOfNote(req.query.noteId,function (data) {
        res.json(data);
    })
})
router.post('/note', function (req,res,next) {
    if (req.body.noteId === '-1') {
        noteConnection.addNote(req.body.noteTitle, req.body.noteContent, req.body.notebookId, req.session.username, function (data) {
            res.json(data);
        })
    }else{
        noteConnection.updateNote(req.body.noteTitle, req.body.noteContent, req.body.noteId, function (data) {
            res.json(data);
        })
    }

})
router.delete('/note', function (req,res,next) {
    if (req.query.noteId !== '-1') {
       noteConnection.deleteNote(req.query.noteId,function (e) {
           res.json(e);
       })
    }

})
router.get('/items', function (req,res,next) {
    noteConnection.searchNote(req.session.username,req.query.noteTitle,function (data) {
        res.json(data);
    })
})
router.post('/label', function (req,res,next) {
   labelOfNoteConnection.addLabelOfNote(req.body.labelId,req.body.noteId,function (data) {
       res.json(data);
   })
})
router.post('/deleteLabel', function (req,res,next) {
    labelOfNoteConnection.deleteLabelOfNote(req.body.labelId,req.body.noteId,function (data) {
        res.json(data);
    })
})

router.post('/picture', function (req,res,next) {
    var today = new Date();
    var folder = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
    var dirname = __dirname.replace("routes", 'public/upload/' + folder);
    if (mkdirsSync(dirname, '0777')) {
        var form = new formidable.IncomingForm();
        form.encoding = "utf-8";
        form.uploadDir = dirname;
        form.maxFontSize = 2 * 1024 * 1024;
        form.parse(req, function (err, fields, files) {
            if (err)return;
            var fileName = new Date().getTime() + "." + files.upload.name.split('.')[files.upload.name.split('.').length - 1];
            var newPath = form.uploadDir + "/" + fileName;
            fs.rename(files.upload.path, newPath, function () {
                res.end(JSON.stringify({fileName: '/upload/' + folder + "/" + fileName}))
            });
            var callback =req.query.CKEditorFuncNum;
            res.write("<script type=\"text/javascript\">");
            res.write("window.parent.CKEDITOR.tools.callFunction("+ callback + ",'" +"/upload/"+ folder + "/" + fileName+ "','')");
            res.write("</script>");
        })
    } else
        console.error('error')
});

function mkdirsSync(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function (dirname) {
            if (dirname === "") {
                dirname = "/"
            }
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            } else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}
String.prototype.replaceAll = function (s1,s2) {
    return this.replace(new RegExp(s1,"gm"),s2);
}
module.exports = router;
