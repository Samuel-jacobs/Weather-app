# Weather App built with html, css, javascript and weatherapi Api

## My Process

This project was built to understand how to fetch data from an api. The api used is Weatherapi.com It displays the timezone, temperature and description of the weather of the user.
### The HTML 
The html consists of 2 divs. the first div contains the location in form of the timezone of the user. It uses real time location from the user's browser aided by the api. It also contained an icon that illustrates the weather condition of the user. The second div contains the temperature of the location of the user and the description of the weather. 
### The Javascript 
The whole function was written in an event listener. The event checks when the window loads. First of all two variables were defined for the longitude and latitude and named accordingly. Then all the elements were gotten from the DOM. the elements selected are the timezone, the icon, the temperature, the temperature type, the temperature description.


```js
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
  
```

an If statement is used to check if the user has enabled location in his browser using navigator.geolocation. then the current position of the user is gotten using navigator.geolocation.getCurrentPosition (this shows gets some information from  the browser including the longitude and the latitude) a property named positon is then passed into this event when the position has been received from the browser. The longitude and latitude variables are then assigned to the actual longitude and latitude of the user using position.coords.longitude/latitude. then a constant names api is declared and the url is assigned to the constant. The long and lat variables where the actual longitude and latitude are stored is passsed into api url in the position indicated in the documentation. 

then the fetch method is used to fatch the data from the api using fetch(api). Then (literally) the .then(response => {}) is used to get the response from the api and the response is returned and chaged to json using response.json. another .then is used to get the actual data from the api. link .then(data => {}) logging data to the console shows two objects names location and current with the a list of information including the temperature, the description, the timezone and other information about the weather of the current user. The data from the api is gotten using the dot notation and a new format of es6. data.current gets the object named current. the properties of the object is then stored in an object. (instead of selecting just one property, several properties are seleted from the object.) the properties gotten are the temperature (celcius, farenheit), then the condition ehich is another object with properties. 
the elements selecteed are then assigned to the different properties using element.textContent. the description and timezones and the temperature. also the weatherapi provides an icon for the different weather conditions. this ins also assigned to the src of the image which was set as the icon. 
finally, a click event listener is added to the div containing the temperature. the function declared in the event listener checks if the textcontent of the span where the temperature unit is written is exactly f. if yes then the text content is changed to C, then the value of the temperature is set to the actual unit from the api data. else the reverse is set.

### What I learned
This project taught me how to work with apis using the fetch and and the .then to get the response and the data.