
const queryURL = 'https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200665100-61e4fd0c54b0005acf6fd8d298e2290e';

$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function (response) {
    console.log(response)

})