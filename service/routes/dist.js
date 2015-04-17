

var fs = require('fs');

module.exports = function(req, res){
	var fileName = req.param('fileName');
	var errStatus = {status: 0};
	
	if(!fileName){
		return res.json(errStatus);	
	}
	
	var path = './contact/' + fileName + '.json';
	fs.readFile(path, function(err, data){
		if(!err){
			var arr = JSON.parse(data.toString());
			//TODO:Format && compare
			//第一层
			var result = {};
			for(var i in arr){
				var obj = arr[i];
				//第二层
				for(var n in obj){
					var dataXYs = obj[n];
					result[n] = [];
					//第三层
					for(var k in dataXYs){
						result[n].push(dataXYs[k].x);
						result[n].push(dataXYs[k].y);
					}
				}
			}
			//写入到压缩文件夹
			var files = fs.readdirSync('./dist/');
			var newFileName = 'dist_';
			if(files.length){
				var n = files.length;
				newFileName += (parseInt(n) + 1) + '.json';
			}else{
				newFileName += '1.json';
			}
			fs.writeFile('./dist/' + newFileName, JSON.stringify(result), function(err){
				if(!err){
					var sizeOld = fs.statSync(path).size;
					var sizeNew = fs.statSync('./dist/' + newFileName).size;
					var reObj = {
						status: 1,
						//压缩率计算
						rate: (sizeOld - sizeNew)/sizeOld,
						//新文件名
						filename: newFileName,
						//压缩结果
						data: result
					}
					return res.json(reObj);
				}
				return res.json(errStatus);
			});
		}else{
			return res.json(errStatus);
		}
	});
	
	
}
