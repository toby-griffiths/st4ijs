var Lcd = require('lcd'),
	lcd = new Lcd({
		rs:24,
		e: 23,
		data: [22, 27, 17,4 ],
		cols: 16,
		rows: 2
	});
lcd.on('ready', function() {
	setInterval(function() {
		lcd.setCursor(0, 0);
		lcd.print("    " + (new Date().toString().substring(16, 24)));
		lcd.once('printed', function() {
			lcd.setCursor(0,1); 
			lcd.print(new Date().toString().substring(0, 16));
		});
	}, 1000);
});

// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function() {
	lcd.clear();
	lcd.close();
	process.exit();
});
