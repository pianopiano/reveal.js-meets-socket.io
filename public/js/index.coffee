$ =>
	initReveal = ->
		Reveal.initialize
			controls: true,
			progress: true,
			history: true,
			center: true,
			theme: Reveal.getQueryHash().theme,
			transition: Reveal.getQueryHash().transition || 'default'
	
	initSocket = ->
		socket = io.connect('http://localhost:3000/')
		socket.on 'qrcode', (data) =>
			$win = $(window)
			$qr = $('#qrcode')
			$('#qrcode').append '<p>QR コードをスマートフォンで読み込んでください。</p><br />'+data.img+'<br />'+
			'<p>URL を直接入力 : <br />'+data.url+'</p><br />'+
			'<div id="noController">このまま始める</div>'
			$('#qrcode').after data.img
			$(document).on 'click', '#noController', ->
				$qr.empty().remove()
				initReveal()
			
			$qr.width(300).css 'top': ($win.height()/2)-($qr.height()/2)-20+'px', 'left': ($win.width()/2)-($qr.width()/2)+'px'
			socket.on 'connection_complete', (data) ->
				if data.connection is 'ok'
					$qr.empty().append '<p>接続が完了しました。</p><br /><img src="images/ajax-loader.gif" />'
					$qr.css
						'top': ($win.height()/2)-($qr.height()/2)-50+'px',
						'left': ($win.width()/2)-($qr.width()/2)+'px',
						'padding-bottom': '0'
					setTimeout ->
						$qr.empty().remove()
						initReveal()
					,1000
					
		socket.on 'direction', (data) ->
			switch data.direction
				when 'up'
					Reveal.navigateUp()
				when 'down'
					Reveal.navigateDown()
				when 'left'
					Reveal.navigateLeft()
				when 'right'
					Reveal.navigateRight()
		
	initSocket()
	@