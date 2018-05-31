## Push Server Version 2.0

#### 1. Requirements

#### 1.1 install redis server
https://redis.io

#### 1.2 install js modules
```
    npm install socket.io
    npm install redis
```

#### 1.3 install nginx
```
    for mac os, 
      1. install brew: 
          ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
      2. install nginx
          brew install nginx
      3. configure nginx
          cd /usr/local/etc/nginx
          sudo vim nginx.conf
          for nginx.conf, replace the configuration with nginx.conf in v2.1 folder
```

#### 2. run the demo

1. In terminal 1, run 'node server.js' (port 8000).
2. In another terminal 2, run 'node server_2.js' (port 7999).
3. run nginx with the nginx.conf configuration using command "sudo nginx"
4. enter "localhost:80" to connect.

#### 3. the next step

1. Using the cluster module to build the nodejs cluster on one machine (as v2.2)


## References
[How to configure nginx for socket.io](https://stackoverflow.com/questions/19236006/how-to-get-socket-io-example-working-with-nginx-reverse-proxy-and-https)
