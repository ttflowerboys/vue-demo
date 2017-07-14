<template>
	<div id="footer">
        <footer class="index-footer  flex-box">
        	<router-link to="/news" tag="div" class="flex-item news" active-class="active">
				<span>
                    <i id="test">业务新闻</i>
                </span>
        	</router-link>
            <router-link to="/market" tag="div" class="flex-item market" active-class="active">
				<span>
                    <i id="test">市场主体</i>
                </span>
        	</router-link>
        	<router-link to="/fund" tag="div" class="flex-item fund" active-class="active">
				<span>
                    <i id="test">资金流动</i>
                </span>
        	</router-link>
            <router-link to="/post" tag="div" class="flex-item post-box" active-class="active">
				<span>
                    <i id="test">我要投资</i>
                </span>
        	</router-link>
        </footer>
    </div>
</template>

<script>

	

	export default {
		name:'Footer'
	}
</script>

<style>
    @import '../../static/css/footer.css'
</style>