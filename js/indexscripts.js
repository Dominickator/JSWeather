function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location) {
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);
            console.log(location.coords.accuracy);
          });
      alert("Success!");
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
  