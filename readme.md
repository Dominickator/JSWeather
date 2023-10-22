# THIS IS A WORK IN PROGRESS CURRENTLY!

## A weather web application written in vanilla JavaScript

### This app takes advantage of the NWS (National Weather Service) free API

Planned Functions:
- [x] Search function to look up a location
- [x] Location access to the user's browser in order to use their current location
- [x] Temperature, windspeed/direction, current conditions.
- [ ] Forecasting over the next few hours/days
- [ ] Graphics to go with the current conditions?

### TO RUN:

1. Clone this repository and enter it:\
```
    git clone https://github.com/Dominickator/JSWeather.git
    cd JSWeather
```
3. Install npm if you do not already have it.
Fedora: ```sudo dnf install nodejs```\
Arch: ```sudo pacman -S nodejs```\
Ubuntu: ```sudo apt install nodejs```
4. Run ```npm install``` to install all needed dependencies.
5. Run ```node js/proxy.js```. You should see a message saying "Proxy server is running on port 3000".
6. Open the HTML file in your browser or use a live server to run it.
7. You can either allow it to access your location or you can type in a location for it to use. Please be a responsible API user and do not overload the free APIs.
