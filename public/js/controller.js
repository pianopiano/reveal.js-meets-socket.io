(function(){
	var socket = io.connect('http://192.168.0.3:3000/');
	$(function(){
		var $container = $('#container');
		var $win = $(window);
		var pos = {
			startX: 0,
			startY: 0,
			endX: 0,
			endY: 0
		}
		
		$container.width($win.width()).height($win.height())
		.on('touchstart mousedown', function(e) {
		    e.preventDefault();
		    if (e.type=='mousedown') {
			    pos.startX = e.pageX;
			    pos.startY = e.pageY;
			    console.log(pos.startX +' - '+ pos.startY)
		    } else if (e.type=='touchstart') {
		    	pos.startX = event.changedTouches[0].pageX;
		    	pos.startY = event.changedTouches[0].pageY;
		    	
		    }
		}).on('touchmove', function(){
			pos.endX = event.changedTouches[0].pageX;
		    pos.endY = event.changedTouches[0].pageY;
		}).on('touchend mouseup', function(e){
			if (e.type=='mouseup') {
			    pos.endX = e.pageX;
			    pos.endY = e.pageY;  
			}
		    ioEmit();
		})
		
		function ioEmit() {
			var _x = pos.endX - pos.startX;
			var _y = pos.endY - pos.startY;
			var x = Math.abs(_x)
			var y = Math.abs(_y);
			var direction = '';
			if (x>y) {
				if (_x<0) direction = 'right'
				else direction = 'left'
			} else {
				if (_y<0) direction = 'down'
				else direction = 'up'
			}
			socket.emit('direction', { direction: direction });
		}
	})
})()
