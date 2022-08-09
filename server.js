const express = require('express');
const server = express();
const session = require('express-session');
const port = 3000;
const path = require('path');

server.use(express.static(__dirname + '/css'));
server.use(express.json());
server.use(express.urlencoded());

const sess = {
	secret: 'kekse',
};

server.use(session(sess));

server.get('/setname', (req, res) => {
	req.session.name = req.query.name;
	res.send(`You are logged in now, ${req.session.name}!`);
});

server.get('/getname', (req, res) => {
	res.send(req.session.name || 'log in please!');
});

server.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname + '/loginForm.html'));
});

server.post('/connect', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	// res.send(username + '  ' + password);
	if (username === 'john' && password === 'doe') {
		req.session.isConnected = true;
		res.redirect('/admin');
	} else {
		req.session.isConnected = false;
		res.redirect('/login');
	}
	console.log(req.session.isConnected);
});

server.get('/admin', (req, res) => {
	if (req.session.isConnected) {
		res.sendFile(path.join(__dirname + '/admin.html'));
	} else {
		res.redirect('/login');
	}
});

server.get('/', (req, res) => {
	res.send('Hello World!');
});

server.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.send('Sission destroyed');
	});
});

server.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
