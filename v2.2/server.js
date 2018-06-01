// https://blog.csdn.net/wizard_hu/article/details/50512847

// https://peihsinsu.gitbooks.io/node-js-500-samples/content/mdfiles/socket.io.html

// https://vsaravagi.wordpress.com/2015/08/24/using-sticky-session-with-socket-io-and-nodejs/

// http://maxprog.net.pl/wp-content/uploads/2017/05/Screen-Shot-2017-05-03-at-19.36.46.png

// https://my.oschina.net/u/750011/blog/332846
/*
*   1. npm install socket.io
#   2. npm install sticky-session
*   3. node server.js
*   
*/



let cluster = require('cluster'),
    os = require('os');

var sticky = require('sticky-session');




server = function(){

  let app = require('http').createServer(handler), 
      io = require('socket.io').listen(app), 
      fs = require('fs'),
      ctrl = require("./session_controller"),
      SessionController = ctrl.SessionController;
 

  io.set('heartbeat timeout', 10000); 
  io.set('heartbeat interval', 40000);
  
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
    console.log('Socket ' + socket.id +' connected. Worker ' + cluster.worker.id);
    socket.on('chat', function (data) { // receiving chat messages
      var msg = JSON.parse(data);
      console.log(data);
      if (socket.sessionController == null) {
        // implicit login - socket can be timed out or disconnected
        socket.sessionController = new SessionController(msg.user,'chat');
        socket.sessionController.rejoin(socket, msg);
      } else {
        var reply = JSON.stringify({action: 'message', user: msg.user, msg: msg.msg });
        socket.sessionController.publish(reply);
      }
      
    });

    socket.on('join', function(data) {
      var msg = JSON.parse(data);
      socket.sessionController = new SessionController(msg.user,'chat');
      socket.sessionController.subscribe(socket);
      // just some logging to trace the chat data
      console.log(data);
    });

    socket.on('disconnect', function() { // disconnect from a socket - might happen quite frequently depending on network quality
      if (socket.sessionController == null) return;
      socket.sessionController.unsubscribe();
      var leaveMessage = JSON.stringify({action: 'control', user: socket.sessionController.user, msg: ' left the channel' });
      socket.sessionController.publish(leaveMessage);
      socket.sessionController.destroyRedis();
    });
  });
  return app;
}


let port = 8000;
let server_ = server();

// using sticky to ensure that the connection from the same ip will be connected to the same worker

if (!sticky.listen(server_, port)){
    // master
    server_.once("listening", function() {
      console.log('server started on 8000 port.');
    });

    if(cluster.isMaster){
      console.log("Master Server started on port " + port)
    }
}else{
  console.log("Worker " + cluster.worker.id + "is working" );
}










