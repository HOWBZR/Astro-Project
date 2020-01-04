$(document).ready(function () {
    const queryURL = 'https://api.ipgeolocation.io/ipgeo?apiKey=94eb77af22db448ca98c2a47921ae7af'
    
    let date = year.value
    let city = 'Gilbert'

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        let lat = response.latitude
        let long = response.longitude
        const coordURL = 'https://api.ipgeolocation.io/astronomy?apiKey=94eb77af22db448ca98c2a47921ae7af&lat=' + lat + '&long=' + long

        $.ajax({
            url: coordURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response.sunrise)
            let sunrise = response.sunrise
            let sunset = response.sunset
            $('#sunrise').text('The sun will rise at ' + sunrise)
            $('#sunset').text('The sun will set at ' + sunset)

        })

        const dateURL = 'https://api.ipgeolocation.io/astronomy?apiKey=94eb77af22db448ca98c2a47921ae7af&lat=' + lat + '&long=' + long + '&date=' + date

        $.ajax({
            url: dateURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response)
            $('#date').text('On ' + date + ' the sun will rise at ' + response.sunrise + ' in ' + city)

        })

        // $(function () {
        //     $('input[name="daterange"]').daterangepicker({
        //         opens: 'left'
        //     }, function (start, end, label) {
        //         console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        //     });
        // });
        

    })


});