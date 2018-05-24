// https://blog.csdn.net/wizard_hu/article/details/50512847

var app = require('http').createServer(handler), 
    io = require('socket.io').listen(app), 
    fs = require('fs')

app.listen(8080);
io.set('log level', 1);//将socket.io中的debug信息关闭

var sockets = {}

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',function (err, data) {  
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }    
    res.writeHead(200, {'Content-Type': 'text/html'});    
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
    socket[socket]

    socket.emit('connected', {});

    socket.on('login', function (data) {
      console.log(data.socket_id);

      sockets[data.socket_id] = socket;

      socket.broadcast.emit('someone_connected', {'id' : data.socket_id})
    });

    socket.on('disconnect', function(data) {
      console.log('Got disconnect!');

      delete sockets[data.id]
    });


});