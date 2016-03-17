var request = require("request");
var LedControl = require("rpi-led-control"); 

var lc = new LedControl(11,10,9);

var updateInterval, nextPassTime, timeOffset; 
lc.setBrightness(0,15);
var txt = 'loading'; 
for(var i = 0; i<txt.length; i++) { 
	lc.setChar(0,7-i,txt.charAt(i));
}
var  startTime = Date.now();

// get the lat long
loadLatLong(); 


function loadLatLong() { 
	request({url:"http://freegeoip.net/json/", json:true}, function (error, response, body) { 
		console.log(error, response); 
    	if (!error && response.statusCode === 200) {
			console.log(body.latitude, body.longitude) // Print the json response
			//console.log(typeof body); 
			// TODO check lat and long exists... 
			// now load ISS data
			loadIssData(body.latitude, body.longitude); 
		} else { 
			// try again 
			setTimeout(loadLatLong, 5000); 
		}
	});
}

function loadIssData(lat, long) { 
	request({url:"http://api.open-notify.org/iss-pass.json?lat="+lat+"&lon="+long+"&n=2",json:true}, function (error, response, body) { 
		console.log(error, response); 
		if (!error && response.statusCode === 200) {
			// can also check body.message == 'success'
			timeOffset = Date.now() - (body.request.datetime*1000); 
			nextPassTime = body.response[0].risetime*1000; 
			// can get duration from body.response[0].duration;
			console.log(body.response[0].risetime); 
			//start the timer!
			
			console.log("Date.now()", Date.now());
			console.log("risetime", nextPassTime); 
			console.log("datetime", body.request.datetime); 
			console.log("timeOffset", timeOffset); 
			lc.clearDisplay(0); 
			updateInterval = setInterval(update, 10); 
		}
		
	}); 
	
}

function update() { 
	var milstopass = nextPassTime - (Date.now()+timeOffset); 
	var date = new Date(milstopass);
	var mils = date.getMilliseconds(); 
	var secs = date.getSeconds(); 
	var mins = date.getMinutes(); 
	var hours = date.getHours(); 
	//var days = date.getUTCDays(); 
	
	lc.showNumber(0,secs,0,2,true,6,true);
	lc.showNumber(0,mins,0,2,true,3,true);
	lc.showNumber(0,hours,0,2,true,0,true);
	
}



