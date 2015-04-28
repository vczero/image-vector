;(function(exports){
	if(!document.createElement('canvas').getContext('2d')){
		return;
	}
		
	var COLOR_LIST = {
		BODY: '#86CFF8',
		DU_PI: '#FFF',
		TOU_QUAN: '#B6F5F8',
		CHI_BANG_1: '#86CFF8',
		CHI_BANG_2: '#86CFF8',
		WEI_BA: '#86CFF8'
	};
	var body = [112, 253, 95, 209, 110, 149,
		110, 145, 118, 112, 173, 92,
		173, 92, 253, 70, 282, 104,
		286, 103, 288, 131, 305, 150,
		305, 151, 320, 173, 315, 196,
		314, 199, 314, 210, 307, 217,
		306, 221, 313, 228, 319, 236,
		319, 236, 323, 260, 323, 288,
		323, 290, 322, 319, 309, 343,
		309, 344, 295, 367, 274, 379,
		274, 379, 256, 392, 230, 399,
		228, 401, 212, 400, 190, 384,
		190, 386, 155, 363, 136, 328,
		130, 318, 123, 272, 112, 253];
	
	var dupi = [171, 292, 163, 260, 184, 246,
		184, 246, 208, 237, 228, 242,
		230, 242, 253, 227, 262, 225,
		262, 225, 292, 218, 304, 230,
		306, 232, 317, 254, 315, 282,
		315, 282, 310, 329, 298, 344,
		298, 344, 277, 375, 254, 379,
		254, 379, 226, 385, 210, 367,
		208, 369, 187, 344, 173, 305,
		172, 306, 165, 280, 171, 269];
	
	var touquan = [79, 130, 83, 106, 89, 105,
		132, 144, 114, 123, 124, 124,
		185, 115, 221, 106, 268, 92,
		268, 92, 273, 96, 285, 105,
		214, 133, 169, 142, 116, 142,
		119, 142, 89, 166, 79, 168,
		86, 168, 80, 157, 73, 148,
		130, 142, 87, 137, 79, 130];
	
	var chibang_1 = [88, 308, 89, 281, 112, 255,
	 	114, 257, 125, 252, 130, 257,
	 	130, 258, 139, 266, 139, 274,
	 	139, 274, 124, 290, 98, 310,
	 	98, 310, 92, 314, 88, 310];
	
	var chibang_2 = [318, 234, 349, 243, 372, 270,
		372, 270, 379, 274, 372, 282,
		372, 282, 356, 280, 320, 271,
		320, 272, 320, 266, 315, 246];
		
	var chibang_2_new = [314, 232, 324, 230, 341, 233,
		342, 233, 350, 234, 366, 242,
		368, 244, 374, 253, 376, 258,
		375, 262, 347, 263, 315, 257];
		
 	var chibang_1_new  = [72, 288, 84, 269, 101, 256,
		114, 243, 127, 253, 127, 253,
		127, 255, 128, 265, 123, 273,
		126, 278, 112, 284, 87, 296,
		87, 296, 79, 299, 70, 290];
	
	var weiba = [145, 425, 152, 398, 160, 398,
		160, 398, 172, 391, 191, 391,
		191, 391, 187, 380, 189, 370,
		191, 371, 208, 380, 226, 388,
		228, 390, 221, 393, 228, 404,
		230, 406, 241, 414, 245, 432,
		245, 432, 240, 457, 231, 446,
		231, 446, 211, 433, 204, 414,
		204, 409, 185, 424, 145, 425];
		
	var weiba_new = [200, 438, 190, 397, 230, 394,
		230, 397, 262, 410, 260, 445,
		260, 425, 200, 415, 240, 405,
		230, 407, 220, 430, 200, 440
		];

	
	
	function drawZui(ctx){
		//重复加粗
		for(var i = 0; i < 3; i++){
			ctx.beginPath();
			ctx.strokeStyle = '#099FDE';
			ctx.bezierCurveTo(195 - i, 210, 209, 210 + i, 224, 189);
			ctx.bezierCurveTo(224, 189, 228, 180 + i, 244, 183);
			ctx.bezierCurveTo(244, 183, 267, 189 + i, 270, 186);
			ctx.stroke();
			ctx.closePath();
		}
	}
	
	function drawEye(ctx, x, y){
		ctx.beginPath();
		ctx.fillStyle = '#000';
	 	ctx.save();
		ctx.scale(1.5, 2);
		ctx.arc(x/1.5, y/2, 6, 0, Math.PI * 2, false);
		ctx.restore();
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.fillStyle = '#ddd';
	 	ctx.save();
		ctx.scale(1.5, 2);
		ctx.arc((x + 3)/1.5, (y - 5)/2, 3, 0, Math.PI * 2, false);
		ctx.restore();
		ctx.fill();
		ctx.closePath();
	}
	
	//酒窝
	function drawJiuWo(ctx, x, y){
		ctx.beginPath();
		ctx.fillStyle = '#FFBFE3';
	 	ctx.save();
		ctx.scale(2.1, 1.2);
		ctx.arc(x/2.1, y/1.2, 5, 0, Math.PI * 2, false);
		ctx.restore();
		ctx.fill();
		ctx.closePath();
	}
	
	//重复鼻子
	function drawBiZi(ctx){
		for(var n = 0; n < 5; n++){
			ctx.beginPath();
			ctx.strokeStyle = '#46BEEF';
			ctx.bezierCurveTo(220, 173, 223, 164 + n, 247, 168);
			ctx.stroke();
			ctx.closePath();	
		}
	}
	
	//气泡,以下参数经过计算后得出
	function drawPao(ctx, x, y, radius){
		ctx.beginPath();
		ctx.fillStyle = '#C9E8FB';
		ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();
		//气泡内球
		ctx.beginPath();
		ctx.fillStyle = '#EBF3F7';
	 	ctx.save();
		ctx.scale(1.2, 1.8);
		ctx.arc((x - (radius/2))/1.2, (y - (radius/4))/1.8, radius/7, 0, Math.PI * 2, false);
		ctx.restore();
		ctx.fill();
		ctx.closePath();
		//气泡内多边形
		ctx.beginPath();
		ctx.fillStyle = '#EBF3F7';
	 	ctx.bezierCurveTo(x- radius/4, y+radius/2, x+radius/2.7, y+radius/2, x+radius/1.6, y+radius/4);
	 	ctx.lineTo(x+radius/1.3, y+radius/2);
	 	ctx.bezierCurveTo(x+radius/1.3, y+radius/2, x+radius/2.7, y+radius/1.3, x-radius/4, y+radius/1.3);
		ctx.fill();
		ctx.closePath();
	}
	
	function drawGo(ctx){
		ctx.beginPath();
		ctx.fillStyle = '#C9E8FB';
	 	ctx.save();
		ctx.scale(2, 1.5);
		ctx.arc(355/2, 80/1.5, 20, 0, Math.PI * 2, false);
		ctx.restore();
		ctx.fill();
		ctx.closePath();
		//go尖
		ctx.beginPath();
		ctx.fillStyle = '#C9E8FB';
	 	ctx.bezierCurveTo(305, 113, 320, 103, 325, 90);
	 	ctx.bezierCurveTo(346, 107, 320, 103, 305, 113);
		ctx.fill();
		ctx.closePath();
	}
	
	function drawText(ctx, text, x, y, color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.font = '36px arial,sans-serif';
		ctx.fillText(text, x, y)
		ctx.fill();
		ctx.closePath();
	}
	
	function drawPolygon(ctx, data, color){
		ctx.beginPath();
		ctx.fillStyle = color;
		for(var i = 0; i < data.length; i++){
			if(i % 6 === 0){
				ctx.bezierCurveTo(data[i], data[i+1], data[i+2], data[i+3], data[i+4], data[i+5]);
			}
		}
		ctx.fill();
		ctx.closePath();
	}
	
	var UU = function(canvas, scale){
		this.canvas = canvas;
		this.scale = scale;
		this.ctx = canvas.getContext('2d');
	}
	UU.prototype.draw = function(){	
		this.ctx.scale(this.scale, this.scale);
		var ctx = this.ctx;
		var canvas = this.canvas;
		var i = 0;
		setInterval(function(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);		
			drawPolygon(ctx, body, '#86CFF8');
			drawPolygon(ctx, dupi, COLOR_LIST.DU_PI);
			drawPolygon(ctx, touquan, COLOR_LIST.TOU_QUAN);
			drawZui(ctx);
			drawJiuWo(ctx, 161, 211);
			drawJiuWo(ctx, 300, 174);
			drawBiZi(ctx);
			drawGo(ctx);
			drawText(ctx, 'go...', 320, 85, '#fff');
			
			if(i % 2 === 0){
				drawPolygon(ctx, weiba, COLOR_LIST.WEI_BA);
				drawPolygon(ctx, chibang_1, COLOR_LIST.CHI_BANG_1);
				drawPolygon(ctx, chibang_2, COLOR_LIST.CHI_BANG_2);
			}else{
				drawPolygon(ctx, weiba_new, COLOR_LIST.WEI_BA);
				drawPolygon(ctx, chibang_1_new, COLOR_LIST.CHI_BANG_1);
				drawPolygon(ctx, chibang_2_new, COLOR_LIST.CHI_BANG_2);
			}
			
			if(i % 4 === 0){
				drawText(ctx, '>', 169 - 0, 180 + 5, '#099FDE');
				drawText(ctx, '<', 283 - 16, 150 + 16, '#099FDE');
				drawText(ctx, '‿', 169 + 10, 180 - 35, '#099FDE');
				drawText(ctx, '‿', 283 - 55, 150 - 14, '#099FDE');
			}else{
				drawEye(ctx, 169, 180);
				drawEye(ctx, 283, 150);
			}
			if(i % 2 === 0){
				drawPao(ctx, 44, 270, 40);
				drawPao(ctx, 331, 420, 25);
				drawPao(ctx, 91, 405, 12);
				drawPao(ctx, 124, 427, 11);
				drawPao(ctx, 279, 446, 10);
				drawPao(ctx, 356, 369, 12);
				drawPao(ctx, 413, 270, 18);
			}else{
				drawPao(ctx, 44, 270 + 10, 40);
				drawPao(ctx, 331, 420 + 10, 25);
				drawPao(ctx, 91, 405 + 10, 12);
				drawPao(ctx, 124, 427 + 10, 11);
				drawPao(ctx, 279, 446 + 10, 10);
				drawPao(ctx, 356, 369 + 10, 12);
				drawPao(ctx, 413, 270 + 10, 18);
			}
			
			i++;
		}, 380);	
	};
	
	exports.UU = UU;
	
})(window);
