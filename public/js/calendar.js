$(document).ready(function () {

    $('#calendar').fullCalendar({
        eventSources: [
            {
                url: '/activities/all',
                type: 'GET'
            }
        ]
    });

});