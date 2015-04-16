
/*
 * 描述：读取json文件的json对象, 这里因为实时读取建议不使用require加载
 * 作者：王利华 
 * 邮箱：lh_wang@ctrip.com
 * 时间：2015-04-14
 * */

var fs = require('fs');

module.exports = function(req, res){
	var fileName = req.param('fileName');
	fs.readFile('./json/' + fileName + '.json', function(err, data){
		try{
			var obj = JSON.parse(data.toString());
		}catch(e){
			obj = null;
		}
	
		if(!err && obj)
			res.json(obj);
		else	
			res.json({status: 0});
	});	
};
