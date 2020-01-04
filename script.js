$(document).ready(function () {
    
    const queryURL = 'https://api.ipgeolocation.io/ipgeo?apiKey=94eb77af22db448ca98c2a47921ae7af'

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        // console.log(response)
    })

});


        $(function () {
            $('input[name="birthday"]').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format('YYYY'), 10)
            }, function (start, end, label) {
                let formatedDate = $("#date").val()
                var years = moment(formatedDate).format("YYYY-MM-DD");
                console.log(years);
                // alert("You are " + years + " years old!");
            });
        });
