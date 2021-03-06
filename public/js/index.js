// Generated by CoffeeScript 1.4.0
(function() {
  var _this = this;

  $(function() {
    var initReveal, initSocket;
    initReveal = function() {
      return Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        theme: Reveal.getQueryHash().theme,
        transition: Reveal.getQueryHash().transition || 'default'
      });
    };
    initSocket = function() {
      var socket;
      socket = io.connect('http://localhost:3000/');
      socket.on('qrcode', function(data) {
        var $qr, $win;
        $win = $(window);
        $qr = $('#qrcode');
        $('#qrcode').append('<p>QR コードをスマートフォンで読み込んでください。</p><br />' + data.img + '<br />' + '<p>URL を直接入力 : <br />' + data.url + '</p><br />' + '<div id="noController">このまま始める</div>');
        $('#qrcode').after(data.img);
        $(document).on('click', '#noController', function() {
          $qr.empty().remove();
          return initReveal();
        });
        $qr.width(300).css({
          'top': ($win.height() / 2) - ($qr.height() / 2) - 20 + 'px',
          'left': ($win.width() / 2) - ($qr.width() / 2) + 'px'
        });
        return socket.on('connection_complete', function(data) {
          if (data.connection === 'ok') {
            $qr.empty().append('<p>接続が完了しました。</p><br /><img src="images/ajax-loader.gif" />');
            $qr.css({
              'top': ($win.height() / 2) - ($qr.height() / 2) - 50 + 'px',
              'left': ($win.width() / 2) - ($qr.width() / 2) + 'px',
              'padding-bottom': '0'
            });
            return setTimeout(function() {
              $qr.empty().remove();
              return initReveal();
            }, 1000);
          }
        });
      });
      return socket.on('direction', function(data) {
        switch (data.direction) {
          case 'up':
            return Reveal.navigateUp();
          case 'down':
            return Reveal.navigateDown();
          case 'left':
            return Reveal.navigateLeft();
          case 'right':
            return Reveal.navigateRight();
        }
      });
    };
    initSocket();
    return _this;
  });

}).call(this);
