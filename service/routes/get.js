
/*
 * 描述：读取json文件的json对象, 这里因为实时读取建议不使用require加载
 * 时间：2015-04-14
 * */

var fs = require('fs');

module.exports = function(req, res){
	var dirName = req.param('dirName');
	var fileName = req.param('fileName');
	var errStatus = {status: 0};
	
	if(!dirName || !fileName){
		return res.json(err);
	}
	
	var path = './' + dirName + '/' + fileName + '.json';
 	
	fs.readFile(path, function(err, data){
		try{
			var reObj = null;
			var obj = JSON.parse(data.toString());
			reObj = {
				status: 1,
				data: obj
			}
		}catch(e){
			reObj = null;
		}
	
		if(!err && obj){
			return res.json(reObj);
		}else{
			return res.json(errStatus);
		}
	});	
};
