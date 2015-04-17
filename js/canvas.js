

;(function(exports, require){
	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	var ajax = require.ajax;
	var addEvent = require.addEvent;
	
	//缩放比例
	var SCALE_BIG = 1;
	var SCALE_SML = 0.25;
	
	//颜色对应表
	var COLOR_LIST = {
		BODY: '#63CEF6',
		DUPI: '#FFF',
		EYE: '#034E68',
		ZUIBA: '#0089B5',
		TOUQUAN: '#BDF9FB',
		JIUWO: '#FFBFE3',
		QIPAO: '#C9E8FB',
		BISHANG: '#46BEEF',
		BIXIA: '#54C5F2',
		GO: '#B1DBF2'
	};
	
	if(!context){
		return;
	}
	
	//simple package design pattern
	function addDrawFunc(data, part, color, fun){
		var xys = data[part];
		context.beginPath();
		context.strokeStyle = color; 
		context.lineWidth = 1;
		context.fillStyle = color;
		fun(xys);
		context.stroke();
		context.fill();
		context.closePath();
	}
	//draw polygon
	function drawPolygon(data, part, color){		
		addDrawFunc(data, part, color, function(xys){
			context.moveTo(xys[0], xys[1]);
			for(var i = 2; i < xys.length; i++){
				if(i % 2 !== 0){
					context.lineTo(xys[i-1], xys[i]);
				}
			}
		});
	}
	
	//draw eye
	function drawEye(data, part, color){
		 addDrawFunc(data, part, color, function(xys){
		 	//变形
		 	context.save();
			context.scale(1.5, 2);
			context.arc(xys[0]/1.5, xys[1]/2, 6, 0, Math.PI * 2, false);
			context.restore();
		 });
	}
	
	//drawCircle
	function drawCircle(data, part, color, radius){
		 addDrawFunc(data, part, color, function(xys){
			context.arc(xys[0], xys[1], radius, 0, Math.PI * 2, false);
		 });
	}
	
	
	
	//draw line
	function drawLine(data, part, color, width){
		var xys = data[part];
		context.beginPath();
		context.strokeStyle = color; 
		context.lineWidth = width;
		context.moveTo(xys[0], xys[1]);
		for(var i = 0; i < xys.length; i++){
			if(i % 2 !== 0){
				context.lineTo(xys[i-1], xys[i]);
			}
		}
		context.stroke();
		context.closePath();
	}
	
	//draw text
	function drawText(x, y){
		context.beginPath();
		context.fillStyle = '#FFFFFF';
		context.font = '40px arial,sans-serif';
		context.fillText('go...', x, y)
		context.fill();
		context.closePath();
	}
	
	
	//绘制
	function draw(fileName){
		var url = 'http://127.0.0.1:3000/get?dirName=dist&fileName=' + fileName;
		ajax({method: 'GET', url: url}, function(data){
			data = data.data;
			drawPolygon(data, 'polygon_body', COLOR_LIST.BODY);
			drawPolygon(data, 'polygon_dupi', COLOR_LIST.DUPI);
			drawPolygon(data, 'polygon_touquan', COLOR_LIST.TOUQUAN);
			drawPolygon(data, 'polygon_jiuwo1', COLOR_LIST.JIUWO);
			drawPolygon(data, 'polygon_jiuwo2', COLOR_LIST.JIUWO);
			drawPolygon(data, 'polygon_go', COLOR_LIST.GO);
			
			drawEye(data, 'circle_eye1', COLOR_LIST.EYE);
			drawEye(data, 'circle_eye2', COLOR_LIST.EYE);
			
			drawLine(data, 'line_zui', COLOR_LIST.ZUIBA, 4);
			drawLine(data, 'line_bishang', COLOR_LIST.BISHANG, 8);
			drawLine(data, 'line_bixia', COLOR_LIST.BIXIA, 5);
			
			drawCircle(data, 'circle_qipao1', COLOR_LIST.QIPAO, 30);
			drawCircle(data, 'circle_qipao2', COLOR_LIST.QIPAO, 25);
			drawCircle(data, 'circle_qipao3', COLOR_LIST.QIPAO, 15);
			drawCircle(data, 'circle_qipao4', COLOR_LIST.QIPAO, 20);
			drawCircle(data, 'circle_qipao5', COLOR_LIST.QIPAO, 15);
			drawCircle(data, 'circle_qipao6', COLOR_LIST.QIPAO, 10);
			drawCircle(data, 'circle_qipao7', COLOR_LIST.QIPAO, 16);
		
			drawText(320, 69);
		});
	}
	
	draw('dist_3');
	context.scale(SCALE_SML, SCALE_SML);
	
	
})(window, window);
