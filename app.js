var express = require('express'),
	http = require('http'),
	path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

var server=require('http').createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
var counter = 0;
var qrCode = require('qrcode-npm');
var io=require('socket.io').listen(server, {'log level':1});
io.sockets.on('connection', function (socket) {
counter++;
if (counter==2) {
	socket.broadcast.json.emit('connection_complete', { connection: 'ok' });
	counter = 0;
}
var qr = qrCode.qrcode(4, 'M');
var url = 'http://localhost:3000'+'/controller.html';
qr.addData(url);
qr.make();

var imgTag = qr.createImgTag(4);
var tableTag = qr.createTableTag(4);
socket.emit('qrcode', { img: imgTag, url: url });
  socket.on('direction', function (data) {
    socket.broadcast.json.emit('direction', { direction: data.direction });
  });
});