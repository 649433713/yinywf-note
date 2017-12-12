var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('D:/IDEA/GitProgram/note/note');

function addNotebook(notebookName,notebookDescription,username,callback) {
    var sql = db.prepare("insert into notebook(notebookName,notebookDescription,username) values(?,?,?)");
    sql.run(notebookName,notebookDescription,username,function(err){
        if(!err){
            callback(notebookName)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function deleteNotebook(notebookId,callback) {
    var sql = db.prepare("delete from notebook where notebookId = ?");
    sql.run(notebookId,function(err){
        if(!err){
            callback(notebookId)
        }
        else
            console.log(err);
    });
    sql.finalize();

}
function updateNotebook(notebookId,notebookName,notebookDescription,callback) {
    var sql = db.prepare("update notebook set notebookName =?,notebookDescription = ? where notebookId =?");
    sql.run(notebookName,notebookDescription,notebookId,function(err){
        if(!err){
            callback(notebookId)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function getNotebook(username,notebookName,callback) {
    var sql = db.prepare("select * from notebook where username = ? and notebookName=?");
    sql.get(username,notebookName,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

function getNotebookById(notebookId,callback) {
    var sql = db.prepare("select * from notebook where notebookId = ?");
    sql.get(notebookId,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}


function getAllNotebook(username,callback) {
    var sql = db.prepare("select * from notebook where username = ?");
    sql.all(username,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function searchNotebook(username,notebookName,callback) {
    var sql = db.prepare("select * from notebook where username = ? and notebookName like ?");
    sql.all(username,'%'+notebookName+'%',function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}
function getNotebookId(notebookName,username,callback) {
    var sql = db.prepare("select notebookId from notebook where username = ? and notebookName = ?");
    sql.get(username,notebookName,function(err,res){
        if(!err){
            console.log(notebookName,res)
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}
module.exports.addNotebook = addNotebook
module.exports.deleteNotebook = deleteNotebook
module.exports.updateNotebook = updateNotebook
module.exports.getNotebook = getNotebook
module.exports.getNotebookById = getNotebookById
module.exports.getAllNotebook = getAllNotebook
module.exports.getNotebookId = getNotebookId
module.exports.searchNotebook = searchNotebook
