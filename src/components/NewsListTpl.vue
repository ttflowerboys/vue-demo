<template>

<div class="list-box"  id="list">
	<div class="item border-bottom" id="nothing" v-show='lists.length === 0'>
		<div class="text-content">
			<p class="title">暂无数据！</p>
		</div> 
	</div>
	<div class="item border-bottom" v-for="item in lists" v-show='lists.length !== 0'>
		<div class="text-content">
			<router-link :to="'/article/'+item.newsId">
				<p class="title">{{item.title}}</p>
				<p class="other"><span >{{item.publishDate}}</span> </p>
			</router-link>
		</div>
	</div>
</div>
		
</template>

<script>
	export default {
		name: 'NewsListTpl',
		mounted(){
			this.getData();
		},
		data(){
			return {
				lists: []
			}
		},
		methods: {
			getData(){
				var _this = this;
				this.$http.get('./static/api/news.json')
				.then(function(res){
					_this.lists = res.data
				}).catch(function(err){
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less">
	.list-box{
	    padding-left: .3rem;
	    >.item{
		    padding: .3rem .3rem .24rem 0 ;
		     .title{
			    font-size: .3rem;
			    color: #000;
			    line-height: 1.5em;
			    word-wrap: break-word;
			    .yw{
				    width: 5.8rem;
				    height: 1.8rem;
				    display: inline-block;
				    background: url("../../static/image/img/yw-bg.png") no-repeat center;
				    padding: .5rem .3rem;

				}
			}
			.other{
			    margin-top: .24rem;
			}
		    &:last-child{
			    border-bottom: none;
			}
		}
	}

</style>