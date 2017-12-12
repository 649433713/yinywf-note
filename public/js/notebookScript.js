$('#choose-notebook-button').click(function () {
    $('body').attr('notebookId',$('#choose-notebook-label').val());
})

function deleteNotebook(e) {
    e.stopPropagation();
    $(e.target).parent().parent().parent().parent().parent().parent().css("display","none");
    var notebookId = $(this).attr('notebookId');
    $.ajax({
        type:'DELETE',
        url: '/notebook/item?notebookId='+notebookId,
        success:function (data) {

        }
    })

}
$('.delete-notebook').click(deleteNotebook);

function getNotes() {
    var notebookId = $(this).next().next().attr('notebookId');
    $.ajax({
        type:'GET',
        url: '/note/notesOfNotebook',
        data:{'notebookId':notebookId},
        success:function (data) {
            var div = $('.mail_list_column');
            div.find('a').remove();
            data.forEach(function (t) {
                div.append("<a class='note-intro'noteId='"+ t.noteId +"' >\n" +
                    "                                        <div class=\"mail_list\">\n" +
                    "                                            <div class=\"left\">\n" +
                    "                                                <i class=\"fa fa-circle\"></i> <i class=\"fa fa-edit\"></i>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"right\">\n" +
                    "                                                <h3>"+ t.noteTitle +"<small>"+ t.updateTime +"</small></h3>\n" +
                    "                                                <p>"+ t.noteContent +"</p>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                    </a>");
            })

            $("#note-tab").find("a[href='#tab-note']").tab('show');
            $('.note-intro').click(function () {
                var noteId = $(this).attr("noteId");
                $('body').attr('noteId',noteId);
                $.ajax({
                    type:'GET',
                    url: '/note/noteDetail',
                    data:{'noteId':noteId},
                    success:function (noteDetail) {
                        var div = $('.mail_list_column');
                        $('#noteTitle').val(noteDetail.noteTitle);
                        CKEDITOR.instances.noteContent.setData(noteDetail.noteContent);
                    }
                })
                $.ajax({
                    type:'GET',
                    url: '/note/labels',
                    data:{'noteId':noteId},
                    success:function (labels) {
                        var h3 = $('#tab-note').find('.col-md-12:last h3');
                        h3.find('span').remove();
                         labels.forEach(function (t) {
                             h3.append("<span class=\"badge\">"+ t.labelName +"</span>");
                         })
                    }
                })
            })
        }
    })
}
$('.get-notes-of-notebook').click(getNotes);

function alterNotebook() {
    var notebookId = $(this).next().attr('notebookId');
    $('body').attr("tempNotebookId",notebookId);
    $.ajax({
        type:'GET',
        url: '/notebook/item',
        data:{'notebookId':notebookId},
        success:function (data) {
            $('#alter-notebook-name-field').attr('value',data.notebookName);
            $('#alter-notebook-introduction-field').text(data.notebookDescription);
        }
    })
}
$('.alter-notebook').click(alterNotebook)

$('#add-notebook-button').click(function () {
    var data={notebookName:$('#add-notebook-name-field').val(),notebookDescription:$('#add-notebook-introduction-field').val()};
    $.ajax({
        type:'POST',
        url: '/notebook/item',
        data:data,
        success:function (data) {
            $('#tab-notebook').find("div[class='row notebook-list']").append("<div class=\"col-md-55 notebook\">\n" +
                "                                    <div class=\"thumbnail\">\n" +
                "                                        <div class=\"image view view-first\">\n" +
                "                                            <img style=\"width: 100%; display: block;\" src=\"/images/personal-center/notebook.jpg\" alt=\"image\" />\n" +
                "                                            <div class=\"mask\">\n" +
                "                                                <p>"+data.notebookDescription +"</p>\n" +
                "                                                <div class=\"tools tools-bottom\">\n" +
                "                                                    <a class=\"get-notes-of-notebook\"><i class=\"fa fa-link\"></i></a>\n" +
                "                                                    <a class=\"alter-notebook\" data-toggle=\"modal\" data-target=\"#alter-notebook-modal\" role=\"button\"><i class=\"fa fa-pencil\"></i></a>\n" +
                "                                                    <a class=\"delete-notebook\" notebookId="+ data.notebookId+ "><i class=\"fa fa-times\"></i></a>\n" +
                "                                                </div>\n" +
                "                                            </div>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"caption\">\n" +
                "                                            <p>"+data.notebookName +"</p>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                </div>");

            $('.delete-notebook').click(deleteNotebook)
            $('.get-notes-of-notebook').click(getNotes);
            $('.alter-notebook').click(alterNotebook)
        }
    })
})

$('#alter-notebook-button').click(function(){
    var notebookId = $('body').attr('tempNotebookId');
    var data={notebookId:notebookId ,notebookName:$('#alter-notebook-name-field').val(),notebookDescription:$('#alter-notebook-introduction-field').val()};
    $.ajax({
        type:'POST',
        url: '/notebook/updateItem',
        data:data,
        success:function (notebookId) {
            var div = $('#tab-notebook').find("a[notebookId="+ data.notebookId+"]").parent().parent();
            div.find("p").html(data.notebookDescription);
            div.parent().next().find("p").html(data.notebookName);
        }
    })
})

$('#search-notebook-button').click(function () {
    var value = $(this).parent().prev().val();
    $.ajax({
        type:'GET',
        url: '/notebook/items',
        data:{'notebookName':value},
        success:function (items) {
            var notebooks = $('.notebook-list');
            $('.notebook').remove();
            items.forEach(function (t) {
                notebooks.append("<div class=\"col-md-55 notebook\">\n" +
                    "                                    <div class=\"thumbnail\">\n" +
                    "                                        <div class=\"image view view-first\">\n" +
                    "                                            <img style=\"width: 100%; display: block;\" src=\"/images/personal-center/notebook.jpg\" alt=\"image\" />\n" +
                    "                                            <div class=\"mask\">\n" +
                    "                                                <p>"+t.notebookDescription +"</p>\n" +
                    "                                                <div class=\"tools tools-bottom\">\n" +
                    "                                                    <a class=\"get-notes\"><i class=\"fa fa-link\"></i></a>\n" +
                    "                                                    <a class=\"alter-notebook\" data-toggle=\"modal\" data-target=\"#alter-notebook-modal\" role=\"button\"><i class=\"fa fa-pencil\"></i></a>\n" +
                    "                                                    <a class=\"delete-notebook\" notebookId="+ t.notebookId+ "><i class=\"fa fa-times\"></i></a>\n" +
                    "                                                </div>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"caption\">\n" +
                    "                                            <p>"+t.notebookName +"</p>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>");
            })
        }
    })
})