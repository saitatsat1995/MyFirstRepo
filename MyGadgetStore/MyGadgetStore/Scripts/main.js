$(document).ready(function () {
    $("#query").keyup(function () {
        var val = $(this).val();
        $.ajax({
            url: "/Home/Search_book_server",
            type: "POST",
            data: { val: val },
            success: function (data) {
                $("#search_result").fadeIn();
                $("#search_result").html();
                $("#search_result").html(data);
            }
        });
    });
    $("#search_result").on("click", ".search_data", function () {
        var val = $(this).text();
        dataSet = val;
        $("#query").val(val);
        $("#search_result").fadeOut();
        check = true;
    });
    $(document).mouseup(function (e) {

        var container = $("#search_result");

        if (!container.is(e.target) && container.has(e.target).length === 0) {

            container.fadeOut();

        }
    });
});
