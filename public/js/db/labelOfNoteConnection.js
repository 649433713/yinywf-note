var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('D:/IDEA/GitProgram/note/note');

function addLabelOfNote(labelId,noteId,callback) {
    var sql = db.prepare("insert into labelOfNote(labelId,noteId) values(?,?)");
    sql.run(labelId,noteId,function(err){
        if(!err){
            callback([labelId,noteId])
        }
        else
            console.log(err);
    });
    sql.finalize();
}

function deleteLabelOfNote(labelId,noteId,callback) {
    var sql = db.prepare("delete from labelOfNote where labelId = ? and noteId = ?");
    sql.run(labelId,noteId,function(err){
        if(!err){
            callback([labelId,noteId])
        }
        else
            console.log(err);
    });
    sql.finalize();
}

function getLabelOfNote(noteId,callback) {
    var sql = db.prepare("select * from (select labelId from labelOfNote where noteId = ?) as id left join label on id.labelId = label.labelId");
    sql.all(noteId,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

function getNoteOfLabel(labelId,callback) {
    var sql = db.prepare("select * from (select noteId from labelOfNote where labelId = ?) as id left join noteDetail on id.noteId = noteDetail.noteId");
    sql.all(labelId,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

module.exports.addLabelOfNote = addLabelOfNote
module.exports.getLabelOfNote = getLabelOfNote
module.exports.getNoteOfLabel = getNoteOfLabel
module.exports.deleteLabelOfNote = deleteLabelOfNote
