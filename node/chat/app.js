var http = require('http');
var fs = require('fs');
var io = require('socket.io');


var portNumb = 80;


var server = http.createServer(function(req, res){
    
    var URL = req.url;
    
    log(URL);
    
    if(URL == "/" || URL == "/index.html"){
        
        res.writeHead(200);
        
        fs.readFile('./index.html', function(err, data){

            if(!err){
                res.end(data);
                log('^^^ sent.');
            }else{
                log('^^^ NOT sent.'); 
                res.end("The application is unavailable at this time.");
            };
        });
    }else{
        
        res.writeHead(400);
        log('^^^ NOT sent.');
        res.end();
    };
});

server.listen(portNumb, function(err){
    
    if(!err){
        log('Listening on port: ' + portNumb);
    }else{
        log(err);  
    };
});

var someSocket = io.listen(server);

var msgLog = []; //stores previous messages

someSocket.sockets.on('connection', function(socket){
    
    log('socket connected!');
    
    
    for( var i=0; i< msgLog.length; i++){
        
        var inception = msgLog[i].time;
        var current = new Date().getTime();
        var width = current - inception;
        
        if(width < 3600000){
            
            socket.emit('message', msgLog[i].msg );
            
        }else{
            
            msgLog.splice(i, 1);
            
        };
        
    };
    
    
    socket.on('message', function(msg){
        
        socket.broadcast.emit('message', msg);
        
        msgLog.push({msg: msg, time: new Date().getTime() });
        
    });
    
});


function log(message){
    
    console.log(message);
    
};