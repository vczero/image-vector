

var fs = require('fs');

module.exports = function(req, res){
	var fileName = req.param('fileName');
	fs.readFile('./dist/' + fileName + '.json', function(err, data){
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