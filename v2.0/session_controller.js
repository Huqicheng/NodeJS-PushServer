redis = require('redis');

function SessionController (user,channel) {
	
	this.sub = redis.createClient();
	this.pub = redis.createClient();
	
	this.user = user;
	this.channel = channel;
}

SessionController.prototype.subscribe = function(socket) {
	this.sub.on('message', function(channel, message) {
		socket.emit(channel, message);
	});
	var current = this;
	this.sub.on('subscribe', function(channel, count) {
		var joinMessage = JSON.stringify({action: 'control', user: current.user, msg: ' joined the channel' });
		current.publish(joinMessage);
	});
	this.sub.subscribe(this.channel);
};

SessionController.prototype.rejoin = function(socket, message) {
	this.sub.on('message', function(channel, message) {
		socket.emit(channel, message);
	});
	var current = this;
	this.sub.on('subscribe', function(channel, count) {
		var rejoin = JSON.stringify({action: 'control', user: current.user, msg: ' rejoined the channel' });
		current.publish(rejoin);
		var reply = JSON.stringify({action: 'message', user: message.user, msg: message.msg });
		current.publish(reply);
	});
	this.sub.subscribe(this.channel);
};

SessionController.prototype.unsubscribe = function() {
	this.sub.unsubscribe(this.channel);
};

SessionController.prototype.publish = function(message) {
	this.pub.publish(this.channel, message);
};

SessionController.prototype.destroyRedis = function() {
	if (this.sub !== null) this.sub.quit();
	if (this.pub !== null) this.pub.quit();
};



exports.SessionController = SessionController