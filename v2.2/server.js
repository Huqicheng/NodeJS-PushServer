// https://blog.csdn.net/wizard_hu/article/details/50512847

// https://peihsinsu.gitbooks.io/node-js-500-samples/content/mdfiles/socket.io.html

/*
*   1. npm install socket.io
*   2. node server.js
*/



var app = require('http').createServer(handler), 
    io = require('socket.io').listen(app), 
    fs = require('fs'),
    ctrl = require("./session_controller");

SessionController = ctrl.SessionController;

app.listen(8000);
io.set('log level', 1);//将socket.io中的debug信息关闭

io.set('heartbeat timeout', 10000); 
io.set('heartbeat interval', 40000);

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

io.sockets.on('connection', function (socket) { // the actual socket callback
  console.log(socket.id);
  socket.on('chat', function (data) { // receiving chat messages
    var msg = JSON.parse(data);
    if (socket.sessionController === null) {
      // implicit login - socket can be timed out or disconnected
      socket.sessionController = new SessionController(msg.user,'chat');
      socket.sessionController.rejoin(socket, msg);
    } else {
      var reply = JSON.stringify({action: 'message', user: msg.user, msg: msg.msg });
      socket.sessionController.publish(reply);
    }
    console.log(data);
  });

  socket.on('join', function(data) {
    var msg = JSON.parse(data);
    socket.sessionController = new SessionController(msg.user,'chat');
    socket.sessionController.subscribe(socket);
    // just some logging to trace the chat data
    console.log(data);
  });

  socket.on('disconnect', function() { // disconnect from a socket - might happen quite frequently depending on network quality
    if (socket.sessionController === null) return;
    socket.sessionController.unsubscribe();
    var leaveMessage = JSON.stringify({action: 'control', user: socket.sessionController.user, msg: ' left the channel' });
    socket.sessionController.publish(leaveMessage);
    socket.sessionController.destroyRedis();
  });
});



