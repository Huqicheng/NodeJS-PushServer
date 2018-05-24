var sio  = require('socket.io');

var express = require('express');

var app  =  module.export = express.createServer();

var socketUser = {};

io  = sio.listen(app);

io.set('log level', 1);

io.sockets.on('connection', function (socket){

    io.sockets.emit('conn', { text: 'socketId:'+socket.id});

    socket.on('login', function (data,fn) {

        socketUser[socket.id] = {'c_id':data.c_id,'guid':data.guid,'price':data.price,'socket':socket};

    });

   

    socket.on('disconnect', function(){

        console.log('-链接断开['+socket.id+']-');

        delete socketUser[socket.id];

    });

    socket.on('postprice', function (data,fn) {

        console.log('-用户出价['+data.guid+']-');

        pushprice(data.guid);

    });

});