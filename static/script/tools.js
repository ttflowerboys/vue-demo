/**
 *公共方法
 * autor:wpx
 * time:2016/6/6
 */

//设备监听返回键在首页点击返回关掉整个应用，其他地方点击返回关掉当前窗口
function keyBack(){  
	api.addEventListener({
	    name:'keyback'
	}, function(ret, err){  
	    if( ret ){
	        if(api.winName=="root" || ret.longPress){//首页或者长按返回键关闭整个应用 
				api.closeWidget({
				    id: api.appId, 
				});	        	
	        }
	        else{ 
	        	api.closeWin();
	        } 
	        
	    } 
	});
}

//状态栏设置
function setStatusBar(headerObj) { 
	api.setStatusBarStyle({
		style : 'dark' 
	}); 
    $api.fixStatusBar(headerObj);
	$api.fixIos7Bar(headerObj); 
}

//返回手机号码保密格式
function getSecretTel(telNo){ 
	var secretTel=''; 
	if(telNo.length>=11){
		//取出前3位
		secretTel=telNo.substring(0,3);
		secretTel+='****';
		secretTel+=telNo.substring(7,11); 
		return secretTel;
	}
	else{
	 return telNo;
	} 
}	

//返回到上一页
function goBack() {
	api.closeWin();
}

//接口域名
var ajaxAgent = {
	//测试服务器 
	//serverAction : 'http://192.168.11.180:8087', 
	serverAction : 'http://172.16.50.124',
	//生产环境
	//serverAction : 'http://egovcloud.infobigdata.com', 
};
//将unicode编码转换为中文
function tranUnicode2Chn(str) {
	if (arguments.length > 0) {
		return unescape(str.replace(/\\/g, "%"));
	} else {
		return null;
	}
}

//错误输出
function toastNetErr(errCode) {
	var errMsg = ''; 
	if (errCode != null && errCode != "") {
		errMsg = errCode;
	} else{
		errMsg = '网络连接异常，请稍后再试';
	}
	api.toast({
		msg : errMsg,
		duration : 2000,
		location : 'middle'
	});
}

//错误从底部输出
function toastNetErrBottom(errCode) {
	var errMsg = ''; 
	if (errCode != null && errCode != "") {
		errMsg = errCode;
	} else{
		errMsg = '网络连接异常，请稍后再试';
	}
	api.toast({
		msg : errMsg,
		duration : 2000,
		location : 'bottom'
	});
}

//等待页面
function showProgress(text){
 	if(text=="") text="先喝杯茶...";
	api.showProgress({
	    style: 'default',
	    animationType: 'fade',
	    title: '努力加载中...',
	    text: text,
	    modal: false
    });
}
//调试信息打印
function testInfo(ret,err){
	api.alert({"msg":"ret:"+JSON.stringify(ret)});
	api.alert({"msg":"err:"+JSON.stringify(err)});  
}

//测试打印数据
function alertInfo(ret){
	api.alert({msg:JSON.stringify(ret)
    });

}
//打开外部链接
function openHttpUrl(webName,httpUrl){
 var pageParam={
 	frmName:'httpName',
 	frmUrl:httpUrl,
 	barTitle:webName,
 }
 openCommonWinNew(pageParam);  

}

//设置偏好值
function setPrefs(keyName,keyValue){
	api.removePrefs({key:keyName });
	api.setPrefs({ key: keyName, value: keyValue });
}
//获取偏好值
function getPrefs(key){
    var keyValue=api.getPrefs({key:key,sync:true}); 
    if(null==keyValue || ""==keyValue) return "";
    else return keyValue;
}



/*文本框自动换行，超出字数限制提示
 * thisObj object 当前输入框对象
 * maxSize int  最大字数
 * msg  超出字数限制的提示
 */
function updateHeight(thisObj,maxSize,msg){  
 var height=20; //一行的高度
 var bytesNum=getStrBytesCount($api.val(thisObj)); 
 var times=parseInt(bytesNum/32)+1; //一行显示36个字节，计算出行数
  
 thisObj.style.height=(times*height)+'px';
 //thisObj.style.height=thisObj.scrollHeight + 'px'; 
 if(thisObj.value.length>maxSize){ 
     toastNetErr(msg); 
  	 return false;   	
 } else {
 	return true;
 }
 
}
/*监听文本框输入的字数是否超出字数限制，如果超出给出提示
 * thisObj object 当前输入框对象
 * maxSize int  最大字数
 * msg  超出字数限制的提示
 */
function getMaxSize(thisObj,maxSize,msg){  
 if(thisObj.value.length>maxSize){ 
     toastNetErr(msg); 
  	 return false;   	
 } else {
 	return true;
 }
 
}

/**
 *无数据显示页面 
 */
function loadNothing(y,h){
	api.openFrame({
	    name: 'nothing',
	    url: 'frm_nothing.html',
	    rect: {
		    x: 0,
		    y: y,
		    w: 'auto',
		    h: h
	    } 
    }); 
}

//计算字符串的字节数
function getStrBytesCount(str){
   var bytesCount=0;
	for (var i = 0; i < str.length; i++)
	{
	  var c = str.charAt(i);
	  if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
	  {
	  bytesCount += 1;
	  }
	  else
	  {
	  bytesCount += 2;
	  }
	}
    return bytesCount;
}

//生成6位随机数字串
function rand6() {
	var randStr = "";
	for (var i = 0; i < 6; i++) {
		randStr += Math.floor(Math.random() * 10);
	}
	return randStr;
}

//生成安全码
function creatSecretCode(webName){
	var secretCode="zwy";
	secretCode+="-"+rand6()+"-"+webName;
	return secretCode;
}

//验证属性值是否为空
/*
*@param  obj 被验证的元素
* @msg   发送错误时的提醒
 */
function  checkEmpty(obj,msg){
  var value=$api.val(obj); 
    //去掉两边的空格
	value=$api.trim(value);
	if(value.length<=0){
		api.toast({
			msg : msg,
			duration : 2000,
			location : 'middle'
		});
		return false;
	}else{
		return true;
	}

}


//验证手机号码格式
function  checkTel(phone){ 
if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
//      api.alert({
//		    title: '错误提示',
//		    msg: '手机号码输入有误,请重新填写！',
//		}, function(ret, err) {
//		
//		});
        api.toast({
			msg : '手机号码输入有误,请重新填写！',
			duration : 3000,
			location : 'middle'
		});
        return false; 
    }else{
    	return true;
    }
}


/**
 *列表页面公用方法
 */

//页面加载完开始
function beginLoad() {
	getList();
	setRefreshHeader();
	api.addEventListener({
		name : 'scrolltobottom'
	}, function(ret, err) { 
	    refresh=false;
		var sumNum = page * pageNum; 
		if (sumNum >= totalNum) {
			var msg = '暂无数据...';
			if (totalNum == 0)
				msg = '暂无数据...';
			else
				msg = '已经到底了...';
			api.toast({
				msg : msg,
				duration : 3000,
				location : "bottom"
			});
		} else {
			page++; 
			getList();
			//api.parseTapmode();
		}
	});
}

//头部刷新
function setRefreshHeader() {
   
	api.setRefreshHeaderInfo({
		visible : true,
		bgColor : '#ccc',
		textColor : '#fff',
		textDown : '下拉刷新...',
		textUp : '松开刷新...',
		showTime : true
	}, function(ret, err) { 
		//alert(api.frameName); 
		page=1; 
		getList();
		api.refreshHeaderLoadDone();
	});
}

//获取列表内容
/**
 * 
 * @param string actionUrl 请求的接口地址
 * @param {Object} values 传递的数据
 */
function getListContent(actionUrl,values) { 
	 
	showProgress();  
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : values
		}
	}, function(ret, err) {  
	     api.hideProgress(); 
	     console.log("list:"+JSON.stringify(ret));  
	     //return false;
		if (ret) { 
			   makelist(ret); 
			   return true;  
		} else {  
		     //sendNetError(frmY,frmH);
		     //api.hideProgress();  
			 toastNetErrBottom('网络异常,请稍后再试哦!'); 
			  
		} 
		
		
	});

}

     //跳转到详情页
      function  openNewsDetail(newsId,newsType){
      	 api.openWin({
	           name: 'winNewsDetail',
	           url: 'win-detail.html',
	           pageParam:{
	           		newsType:newsType,
	           		newsId:newsId
	           }
           });
      }


//监听按了返回键操作
function keyBack(){
	api.addEventListener({
	    name: 'keyback'
	}, function(ret, err) {
	    if(api.winName=="myIndex"){//首页点击，直接退出系统
	      api.closeWidget(); 
	    }
	    
	});
}
 
