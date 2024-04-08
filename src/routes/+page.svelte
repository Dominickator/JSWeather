<script>
    import { get } from 'svelte/store';
    import '../css/page.css';

    let cityinput = '';
    let city = '';
    let state = '';

    let weatherarray = [];
    let hourlyarray = [];

    

    class WeatherInfo {
        constructor(id, time, temp, humidity, windspeed, winddirection, dewpoint, shortforecast, precipitationpercent){
            this.id = id;
            this.time = time;
            this.temp = temp;
            this.humidity = humidity;
            this.windspeed = windspeed;
            this.winddirection = winddirection;
            this.dewpoint = (dewpoint * 9/5) + 32;
            this.shortforecast = shortforecast;
            this.precipitationpercent = precipitationpercent;
        }
    }

    let weather = new WeatherInfo(0, '', '', '', '', '', '', '', '');

    async function getLocation(){
        if (typeof window !== 'undefined' && navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(location) {
                getWeather(location.coords.latitude, location.coords.longitude);
            })
        }
        else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    async function getWeather(latitude, longitude){
        try {
            const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
            const data = await response.json();
            const forecastURL = data.properties.forecast;

            // Get the city and state
            city = data.properties.relativeLocation.properties.city;
            state = data.properties.relativeLocation.properties.state;
            
            // Fetch the forecast now that we have the URL
            const forecastResponse = await fetch(forecastURL);
            const forecastData = await forecastResponse.json();
            
            // Clear previous data
            weatherarray = [];
            
            //Get the future forecast, only want every other period because we want the day.
            for(let i = 0; i < 14; i++){
                const id = i;
                const time = forecastData.properties.periods[i].name;
                const temp = forecastData.properties.periods[i].temperature;
                const humidity = forecastData.properties.periods[i].relativeHumidity.value;
                const windspeed = forecastData.properties.periods[i].windSpeed;
                const winddirection = forecastData.properties.periods[i].windDirection;
                const dewpoint = forecastData.properties.periods[i].dewpoint.value;
                const shortforecast = forecastData.properties.periods[i].shortForecast;
                const precipitationpercent = forecastData.properties.periods[i].probabilityOfPrecipitation.value ? forecastData.properties.periods[i].probabilityOfPrecipitation.value : 0;
                weatherarray.push(new WeatherInfo(id, time, temp, humidity, windspeed, winddirection, dewpoint, shortforecast, precipitationpercent));
            }

            //Get the hourly forecast
            const hourlyResponse = await fetch(`${forecastURL}/hourly`);
            const hourlyData = await hourlyResponse.json();

            hourlyarray = [];

            let currentweatherinfo = new WeatherInfo(0, '', hourlyData.properties.periods[0].temperature, hourlyData.properties.periods[0].relativeHumidity.value, hourlyData.properties.periods[0].windSpeed, hourlyData.properties.periods[0].windDirection, hourlyData.properties.periods[0].dewpoint.value, hourlyData.properties.periods[0].shortForecast, hourlyData.properties.periods[0].probabilityOfPrecipitation.value);
            weather = currentweatherinfo;

            //Get the hourly forecast for the next 12 hours
            for (let i = 1; i < 23; i++) {
                const id = i;
                const currentHour = new Date();
                currentHour.setHours(currentHour.getHours() + i);
                let time = currentHour.getHours();
                if(time > 12){
                    time = time - 12;
                    time = time + " PM";
                } 
                else if(time == 0) {
                    time = "12 AM";
                }
                else if(time == 12) {
                    time = "12 PM";
                }
                else {
                    time = time + " AM";
                }
                const temp = hourlyData.properties.periods[i].temperature;
                const humidity = hourlyData.properties.periods[i].relativeHumidity.value;
                const windspeed = hourlyData.properties.periods[i].windSpeed;
                const winddirection = hourlyData.properties.periods[i].windDirection;
                const dewpoint = hourlyData.properties.periods[i].dewpoint.value;
                const shortforecast = hourlyData.properties.periods[i].shortForecast;
                const precipitationpercent = hourlyData.properties.periods[i].probabilityOfPrecipitation.value ? hourlyData.properties.periods[i].probabilityOfPrecipitation.value : 0;
                hourlyarray.push(new WeatherInfo(id, time, temp, humidity, windspeed, winddirection, dewpoint, shortforecast, precipitationpercent));
            }

        } catch (err) {
            console.log(err);
        }
    }

    getLocation();
</script>

{#if weatherarray.length > 0}
    <div class="container">
        <div class="half-container">
            <h2>{city}, {state}</h2>
            <h1>{weather.temp}°F</h1>
            <h2>{weather.shortforecast}</h2>
        </div>
        <div class="half-container">
            <h2>Dewpoint: {weather.dewpoint}°F</h2>
            <h2>Humidity: {weather.humidity}%</h2>
            <h2>Wind: {weather.windspeed} {weather.winddirection}</h2>
            <h2>{weather.precipitationpercent}% chance of precipitation</h2>
        </div>
    </div>

    <div class="container" style="flex-direction: column;">
        <h1 style="font-size: 2.2rem; margin: 1rem">Future Forecast</h1>
        <div class="carousel">
            {#each weatherarray as weather, index (weather.id)}
                <div class="box">
                    <h2>{weather.time}</h2>
                    <h2>{weather.temp}°F</h2>
                    <h2>{weather.shortforecast.split(' ')[0] === 'Showers' ? weather.shortforecast.split(' ')[0] : weather.shortforecast.split(' ').slice(0, 2).join(' ')}</h2>
                    <h3>{weather.precipitationpercent}% chance of precipitation</h3>
                </div>
            {/each}
        </div>
    </div>

    <div class="container" style="flex-direction: column;">
        <h1 style="font-size: 2.2rem; margin: 1rem">Hourly Forecast</h1>
        <div class="carousel">
            {#each hourlyarray as hour (hour.id)}
                <div class="box">
                    <h2>{hour.time}</h2>
                    <h2>{hour.temp}°F</h2>
                    <h2>{hour.shortforecast}</h2>
                    <h3>{hour.precipitationpercent}% chance of precipitation</h3>
                </div>
            {/each}
        </div>
    </div>

{:else}
    <div class="container">
        <h1 style="font-size: 2rem;">N/A</h1>
        <h2 style="font-size: 1.5rem;">Please allow the browser to access your location in order to get the current weather.</h2>
    </div>
{/if}