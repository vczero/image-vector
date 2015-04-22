

;(function(exports, require){
	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	var ajax = require.ajax;
	var addEvent = require.addEvent;
	
	//缩放比例
	var SCALE_BIG = 1;
	var SCALE_SML = 0.25;
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
   	
	
	var Vd = function(data){
		this.data = data;
		Vd._context.scale(SCALE_SML, SCALE_SML);
	};
	
	Vd._context = canvas.getContext('2d');
	//颜色对应表
	Vd._COLORS = {
		BODY: '#76D0FB',
		DUPI: '#FFF',
		EYE: '#034E68',
		ZUIBA: '#0089B5',
		TOUQUAN: '#C4FAFA',
		JIUWO: '#FFBFE3',
		QIPAO: '#B8DCF4',
		BISHANG: '#46BEEF',
		BIXIA: '#54C5F2',
		GO: '#B1DBF2'
	};
	
	Vd._drawPolygon = function(xys, color, isRotate){
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
	
	Vd._drawCircle = function(xys, color, radius){
		context.beginPath();
		context.fillStyle = color;
		context.arc(xys[0], xys[1], radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
	};
	
	Vd._drawEye = function(xys, color, radius){
		context.beginPath();
		context.fillStyle = color;
	 	context.save();
		context.scale(1.5, 2);
		context.arc(xys[0]/1.5, xys[1]/2, radius, 0, Math.PI * 2, false);
		context.restore();
		context.fill();
		context.closePath(); 
	};
	
	Vd._drawLine = function(xys, color, width){
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
	
	Vd._drawText = function(text, x, y, color){
		context.beginPath();
		context.fillStyle = color;
		context.font = '40px arial,sans-serif';
		context.fillText(text, x, y)
		context.fill();
		context.closePath();
	};
	
	Vd.prototype = {
		draw: function(){
			var data = this.data;
			var qipaoPos = 0;
			var textPos = [320, 69];
			var tag = false;
			
			var handle = setInterval(function(){
				context.clearRect(0, 0, canvas.width, canvas.height);
				if(qipaoPos === 0){
					// nothing to do
				}else if(qipaoPos % 2 === 0){
					for(var i in data){
						for(var j in data[i]){
							if(j % 2 !== 0 && (i.indexOf('circle_qipao') > -1)){
								data[i][j] = parseInt(data[i][j]) - 15;
							}else{
								data[i][j] = parseInt(data[i][j]) + 15;
							}
						}
					}
					textPos[1] = parseInt(textPos[1]) + 23;
				}else{
					for(var i in data){
						for(var j in data[i]){
							if(j % 2 !== 0 && (i.indexOf('circle_qipao') > -1)){
								data[i][j] = parseInt(data[i][j]) + 15;
							}else{
								data[i][j] = parseInt(data[i][j]) - 15;
							}
						}
					}
					textPos[1] = parseInt(textPos[1]) - 23;
				}
				
				//第一层
				Vd._drawPolygon(data['polygon_bd1'], Vd._COLORS.BODY);
				Vd._drawPolygon(data['polygon_bd2'], Vd._COLORS.BODY);
				Vd._drawPolygon(data['polygon_bd3'], Vd._COLORS.BODY);
				Vd._drawPolygon(data['polygon_bd4'], Vd._COLORS.BODY);
				Vd._drawPolygon(data['polygon_bd5'], Vd._COLORS.BODY);
				
				Vd._drawPolygon(data['polygon_dupi'], Vd._COLORS.DUPI);
				Vd._drawPolygon(data['polygon_touquan'], Vd._COLORS.TOUQUAN);
				Vd._drawPolygon(data['polygon_jiuwo1'], Vd._COLORS.JIUWO);
				Vd._drawPolygon(data['polygon_jiuwo2'], Vd._COLORS.JIUWO);
				Vd._drawPolygon(data['polygon_go'], Vd._COLORS.GO);
				
				Vd._drawLine(data['line_zui'], Vd._COLORS.ZUIBA, 4);
				Vd._drawLine(data['line_bishang'], Vd._COLORS.BISHANG, 8);
				Vd._drawLine(data['line_bixia'], Vd._COLORS.BIXIA, 5);
				
				Vd._drawCircle(data['circle_qipao1'], Vd._COLORS.QIPAO, 30);
				Vd._drawCircle(data['circle_qipao2'], Vd._COLORS.QIPAO, 25);
				Vd._drawCircle(data['circle_qipao3'], Vd._COLORS.QIPAO, 15);
				Vd._drawCircle(data['circle_qipao4'], Vd._COLORS.QIPAO, 20);
				Vd._drawCircle(data['circle_qipao5'], Vd._COLORS.QIPAO, 15);
				Vd._drawCircle(data['circle_qipao6'], Vd._COLORS.QIPAO, 10);
				Vd._drawCircle(data['circle_qipao7'], Vd._COLORS.QIPAO, 16);
				
				Vd._drawText('go...', textPos[0], textPos[1], '#fff');
				
				//眼睛动画
				var eye_1 = [
						parseInt(data['circle_eye1'][0]),
						parseInt(data['circle_eye1'][1])
					];
					
				var eye_2 = [
					parseInt(data['circle_eye2'][0]),
					parseInt(data['circle_eye2'][1])
				];
				if(qipaoPos % 2 === 0){
					//眼睛
					Vd._drawEye(eye_1, Vd._COLORS.EYE, 6);
					Vd._drawEye(eye_2, Vd._COLORS.EYE, 6);	
					eye_1[0] += 3;
					eye_1[1] -= 5;
					eye_2[0] += 3;
					eye_2[1] -= 5;
					Vd._drawEye(eye_1, '#EFEFEF', 2);
					Vd._drawEye(eye_2, '#EFEFEF', 2);
				}else{
					//闭眼
					Vd._drawText('‿', eye_1[0] + 26 , eye_1[1] - 42, '#099FDE');
					Vd._drawText('‿', eye_2[0] - 36 , eye_2[1] - 25, '#099FDE');
					Vd._drawText('>', eye_1[0] - 16 , eye_1[1] + 16, '#099FDE');
					Vd._drawText('<', eye_2[0] - 16 , eye_2[1] + 16, '#099FDE');
				}
				
				qipaoPos += 1;
			}, 430);
		}
	};
	
	
//	var url = 'http://127.0.0.1:3000/get?dirName=dist&fileName=' + 'dist_3';
	var url = 'http://127.0.0.1:3000/get?dirName=dist&fileName=' + 'dist_5';
	ajax({method: 'GET', url: url}, function(data){
		data = data.data;
		new Vd(data).draw();
	});
	
})(window, window);
