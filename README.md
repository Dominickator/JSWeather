# Weather App - Svelte

This is a simple weather application built using the Svelte JavaScript framework. It integrates two APIs: the National Weather Service (NWS) Weather API and the MapQuest API to provide weather data based on user input locations. The app converts location strings to coordinates and retrieves weather information accordingly.

## Features
- **Location Search**: Converts user input into coordinates using the MapQuest API.
- **Weather Data**: Displays current weather conditions retrieved from the NWS Weather API.
- **API Integration**: Utilizes RESTful API calls to gather data and display it in a user-friendly interface.

## Tools Used
- **Svelte**: JavaScript framework for building the UI.
- **MapQuest API**: Used to convert location names into geographic coordinates.
- **NWS Weather API**: Used to fetch current weather conditions for the specified location.
- **Postman & Insomnia REST**: For testing and interacting with APIs during development.

## How to Use
Visit the live site here: [Weather App](https://dominickator.github.io/weather-svelte).

1. Allow the app to view your location for the weather.
2. The app converts the input to coordinates.
3. The weather data for the specified location is displayed, including temperature, conditions, and other relevant information.

## Installation Instructions
To run this app locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Dominickator/weather-svelte.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-svelte
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5000` to view the app.

## Project Overview
This project was a hands-on learning experience focused on interacting with APIs, building dynamic interfaces using Svelte, and deploying a web application using GitHub Pages. It has enhanced my understanding of API calls, data parsing, and frontend development workflows.

## License
This project is licensed under the MIT License.
