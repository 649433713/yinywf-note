$('#choose-label-button').click(function () {
    $('body').attr('labelId',$('#choose-label-label').val());
})
function deleteLabel(e) {
    e.stopPropagation();
    $(e.target).parent().parent().parent().parent().parent().parent().css("display","none");
    var labelId = $(this).attr('labelId');
    $.ajax({
        type:'DELETE',
        url: '/label/item?labelId='+labelId,
        success:function (data) {
        }
    })
}
$('.delete-label').click(deleteLabel)

function getNotes() {
    var labelId = $(this).next().next().attr('labelId');
    console.log(labelId+"ggr")
    $.ajax({
        type:'GET',
        url: '/note/notesOfLabel',
        data:{'labelId':labelId},
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

$('.get-notes-of-label').click(getNotes);

function alterLabel(e) {
    var labelId = $(this).next().attr('labelId');
    $('body').attr("tempLabelId",labelId);
    $.ajax({
        type:'GET',
        url: '/label/item',
        data:{'labelId':labelId},
        success:function (data) {
            $('#alter-label-name-field').attr('value',data.labelName);
            $('#alter-label-introduction-field').text(data.labelDescription);
        }
    })
}
$('.alter-label').click(alterLabel)

$('#add-label-button').click(function () {
    var data={labelName:$('#add-label-name-field').val(),labelDescription:$('#add-label-introduction-field').val()};
    $.ajax({
        type:'POST',
        url: '/label/item',
        data:data,
        success:function (data) {
            $('#tab-label').find("div[class='bs-label-section']").append("" +
                "<div class=\"col-md-55 label-item\">\n" +
                "                                    <div class=\"thumbnail\">\n" +
                "                                        <div class=\"image view view-first\">\n" +
                "                                            <img style=\"width: 100%; display: block;\" src=\"/images/personal-center/label.png\" alt=\"image\" />\n" +
                "                                            <div class=\"mask no-caption\">\n" +
                "                                                <div class=\"tools tools-bottom\">\n" +
                "                                                    <a class=\"get-notes-of-label\" ><i class=\"fa fa-link\"></i></a>\n" +
                "                                                    <a class=\"alter-label\" data-toggle=\"modal\" data-target=\"#alter-label-modal\" role=\"button\"><i class=\"fa fa-pencil\"></i></a>\n" +
                "                                                    <a class=\"delete-label\" labelId=" + data.labelId+
                "><i class=\"fa fa-times\"></i></a>\n" +
                "                                                </div>\n" +
                "                                            </div>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"caption\">\n" +
                "                                            <p><strong>"+ data.labelName+"</strong>\n" +
                "                                            </p>\n" +
                "                                            <p>"+ data.labelDescription+"</p>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                </div>")
            $('.delete-label').click(deleteLabel)
            $('.alter-label').click(alterLabel)
            $('.get-notes-of-label').click(getNotes);
        }
    })
})

$('#alter-label-button').click(function(){
    var labelId = $('body').attr('tempLabelId');
    var data={labelId:labelId ,labelName:$('#alter-label-name-field').val(),labelDescription:$('#alter-label-introduction-field').val()};
    $.ajax({
        type:'POST',
        url: '/label/updateItem',
        data:data,
        success:function (labelId) {
            var div = $('#tab-label').find("a[labelId="+ labelId+"]").parent().parent().parent().next();
            console.log(div.attr("class"));
            div.find("p:first").html("<strong>"+data.labelName+"</strong>");
            div.find("p:last").html(data.labelDescription);
        }
    })
})

$('#search-label-button').click(function () {
    var value = $(this).parent().prev().val();
    $.ajax({
        type:'GET',
        url: '/label/items',
        data:{'labelName':value},
        success:function (items) {
            var labels = $('.bs-label-section');
            $('.label-item').remove();
            items.forEach(function (t) {
                labels.append("" +
                    "<div class=\"col-md-55 label-item\">\n" +
                    "                                    <div class=\"thumbnail\">\n" +
                    "                                        <div class=\"image view view-first\">\n" +
                    "                                            <img style=\"width: 100%; display: block;\" src=\"/images/personal-center/label.png\" alt=\"image\" />\n" +
                    "                                            <div class=\"mask no-caption\">\n" +
                    "                                                <div class=\"tools tools-bottom\">\n" +
                    "                                                    <a class=\"get-notes-of-label\" ><i class=\"fa fa-link\"></i></a>\n" +
                    "                                                    <a class=\"alter-label\" data-toggle=\"modal\" data-target=\"#alter-label-modal\" role=\"button\"><i class=\"fa fa-pencil\"></i></a>\n" +
                    "                                                    <a class=\"delete-label\" labelId=" + t.labelId+
                    "><i class=\"fa fa-times\"></i></a>\n" +
                    "                                                </div>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"caption\">\n" +
                    "                                            <p><strong>"+ t.labelName+"</strong>\n" +
                    "                                            </p>\n" +
                    "                                            <p>"+ t.labelDescription+"</p>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>")
                $('.delete-label').click(deleteLabel)
                $('.alter-label').click(alterLabel)
                $('.get-notes-of-label').click(getNotes);
            })
        }
    })
})