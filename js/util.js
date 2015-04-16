
/*
 * 描述：提供基本的AJAX、JSON、事件绑定
 * 作者：王利华 
 * 邮箱：lh_wang@ctrip.com
 * 时间：2015-04-14
 * */
;(function(exports){
	
	//JSON
	function jsonParse(data){
		if(JSON){
			return JSON.parse(data);
		}else{
			return (new Function('return' + data))();
		}
	}
	
	//AJAX
	function ajax(options, callback){
		var method = options.method || 'GET';
		var url = options.url || '';
		var xmlHttp = null;
		
		if(window.XMLHttpRequest){
			xmlHttp = new XMLHttpRequest();
		}
		
		if(window.ActiveXObject){
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlHttp.open(method, url, true);
		xmlHttp.onreadystatechange = function(){
			if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
				callback(jsonParse(xmlHttp.responseText));
			}
		}
		xmlHttp.send();
	}
	
	//事件绑定
	function addEvent(el, type, callback){
		if(!el){
			return;
		}
		if(el.addEventListener){
			el.addEventListener(type, callback);
		}else{
			el.attachEvent('on' + type, callback);
		}
		return callback;
	}
	
	//Tip
	var ID_STRING = '_____wlh_tip___0088';
	function tipShow(){
		var body = document.getElementsByTagName('body')[0];
		if(document.getElementById(ID_STRING)){
			 document.getElementById(ID_STRING).style.display = 'block';
			 body.style.overflow = 'hidden';
			 return;
		}
		var el = document.createElement('div');
		el.style.zIndex = 1000;
		el.style.width = '300px';
		el.style.height = '150px';
		el.style.backgroundColor = '#FFF';
		el.style.position = 'fixed';
		el.style.left = '30%';
		el.style.top = '40%';
		el.style.opacity = 0.9;
		el.style.color = '#00B7FF';
		el.style.lineHeight = '150px';
		el.style.fontSize = '16px';
		el.style.paddingLeft = '20px';
		el.style.borderRadius = '3px';
		el.innerHTML = '数据正在处理, 请等待......';
		el.id = ID_STRING;
		
		body.style.overflow = 'hidden';
		body.appendChild(el);
		return;
	}
	
	function tipHide(){
		var body = document.getElementsByTagName('body')[0];
		if(document.getElementById(ID_STRING)){
			 document.getElementById(ID_STRING).style.display = 'none';
			 body.style.overflow = 'auto';
		}
	}
	
	exports.ajax = ajax;
	exports.addEvent = addEvent;
	exports.tipShow = tipShow;
	exports.tipHide = tipHide;
	
})(window);
