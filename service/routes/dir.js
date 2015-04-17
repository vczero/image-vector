
/*
 * 描述：列目录
 * 时间：2015-04-14
 * */

var fs = require('fs');

module.exports = function(req, res){
	var dirName = req.param('dirName');
	fs.readdir('./' + dirName, function(err, files){
		if(!err){
			return res.json({
				status: 1,
				files: files
			});
		}
		return res.json({status: 0});
		
	});
};