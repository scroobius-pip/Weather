var temp = "";
var celsius = "";
var fahrenheit = "";
var humidity = "";
var windspeed = "";
var winddirection = "";
var timezone = "";
var day = "";
var month = "";
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var icon = "";







$(document).ready(function () {
    $.ajax({
        type: 'POST'
        , url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC6aog_fgZuyfvyHwX35CM5OjyM_Fen5Z8' //requesting longitude and latitude from google api
            
        , success: function (data) {
            var long = data.location.lng;
            var lat = data.location.lat;
            getWeather(long, lat);
        }
        , datatype: 'json'
        , error: function (err) {
            alert("Could not get coordinates");
        }
    });
});


//requesting weather from forecast.io api
var getWeather = function (long, lat) {
    var url = "https://api.forecast.io/forecast/02a90a53f4705dc5e5b54f8cda15d805/";
    url += lat + "," + long;
    //$(".location").text(url);
    $.ajax({
        url: url
        , dataType: "jsonp"
        , success: function (data) {

            fahrenheit = Math.round(data.currently.temperature);
            temp = fahrenheit;
            toCelsius(fahrenheit);
            humidity = data.currently.humidity;
            windspeed = data.currently.windSpeed;
            winddirection = data.currently.windBearing;
            timezone = data.timezone;
            icon = data.currently.icon;
            setValues();
            setTemp();
            getDay();
            getMonth();
            setWinddirection();
            changeWeatherIcon(iconChooser(icon));


        }
        , error: function (err) {
            console.log("Could not get forecast");
        }
    });

}


//making unit div clickable to change the temperature units
$(document).on('click', '.unit', function () {

    //if the unit is celsius when click change to fahrenheit and vice-versa
    if ($(".unit").text() == "F") {

        temp = celsius;
        setTemp();
        $(".unit").text("C");
    } else if ($(".unit").text() == "C") {

        temp = fahrenheit;
        setTemp();
        $(".unit").text("F");
    }

});


// the setvalues function changes the Dom to corresponding field values
var setValues = function () {

    $(".humidity-value").text(humidity);
    $(".wind-speed-value").text(windspeed);
    $(".location").text(timezone);
}


// changes Dom to temperature value
var setTemp = function () {
    $(".value").text(temp);
}


//for converting fahrenheit to celsius
var toCelsius = function (fahrenheit) {
    celsius = Math.round((fahrenheit - 32) * 0.5556);

}

// changes dom to day value
var setDay = function () {
    $(".day").text(day);
}

//gets current day which is in numbers and set public day variable to words
var getDay = function () {
    switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
    }

    setDay();



}


//changes dom to month variable
var setMonth = function () {
    $(".date").text(month);
}

//gets current month and sets month variable
var getMonth = function () {
    var d = new Date();
    month = d.getDate();
    month += " ";
    month += monthNames[d.getMonth()];
    setMonth();
}


//changes dom to winddirection variable
var setWinddirection = function () {
    winddirection = degToCard(winddirection);
    $(".wind-direction-value").text(winddirection);
}

//Degrees to Cardinal point in words
var degToCard = function (deg) {
    if (deg > 11.25 && deg < 33.75) {
        return "NNE";
    } else if (deg > 33.75 && deg < 56.25) {
        return "ENE";
    } else if (deg > 56.25 && deg < 78.75) {
        return "E";
    } else if (deg > 78.75 && deg < 101.25) {
        return "ESE";
    } else if (deg > 101.25 && deg < 123.75) {
        return "ESE";
    } else if (deg > 123.75 && deg < 146.25) {
        return "SE";
    } else if (deg > 146.25 && deg < 168.75) {
        return "SSE";
    } else if (deg > 168.75 && deg < 191.25) {
        return "S";
    } else if (deg > 191.25 && deg < 213.75) {
        return "SSW";
    } else if (deg > 213.75 && deg < 236.25) {
        return "SW";
    } else if (deg > 236.25 && deg < 258.75) {
        return "WSW";
    } else if (deg > 258.75 && deg < 281.25) {
        return "W";
    } else if (deg > 281.25 && deg < 303.75) {
        return "WNW";
    } else if (deg > 303.75 && deg < 326.25) {
        return "NW";
    } else if (deg > 326.25 && deg < 348.75) {
        return "NNW";
    } else {
        return "N";
    }
}

//appends generated weathericon
var changeWeatherIcon = function (t) {

    var append = "<i class=" + '"' + t + '"' + " " + "style=" + '"' + "font-size: 65px;" + '"' + "></i>"
    console.log(append);
    $(".forecast-icon").append(append);
}



var iconChooser = function (f)

{
    switch (f) {
    case 'clear-day':
        return 'wi wi-day-sunny';
        break;

    case 'clear-night':
        return 'wi wi-night-clear';
        break;

    case 'rain':
        return 'wi wi-rain';
        break;

    case 'snow':
        return 'wi wi-snow';
        break;

    case 'sleet':
        return 'wi wi-sleet';
        break;

    case 'wind':
        return 'wi wi-wind';
        break;

    case 'fog':
        return 'wi wi-fog';
        break;

    case 'cloudy':
        return 'wi wi-cloudy';
        break;

    case 'partly-cloudy-day':
        return 'wi wi-day-cloudy';
        break;

    case 'partly-cloudy-night':
        return 'wi wi-night-cloudy';
        break;

    case 'hail':
        return 'wi wi-hail';
        break;

    case 'thunderstorm':
        return 'wi wi-thunderstorm';
        break;

    case 'tornado':
        return 'wi wi-tornado';
        break;

    default:
        return 'wi wi-na';
    }

}