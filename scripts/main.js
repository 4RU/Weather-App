var locationElement = document.getElementById('location');
var tempWrap = document.getElementById('tempwrap');
var weatherElement = document.getElementById('weather');
var container = document.getElementById('container');
var wetemp = document.getElementById('wetemp');
var slidingbg = document.getElementById('slidingbg');
var lat, lon;

function getLocation () {
  if (!navigator.geolocation) {
    locationElement.textContent = 'Geolocation is not supported by your browser';
  }
  function success (position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    getWeather(lat, lon);
  }
  function error () {
    locationElement.textContent = 'Unable to retrieve your location';
  }
  locationElement.textContent = 'Locating...';
  navigator.geolocation.getCurrentPosition(success, error);
}

function getWeather(lat, lon) {
  var endpoint = `https://fcc-weather-api.glitch.me/api/current?lon=${lon}&lat=${lat}`;
  var request = new XMLHttpRequest();

  request.open('GET', endpoint, true);
  request.onload = function () {
    var data = JSON.parse(this.response);
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    var temp = Math.round(data.main.temp);
    tempWrap.innerHTML = `<span class="celsiustemp" id="temp">${temp}</span> <span id="celsius" onclick="toCelsius()">°C</span> | <span id="fahrenheit" onclick="toFahrenheit()">°F</span>`;
    var fahrenheit = document.getElementById('fahrenheit');
    fahrenheit.style.color = '#000'
    weatherElement.textContent = data.weather[0].description;
    var weather = data.weather[0].main.toLowerCase().replace(" ", "-");
    // var i = document.createElement('i');
    // i.className = 'wi' + ` wi-${weather}`;
    // i.className = weather;
    var icon = document.createElement('img');
    var iconsrc = `img/${weather}.svg`;
    icon.setAttribute('src', iconsrc);
    icon.className = 'icon';
    container.className = `${weather}bg`;
    wetemp.insertBefore(icon, wetemp.childNodes[0]);
    slidingbg.style.display = 'none';
  };
  request.send();
}

function toFahrenheit () {
  var celsius = document.getElementById('celsius');
  var fahrenheit = document.getElementById('fahrenheit');
  var temp = document.getElementById('temp');
  if (temp.classList.contains('fahrenheittemp')) {
    return;
  }
  var fahrenheittemp = Math.round(temp.innerHTML * 9/5 + 32);
  fahrenheit.style.color = '#FFF';
  celsius.style.color = '#000';
  temp.innerHTML = fahrenheittemp;
  celsius.classList.remove('selected');
  fahrenheit.className += ' selected';
  temp.classList.remove('celsiustemp');
  temp.className += ' fahrenheittemp';
}

function toCelsius () {
  var celsius = document.getElementById('celsius');
  var fahrenheit = document.getElementById('fahrenheit');
  var temp = document.getElementById('temp');
  if (temp.classList.contains('celsiustemp')) {
    return;
  }
  var celsiustemp = Math.round((temp.innerHTML - 32) * 5/9);
  fahrenheit.style.color = '#000';
  celsius.style.color = '#FFF';
  temp.innerHTML = celsiustemp;
  fahrenheit.classList.remove('selected');
  celsius.className += ' selected';
  temp.classList.remove('fahrenheittemp');
  temp.className += ' celsiustemp';
}

getLocation();
