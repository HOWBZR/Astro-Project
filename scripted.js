$(document).ready(function () {
    let button = document.querySelector('#myBtn')

    const queryURL = 'https://api.ipgeolocation.io/ipgeo?apiKey=94eb77af22db448ca98c2a47921ae7af'



    //using open weather API to input city from search field
    button.addEventListener('click', function () {
        $('#weather').empty();
        $('#trails').empty();
        let cityInput = document.querySelector('#city')
        let city = cityInput.value


        const openWeatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=79b9010c856142d3dabc51dccb05cdb8'
        $.ajax({
            url: openWeatherQueryURL,
            method: 'GET'
        }).then(function (response) {
            let lat = response.coord.lat
            let long = response.coord.lon

            // Temperature 
            let temperature = Math.abs(response.main.temp - 273) * 1.8 + 32
            let temp = temperature.toFixed(2)
            if (temp < 40) {
                let tempDisplay = '<div>'
                tempDisplay += '<p>' + 'Brrrrr! You better bring a jacket! It is going to be ' + temp + ' degrees' + '</p>'
                tempDisplay += '</div>'
                $('#weather').prepend(tempDisplay);
            }
            else if (temp > 40) {
                let tempDisplay = '<div>'
                tempDisplay += '<p>' + ' Its a perfect day for a hike at only ' + temp + ' degrees' + '</p>'
                tempDisplay += '</div>'
                $('#weather').prepend(tempDisplay);
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

                    // Sunset, << NOT >> in 12hr time.
                    let sunSet = '<div>';
                    sunSet += "<p>" + "Sunset is at " + moment(response.sunset, 'HH:mm').format('h:mm') + "pm" + '</p>'
                    sunSet += '</div>'
                    $('#weather').prepend(sunSet);
                    console.log(moment(response.sunset, 'H:mm').format('h:mm'));
                })
                $.ajax({
                    url: coordURL,
                    method: 'GET'
                }).then(function (response) {
                    // Sunrise, in 12hr time.
                    let sunRise = '<div>';
                    sunRise += "<p>" + "Sunrise is at " + moment(response.sunrise, 'H:mm').format('h:mm') + "am" + '</p>'
                    sunRise += '</div>'
                    $('#weather').prepend(sunRise);


                })

            });

            // REI API 
            const hikingProjectQueryURL = 'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + long + '&maxDistance=10&key=200665127-cd8866c72fae5750433f139006ec5b11'
            $.ajax({
                url: hikingProjectQueryURL,
                method: 'GET'
            }).then(function (response) {

                for (let i = 0; i < 5; i++) {

                    let currentTrail = response.trails[i];

                    if (currentTrail !== undefined) {

                        // This is a clean way to use the carousel and do an if/else kind of thing.
                        let slideClass = i === 0 ? "carousel-item active" : "carousel-item";
                        let trailPopulator = "<div class='" + slideClass + "'>";

                        // The image being used in the carousel.
                        // would like to find a way to keep carousel box one size and adjust images.
                        trailPopulator += "<img class='d-block img-fluid carouselImg' src='" + currentTrail.imgMedium + "'>";

                        // the rest of the trail info populating over the image
                        // In the div class, changing it to 'weather' puts the info below the photo
                        // In the div class,'carousel-caption' puts the trail info over the photo
                        trailPopulator += "<div class='carousel-caption'>";
                        trailPopulator += "<p>" + currentTrail.name + "</p>";
                        trailPopulator += "<p>" + currentTrail.location + "</p>";
                        trailPopulator += "<p>" + currentTrail.summary + "</p>";
                        trailPopulator += "<p>" + "Rating: " + currentTrail.stars + " Stars" + "</p>";
                        trailPopulator += "</div>"

                        $("#trails").append(trailPopulator);

                    }

                }
                // I'm not entirely sure if this is needed or not, but I'm too scared to mess with it.
                // Carousel took forever
                $('.carousel').carousel();

            })

        })


    })

    // The states
    const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia',
        'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
        'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

    // The states loop
    for (let i = 0; i < states.length; i++) {
        let option1 = $('<option></option>')
        option1.text(states[i])
        $('#state').append(option1)
    }

    // Buttons that switch between the input information and the results,
    //  but they do not clear the user input.
    $('#myBtn').click(function (event) {
        event.preventDefault();
        $('#jumbo').addClass("d-none");
        $('#results').removeClass("d-none");
    });

    $('#return').click(function () {
        $('#results').addClass("d-none");
        $('#jumbo').removeClass("d-none");
    });

});