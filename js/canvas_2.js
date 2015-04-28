;(function(){
	var canvas = document.getElementsByTagName('canvas')[0]	
	var context = canvas.getContext('2d');
	
	if(!context){
		return;
	}
	
//	context.scale(0.25, 0.25);
	var COLOR_LIST = {
		BODY: '#8CD9FF',
		DU_PI: '#FFF',
		TOU_QUAN: '#B6F5F8',
		CHI_BANG_1: '#8CD9FF',
		CHI_BANG_2: '#86CFF8',
		WEI_BA: '#8CD9FF'
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
	
	var i = 0;
	setInterval(function(){
		var grd = context.createLinearGradient(315, 171, 98, 190);
		context.clearRect(0, 0, canvas.width, canvas.height);
		grd.addColorStop(1, COLOR_LIST.BODY);
		grd.addColorStop(0, '#86CFF8');
		
		drawPolygon(body, grd);
		drawPolygon(dupi, COLOR_LIST.DU_PI);
		drawPolygon(touquan, COLOR_LIST.TOU_QUAN);
		drawPolygon(weiba, COLOR_LIST.WEI_BA);
		drawZui();
		drawJiuWo(161, 211);
		drawJiuWo(300, 174);
		drawBiZi();
		drawGo();
		drawText('go...', 320, 85, '#fff');
		
		if(i % 2 === 0){
			drawPolygon(chibang_1, COLOR_LIST.CHI_BANG_1);
			drawPolygon(chibang_2, COLOR_LIST.CHI_BANG_2);
		}else{
			drawPolygon(chibang_1_new, COLOR_LIST.CHI_BANG_1);
			drawPolygon(chibang_2_new, COLOR_LIST.CHI_BANG_2);
		}
		
		if(i % 4 === 0){
			drawText('>', 169 - 0, 180 + 5, '#099FDE');
			drawText('<', 283 - 16, 150 + 16, '#099FDE');
			drawText('‿', 169 + 10, 180 - 35, '#099FDE');
			drawText('‿', 283 - 55, 150 - 14, '#099FDE');
		}else{
			drawEye(169, 180);
			drawEye(283, 150);
		}
		if(i % 2 === 0){
			drawPao(44, 270, 40);
			drawPao(331, 420, 25);
			drawPao(91, 405, 12);
			drawPao(124, 427, 11);
			drawPao(279, 446, 10);
			drawPao(356, 369, 12);
			drawPao(413, 270, 18);
		}else{
			drawPao(44, 270 + 10, 40);
			drawPao(331, 420 + 10, 25);
			drawPao(91, 405 + 10, 12);
			drawPao(124, 427 + 10, 11);
			drawPao(279, 446 + 10, 10);
			drawPao(356, 369 + 10, 12);
			drawPao(413, 270 + 10, 18);
		}
		
		i++;
	}, 430);
	
	function drawZui(){
		//重复加粗
		for(var i = 0; i < 3; i++){
			context.beginPath();
			context.strokeStyle = '#099FDE';
			context.bezierCurveTo(195 - i, 210, 209, 210 + i, 224, 189);
			context.bezierCurveTo(224, 189, 228, 180 + i, 244, 183);
			context.bezierCurveTo(244, 183, 267, 189 + i, 270, 186);
			context.stroke();
			context.closePath();
		}
	}
	
	function drawEye(x, y){
		context.beginPath();
		context.fillStyle = '#000';
	 	context.save();
		context.scale(1.5, 2);
		context.arc(x/1.5, y/2, 6, 0, Math.PI * 2, false);
		context.restore();
		context.fill();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = '#ddd';
	 	context.save();
		context.scale(1.5, 2);
		context.arc((x + 3)/1.5, (y - 5)/2, 3, 0, Math.PI * 2, false);
		context.restore();
		context.fill();
		context.closePath();
	}
	
	//酒窝
	function drawJiuWo(x, y){
		context.beginPath();
		context.fillStyle = '#FFBFE3';
	 	context.save();
		context.scale(2.1, 1.2);
		context.arc(x/2.1, y/1.2, 5, 0, Math.PI * 2, false);
		context.restore();
		context.fill();
		context.closePath();
	}
	
	
	//重复鼻子
	function drawBiZi(){
		for(var n = 0; n < 5; n++){
			context.beginPath();
			context.strokeStyle = '#46BEEF';
			context.bezierCurveTo(220, 173, 223, 164 + n, 247, 168);
			context.stroke();
			context.closePath();	
		}
	}
	
	//气泡,以下参数经过计算后得出
	function drawPao(x, y, radius){
		context.beginPath();
		context.fillStyle = '#C9E8FB';
		context.arc(x, y, radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
		//气泡内球
		context.beginPath();
		context.fillStyle = '#EBF3F7';
	 	context.save();
		context.scale(1.2, 1.8);
		context.arc((x - (radius/2))/1.2, (y - (radius/4))/1.8, radius/7, 0, Math.PI * 2, false);
		context.restore();
		context.fill();
		context.closePath();
		//气泡内多边形
		context.beginPath();
		context.fillStyle = '#EBF3F7';
	 	context.bezierCurveTo(x- radius/4, y+radius/2, x+radius/2.7, y+radius/2, x+radius/1.6, y+radius/4);
	 	context.lineTo(x+radius/1.3, y+radius/2);
	 	context.bezierCurveTo(x+radius/1.3, y+radius/2, x+radius/2.7, y+radius/1.3, x-radius/4, y+radius/1.3);
		context.fill();
		context.closePath();
	}
	
	function drawGo(){
		context.beginPath();
		context.fillStyle = '#C9E8FB';
	 	context.save();
		context.scale(2, 1.5);
		context.arc(355/2, 80/1.5, 20, 0, Math.PI * 2, false);
		context.restore();
		context.fill();
		context.closePath();
		//go尖
		context.beginPath();
		context.fillStyle = '#C9E8FB';
	 	context.bezierCurveTo(305, 113, 320, 103, 325, 90);
	 	context.bezierCurveTo(346, 107, 320, 103, 305, 113);
		context.fill();
		context.closePath();
	}
	
	function drawText(text, x, y, color){
		context.beginPath();
		context.fillStyle = color;
		context.font = '36px arial,sans-serif';
		context.fillText(text, x, y)
		context.fill();
		context.closePath();
	}
	
	function drawPolygon(data, color){
		context.beginPath();
		context.fillStyle = color;
		for(var i = 0; i < data.length; i++){
			if(i % 6 === 0){
				context.bezierCurveTo(data[i], data[i+1], data[i+2], data[i+3], data[i+4], data[i+5]);
			}
		}
		context.fill();
		context.closePath();
	}
	
})();
