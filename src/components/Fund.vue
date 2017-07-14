<template>

<div class="market-index">
    <div class="chart-item">
        <h5 class="title">资金迁入</h5>
         <p class="other"><span>2016年</span><span>单位:百万元</span></p>
         <div class="item-tab flex-box">
            <span class="in flex-item border active" index="in-bar-0" city-type="0" >武汉</span>
            <span class="in flex-item border" index="in-bar-3" city-type="3">长沙</span>
            <span class="in flex-item border" index="in-bar-2" city-type="2">南昌</span>
            <span class="in flex-item border" index="in-bar-1" city-type="1">合肥</span>
        </div> 
         <div class="chart-box bar " id="in-bar" ></div> 
    </div> 

    <div class="chart-item">
        <h5 class="title">资金迁出</h5>
         <p class="other"><span>2016年</span><span>单位:百万元</span></p>
         <div class="item-tab flex-box">
            <span class="out flex-item border active" index="out-bar-0" city-type="0" >武汉</span>
            <span class="out flex-item border" index="out-bar-3" city-type="3">长沙</span>
            <span class="out flex-item border" index="out-bar-2" city-type="2">南昌</span>
            <span class="out flex-item border" index="out-bar-1" city-type="1">合肥</span>
        </div> 
        <div class="chart-box bar " id="out-bar"></div>
    </div> 
 </div>

</template>

<script>
	export default {
		name: 'Fund',
        mounted(){
            this.ajaxBar(1)
            this.ajaxBar(2)
        },
        methods: {
            ajaxBar(type){
                let _this = this;
                if(type==1){
                    this.$http.get('./static/api/bar.json')
                        .then(function(res){
                            _this.$nextTick(function(){
                                
                                //默认加载武汉数据
                                var wuhanData=_this.getData(0,res.data);
                                var myChart=echarts.init(document.getElementById("in-bar"));
                                if(wuhanData!=null){
                                    _this.creatBarCity(1,0,wuhanData,myChart);
                                }
                            })
                        }).catch(function(err){
                            console.log(err)
                        })
                        
                    }else if(type==2){
                        this.$http.get('./static/api/bar2.json')
                        .then(function(res){
                            _this.$nextTick(function(){
                                
                                //默认加载武汉数据
                                var wuhanData=_this.getData(0,res.data);
                                var myChart=echarts.init(document.getElementById("out-bar"));
                                if(wuhanData!=null){
                                    _this.creatBarCity(2,0,wuhanData,myChart);
                                }
                            })
                        }).catch(function(err){
                            console.log(err)
                        })
                    
                    }          
                
                
            },
            creatBarCity(type,cityType,data,myChart){ 
                //提前xdata
                var xdata=this.creatData(data,'areaName');
                var sdata=this.creatData(data,'count'); 
                if(type==1){
                    this.openBar(xdata,sdata,myChart,cityType,'资金迁入',1);  
                }else if(type==2){
                    this.openBar(xdata,sdata,myChart,cityType,'资金迁出',2);  
                }
            },
            creatData(data,keyName){
                var keyData=new Array();
                if(data){
                    for(var i=0;i<data.length;i++){ 
                      keyData.push(data[i][keyName]);
                    } 
                }
               return keyData;
            },
            getData(cityType,data){ 
               for(var i=0;i<data.length;i++){
                 if(data[i].cityType!=null && data[i].cityType==cityType){
                    return  data[i].portCity; 
                  }
               }
               
               return null;
            },
            openBar(xdata,sdata,myChart,cityType,sname,type){
                myChart.setOption({
                    color:["#eb869a"],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        }
                    },
                     grid: {
                        width:'auto',
                        height:'auto',
                        top: 5,
                        left:0,
                        right:5,
                        bottom:20,
                        containLabel: true
                    }, 
                    xAxis : [
                        {
                            type : 'category',
                            data : xdata,
                            boundaryGap: ['2%', '20%'], 
                            splitNumber:10,
                            axisTick: {
                                alignWithLabel: true,
                                show:false
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#999',
                                }
                            },
                            axisLabel:{
                              rotate:0 
                            }, 
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:'#e9e9e9',
                                    type:'dashed'
                                }
                            }
                            
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{
                                lineStyle:{
                                    color:'#999',
                                }
                            },
                            axisTick:{
                                show:false
                            }
                        }
                    ],
                    series : [
                        {
                            name:sname,
                            type:'bar',
                            barWidth: '60%',
                            data:sdata
                        }
                    ]
                });
            }
        }
	}
</script>