function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location) {
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);
            console.log(location.coords.accuracy);
            getWeather(location.coords.latitude, location.coords.longitude);
          });
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function geocode(){
  const inputElement = document.getElementById("searchbox");
  const address = inputElement.value;
  inputElement.value = '';

  const proxyUrl = "http://localhost:3000/search"; // Use your server's URL

  const params = new URLSearchParams({
    q: address,
    format: "json",
    limit: 1,
  });

  const requestUrl = `${proxyUrl}?${params.toString()}`;

  // Make the API request using the fetch function
  fetch(requestUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data.length > 0) {
      const result = data[0];
      console.log(`Latitude: ${result.lat}`);
      console.log(`Longitude: ${result.lon}`);
      getWeather(result.lat, result.lon);
    } else {
      console.error("No results found for the provided address.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function getWeather(latitude, longitude) {
  let globalForecastHourly = "";
  let globalForecast = "";

  if (latitude === 0 && longitude === 0) {
    alert("!!ERROR!!");
    return -1;
  }

  const fetchURL = `https://api.weather.gov/points/${latitude},${longitude}`;

  fetch(fetchURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data.properties) {
        globalForecast = data.properties.forecast;
        globalForecastHourly = data.properties.forecastHourly;
        const city = data.properties.relativeLocation.properties.city;
        const state = data.properties.relativeLocation.properties.state;

        let csheader = document.getElementById("csheader");
        csheader.innerText = `${city}, ${state}`;

        fetch(globalForecastHourly)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (data.properties && data.properties.periods && data.properties.periods.length > 0) {
            // Access temperature data from the first period (you can choose the period you want)
            const temperature = data.properties.periods[0].temperature;
            const dewpoint = (data.properties.periods[0].dewpoint.value * 9/5) + 32;
            const humidity = data.properties.periods[0].relativeHumidity.value;
            const precipitation = data.properties.periods[0].probabilityOfPrecipitation.value;
            const windspeed = data.properties.periods[0].windSpeed;
            const winddirection = data.properties.periods[0].windDirection;
            const conditions = data.properties.periods[0].shortForecast;
            
            // Update the currtempheader element with the temperature
            let currtempheader = document.getElementById("currtempheader");
            currtempheader.innerText = `${temperature}°F`;
            let currdewpoint = document.getElementById("currdewpoint");
            currdewpoint.innerHTML = `Dewpoint: <b>${dewpoint}°F</b>`;
            let currhumidity = document.getElementById("currhumidity");
            currhumidity.innerHTML = `Humidity: <b>${humidity}%</b>`;
            let currprec = document.getElementById("currprec");
            currprec.innerHTML = `Chance of Precipitation: <b>${precipitation}%</b>`;
            let currwind = document.getElementById("currwind");
            currwind.innerHTML = `Wind: <b>${windspeed} ${winddirection}</b>`;
            let currcondition = document.getElementById("currcondition");
            currcondition.innerHTML = `Current Conditions: <b>${conditions}</b>`;
          } else {
            console.error("No data found!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      } else {
        console.error("No data found!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
