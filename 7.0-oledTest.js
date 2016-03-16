var oled = require('oled-js-pi');

var opts = {
  width: 128,
  height: 64,
  address: 0x3c
};

var oled = new oled(opts);



//oled.turnOnDisplay();
oled.clearDisplay(true); 

var particles = []; 
	 
setInterval(loop, 1000/30); // 30 fps


function loop() { 


	var p = {x : 64, 
		y : 32, 
		xVel :random(-2,2), 
		yVel :random(-2,2)};


	//if(particles.length<10) 
	particles.push(p);
	if(particles.length>15) {
		p = particles.shift(); 
		oled.drawPixel([p.x,p.y,0], false);
	
	}
	for(var i = 0; i<particles.length; i++) { 
			var p = particles[i]; 
		with(p) { 
			oled.drawPixel([x,y,0], false);
			x+=xVel; 
			y+=yVel;  
			
			if(x>=127){
				x = 127;  
				xVel*=-1; 
			} else if(x<=0) { 
				x = 0; 
				xVel*=-1; 
			}
			if(y>=63) {
			 	y=63; 
				yVel*=-1; 
			}else if(y<=0) { 
				y=0;
				yVel*=-1; 
			} 
			oled.drawPixel([x,y,1], false); 
				
		}
	}
	//oled.fillRect(x, 1, 10, 10, 1);
	//x++;
	oled.update2();
}

function random(min, max) { 
	return Math.random() * (max-min) + min; 
	
	
}