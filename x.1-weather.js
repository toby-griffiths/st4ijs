// var darksky = require("darksky");
// var client = new darksky.Client("28b7e40da16e4216fc467b39fc6e4c9b");
// 
// 
// client.forecast('37.8267','-122.423', 
//     function(err, data) {
//         if (err) {
//             console.error(err);
//         }
//         process.stdout.write(data);
//     }
// );


var request = require("request")
var oled = require('oled-js-pi');
var font = require('oled-font-5x7');


var opts = {
  width: 128,
  height: 64,
  address: 0x3c
};

var oled = new oled(opts);


var apiKey = "28b7e40da16e4216fc467b39fc6e4c9b"; 
var latLong = "50.82747,-0.1509067"; // Brighton 
var url = "https://api.forecast.io/forecast/"+apiKey+"/"+latLong; //+body.latitude+","+body.longitude;

oled.clearDisplay(false); 
oled.setCursor(1, 1);
oled.writeString(font, 1, 'Loading...', 1, true);


request({
    url: url,
    json: true
}, function (error, response, body) {
	//console.log(error, response); 
    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
		showWeather(body); 
    }
});


function showWeather(weatherData) { 
	
	oled.clearDisplay(false); 
	var pixels = []

	oled.setCursor(1, 1);
	oled.writeString(font, 1, weatherData.minutely.summary, 1, true);
	var minutedata = weatherData.minutely.data; 
	for(var i = 0; i<minutedata.length; i++) { 
		var datum = minutedata[i]; 
		console.log(i, datum); 
		var intensity = 0; 
		if(datum.precipIntensity>0.1) intensity = map(datum.precipIntensity,0.1,0.4,0.66,1);
		else if(datum.precipIntensity>0.04)  intensity = map(datum.precipIntensity,0.04,0.1,0.33,0.66);
		else  intensity = map(datum.precipIntensity,0.0,0.04,0.0,0.33);
		pixels.push([i*2, 64 - (intensity*40), 1]);  
		console.log(intensity, datum.precipIntensity);
	}
	pixels.push([0,23,1]);
	pixels.push([0,43,1]);
	pixels.push([0,63,1]);
	pixels.push([120,23,1]);
	pixels.push([120,43,1]);
	pixels.push([120,63,1]);
	oled.drawLine(0,63,120,63,1); 
	oled.drawPixel(pixels); 
	
}

function map(v, min1, max1, min2, max2){
	return (((v-min1)/(max1-min1)) * (max2-min2) )+ min2; 
} 
// code for getting lat / long from ip address

// request({url:"http://freegeoip.net/json/", json:true}, function (error, response, body) { 
// //	console.log(error, response); 
//     if (!error && response.statusCode === 200) {
//         console.log(body) // Print the json response
// 		
// 
//     }
// 	
// });
// 
