
var city=$(".city")
var temperature=$(".temperature");
var humidity=$("humidity")
var windSpeed=$(".wind-speed");
var uvIndex=$(".uv-index");
var inputText=$(".input-text")
var searchButton=$(".search-button")
var cityList=[]





function oneDay(){
    var citys = $(this).attr("data-name")
    console.log(this);
    
    var APIKey = "aa5de4428e44b6b7f439fdbfbcc1782e";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+citys+"&appid="+APIKey;
$.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
        console.log(response);
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        temperature.text("Temperature (F) " +tempF)
        humidity.text("Humidity: " + response.main.humidity)
        windSpeed.text("Wind Speed: " + response.wind.speed)


      // Transfer content to HTML
    //   $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    //   $(".wind").text("Wind Speed: " + response.wind.speed);
    //   $(".humidity").text("Humidity: " + response.main.humidity);
    //   $(".temp").text("Temperature (F) " + response.main.temp);

    //   // Converts the temp to Kelvin with the below formula
    //   var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    //   $(".tempF").text("Temperature (Kelvin) " + tempF);

    //   // Log the data in the console as well
    //   console.log("Wind Speed: " + response.wind.speed);
    //   console.log("Humidity: " + response.main.humidity);
    //   console.log("Temperature (F): " + response.main.temp);
    });
}
function pageButtons(){
    for(var i=0;i<cityList.length;i++)
    var mkBtn = $("<button>");
          // Adding a class of movie-btn to our button
          mkBtn.addClass("city-Btn");
          // Adding a data-attribute
          console.log(cityList);
          
          mkBtn.attr("data-name", cityList[i]);
          // Providing the initial button text
          mkBtn.text(cityList[i]);
          // Adding the button to the buttons-view div
          $(".search-bar").append(mkBtn);
}

searchButton.on("click",function(event){
    event.preventDefault();
    var typedCity=inputText.val().trim()
    inputText.val("")
    city.html(typedCity)
    cityList.push(typedCity)

  pageButtons()
    
})


$(document).on("click", ".cityBtn", oneDay);