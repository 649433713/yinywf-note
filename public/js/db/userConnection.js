var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('D:/IDEA/GitProgram/note/note');

function getAllUser(callback) {
    db.all("select * from user",function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
}

function searchUser(username,callback) {
   var sql =  db.prepare("select * from user where username like ?")
        sql.all('%'+username+'%',function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
}


function addUser(username,password,email,phone,callback) {
    var sql = db.prepare("insert into user(username,password,email,phone) values(?,?,?,?)");
    sql.run(username,password,email,phone,function(err){
        if(!err){
            callback(username)
        }
        else
            console.log(err);
    });
    sql.finalize();
}



function login(username,password,callback) {
    var sql = db.prepare("select password from user where username = ?");
    sql.get(username,function(err,res){
        if(!err){
            if(res&&password===res.password) {
                callback(username);
            }else {
                callback(null)
            }

        }
        else
            console.log(err);
    });
    sql.finalize();
}

function deleteUser(userId,callback) {
    var sql = db.prepare("delete from user where userId=?");
    sql.run(userId,function(err){
        if(!err){
            callback(userId);
        }
        else
            console.log(err);
    });
    sql.finalize();
}
module.exports.addUser = addUser

module.exports.getAllUser = getAllUser

module.exports.login = login

module.exports.deleteUser = deleteUser

module.exports.searchUser = searchUser
