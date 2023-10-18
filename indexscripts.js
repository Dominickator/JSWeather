function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            {
               enableHighAccuracy: true,
               timeout: 5000,
               maximumAge: 0
            });
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}