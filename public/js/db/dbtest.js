var noteConnection = require('./noteConnection');

noteConnection.getAllNoteOfNotebook(1,function (data) {
    console.log(data)
})

noteConnection.getRecentNotes("yinywf",function (data) {
    console.log(data)
})

noteConnection.searchNote("yinywf","note",function (data) {
    console.log(data)
})