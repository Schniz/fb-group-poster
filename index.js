var express = require('express');
var authenticate = require('./authenticate');

var port = process.env.PORT || 8000;
var app = express();
var USER_EMAIL = process.env.USER_EMAIL;
var USER_PASS = process.env.USER_PASS;

app.get('/', (req, res) => {
	authenticate(USER_EMAIL, USER_PASS, (err, result) => {
		res.send('authenticated!');
		result.kill();
	});
});

app.listen(port, () => {
	console.log(`Listening on ${port}. Ctrl-C to stop.`);
});
