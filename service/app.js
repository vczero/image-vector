
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var port = parseInt(process.env.PORT || 3000, 10);
var server = http.createServer(app);
var routes = require('./routes/routes');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', port);


//中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By","3.2.1");
    if(req.method === "OPTIONS"){
    		 res.send(200);
    }else{
    		next();
    }
});

routes(app);

//启动服务器
server.listen(port);
server.on('listening', function(){
	console.log('##########################################################');
	console.log('**********************************************************');
	console.log('------server start on: ', port + ' ----------');
	console.log('**********************************************************');
	console.log('##########################################################');
});


