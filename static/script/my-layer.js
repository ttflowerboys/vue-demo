/*
 *@action layer  layui 中弹窗二次封装函数
 *@author wpx
 *@time   2017/3/29
 */
//声明一个命名空间
var myLayer = window.myLayer || {};
myLayer = new function() {
    /*
     *@action 最简单的提示语弹窗
     *@param  string  _msg   必选项
     *@param  json    _setting 可选项 属性定制
     */
    this.showMsg = function(_msg,_setting) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.msg(_msg,_setting);
        });
    };
    /*
     *@action  信息弹窗
     *@param  string  _content   必选项 提醒信息内容
     *@param  json    _setting   可选项 属性定制
     *@param  function  fnName   可选项 自定义回调函数
     */
    this.showAlert = function(_content,_setting,fnName) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.alert(_content,_setting,function(index){
                if(fnName){
                    fnName(index);//自定义执行函数
                }
                layer.close(index);
            });
        });
    };

    /*
     *@action  询问弹窗
     *@param  string  _content   必选项 提醒信息内容
     *@param  json    _setting 可选项 属性定制
     *@param  function  fnName   可选项 自定义回调函数
     */
    this.showConfirm = function(_content,_setting,fnName) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.confirm(_content,_setting,function(index){
               if(fnName){
                   fnName(index);//自定义执行函数
               }
                layer.close(index);
            });
        });
    };

    /*
     *@action  询问弹窗
     *@param  int     _icon    加载图片的类型
     *@param  json    _setting 可选项 属性定制
     *@param  function  fnName   可选项 自定义回调函数
     */
    this.showLoad = function(_icon,_setting,fnName) {
        layui.use('layer', function(){
            var layer = layui.layer;
            var index =layer.load(_icon,_setting);
            if(fnName){//异步请求函数
                fnName(index);
            }
        });
    };
    /*
     *@action  吸附tips弹层
     *@param  string    _content 必选项 内容
     *@param  string    _id      必选项 dom  ID
     *@param  json     _setting  可选项 属性定制
     */
    this.showTips = function(_content,_id,_setting) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.tips(_content,_id,_setting);
        });

    };

    /*
     *@action  当前页捕获内容弹出弹窗
     *@param  jq对象    $obj 必选项 内容
     *@param  json     _setting  可选项 属性定制
     */
    this.showDom = function($obj,title,_setting) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                    type: 1,
                    shade: 0.5,
                    area: ['4.8rem', '3.6rem'],
                    title: false,//title, //false不显示标题
                    content: $obj, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                    btn: ['确定', '取消'],
                    btn1: function(index, layero){
                        //按钮【按钮一】的回调
                        layer.close(index);
                    }
                    ,btn2:function(index, layero){
                        //按钮【按钮二】的回调
                    }
                    ,btnAlign:'c'
                    ,cancel: function(){//关闭后的回调
                        layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
                    }

                }
            );
        });

    };

    /*
     *@action  加载指定文件的内容弹出层
     *@param  string  _url  iframe的url
     *@param  string  _title 弹层的标题
     *@param  json    _setting  可选项 属性定制
     */
    this.showIfream = function(_url,_title,_setting) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                    type: 2,
                    shade: 0.5,
                    title: _title, //false不显示标题
                    content: _url,
                    btn: ['确定', '取消'],
                    area:'500px'
                    ,btn1: function(index, layero){
                        //按钮【按钮一】的回调
                        layer.close(index);
                    }
                    ,btn2:function(index, layero){
                        //按钮【按钮二】的回调
                    }
                    ,btnAlign:'c'
                    ,cancel: function(){//关闭后的回调
                        layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
                    }
                }
            );
        });

    };



    /*
     *@action  加载指定文件的内容弹出窗
     *@param  string  _url  iframe的url
     *@param  string  _title 弹层的标题
     *@param  json    _setting  可选项 属性定制
     */
    this.showIfreamWin = function(_url,_title,_setting) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                type: 2,
                title: _title,
                shadeClose: true,
                shade: false,
                maxmin: true, //开启最大化最小化按钮
                area: ['893px', '600px'],
                content: _url
            });

        });

    };

    /*
     *@action  tab弹窗
     *@param  string  _url  iframe的url
     *@param  json  _tabs  tab的名称 内容值对
     *@param  json    _setting  可选项 属性定制
     */
    this.showTabs = function(_tabs) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.tab({
                area: ['600px', '300px'],
                tab: _tabs
            });
        });

    };

    /*
     *@action  相册弹窗
     *@param  string  _url  iframe的url
     *@param  json  _tabs  tab的名称 内容值对
     *@param  json    _setting  可选项 属性定制
     */
    this.showPhotos = function(_data) {
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.photos({
                photos: _data
                ,anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
            });
        });

    };

};










