
import News from '../components/News.vue'
import Market from '../components/Market.vue'
import Fund from '../components/Fund.vue'
import Post from '../components/Post.vue'
import Article from '../components/Article.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
	  { 
	  	path:'/news',
	  	component:News/*,
	  	children: [
	  	 	{path: '/:id', component: Article}
	  	]*/
	}
	, { path:'/market', component:Market }
	, { path:'/fund',   component:Fund }
	, { path:'/post',   component:Post }
	, { path: '/',      redirect: '/news' }
	, { path: '*', component: NotFound }
	, { path: '/article/:id', component: Article }  
]

export default routes