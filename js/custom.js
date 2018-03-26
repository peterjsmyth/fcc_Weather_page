var Latitude = "" //latLong.coords.latitude;
var Longitude = "" //latLong.coords.longitude;
var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
var getWeatherURL;



$(document).ready(function() {

	function success(position) {
		Latitude = position.coords.latitude;
		Longitude = position.coords.longitude;
		getWeatherURL = 
			"https://fcc-weather-api.glitch.me/api/current?lat=" + 
			Latitude + 
			"&lon=" + 
			Longitude;
		$.getJSON(getWeatherURL, function(data) {
			if (data.name.length > 0) {
				$(".mainTitleDescription").text("This page displays the current weather for " + 
					data.name + 
					", " + 
					data.sys.country);
			} else {
				$(".locationName").text("Unknown Location");
			}

			if (data.dt != "") {
				//$(".timeD").text("Date and Time: " + String(data.dt));
				var date = new Date(data.dt*1000);
				$(".timeD").text("on " + date);
				console.log(String(data.dt));
			} else {
				$(".timeD").text("Unknown Date and Time");
			};
			var sunr = new Date(data.sys.sunrise*1000);
			var suns = new Date(data.sys.sunset*1000);
			$(".currTempText").text("Current temperature");
			$(".currTempData").text(Math.floor(data.main.temp) + String.fromCharCode(176)+"c");
			$(".currBarText").text("Barometric pressure");
			$(".currBarData").text(data.main.pressure + " hPa");
			$(".currHumidText").text("Humidity");
			$(".currHumidData").text(data.main.humidity + "%");
			$(".currSunrText").text("Sunrise");
			$(".currSunrData").text( sunr.toLocaleString());
			$(".currSunsText").text("Sunset");
			$(".currSunsData").text(suns.toLocaleString());
			
			$(".weatherDescText").text(data.weather[0].description);
			$(".weatherIcon").attr('src', data.weather[0].icon);
			console.log(data.weather[0].description);

			// using these console.log statements to write info out to the console in chrome
			console.log(data);
		});
	};

	function error(err) {
		console.warn('ERROR(${err.code}): ${err.message}');
		alert('Error!');
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	}	else {
		alert('It seems like Geolocation, \
			which is required for this page, \
			is not enabled in your browser.');
	}
});
