
/*
 * 描述：将数据转化为可用的json
 * 作者：王利华 
 * 邮箱：lh_wang@ctrip.com
 * 时间：2015-04-14
 * */

var fs = require('fs');
var parseData = function(data){
	var strs = (data.toString()).split('\r\n');
	var data = [];
	for(var i = 0; i < strs.length; i++){
		var xys = strs[i].split('\t');
		var xy = {
			x: xys[0],
			y: xys[1]
		};
		if((i + 1) !== strs.length)
			data.push(xy);
	}
	var obj = {
		status: 1,
		data: data
	};
	return obj;
};

module.exports = function(req, res){
	var fileNames = req.param('fileNames');
	var isMany = req.param('isMany');
	var pathData = '';
	var pathJSON = '';
	
	//单文件处理
	if(!isMany){
		pathData = './data/' + fileNames;
		pathJSON = './json/' + fileNames + '.json';
		fs.readFile(pathData, function(err, data){
			var obj = parseData(data);
			fs.writeFile(pathJSON, JSON.stringify(obj), function(err){
				if(!err)
					return res.json(obj);
				else
				 	return res.json({status: 0});
			});	
		});	
	}else{//多文件处理
		var names = fileNames.split('@');
		try{
			for(var i in names){
				var path_Data = './data/' +  names[i];
				var path_JSON = './json/' + names[i] + '.json';
				var content = fs.readFileSync(path_Data);

				fs.writeFileSync(path_JSON, JSON.stringify(parseData(content)));
			}
			res.json({status: 1});
		}catch(e){
			res.json({status: 0});	
		}
	}
}
