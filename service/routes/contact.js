
/*
 * 描述：数据合并
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
			var name = names[i].split('.')[0];
			var obj = {};
			obj[name] = JSON.parse(data.toString());
			content.push(obj);
			
		}
		var files = fs.readdirSync(pathContact);
		var newName = 'contact_';
		if(files.length){
			var n = files.length;
			newName += (parseInt(n) + 1) + '.json';
		}else{
			newName += '1.json'; 
		}
		var str = JSON.stringify(content);
		fs.writeFile(pathContact + newName, str, function(err){
			if(!err)
				res.json({status: 1});	
		});
	}catch(e){
		res.json({status: 0});	
	}
	
}
