

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
		QIPAO: '#B3D2E5',
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
		context.font = '40px arial,sans-serif';
		context.fillText(text, x, y)
		context.fill();
		context.closePath();
	};
	
	Vector.prototype = {
		draw: function(){
			var data = this.data;
			var qipaoPos = 0;
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
				}
				
				//第一层
				Vector._drawPolygon(data['polygon_body'], Vector._COLOR_LIST.BODY);
				Vector._drawPolygon(data['polygon_dupi'], Vector._COLOR_LIST.DUPI);
				Vector._drawPolygon(data['polygon_touquan'], Vector._COLOR_LIST.TOUQUAN);
				Vector._drawPolygon(data['polygon_jiuwo1'], Vector._COLOR_LIST.JIUWO);
				Vector._drawPolygon(data['polygon_jiuwo2'], Vector._COLOR_LIST.JIUWO);
				Vector._drawPolygon(data['polygon_go'], Vector._COLOR_LIST.GO);
				
				Vector._drawLine(data['line_zui'], Vector._COLOR_LIST.ZUIBA, 4);
				Vector._drawLine(data['line_bishang'], Vector._COLOR_LIST.BISHANG, 8);
				Vector._drawLine(data['line_bixia'], Vector._COLOR_LIST.BIXIA, 5);
				
				Vector._drawCircle(data['circle_qipao1'], Vector._COLOR_LIST.QIPAO, 30);
				Vector._drawCircle(data['circle_qipao2'], Vector._COLOR_LIST.QIPAO, 25);
				Vector._drawCircle(data['circle_qipao3'], Vector._COLOR_LIST.QIPAO, 15);
				Vector._drawCircle(data['circle_qipao4'], Vector._COLOR_LIST.QIPAO, 20);
				Vector._drawCircle(data['circle_qipao5'], Vector._COLOR_LIST.QIPAO, 15);
				Vector._drawCircle(data['circle_qipao6'], Vector._COLOR_LIST.QIPAO, 10);
				Vector._drawCircle(data['circle_qipao7'], Vector._COLOR_LIST.QIPAO, 16);

				Vector._drawText('go...', 320, 69, '#fff');
				
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
					Vector._drawEye(eye_1, Vector._COLOR_LIST.EYE, 6);
					Vector._drawEye(eye_2, Vector._COLOR_LIST.EYE, 6);	
					eye_1[0] += 3;
					eye_1[1] -= 5;
					eye_2[0] += 3;
					eye_2[1] -= 5;
					Vector._drawEye(eye_1, '#EFEFEF', 2);
					Vector._drawEye(eye_2, '#EFEFEF', 2);
				}else{
					//闭眼
					Vector._drawText('‿', eye_1[0] + 26 , eye_1[1] - 42, '#099FDE');
					Vector._drawText('‿', eye_2[0] - 36 , eye_2[1] - 25, '#099FDE');
					Vector._drawText('>', eye_1[0] - 16 , eye_1[1] + 16, '#099FDE');
					Vector._drawText('<', eye_2[0] - 16 , eye_2[1] + 16, '#099FDE');
				}
				
				qipaoPos += 1;
			}, 230);
		}
	};
	
	
	var url = 'http://127.0.0.1:3000/get?dirName=dist&fileName=' + 'dist_3';
	ajax({method: 'GET', url: url}, function(data){
		data = data.data;
		new Vector(data).draw();
	});
	
})(window, window);
