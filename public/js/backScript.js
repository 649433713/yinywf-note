$('#search-user-button').click(function () {
    var searchInfo = $(this).parent().prev().val();
    $.ajax({
        type:'GET',
        url: '/back/users',
        data:{'username':searchInfo},
        success:function (items) {
            var list = $('.innerBigBlock');
            $('.userItem').remove();
            items.forEach(function (t) {
                list.append("<div class=\"row listBlock userItem\">\n" +
                    "                            <div class=\"col-md-12\">\n" +
                    "                                <div class=\"row\">\n" +
                    "                                    <div class=\"col-md-1 portraitBlock\">\n" +
                    "                                        <img src=\"https://cn-ali.muscache.com/im/pictures/user/9a837bb7-834d-4517-85da-11abfdad748b.jpg?aki_policy=profile_x_medium\" width=\"58px\" height=\"58px\" style=\"margin-left: -16px; padding: 1px 2px 3px; border-radius: 6px\">\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"col-md-2\">\n" +
                    "                                        <div class=\"row\">\n" +
                    "                                            <h4>"+ t.username +"</h4>\n" +
                    "                                            <h6>邮箱："+ t.email+ "  电话："+ t.phone +"</h6>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"col-md-3 col-md-offset-6 buttonBlock\">\n" +
                    "                                        <div class=\"row text-center\">\n" +
                    "                                            <div class=\"col-md-6\">\n" +
                    "                                                <button type=\"button\" class=\"btn btn-primary goToMainPageButton\">查看信息</button>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"col-md-6\">\n" +
                    "                                                <button type=\"button\" class=\"btn btn-danger delete-user-button\" userId='"+ t.userId+" '  >删除用户</button>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>");

                $('.delete-user-button').click(deleteUser);
            })
        }
    })
})
$('.delete-user-button').click(deleteUser);
function deleteUser() {
    var userId = $(this).attr('userId');
    alert("当前用户ID" + userId);
}