$(document).ready(function () {
    const queryURL = 'https://api.ipgeolocation.io/ipgeo?apiKey=94eb77af22db448ca98c2a47921ae7af'

    let date = year.value
    let city = 'Gilbert'
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        //console.log(response)
        
        
        
        $(function () {
            $('input[name="birthday"]').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format('YYYY'), 10)
            }, function (start, end, label) {
                let formatedDate = $("#date").val()
                var years = moment(formatedDate).format("YYYY-MM-DD");
                
                // alert("You are " + years + " years old!");
            });
        });
        
        let lat = response.latitude
        let long = response.longitude
        const coordURL = 'https://api.ipgeolocation.io/astronomy?apiKey=94eb77af22db448ca98c2a47921ae7af&lat=' + lat + '&long=' + long
        
        $.ajax({
            url: coordURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response)
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
            
            $('#date').text('On ' + date + ' the sun will rise at ' + response.sunrise + ' in ' + city)
            
        })
        
        let lattitude = response.coord.lat
        let longitude = response.coord.lon
        const uvURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=79b9010c856142d3dabc51dccb05cdb8&lat=' + lattitude + '&lon=' + longitude
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
        })
        
    })
    });
    
    
    
    