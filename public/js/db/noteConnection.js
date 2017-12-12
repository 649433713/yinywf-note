var sqlite3 = require('sqlite3');
var fs = require('fs');
var db = new sqlite3.Database('D:/IDEA/GitProgram/note/note');

function addNote(noteTitle,noteContent,notebookId,username,callback) {
    var sql = db.prepare("insert into noteDetail(noteTitle,noteContent,notebookId,username) values(?,?,?,?)");
    sql.run(noteTitle,noteContent,notebookId,username,function(err){
        if(!err){
            getNote(username,noteTitle,function (t) {
                t.noteContent = t.noteContent.replaceAll("<img [^<]*/>","(图片)").replaceAll("<.*?>","");
                callback(t)
            })
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function deleteNote(noteId,callback) {
    var sql = db.prepare("delete from noteDetail where noteId = ?");
    sql.run(noteId,function(err){
        if(!err){
            callback(noteId)
        }
        else
            console.log(err);
    });
    sql.finalize();

}
function updateNote(noteTitle,noteContent,noteId,callback) {
    var sql = db.prepare("update noteDetail set noteTitle =?,noteContent = ?,updateTime = datetime('now','localtime') where noteId =?");
    sql.run(noteTitle,noteContent,noteId,function(err){
        if(!err){
            getNoteById(noteId,function (t) {
                t.noteContent = t.noteContent.replaceAll("<img [^<]*/>","(图片)").replaceAll("<.*?>","");
                callback(t)
            })
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function getNote(username,noteTitle,callback) {
    var sql = db.prepare("select * from noteDetail where username = ? and noteTitle=?");
    sql.get(username,noteTitle,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}



function getNoteById(noteId,callback) {
    var sql = db.prepare("select * from noteDetail where noteId = ?");
    sql.get(noteId,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}


function getAllNoteOfNotebook(notebookId,callback) {
    var sql = db.prepare("select * from noteDetail where notebookId = ? order by updateTime desc");
    sql.all(notebookId,function(err,res){
        if(!err){
            res.forEach(function (t) {
                t.noteContent = t.noteContent.replaceAll("<img [^<]*/>","(图片)").replaceAll("<.*?>","");
            })
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function getRecentNotes(username,callback) {
    var sql = db.prepare("select * from noteDetail where username = ? order by updateTime desc limit 3");
    sql.all(username,function(err,res){
        if(!err){
            res.forEach(function (t) {
                t.noteContent = t.noteContent.replaceAll("<img [^<]*/>","(图片)").replaceAll("<.*?>","");
            })
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function searchNote(username,noteTitle,callback) {
    var sql = db.prepare("select * from noteDetail where username = ? and noteTitle like ?");
    sql.all(username,'%'+noteTitle+'%',function(err,res){
        if(!err){
            res.forEach(function (t) {
                t.noteContent = t.noteContent.replaceAll("<img [^<]*/>","(图片)").replaceAll("<.*?>","");
            })
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

String.prototype.replaceAll = function (s1,s2) {
    return this.replace(new RegExp(s1,'gm'),s2);

}
module.exports.addNote = addNote
module.exports.deleteNote = deleteNote
module.exports.updateNote = updateNote
module.exports.getNote = getNote
module.exports.getNoteById = getNoteById
module.exports.getAllNoteOfNotebook = getAllNoteOfNotebook
module.exports.getRecentNotes = getRecentNotes
module.exports.searchNote = searchNote
