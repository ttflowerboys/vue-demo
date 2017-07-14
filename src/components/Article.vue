<template>
<div>
	<div class="header-box index"> 

      		<header class="back-header"  onclick="window.history.go(-1)"><span class="back"></span><h1>{{article.title}}</h1></header>
          	

  	</div>
    <div class="detail-box">
         <h5 id="title">{{article.title}}</h5>
         <p class="other"><span id="unit-name">{{article.name}}</span> <span id="publish-date">2016-12-22</span> </p>
         <img :src="article.author_face" class="detail-img " id="pigImgs">
         <div id="content" class="info"  v-html="article.content"></div>
    </div>
</div>
</template>

<script>
	export default {
		name: 'Article',
		mounted(){
			this.getData(this.$route.params.id);

			if(this.$route.path.indexOf('article')>0){
				this.$store.dispatch('hideFooter');
			}
		},
		watch:{
			$route(to){
				//console.log(to);
				var reg=/article\/\d+/;
				if(reg.test(to.path)){
					var articleId=this.$route.params.id || 0;
					this.getData(articleId);
				}
			}
		},
		data(){
			return {
				article: []
			}
		},
		methods: {
			getData(id){
				var _this = this;
				this.$http.get('./static/api/article.json')
				.then(function(res){
					_this.article = res.data[id]
				}).catch(function(err){
					console.log(err)
				})
			}
		}
	}
</script>


<style scoped>
	.header-box.index>.invest-header{display: block;}
	.back-header h1{height: .9rem;margin: 0 .8rem 0 .5rem;overflow: hidden;white-space: nowrap;-ms-text-overflow: ellipsis;text-overflow: ellipsis;}
</style>
