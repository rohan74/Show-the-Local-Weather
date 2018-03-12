const address = document.getElementById('display-location');
const temperature = document.getElementById('temperature');
var lat,lon;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
        address.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = Math.ceil(position.coords.latitude);
    lon = Math.ceil(position.coords.longitude);
    getWeather(lat,lon);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            address.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            address.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            address.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            address.innerHTML = "An unknown error occurred."
            break;
    }
}

getLocation();

const weatherApi = 'https://fcc-weather-api.glitch.me/api/current?';

function getWeather(lat,lon){
    let endpoint = weatherApi + 'lat=' + lat +'&lon=' + lon;
    fetch(endpoint).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Request failed!');
    },networkError => console.log(networkError.message)
    ).then(jsonResponse);
}


function jsonResponse(res){
        console.log(res)
        let img = document.createElement('img');
        img.setAttribute('src', res.weather[0].icon);
        img.setAttribute('alt', res.weather[0].description);
        img.setAttribute("width", "300");
        img.setAttribute("height", "250");
        img.setAttribute("class", "mx-auto d-block");
        let temp = res.main.temp + ' C';
        address.append(img,temp);
}











