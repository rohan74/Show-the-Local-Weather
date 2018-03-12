const address = document.getElementById('display-icon');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');
const displayLocation = document.getElementById('display-location');
const tempUnit =  document.getElementById('tempunit');
let lat,lon;

//use HTML5 geolocation to find coordinates
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

//fetch data from api
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

// display weather
function jsonResponse(res){
        console.log(res)
        displayLocation.innerHTML = res.name +',' + res.sys.country;
        weather.innerHTML = res.weather[0].description.toUpperCase();

        let img = document.createElement('img');
        img.setAttribute('src', res.weather[0].icon);
        img.setAttribute('alt', res.weather[0].description);
        img.setAttribute("width", "100");
        img.setAttribute("height", "100");
        img.classList.add('mx-auto','d-block');
        address.append(img);
        const temp = res.main.temp;
        tempUnit.innerHTML = 'C'
        temperature.innerHTML = temp;


        tempUnit.addEventListener('click',() => {
            if(tempUnit.innerHTML === 'C'){
                tempUnit.innerHTML = 'F';
                tempUnit.style.textDecorationLine  = 'underline';
                temperature.innerHTML = ((temp *(9/5)) + 32).toFixed(2);
            }
            else{
                tempUnit.innerHTML = 'C';
                temperature.innerHTML = temp;
            }
        })

}










