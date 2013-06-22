(function(){
	$(function(){
		var initReveal = function() {
			Reveal.initialize({
				controls: true,
				progress: true,
				history: true,
				center: true,
				theme: Reveal.getQueryHash().theme,
				transition: Reveal.getQueryHash().transition || 'default'
			});
		}
		
		var initSocket = function(){
			var socket = io.connect('http://192.168.0.3:3000/');
				socket.on('qrcode', function (data) {
					var $win = $(window);
					var $qr = $('#qrcode');
					$('#qrcode').append('<p>QR コードをスマートフォンで読み込んでください。</p><br />'+data.img+'<br />'+
											'<p>URL を直接入力 : <br />'+data.url+'</p><br />'+
											'<div id="noController">このまま始める</div>');
					$('#qr-code').after(data.img)
					$(document).on('click', '#noController', function(){
						$qr.empty().remove();
						initReveal();
					});
					
					$qr.width(300).css({'top': ($win.height()/2)-($qr.height()/2)-20+'px', 'left': ($win.width()/2)-($qr.width()/2)+'px'});
					socket.on('connection_complete', function (data) {
						if (data.connection=='ok') {
							$qr.empty().append(
								'<p>接続が完了しました。</p><br /><img src="images/ajax-loader.gif" />'
							).css({
								'top': ($win.height()/2)-($qr.height()/2)-50+'px',
								'left': ($win.width()/2)-($qr.width()/2)+'px',
								'padding-bottom': '0'
							});
							setTimeout(function() {
								$qr.empty().remove();
								initReveal();
							}, 1000)	
						}
					});
				})
				
				socket.on('direction', function (data) {
					switch(data.direction) {
						case 'up': Reveal.navigateUp(); break;
						case 'down': Reveal.navigateDown(); break;
						case 'left': Reveal.navigateLeft(); break;
						case 'right': Reveal.navigateRight(); break;
					}
				});
		}
		
		initSocket();
	})	
})();