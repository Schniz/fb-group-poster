var express = require('express');
var authenticate = require('./authenticate');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var port = process.env.PORT || 8000;
var app = express();
var USER_EMAIL = process.env.USER_EMAIL;
var USER_PASS = process.env.USER_PASS;
var SECRET = process.env.SECRET;

app.post('/', bodyParser.json(), (req, res) => {
	console.log('got body', req.body);
	var signedMessage = req.body.signed;
	try {
		var message = jwt.verify(signedMessage, SECRET);
		var msg = message.text;
		var groupId = message.groupId;

		authenticate(USER_EMAIL, USER_PASS, { msg, groupId }, (err, result) => {
			res.send({ status: 'ok' });
			setTimeout(() => {
				result.kill();
			}, 10000);
		});
	} catch(e) {
		console.log('an error occured', e);
		res.send({ status: 'error' });
	}
});

app.get('/', (req, res) => {
	res.send('ready');
});

app.listen(port, () => {
	console.log(`Listening on ${port}. Ctrl-C to stop.`);
});
