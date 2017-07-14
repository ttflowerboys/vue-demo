<template>
	<div>
		<Slider></Slider>

	   <nav class="news-tab flex-box border-bottom" id="type-tab">
	   	   <router-link to="notice" tag="span" class="flex-item" active-class="active">通知公告</router-link>
	   	   <router-link to="zw" tag="span" class="flex-item" active-class="active">政务信息</router-link>
	   	   <router-link to="yw" tag="span" class="flex-item" active-class="active">业务信息</router-link>
	   	   <router-link to="more" tag="span" class="flex-item more"></router-link>
	   </nav>
	   <NewsListTpl></NewsListTpl>
	</div>
</template>

<script>
	import Slider from './Slider.vue'
	import NewsListTpl from './NewsListTpl.vue'

	export default {
		name: 'News',
		components: {
			Slider,
			NewsListTpl
		}
	}
</script>

<style>
	


.news-tab{
    width: 100%;
    height: .68rem;
    line-height: .68rem;
    font-size: .26rem;
    color: #666666;
    text-align: center
 }
 .news-tab>.more{
	    background: url(../../static/image/img/list-icon.png)no-repeat center;
	    background-size: .48rem .48rem;
	}
.news-tab.active>i{
	    color: #ff0033;
	    border-bottom: .04rem solid #ff0033;
	    display: inline-block;
	    line-height: .6rem;
	}
</style>