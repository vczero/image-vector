
/*
 * 描述：游游基本数据处理模块
 * 作者：王利华 
 * 邮箱：lh_wang@ctrip.com
 * 时间：2015-04-14
 * */
;(function(exports, require){
	var ajax = require.ajax;
	var addEvent = require.addEvent;
	var draw = document.getElementById('data_draw');
	var table = document.getElementsByTagName('table')[0];
	var compile = document.getElementById('data_compile');
	var radioBtn = document.getElementsByName('feature');
	var data = [];
	var tpl = '<tr><td>序号</td><td>x坐标</td><td>y坐标</td></tr>';
	var count = 0;

	table.innerHTML = tpl;
	
	//向table中添加行模板
	function addTpl(data){
		var el = document.createElement('tr');
		var td_id = document.createElement('td');
		var td_x = document.createElement('td');
		var td_y = document.createElement('td');	
		
		td_id.innerHTML = data.id;
		td_x.innerHTML = data.x;
		td_y.innerHTML = data.y;
		el.appendChild(td_id);
		el.appendChild(td_x);
		el.appendChild(td_y);
		return el;
	}
	
	//遍历radio按钮获取其值
	function radioCheck(){
		for(var i in radioBtn){
			var el = radioBtn[i];
			if(el.checked){
				return el.value;
			}
		}
	}

	//鼠标按下事件处理函数
	function mouseDown(e){
		var baseX = draw.offsetLeft;
		var baseY = draw.offsetTop;
		var fileName = document.getElementById('fileName').value;
		var PAD_X = 35;
		var PAD_Y = 95;		
		//TODO: 只保留游游尺寸大小		
		//var x = e.x - baseX - PAD_X;
		//var y = e.x - baseY - PAD_Y;
		
		//TODO: 不考虑游游的间距大小
		var x = e.x - baseX;
		var y = e.y - baseY;
		count ++;
		var xy = {
			x: x,
			y: y,
			id: count
		};
		data.push(xy);
		//打点标记,标记已经打过的点
		var div = document.createElement('div');
		div.innerHTML = '*';
		div.style.fontSize = '15px';
		div.style.color = 'red';
		div.style.position = 'absolute';
		div.style.left = e.x + 'px';
		div.style.top = e.y + 'px';
		div.style.zIndex = 50 + count;
		draw.appendChild(div);
		
		
		table.appendChild(addTpl(xy));
		var url = 'http://127.0.0.1:3000/post';
		url += '?x=' + x;
		url += '&y=' + y;
		if(radioCheck() && fileName){
			url += '&fileName=' + radioCheck() + '_' + fileName;
			ajax({method: 'GET', url: url}, function(data){
				console.log(data);
			});	
		}
	}
	
	
	//读取服务文档列表
	function addList(id, dir){
		var el = document.getElementById(id);
		var url = 'http://127.0.0.1:3000/dir?dirname=' + dir;
		ajax({method: 'GET', url: url}, function(data){
			if(data.status){
				var frag = document.createDocumentFragment();
				for(var i in data.files){
					var div = document.createElement('div');
					div.innerHTML = data.files[i];
					frag.appendChild(div);
				}
				el.appendChild(frag);
			}
		});
	}
	//从左往右添加数据
	function addItem(id){
		var el = document.getElementById(id);
		var str = id.split('__')[0];
		addEvent(el, 'click', function(e){
			var ex = e || window.event;
			var node = e.target || e.srcElement;
			if(node.tagName.toLocaleLowerCase() === 'div' && node.parentNode.id === id){
				var right = document.getElementById(str + '__' + 'right');
				right.appendChild(node);
			}
		});
	}
	
	function getNames(id){
		var el = document.getElementById(id);
		var childs = el.childNodes; 
		var names = [];
		for(var i in childs){
			var text = childs[i].innerText;
			if(text){
				names.push(text);
			}
		}
		return names;
	}
	
	//数据转化
	function dataTrans(){
		var names = getNames('data_trans__right');
		if(!names.length){
			alert('请从右边选择文件名称。');
			return;
		}
		var url = 'http://127.0.0.1:3000/compile';
		url += '?fileNames=' + names.join('@');
		url +="&isMany=1";
		ajax({method: 'GET', url: url}, function(data){
			require.tipShow();
			if(data.status){
				require.tipHide();
				location.reload();
			}else{
				require.tipHide();
				alert('数据编译失败!');
			}
		});
	}
	
	function dataContact(){
		var names = getNames('data_contact__right');
		if(!names.length){
			alert('请从右边选择文件名称。');
			return;
		}
		var url = 'http://127.0.0.1:3000/contact';
		url += '?fileNames=' + names.join('@');
		ajax({method: 'GET', url: url}, function(data){
			require.tipShow();
			if(data.status){
				require.tipHide();
				location.reload();
			}else{
				require.tipHide();
				alert('数据合并失败!');
			}
		});
	}
	
	
	
	//事件
	addList('data_trans__left', 'data');
	addList('data_contact__left', 'json');
	addList('data_compare__left', 'contact');
	addItem('data_trans__left');
	addItem('data_contact__left');
	addItem('data_compare__left');
	
	
	addEvent(document.getElementById('data_trans_btn'), 'click', dataTrans);
	addEvent(document.getElementById('data_contact_btn'), 'click', dataContact);
	addEvent(draw, 'mousedown', mouseDown);
	
	
	
})(window, window);
