
/*
 * 描述：列目录
 * 作者：王利华 
 * 邮箱：lh_wang@ctrip.com
 * 时间：2015-04-14
 * */

var fs = require('fs');

module.exports = function(req, res){
	var dirName = req.param('dirname');
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