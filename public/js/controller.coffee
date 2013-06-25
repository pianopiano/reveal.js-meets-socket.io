socket = io.connect('http://localhost:3000/')
$ =>
	$container = $('#container')
	$win = $(window)
	pos = 
		startX: 0,
		startY: 0,
		endX: 0,
		endY: 0
	
	$container
	.width($win.width())
	.height($win.height())
	.on 'touchstart mousedown', (e) ->
		e.preventDefault()
		if e.type is 'mousedown'
			pos.startX = e.pageX
			pos.startY = e.pageY
		else if e.type is 'touchstart'
			pos.startX = event.changedTouches[0].pageX
			pos.startY = event.changedTouches[0].pageY
	.on 'touchmove', (e) ->
		pos.endX = event.changedTouches[0].pageX
		pos.endY = event.changedTouches[0].pageY
	.on 'touchend mouseup', (e) ->
		if e.type == 'mouseup'
			pos.endX = e.pageX
			pos.endY = e.pageY
		ioEmit()
	
	ioEmit = ->
		_x = pos.endX - pos.startX
		_y = pos.endY - pos.startY
		x = Math.abs(_x)
		y = Math.abs(_y)
		direction = ''
		if x>y
			if _x<0
				direction = 'right'
			else
				direction = 'left'
		else 
			if _y<0
				direction = 'down'
			else
				direction = 'up'
		socket.emit 'direction', { direction: direction }
	@
	