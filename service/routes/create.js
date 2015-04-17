
/*
 * 描述：向文件中追加坐标
 * 时间：2015-04-14
 * */
var fs = require('fs');

module.exports = function(req, res){
	var x = req.param('x');
	var y = req.param('y');
	var fileName = req.param('fileName');
	var str = x + '\t' + y + '\r\n';
	
	fs.appendFile('./data/' + fileName, str, function(err){
		var obj = {
			x: x,
			y: y
		}
		if(!err){
			obj.status = 1;
			res.json(obj);
		}else{
			obj.status = 0;
			res.send(obj);
		}
		console.log('saved: ', x + ' , ' + y);
	});
	
	
}
