<template>
<div class="market-index">

    <div class="chart-item">
        <h5 class="title">市场主体活跃度分析</h5>
        <p class="other"><span>2010-2016年</span></p>

        <div class="chart-box line" id="line-box"></div>

    </div>
    <div class="chart-item">
        <h5 class="title">四地新增主体户数趋势分析</h5>
        <p class="other"><span>2010-2018年</span><span>单位:百万元</span></p>

        <div class="chart-box line-area" id="line-area-box"></div>

    </div>
 
  <div class="chart-item">
        <h5 class="title">企业年龄结构分析</h5>
        <p class="other"><span>2016年</span><span>单位:户数</span></p>
        <div class="item-tab flex-box">
            <span class="city-type flex-item border active" index="wuhan">武汉</span>
            <span class="city-type flex-item border" index="changsha">长沙</span>
            <span class="city-type flex-item border" index="nanchang">南昌</span>
            <span class="city-type flex-item border" index="hefei">合肥</span>
        </div>

        <div class="house-box" id="wuhan">
            

        </div>

        <div class="house-box hidden" id="changsha"></div>

        <div class="house-box hidden" id="nanchang"></div>

        <div class="house-box hidden" id="hefei"></div>
        <div class="legend">
         <span><i class="line red"></i><i class="name">一年以内</i></span>
         <span><i class="line green "></i><i class="name">1-2年</i></span>
         <span><i class="line yellow"></i><i class="name">2-5年</i></span>
         <span><i class="line blue"></i><i class="name">5-10年</i></span>
         <span><i class="line purple"></i><i class="name">10年以上</i></span>
        </div>
    </div>
    
     <div class="chart-item">
        <h5 class="title">新增市场主题季度对比</h5>
         <div class="item-tab flex-box">
            <span class=" time border active" index="scatter-box-2015">2015</span>
            <span class=" time border" index="scatter-box-2016">2016</span> 
        </div>

        <div class="chart-box scatter " id="scatter-box-2015"> 
        </div>


        <div class="chart-box scatter " id="scatter-box-2016"> 
        </div>

       
    </div>
     <div class="chart-item">
        <h5 class="title">市场主体产业类型分析</h5>
        <p class="other"><span>2010-2018年</span><span>单位:百万元</span></p>
         <div class="item-tab flex-box">
            <span class="trade-city flex-item border active" index="treemap-box-wuhan">武汉</span>
            <span class="trade-city flex-item border" index="treemap-box-changsha">长沙</span>
            <span class="trade-city flex-item border" index="treemap-box-nanchang">南昌</span>
            <span class="trade-city flex-item border" index="treemap-box-hefei">合肥</span>
        </div>

        <div class="chart-box treemap" id="treemap-box-wuhan"> 
           <p class="nothing">暂无数据！</p>
        </div>


        <div class="chart-box treemap hidden" id="treemap-box-changsha"> 
        </div>


        <div class="chart-box treemap hidden" id="treemap-box-nanchang"> 
        </div>


        <div class="chart-box treemap hidden" id="treemap-box-hefei"> 
        </div>

    </div>
</div>
</template>

<script>
	export default {
		name: 'Market',
		data() {
			return {
				lineChart: null
			}
		},
		mounted(){
			this.ajaxLineData();
			this.ajaxLineAreaData();
			//this.ajaxOpenScatter();
		},
		methods: {
			ajaxLineData(){
				let _this = this;
				this.$http.get('./static/api/line.json')
				.then(function(res){
					_this.$nextTick(function(){
						_this.drawLine('line-box',res.data)
					})					
				}).catch(function(err){
					console.log(err)
				})
			},
			ajaxLineAreaData(){
				let _this = this;
				this.$http.get('./static/api/lineArea.json')
				.then(function(res){
					_this.$nextTick(function(){
						_this.drawLineArea('line-area-box',res.data)
					})					
				}).catch(function(err){
					console.log(err)
				})
			},
			ajaxOpenScatter(){
				let _this = this;
				this.$http.get('/static/api/scatter.json')
				.then(function(res){
					_this.$nextTick(function(){
						_this.openScatter('scatter-box-2015',res.data,2015)
					})					
				}).catch(function(err){
					console.log(err)
				})
			},
			drawLine(obj,result){
        		echarts.init(document.getElementById(obj)).setOption({
				    color:["#eb869a","#f5ba8d","#8be399","#87b7ef"],
				    tooltip : {
				         trigger: 'axis',
				         axisPointer: {
				             type: 'cross',
				             label: {
				                 backgroundColor: '#6a7985'
				             }
				         }
				     },
				    legend: {
				        itemWidth:18,
				        itemHeight:2,
				        itemGap:20,
				        data:[
				            { name:'武汉',textStyle:{fontSize:10,color:'#919191'},icon:'rect' },
				            { name:'长沙',textStyle:{fontSize:10,color:'#919191'},icon:'rect' },
				            { name:'合肥',textStyle:{fontSize:10,color:'#919191'},icon:'rect' },
				            { name:'南昌',textStyle:{fontSize:10,color:'#919191' }, icon:'roundRect' }
				        ],
				        x : 'center',
				        y : 'bottom',
				        orient:'horizontal'
				    },
				    grid: {
				        width:'auto',height:'auto',top: 5,left:0,right:0,bottom:30,containLabel: true
				    }, 
				    xAxis: {
				    	type: 'category',
				        boundaryGap: ['5%', '5%'],
				        data: result.xAxis,
				        splitNumber:20,
				        axisLine:{ lineStyle:{ color:'#999' } },
				        axisTick:{ show:false },
				        splitLine:{
				            show:true,lineStyle:{ color:'#e9e9e9',type:'dashed' }
				        }
				    },
				    yAxis: {
				        type: 'value',axisLine:{ lineStyle:{ color:'#999' } },axisTick:{ show:false }
				    },
				    series: [
				        { name:'武汉',type:'line',bottom: 60,stack: '总量',data:result.series["武汉"] },
				        { name:'合肥',type:'line',stack: '总量',data:result.series["合肥"] },
				        { name:'长沙',type:'line',stack: '总量',data:result.series["长沙"] },
				        { name:'南昌',type:'line',stack: '总量',data:result.series["南昌"] } 
				    ]
        		})
			},
			drawLineArea(obj,result){
				echarts.init(document.getElementById(obj)).setOption({
			         color:["#eb869a","#f5ba8d","#8be399","#87b7ef"],
			         tooltip : {
			             trigger: 'axis',
			             axisPointer: {
			                 type: 'cross',
			                 label: {
			                     backgroundColor: '#6a7985'
			                 }
			             }
			         },
			         legend: {
			             itemWidth:18,
			             itemHeight:2,
			             itemGap:20,
			             data:[
			                 { name:'武汉', textStyle:{ fontSize:10, color:'#919191' },icon:'rect' },
			                 { name:'长沙', textStyle:{ fontSize:10, color:'#919191' },icon:'rect' },
			                 { name:'合肥', textStyle:{ fontSize:10, color:'#919191' },icon:'rect' },
			                 { name:'南昌', textStyle:{ fontSize:10, color:'#919191' }, icon:'roundRect'}
			             ],
			             x : 'center',
			             y : 'bottom',
			             orient:'horizontal'
			         },
			         grid: {
			             width:'auto',height:'auto',top: 5,left:0,right:0,bottom:30,containLabel: true
			         },
			         xAxis : [
			             {
			                 type : 'category',
			                 boundaryGap: ['5%', '5%'],
			                 splitNumber:7,
			                 axisLine:{ lineStyle:{ color:'#999' } },
			                 axisTick:{ show:false },
			                 splitLine:{ show:true, lineStyle:{ color:'#e9e9e9',type:'dashed'} },
			                 data: result.year
			             }
			         ],
			         yAxis : [
			             {
			                 type : 'value',
			                 axisLine:{ lineStyle:{ color:'#999' } },
			                 axisTick:{ show:false }
			             }
			         ],
			         series : [
			             { name:'武汉',type:'line',stack: '总量',areaStyle: {normal: {}},data: result.wuhan },
			             { name:'长沙',type:'line',stack: '总量',areaStyle: {normal: {}},data: result.changsha },
			             { name:'合肥',type:'line',stack: '总量',areaStyle: {normal: {}},data: result.hefei },
			             { name:'南昌',type:'line',stack: '总量',areaStyle: {normal: {}},data: result.nanchang }
			         ]
				})
			},
			openScatter(obj,result,year){
				var zdata=this.creatScatterData(result,year); 
		        echarts.init(document.getElementById(obj)).setOption({
		            color:["#eb869a"],
		            tooltip: {
		                position: 'top',
		                formatter: function (params) { 
		                    return params.value[2] + '- ' + result.yAxis[params.value[1]] + ' of ' + result.xAxis[params.value[0]];
		                }
		            },
		            grid: {
		                top:0,
		                left: 0,
		                bottom: 0,
		                right: 0,
		                containLabel: true
		            },
		            xAxis: {
		                type: 'category',
		                data: result.xAxis,
		                boundaryGap: ['2%', '2%'], 
		                splitNumber:20,
			            axisTick:{
			                show:false
			            },
			            splitLine:{
			                show:true,
			                lineStyle:{
			                    color:'#e9e9e9',
			                    type:'dashed'
			                }
			            },
		                axisLine: {
		                    show: false
		                }
		            },
		            yAxis: {
		                type: 'category',
		                data: result.yAxis,
		                splitLine: {
		                    show: true,
		                    lineStyle: {
		                        color: '#e9e9e9',
		                        type: 'dashed'
		                    }
		                },
		                 axisLine: {
		                    show: false
		                },
		                axisTick: {
		                    show: false
		                }
		            },
		            series: [{
		                name: 'Punch Card',
		                type: 'scatter',
		                symbolSize: function (val) {
		                    return val[2] * 0.01;
		                },
		                data: zdata,
		                animationDelay: function (idx) {
		                    return idx * 5;
		                }
		            }]
		        })
		    },
		    creatScatterData(data,year){
		    	var yAxis=data.yAxis;
		       var whData=data[year]['武汉'];
		       var zdata=new Array();
		       var j=0;
		       this.creatZdata(zdata,data[year]['武汉'],0,yAxis,j); 
		       this.creatZdata(zdata,data[year]['长沙'],1,yAxis,j); /*
		       this.creatZdata(zdata,data[year]['南昌'],3,yAxis,j); 
		       this.creatZdata(zdata,data[year]['合肥'],2,yAxis,j); */
		       return zdata;
		    },
		    creatZdata(zdata,cityData,x,yAxis,j){
		     for(var i=0;i<cityData.length;i++){
		       	   var y=this.getArrayIndex(cityData[i].QUARTER,yAxis); 
		       	   var d=new Array();
		       	   d=[x,y,cityData[i]['COUNT']]; 
		       	   zdata[j]=d;
		       	   j++;
		       }
		    },
		    getArrayIndex(key,thisArray){
		        for(var i=0;i<thisArray.length;i++){
	      		    if(key===thisArray[i]) return i;
	      	    }
		    }
		}

	}
</script>