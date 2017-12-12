$('.note-intro').click(function () {
    var noteId = $(this).attr("noteId");

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

            labels.forEach(function (t) {
                    h3.append("<span class=\"badge\">"+ t.labelName +"</span>");
            })
        }
    })
    $('body').attr('noteId',noteId);
})

$('.create-note').click(function () {
    $.ajax({
        type:'GET',
        url: '/notebook/items',
        data:{'notebookName':""},
        success:function (notebooks) {
            var list = $('#choose-notebook-label');
            list.find('option').remove();
            var html="";
            notebooks.forEach(function (t) {
                html += "<option value='"+t.notebookId +"'>"+t.notebookName+"</option>";
            })
            list.html(html);
            list.selectpicker('refresh')
        }
    })
})

$('.delete-label-of-note').click(function () {
    $.ajax({
        type:'GET',
        url: '/note/labels',
        data:{'noteId':$('body').attr('noteId')},
        success:function (labels) {
            var list = $('#delete-label-label');
            list.find('option').remove();
            var html="";
            labels.forEach(function (t) {
                html += "<option value='"+t.labelId +"'>"+t.labelName+"</option>";
            })
            list.html(html);
            list.selectpicker('refresh')
        }
    })
})
$('.add-label').click(function () {
    $.ajax({
        type:'GET',
        url: '/note/labels',
        data:{'noteId':$('body').attr('noteId')},
        success:function (hasLabels) {
            $.ajax({
                type:'GET',
                url: '/label/items',
                data:{'labelName':""},
                success:function (labels) {
                    var list = $('#choose-label-label');
                    list.find('option').remove();
                    var html="";
                    labels.forEach(function (t) {
                        html += "<option value='"+t.labelId +"'>"+t.labelName+"</option>";
                    })
                    list.html(html);
                    list.selectpicker('refresh')
                    hasLabels.forEach(function (t) {
                        list.find("option[value='"+ t.labelId +"']").remove();
                    })
                    list.selectpicker('refresh')
                }
            })
        }
    })

})

$('#search-note-button').click(function () {
    var value = $(this).parent().prev().val();
    $.ajax({
        type:'GET',
        url: '/note/items',
        data:{'noteTitle':value},
        success:function (items) {
            var div = $('.mail_list_column');
            div.find('a').remove();
            items.forEach(function (t) {
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
                $('body').attr('noteId',noteId)
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
})
$('#add-label-for-note-button').click(function () {
    var labelId =  $('#choose-label-label').val();
    var noteId = $('body').attr('noteId');


    labelId.forEach(function (t) {
        var data = {labelId:t,noteId:noteId};
        $.ajax({
            type:'POST',
            url: '/note/label',
            data:data,
            success:function (data) {
                $.ajax({
                    type:'GET',
                    url: '/label/item',
                    data:{'labelId':t},
                    success:function (label) {
                        var h3 = $('#tab-note').find('.col-md-12:last h3');
                        h3.append("<span class=\"badge\">"+ label.labelName +"</span>");
                    }
                })
            }
        })
    })
})

$('#delete-label-for-note-button').click(function () {
    var labelId =  $('#delete-label-label').val();
    var noteId = $('body').attr('noteId');

    labelId.forEach(function (t) {
        var data = {labelId:t,noteId:noteId};
        $.ajax({
            type:'POST',
            url: '/note/deleteLabel',
            data:data,
            success:function (data) {
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
            }
        })
    })
})

$('#choose-notebook-button').click(function () {
    var notebookId = $('#choose-notebook-label').val();
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
            noteIntroEvent();
            var button = $('#compose');
            button.after("<a class='note-intro'noteId='-1' >\n" +
                "                                        <div class=\"mail_list\">\n" +
                "                                            <div class=\"left\">\n" +
                "                                                <i class=\"fa fa-circle\"></i> <i class=\"fa fa-edit\"></i>\n" +
                "                                            </div>\n" +
                "                                            <div class=\"right\">\n" +
                "                                                <h3>"+ "（标题）"+"<small></small></h3>\n" +
                "                                                <p>"+ "（内容）" +"</p>\n" +
                "                                            </div>\n" +
                "                                        </div>\n" +
                "                                    </a>");
            $('#noteTitle').val("");
            CKEDITOR.instances.noteContent.setData("");
            $('body').attr('noteId',-1)

        }
    })
})

$('#saveNote').click(function () {
    var data = {noteTitle:$('#noteTitle').val(),noteContent:CKEDITOR.instances.noteContent.getData(),notebookId:$('#choose-notebook-label').val(),noteId:$('body').attr('noteId')};
    $.ajax({
        type:'POST',
        url: '/note/note',
        data:data,
        success:function (note) {
            if (data.noteId==='-1'){
                var a = $('.mail_list_column').find('.note-intro:first');
                a.attr("noteId",note.noteId);
                a.find('h3').html(data.noteTitle+"<small>"+note.updateTime+"</small>");
                a.find('p').text(note.noteContent);
                noteIntroEvent();
            }else {
                var a = $('.mail_list_column').find('.note-intro[noteId='+ note.noteId +']');
                a.find('h3').html(data.noteTitle+"<small>"+note.updateTime+"</small>");
                a.find('p').text(note.noteContent);
            }

            alert("保存成功")
        }
    })
})

$('#deleteNote').click(function () {
    var noteId = $('body').attr('noteId')
    $.ajax({
        type:'DELETE',
        url: '/note/note?noteId='+noteId,
        success:function (data) {
            var a = $('.mail_list_column').find('.note-intro[noteId='+ noteId +']');
            a.remove();
            alert("删除成功")
        }
    })
})


function noteIntroEvent() {
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



