$(document).ready(function () {

    $('#calendar').fullCalendar({
        eventSources: [
            {
                url: '/activities/all',
                type: 'GET'
            }
        ]
    });

    $("form").submit((event) => {
        var data = $('form').serialize();
        $.ajax({
            type: "POST",
            data: data,
            url: "/activities/createAsync",
            success: function (data) {
                $("#createModal").modal('hide');
                var calendar = $('#calendar').fullCalendar();
                calendar.fullCalendar('refetchEvents');
            },
            error: function (xhr, status, error) {
                console.log("Failed to parse filter condition");
            }
        });
        event.preventDefault();
    });
});