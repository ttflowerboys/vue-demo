<template>
<div>
	<div class="header-box index"> 
      <header class="invest-header border-bottom">
          <span class="title">我要投资</span>
          <span  class="confirm"><input type="button" value="确定" id="submit-invest"></span>
      </header>
  	</div>
	<form id="form1">
	    <div class="invest-box">
	        <div class="invest-item">
	           <p class="name-item  border-bottom">
	               <span class="name">项目</span>
	               <input type="text" placeholder="请输入项目名称" class="input-item">
	           </p>
	            <p class="info-item">
	                <span class="name">内容</span>
	                <textarea class="invest-info" placeholder="请描述您的投资意向"></textarea>
	            </p>
	        </div>

	        <div class="invest-item">
	            <p class="name-item ">
	                <span class="name">意愿投资地</span>
	                <span class="city">
	                    <i id="project-city">武汉</i>
	                </span>
	                <i class="down"></i>
	                <!-- 城市选择 开始-->
	                <ul class="city-select border">
	                    <li value="武汉">武汉</li>
	                    <li value="长沙">长沙</li>
	                    <li value="合肥">合肥</li>
	                    <li value="南昌">南昌</li>
	                </ul>
	                <!-- 城市选择 结束-->
	            </p>
	        </div>

	        <div class="invest-item">
	            <p class="name-item  border-bottom">
	                <span class="name" >姓名</span>
	                <input type="text"  class="input-item">
	            </p>
	            <p class="name-item  border-bottom">
	                <span class="name">手机号</span>
	                <input type="text"  class="input-item tel">
	                <input type="button" value="发送验证码" class="send">
	            </p>
	            <p class="name-item">
	                <span class="name">验证码</span>
	                <input type="text" placeholder="请输入验证码" class="input-item">
	            </p>
	        </div>
	    </div>
	</form>
</div>
</template>

<script>
	export default {
		name: 'Post'
	}
</script>

<style scoped>
	.index-header { 
		display: none;
	}
	.header-box.index>.invest-header{
		display: block;
	}
	
</style>