<template>

	<div id="slider" class="my-slider ">
		<p class="nothing" v-show="sliderData.length === 0">暂无图片</p>
		<div class="swiper-container" v-show='sliderData.length !== 0'>
			<div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="item in sliderData"><a href=""><img :src="item.IMGURL" alt=""></a></div>
		    </div>
	    </div>
	</div>
	
</template>


    
<script>

	export default {
		name: 'slider',
		data() {
			return {
				sliderData: []
			}
		},
		mounted(){
			this.getSliderDate()
		},
		methods:{
			getSliderDate(){
				let _this = this
				this.$http.get('./static/api/slider.json').then(function(res){
					_this.sliderData = res.data
			        _this.$nextTick(function(){
			        	new Swiper ('.swiper-container', {
						    loop: true
						})
			        })
				}).catch(function(err){
					console.log('slider:'+err)
				})
			}
		}
	}
</script>


<style>

	.my-slider{
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
	}
	.my-slider>.nothing{ 
		height: 3.2rem;
	    line-height: 3.2rem;
		text-align: center;
	    font-size: .24rem;
	    color: #999;
	}
	
	.swiper-container{
		position: relative;width: 100%;overflow: hidden;
	}
	.swiper-slide img{width: 100%;vertical-align: top;}
</style>