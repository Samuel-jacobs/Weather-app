window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationIcon = document.querySelector(".weather-icon");
  let tempSection = document.querySelector(".temperature-section");
  let tempSpan = document.querySelector(".temperature-section span")
  //console.log("here");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(position);
      const api = `https://api.weatherapi.com/v1/current.json?key=60be1ea662df4a8f978134648220709&q=${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {temp_c, temp_f, condition} = data.current;

          //set dom elements from the api
          
          temperatureDescription.textContent = condition.text;
          locationTimezone.textContent = data.location.tz_id;
          const currentIcon = condition.icon;
          console.log(currentIcon);
          locationIcon.src = currentIcon;
          temperatureDegree.textContent = temp_f;
          //change to ferenheit
          tempSection.addEventListener("click", () => {
            if (tempSpan.textContent === "F"){
              tempSpan.textContent = "C";
              temperatureDegree.textContent = temp_c;
            } else {
              tempSpan.textContent = "F"
              temperatureDegree.textContent = temp_f;
            }
          })
        });
    });
  } 
  
});