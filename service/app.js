
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var port = parseInt(process.env.PORT || 3000, 10);
var server = http.createServer(app);


var routes = require('./routes/index');
var post = require('./routes/post');
var get = require('./routes/get');
var compile = require('./routes/compile');
var dist = require('./routes/dist');
var dir = require('./routes/dir');
var contact = require('./routes/contact');


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


//路由
app.use('/', routes);
app.get('/post', post);
app.get('/get', get);
app.get('/compile', compile);
app.get('/dist', dist);
app.get('/dir', dir);
app.get('/contact', contact);


//启动服务器
server.listen(port);
server.on('listening', function(){
	console.log('##########################################################');
	console.log('**********************************************************');
	console.log('------server start on: ', port + ' ----------');
	console.log('**********************************************************');
	console.log('##########################################################');
});


