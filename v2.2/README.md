## Push Server Version 2.0

#### 1. Requirements

#### 1.1 install redis server
https://redis.io

#### 1.2 install js modules
```
    npm install socket.io
    npm install redis
    npm install sticky-session
```


#### 2. run the demo

1. In terminal 1, run 'node server.js' 
2. configurations <br>
```
    options = {
        workers : 2
    }
```
2. enter "localhost:8000" to connect.

#### 3. the next step

1. Merge nginx and cluster method together on multiple machines.


## References
[Usage of Sticky-Session & API](https://github.com/indutny/sticky-session)
