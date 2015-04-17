
/*
 * 路由服务列表模块 
 * 
 * 
 * */
var routes = require('./index');
var create = require('./create');
var get = require('./get');
var compile = require('./compile');
var dir = require('./dir');
var contact = require('./contact');
var dist = require('./dist');


module.exports = function(app){
	
	//index,  服务列表
	app.use('/', routes);
	
	//des:创建点文件
	//@x:横坐标
	//@y:纵坐标
	//@fileName:需要保存的文件名
	//url: domain/create?x=112&y=678&fileName=polygon_text
	app.get('/create', create);
	
	//des:获取目录下指定json文件的json对象
	//@dirName:
	//@fileName:
	//url: domain/get?dirName=json&fileName=polygon_text
	app.get('/get', get);
	
	//des:将点数据转化成可用坐标数据
	//@fileNames:当isMany传入参数为1的时候，fileNames＝file1@file2@file2的形式;否则只为fileNames=fileName
	//[@isMany]:当需要处理多文件的时候传入
	//url:domain/compile?fileNames=xxx[&isMany=1]
	app.get('/compile', compile);
	
	//des:列出目录下面的文件
	//@dirName:目录名称
	//@url:domain/dir?dirName=xxx
	app.get('/dir', dir);
	
	//des:数据合并
	//@fileNames:多文件，以@分割，例如fileNames＝file1@file2@file2
	app.get('/contact', contact);
	
	
	
	app.get('/dist', dist);
	
};
