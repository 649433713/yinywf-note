var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('D:/IDEA/GitProgram/note/note');

function getAllUser(callback) {
    db.all("select * from user",function(err,res){
        if(!err){
            callback(JSON.stringify(res))
        }
        else
            console.log(err);
    });
}

module.exports.getAllUser = getAllUser
