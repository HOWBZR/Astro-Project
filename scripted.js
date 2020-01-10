$(document).ready(function () {
    let button = document.querySelector('#myBtn')

    const queryURL = 'https://api.ipgeolocation.io/ipgeo?apiKey=94eb77af22db448ca98c2a47921ae7af'



    //using open weather API to input city from search field
    button.addEventListener('click', function () {
        let cityInput = document.querySelector('#city')
        let city = cityInput.value
       

        const openWeatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=79b9010c856142d3dabc51dccb05cdb8'
        $.ajax({
            url: openWeatherQueryURL,
            method: 'GET'
        }).then(function (response) {
            let lat = response.coord.lat
            let long = response.coord.lon
            console.log(response)
        
            let temperature = Math.abs(response.main.temp - 273) * 1.8 + 32
            let temp = temperature.toFixed(2)

            if (temp < 40) {
                $('#temp').text('Brrrrr! You better bring a jacket! It is going to be ' + temp)
            }
            else if (temp > 40) {
                $('#temp').text('It is going to be a beautiful day for a hike! The temperature is perfect at ' + temp)
            }

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                
                const coordURL = 'https://api.ipgeolocation.io/astronomy?apiKey=94eb77af22db448ca98c2a47921ae7af&lat=' + lat + '&long=' + long

                $.ajax({
                    url: coordURL,
                    method: 'GET'
                }).then(function (response) {
                    let sunrise = response.sunrise
                    let sunset = response.sunset
                    $('#sunrise').text('The sun will rise at ' + sunrise)
                    $('#sunset').text('The sun will set at ' + sunset)

                })
            });
            const hikingURL = 'https://www.hikingproject.com/data/get-trails?lat='+lat+'&lon='+long+'&maxDistance=10&key=200665100-61e4fd0c54b0005acf6fd8d298e2290e'
            $.ajax({
                url: hikingURL,
                method: 'GET'
            }).then(function (response) {
                console.log(response)
                console.log(response.trails)
                console.log(response.trails[0].name)
                
            })

        })


    })
   

    const hikingProjectQueryURL = 'https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200665127-cd8866c72fae5750433f139006ec5b11'
    $.ajax({
        url: hikingProjectQueryURL,
        method: 'GET'
    }).then(function (response) {

        console.log(response.trails[0].name)
        console.log(response.trails[0].stars)
        console.log(response.trails[0].location)
        console.log(response.trails[0].imgMedium)
        console.log(response.trails[0].summary)


        // const name = $("#name").text(response.trails[0].name);
        // const stars = $("#stars").text(response.trails[0].stars);
        // const location = $("#location").text(response.trails[0].location);
        // const imgMedium = $("#img").attr("src", response.trails[0].imgMedium);
        // const summary = $("#summary").text(response.trails[0].summary);

        for (let i = 0; i < response.trails.length; i++) {
            let currentTrail = response.trails[i];
            let trailPopulator = "<div>";

            trailPopulator += "<p>" + currentTrail.name + "</p>";
            trailPopulator += "<p>" + currentTrail.stars + "</p>";
            trailPopulator += "<p>" + currentTrail.location + "</p>";
            trailPopulator += "<img src='" + currentTrail.imgMedium + "'>";
            trailPopulator += "<p>" + currentTrail.summary + "</p>";
            
            trailPopulator += "</div>"

            $("#trailHolder").append(trailPopulator);
            
            console.log(trailPopulator);

        }


        // name.append(response.name);
        // $("name").append(name);
    })



    $(function () {
        $('input[name="birthday"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 1901,
            maxYear: parseInt(moment().format('YYYY'), 10)
        }, function (start, end, label) {
            let formatedDate = $("#date").val()
            var years = moment(formatedDate).format("YYYY-MM-DD");

          
        });
    });


    const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

    for (let i = 0; i < states.length; i++) {
        let option1 = $('<option></option>')
        option1.text(states[i])
        $('#state').append(option1)
    }

// Buttons that switch between the input information and the results.

    $('#myBtn').click(function () {
        $('#jumbo').addClass("d-none");
        $('#results').removeClass("d-none");
    });

    $('#return').click(function () {
        $('#results').addClass("d-none");
        $('#jumbo').removeClass("d-none");
    });

});