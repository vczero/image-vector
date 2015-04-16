
/*
 * 描述：数据合并
 * 作者：王利华 
 * 邮箱：lh_wang@ctrip.com
 * 时间：2015-04-14
 * */

var fs = require('fs');
module.exports = function(req, res){
	var fileNames = req.param('fileNames');
	var pathContact = './contact/';
	var names = fileNames.split('@');
	
	try{
		var content = [];
		for(var i in names){
			var pathData = './json/' + names[i];
			var data = fs.readFileSync(pathData);
			var name = names[i].split('_')[0];
			var obj = {};
			obj[name] = JSON.parse(data.toString());
			content.push(JSON.stringify(obj));
			
		}
		
		var files = fs.readdirSync(pathContact);
		var newName = 'conatct_' + (parseInt(files.length) + 1) + '.json';
		fs.appendFileSync(pathContact + newName, content);
		
		res.json({status: 1});
	}catch(e){
		res.json({status: 0});	
	}
	
}
