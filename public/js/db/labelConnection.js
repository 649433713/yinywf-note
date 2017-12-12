var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('D:/IDEA/GitProgram/note/note');

function addLabel(labelName,labelDescription,username,callback) {
    var sql = db.prepare("insert into label(labelName,labelDescription,username) values(?,?,?)");
    sql.run(labelName,labelDescription,username,function(err){
        if(!err){
            callback(labelName)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function deleteLabel(labelId,callback) {
    var sql = db.prepare("delete from label where labelId = ?");
    sql.run(labelId,function(err){
        if(!err){
            callback(labelId)
        }
        else
            console.log(err);
    });
    sql.finalize();

}
function updateLabel(labelId,labelName,labelDescription,callback) {
    var sql = db.prepare("update label set labelName =?,labelDescription = ? where labelId =?");
    sql.run(labelName,labelDescription,labelId,function(err){
        if(!err){
            callback(labelId)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function getLabel(username,labelName,callback) {
    var sql = db.prepare("select * from label where username = ? and labelName=?");
    sql.get(username,labelName,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

function getLabelById(labelId,callback) {
    var sql = db.prepare("select * from label where labelId = ?");
    sql.get(labelId,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}


function getAllLabel(username,callback) {
    var sql = db.prepare("select * from label where username = ?");
    sql.all(username,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

function searchLabel(username,labelName,callback) {
    var sql = db.prepare("select * from label where username = ? and labelName like ?");
    sql.all(username,'%'+labelName+'%',function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

module.exports.addLabel = addLabel
module.exports.deleteLabel = deleteLabel
module.exports.updateLabel = updateLabel
module.exports.getLabel = getLabel
module.exports.getLabelById = getLabelById
module.exports.getAllLabel = getAllLabel
module.exports.searchLabel = searchLabel
