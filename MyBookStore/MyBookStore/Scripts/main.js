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
    $("#add_to_fav").click(function () {
        $("#ld").css("display", "block");
        $('.fav_check').each(function () {
            var id = this.id;
            if ($("#"+id).is(":checked")) {
                $.ajax({
                    url: "/Home/Add_to_fav",
                    type: "POST",
                    data: { id: id },
                    beforeSend: function () {
                    },
                    success: function (data) {
                        
                    }
                });
            } else {
                $.ajax({
                    url: "/Home/Remove_to_fav",
                    type: "POST",
                    data: { id: id },
                    beforeSend: function () {
                    },
                    success: function (data) {
                        
                    }
                });
            }
                       
        });
        $("#ld").css("display", "none");
        window.location="/Home/ALL_CHECKBOX";
    });
});
