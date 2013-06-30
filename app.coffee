express = require('express')
http = require('http')
path = require('path')
app = express()

app.configure ->
	app.set 'port', process.env.PORT || 3000
	app.use express.static path.join __dirname, 'public' 

app.configure 'development', ->
	app.use express.errorHandler()
	
server = require('http').createServer(app).listen app.get('port') , ->
	console.log "Express server listening on port " + app.get 'port'	
	
counter = 0;
qrCode = require 'qrcode-npm'
io=require('socket.io').listen server, 'log level':1

io.sockets.on 'connection', (socket) ->
	counter++;
	if counter is 2
		socket.broadcast.json.emit 'connection_complete',  { connection: 'ok' }
		counter = 0
	qr = qrCode.qrcode 4, 'M'
	url = 'http://localhost:3000/controller.html'
	qr.addData(url)
	qr.make()
	imgTag = qr.createImgTag(4)
	tableTag = qr.createTableTag(4)
	socket.emit 'qrcode', { img: imgTag, url: url }
	socket.on 'direction', (data) ->
		socket.broadcast.json.emit 'direction', direction: data.direction
