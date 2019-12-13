
var city = $(".city")
var temperature = $(".temperature");
var humidity = $(".humidity")
var windSpeed = $(".wind-speed");
var uvIndex = $(".uv-index");
var inputText = $(".input-text")
var searchButton = $(".search-button")
var cityList = []

function oneDay() {
  var citys = $(this).attr("data-name")
  var APIKey = "aa5de4428e44b6b7f439fdbfbcc1782e";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citys + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {

      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      city.html(response.name)
      temperature.text("Temperature (F) : " + tempF.toFixed(1))
      humidity.text("Humidity: " + response.main.humidity)
      windSpeed.text("Wind Speed: " + response.wind.speed)
      var lat = response.coord.lat
      var lon = response.coord.lon
      uvIn(APIKey, lat, lon)
    });
}
function uvIn(APIKey, lat, lon, ) {
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      uvIndex.text(" UV index : " + response.value)

    });
}
function fiveDays() {
  var citys = $(this).attr("data-name")
  var APIKey = "aa5de4428e44b6b7f439fdbfbcc1782e";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citys + "&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      $(".forecast").empty();
      var items = 39

      for (var i = 0; i < items; i++) {
        

        if (response.list[i].dt_txt.indexOf("03:00:00") !== -1) {
          
          // console.log(response.list[i].main.temp)
          var tempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
          // console.log(tempF);
          var date = response.list[0].dt_txt;
          date = moment.parseZone(date).format('MMM Do YYYY');
          var container=$("<div>")
          container.addClass("container")
          var dayOfWeek = $("<h2>")
          dayOfWeek.html(date)
          var temperature = $("<div>")
          temperature.text("Temperature (F) : " + tempF.toFixed(1))
          var humidity = $("<div>")
          humidity.text("Humidity: " + response.list[i].main.humidity)
          container.append(dayOfWeek,temperature, humidity)
          
          $(".forecast").append(container)
          // console.log(response.list[i].dt_txt[3])



        }
      }
    });
}

function pageButtons() {
  $(".buttons-here").empty();
  for (var i = 0; i < cityList.length; i++) {
    var mkBtn = $("<button>");
    mkBtn.addClass("button");

    mkBtn.attr("data-name", cityList[i]);
    mkBtn.text(cityList[i]);
    $(".buttons-here").append(mkBtn);
  }
}

searchButton.on("click", function (event) {
  event.preventDefault();
  var typedCity = inputText.val().trim()
  inputText.val("")
  
  cityList.push(typedCity)
  pageButtons()
})

$(document).on("click", ".button", oneDay);
$(document).on("click", ".button", fiveDays);
pageButtons()
fiveDays()