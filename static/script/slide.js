//从服务器端获取轮播图地址
function getSlideImg(divH) {
	
	var num = getImgsByCache();
	if (num > 2) {
		openSlide(imgPathsObj, divH);
		return true;
	}
	var actionUrl = ajaxAgent.serverAction + '/jpjs/banner/jpsj_queryBanner';
	api.ajax({
		async : false,
		url : actionUrl,
		method : 'post',
		timeout : 30,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				num : 5
			}
		}
	}, function(ret, err) { 
		if (ret) {
			if (ret.result == 1) {
				if (ret.paths) { 
					//imageCache(ret.paths);
					var obj=ret.paths;
					for (var item in obj) {//拼接图片服务器地址
						obj[item] = ajaxAgent.serverAction + '/' + obj[item]; 
					}
					setSlideRank(ret.ranks); 
					//保存链接信息
					openSlide(obj, divH);
				} else {
					toastNetErr("数据格式错误");
				}
			} else {
				toastNetErr(ret.msg);
			}
		} else {
			toastNetErr();
		}
	});
}

 


//图片幻灯片
function openSlide(paths, divH) { 
	var UIScrollPicture = api.require('UIScrollPicture');
	UIScrollPicture.open({
		rect : {
			x : 0,
			y : 0,
			w : api.winWidth,
			h : 175
		},
		data : {
			paths : paths,
			//captions : ['apicloud', 'apicloud', 'apicloud']
		},
		styles : {
			caption : {
				height : 35,
				color : '#E0FFFF',
				size : 13,
				bgColor : '#696969',
				position : 'bottom'
			},
			indicator : {
				align : 'center',
				color : '#FFFFFF',
				activeColor : '#32b2a1'
			}
		},
		//placeholderImg : 'widget://res/slide1.jpg',
		contentMode : 'scaleToFill',
		interval : 3,
		fixedOn : api.frameName,
		loop : true,
		auto :true,
		fixed : false,

	}, function(ret, err) {  
		if (ret.eventType == 'click') {
			openRankBySlide(ret.index);
		}
	});
	 /*
	UIScrollPicture.addEventListener({
    	name: 'scroll'
	}, function(ret, err){ 
	    if( ret ){ 
	        if(ret.index==0){
		         UIScrollPicture.setCurrentIndex({
				    index: 0
				 }); 
	         } 
	    }else{
	          alert( JSON.stringify( err ) );
	    }
	}); */
	
}

//跳转到榜单页面
function openRankBySlide(slideIndex) { //rankId,rankName,childrenId,childrenName,rankYear
	//取出对应的榜单信息
    var ranks=getSlideRank(); 
    if(null!=ranks[slideIndex]){
    	var obj=ranks[slideIndex]; 
    	openRankList(obj.fatherId,obj.fahterName,obj.childrenId,obj.childrenName,''); 
    }
}


/**
 *获取榜单
 */
function getSlideRank() {
	var str=getPrefs("slideRanks");  
	if(null==str || ""==str){ 
	  return null ;
	}else {
    	return $api.strToJson(str);
    }
	 
}

/**
 *保存榜单
 */
function setSlideRank(ranks) {
	//alertInfo(ranks)
    var str=$api.jsonToStr(ranks);  
	setPrefs("slideRanks", str);
}
//图片缓存
function imagePathChange(imgPath, no) {
	//根据文件路径获取图片类型
	var strList = imgPath.split(".");
	var exeName = no + '.' + strList.pop();
	//定义图片保存的相对路径
	var savePath = 'fs://cache/slide/' + exeName;
	api.download({
		url : imgPath,
		savePath : savePath,
		report : true,
		cache : true,
		allowResume : true
	}, function(ret, err) {
		if (ret.state == 1) {
			//下载成功
			var tagName = "img_" + no;
			$api.setStorage(tagName, savePath);
		}

	});
}


//图片缓存
function imageCache(obj) {
	for (var item in obj) {
		obj[item] = ajaxAgent.serverAction + '/' + obj[item];
		imagePathChange(obj[item], item);
	}
}

//缓存的图片路径对象
var imgPathsObj = [];
//从缓存读取轮番图片
function getImgsByCache() {
	var num = 0;
	for (var i = 0; i < 3; i++) {
		var tagName = "img_" + i;
		if ($api.getStorage(tagName)) {
			imgPathsObj[i] = $api.getStorage(tagName);
			num++;
		}
	}
	return num;
}

