## NodeJS-PushServer

### v1

Objective: Implementation of a socket server running on one machine.

### v2
Objective: <br>
1. Implementation of a socket server running on multiple machines. <br>
2. Clients connected to different servers can communicate with each other. <br>

#### v2.0
Solution: Using ONE Redis Server to implement the Pub/Sub pattern.

#### v2.1 

Using Nginx to do Reverse Proxy.

#### v2.2

Using cluster module to build a nodejs cluster on one machine (running on different core of the cpu).

#### Reference
[redis master & slave](https://blog.csdn.net/RobertoHuang/article/details/70766809)
[nodejs + cluster](http://blog.fens.me/nodejs-core-cluster/)
