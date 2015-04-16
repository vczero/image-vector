

;(function(exports, require){
	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	var ajax = require.ajax;
	var addEvent = require.addEvent;
	var SCALE_BIG = 1;
	var SCALE_SML = 0.25;
	
	
	if(!context){
		return;
	}
	
	//绘制多变形
	function drawPolygon(fileName, color){
		var url = 'http://127.0.0.1:3000/get?fileName=' + fileName;
		ajax({method: 'GET', url: url}, function(data){
			context.beginPath();
			if(data.status){
				var xys = data.data;
				context.strokeStyle = color; 
				context.moveTo(xys[0].x, xys[1].y);
				for(var i = 1; i < xys.length; i++){
					context.lineTo(xys[i].x, xys[i].y);
				}
				context.stroke();
				context.fillStyle = color;
				context.fill();
			}
			context.closePath();
		});
	}
	
	//绘制线条
	function drawLine(fileName, color){
		
	}
	
	//绘制圆
	function drawCircle(fileName, color){
		
	}
	
	//颜色对应表
	var COLOR_LIST = {
		bodybg: '#63CEF6',
		dupi: '#FFF',
		yanjing_hei: '#034E68',
		zuiba: '#0089B5',
		touquan_qian: '#BDF9FB',
		jiuwo_1: '#FFBFE3',
		jiuwo_2: '#FFBFE3',
		qipao_shen: '#C9E8FB'
	};
	
	
	drawPolygon('bodybg', COLOR_LIST.bodybg);
	drawPolygon('dupi', COLOR_LIST.dupi);
	drawPolygon('yanjing_hei_1', COLOR_LIST.yanjing_hei);
	drawPolygon('yanjing_hei_2', COLOR_LIST.yanjing_hei);
	drawPolygon('zuiba', COLOR_LIST.zuiba);
	drawPolygon('touquan_qian', COLOR_LIST.touquan_qian);
	drawPolygon('jiuwo_1', COLOR_LIST.jiuwo_1);
	drawPolygon('jiuwo_2', COLOR_LIST.jiuwo_2);
	drawPolygon('qipao_zuo', COLOR_LIST.qipao_shen);
	
	
	context.scale(SCALE_BIG, SCALE_BIG);
	
	
})(window, window);
