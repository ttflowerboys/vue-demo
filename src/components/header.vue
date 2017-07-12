<template>
  <header class="header-wrap">
    <div class="header">
      <a class="logo-1 left vertical" href="index.html"></a>
      <div class="loginBar-1 right">
        <div class="list-box vertical">
          <div class="tx-box left"></div>
          <div class="list-tit" v-if="status">江城工商</div>
          <div class="list-cont" v-if="status">
            <div class="list-items">
              <a href="">个人中心</a>
              <a href="javascript:;" @click="logout()">退出</a>
            </div>
          </div>
          <div class="list-tit" v-else @click="goLogin()">请登录</div>
        </div>
      </div>
      <div class="header-1-nav right">
        <ul>
          <li>
            <div class="list-box">
              <div class="list-tit">信息门户</div>
              <div class="list-cont">
                <div class="list-items">
                  <a href="">通知公告</a>
                  <a href="">政务信息</a>
                  <a href="">业务信息</a>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="list-box">
              <div class="list-tit">工作交流</div>
              <div class="list-cont">
                <div class="list-items">
                  <a href="">知识云</a>
                  <a href="">视频会议</a>
                  <a href="">在线沟通</a>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="list-box">
              <div class="list-tit">业务协同</div>
              <div class="list-cont">
                <div class="list-items">
                  <a href="">12315消费维权协作</a>
                  <a href="">注册登记协作</a>
                  <a href="">商标保护协作</a>
                  <a href="">公平交易执法协作</a>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="list-box">
              <div class="list-tit">数据分析</div>
              <div class="list-cont">
                <div class="list-items">
                  <a href="">跨四市流动数据融合平台</a>
                  <a href="">新增主体户数对比分析</a>
                  <a href="">市场主体产业类型分析</a>
                  <a href="">市场主体活跃度分析</a>
                  <a href="">重点产业结构发展分析</a>
                  <a href="">企业年龄结构分析</a>
                  <a href="">企业及投资人族谱分析</a>
                  <a href="">四城市市场主体迁移分析</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="header-search-box right">
        <div class="search-icon"></div>
        <form class="nav_1_form vertical" style="display:none;">
          <input type="text" value="" placeholder="" />
          <input type="submit" value="" />
        </form>
      </div>
    </div>
  </header>
</template>

<script>

  var winResizeFn = function() {
    document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.clientHeight / 10.80 + "px";
  };
  winResizeFn();
  window.onresize = winResizeFn;

  import { Message,MessageBox } from 'element-ui'

  export default {
    name: 'header',
    data() {
      return {
        status: localStorage.getItem('seccLogin') ? true : false
      }
    },
    methods: {
      goLogin(){
        location.href = '/views/login/index.html'
      },
      logout() {
        var self = this;
          this.$alert('骚年, 确定要退出?', '提示', {
            type: 'warning',
            confirmButtonText: '确定',
            callback: action => {
              if (action === 'confirm') {
                // run your code.

                self.$message({
                  type: 'success',
                  message: `恭喜你，操作成功！`,
                  onClose: function(){
                    localStorage.clear()
                    location.href = '/views/login/index.html'
                  }
                });
              }
            }
          });
      }
    }
  }
</script>

<style lang="less">
  @import '~assets/css/common.less';
  @import '~assets/css/header.less';
</style>
