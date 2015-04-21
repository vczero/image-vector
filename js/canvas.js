

;(function(exports, require){
	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	var ajax = require.ajax;
	var addEvent = require.addEvent;
	
	//缩放比例
	var SCALE_BIG = 1;
	var SCALE_SML = 0.5;
	var QIPAO_COUNT = 7;
	
	if(!context){
		return;
	}
	
	if(!window.requestAnimationFrame){
		return window.requestAnimationFrame = (function(){
			window.webkitRequestAnimationFrame 
			|| window.mozRequestAnimationFrame
			|| window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame
			|| function(callback, el){
				window.setTimeout(callback, 1000/ 60);
			};
		})();
	}
   	
	
	var Vector = function(data){
		this.data = data;
		Vector._context.scale(SCALE_SML, SCALE_SML);
	};
	
	Vector._context = canvas.getContext('2d');
	//颜色对应表
	Vector._COLOR_LIST = {
		BODY: '#63CEF6',
		DUPI: '#FFF',
		EYE: '#034E68',
		ZUIBA: '#0089B5',
		TOUQUAN: '#BDF9FB',
		JIUWO: '#FFBFE3',
		QIPAO: '#5AD2FE',
		BISHANG: '#46BEEF',
		BIXIA: '#54C5F2',
		GO: '#B1DBF2'
	};
	
	Vector._drawPolygon = function(xys, color){
		context.beginPath();
		context.fillStyle = color;
		context.moveTo(xys[0], xys[1]);
		for(var i = 2; i < xys.length; i++){
			if(i % 2 !== 0){
				context.lineTo(xys[i-1], xys[i]);
			}
		}
		
		context.fill();
		context.closePath();
	};
	
	Vector._drawCircle = function(xys, color, radius){
		context.beginPath();
		context.fillStyle = color;
		context.arc(xys[0], xys[1], radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
	};
	
	Vector._drawEye = function(xys, color, radius){
		context.beginPath();
		context.fillStyle = color;
	 	context.save();
		context.scale(1.5, 2);
		context.arc(xys[0]/1.5, xys[1]/2, radius, 0, Math.PI * 2, false);
		context.restore();
		context.fill();
		context.closePath(); 
	};
	
	Vector._drawLine = function(xys, color, width){
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
	};
	
	Vector._drawText = function(text, x, y, color){
		context.beginPath();
		context.fillStyle = color;
		context.font = '20px arial,sans-serif';
		context.fillText(text, x, y)
		context.fill();
		context.closePath();
	};
	
	Vector.prototype = {
		draw: function(){
			
		}
	};
	
	var url = 'http://127.0.0.1:3000/get?dirName=dist&fileName=dist_2';
	ajax({method: 'GET', url: url}, function(data){
		data = data.data['body_br'];
		context.fillStyle = '#00B7FF';
		for(var i = 0; i < data.length; i++){
			if(i % 6 === 0){
				context.lineTo(data[i], data[i+1]);
				context.lineTo(data[i], data[i+1]);
				context.bezierCurveTo(data[i], data[i+1], data[i+2], data[i+3], data[i+4], data[i+5]);
			}
		}
		context.fill();
		
	});
	
})(window, window);
