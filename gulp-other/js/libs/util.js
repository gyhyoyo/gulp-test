/********* 依赖jquery ***********/


// 定义接口返回数据代码
var succ = '0';
var offline = '3003';

/**
 * 将表单对象转换为json
 */
$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

//获取参数
function getQueryString (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function checkLogin(){
	document.cookie = 'login=true;expires='
}

function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value)
			+ ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}

$(function(){
	$.post('/web.onigiri/user/intcpt-getUser?'+Math.random(),function(res){
		if(res != null && res != ''){
			if(res.code == succ){
				$('#loginBtn').attr('href','buyIn.html').html('买入');
			}
		}
	},'json');
});

/**
 * 格式化金额，只舍不入，保留两位小数
 * @param s
 * @returns {String}
 */
function fmoney(s) {
  if(s == '' && s.length == 0){
	  return '0.00';
  }
  var arr = s.toString().split(".");
  var l = arr[0];
  var r;
  if(arr.length == 2){
	  r = arr[1];
	  if(r.length >= 2){
		  r = r.substring(0, 2);
	  }else{
		  r+='0';
	  }
  }else{
	  r = '00';
  }
  
  var sign = ''; // 正负号标识
  if(l.substring(0,1) == '-' || l.substring(0,1) == '+'){
	  sign = l.substring(0, 1);
	  l = l.substring(1);
  }
  
  l = l.split("").reverse();  
  t = "";  
  for (i = 0; i < l.length; i++) {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
  }  
  return sign + t.split("").reverse().join("") + "." + r;  
} 