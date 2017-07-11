<template>
  <div class="login">
      <ZHeader></ZHeader>
      <div class="section vertical">
        <div class="content-1">
          <h2 class="title">欢 迎 来 到 政 务 云 平 台</h2>
          <form>
            <div class="items"><input class="login-ipt" type="text" placeholder="手机号" autocomplete="off" autofocus="autofocus" v-model="login.phone"/></div>
            <div class="items"><input class="login-ipt login-ipt-v" type="text" placeholder="图形验证码" autocomplete="off" v-model="login.codeVerify"/>
              <a href=""><img src=""/></a>
            </div>
            <div class="items"><input class="login-ipt login-ipt-v" type="text" placeholder="验证码" autocomplete="off"  v-model="login.verify"/>
              <a href="javascript:;" @click="sendSMS()">{{sendString}}</a>
            </div>

            <div class="items"><button class="login-commit" type="button" @click="checkUser()">登 录</button></div>
          </form>
        </div>
      </div>
      <div class="copyright">
          地址: 武汉市江汉区香港路259号 邮编: 430015 鄂ICP备10041712号 技术支持：武汉中润普达<br> Copyright 2016 © All rights reserverd by WuHan Administrator
          for Industry &amp; Commerce Powered by ZRPD
      </div>
  </div>
</template>

<script>
  import ZHeader from 'components/header';

  import { Notice } from 'iview';



  export default {
    name: 'login',
    components: {
      ZHeader,
      Notice
    },
    data() {
      return {
        login:{
          phone: '',
          verify: '',
          codeVerify: ''
        },
        sendString: '发送验证码'
      }
    },
    methods:{
      verifyPhone(){
        if (this.login.phone=='' || this.login.phone< 13000000000 || this.login.phone>18999999999) {
          this.$Notice.error({desc: '手机号不正确'});
          return false;
        }else{
          return true;
        }
      },
      verifySMS(){
        if (this.login.verify=='' || this.login.verify.length<6) {
          this.$Notice.error({desc: '手机验证码不正确'});
          return false;
        }else{
          return true;
        }
      },
      verifyCode(){
        if (this.login.codeVerify == '' || this.login.codeVerify < 6) {
          this.$Notice.error({desc: '请输入图形验证码：123123'});
          return false;
        }else{
          return true;
        }
      },
      checkUser(){
        const _this = this;
        if (this.verifyPhone() && this.verifyCode() && this.verifySMS()) {
          this.$store.dispatch('login',this.login).then(function(){
              //console.log(JSON.stringify(_this.$store.state))
              if(_this.$store.state.login.seccLogin){
                  _this.$Notice.success({
                    desc: '登录成功！',
                    onClose: function(){
                      localStorage.setItem('seccLogin',1)
                      location.href = '/views/user/index.html';
                    }
                  });
                  _this.$store.state.login.seccLogin = 0;

              }else{
                  _this.$Notice.error({desc: '登录失败！'});
              }
          })
        }
      },
      sendSMS(){
        if (this.verifyPhone() && this.verifyCode()) {
          this.sendString = '正在发送验证码';
          this.$Notice.success({desc: '手机验证码：123456'});
        }
      }
    }
  }
</script>

<style lang="less">
  html, body {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .login{
    width: 100%;
    height: 100%;
    background: url('~assets/images/login.jpg') center no-repeat;
    background-size: cover;
    &-ipt {
      height: 56px;
      line-height: 54px;
      padding: 0 1em;
      border: 1px solid transparent;
      border-radius: 5px;
      background-color: rgba(44, 72, 121, 0.302);
      color: #5d6ea2;
      float: left;
      width: 334px;
      &::-webkit-input-placeholder{
        color: #445075;
      }
      &-v{
        width: 210px;
      }
      &:focus {
        border-color: #187ba3;
      }
    }
    &-commit{
      width: 100%;
      height: 56px;
      line-height: 54px;
      padding: 0 1em;
      text-align: center;
      border-radius: 5px;
      font-size: 20px;
      color: #FFFFFF;
      background-color: #ee0033;
      background-image: -webkit-linear-gradient(90deg, #ee0033 0%, #ff0033 100%);
      background-image: linear-gradient(90deg, #ee0033 0%, #ff0033 100%);
      display: block;
    }
    .section {
      width: 550px;
      height: 100%;
      position: absolute;
      left: 36%;
      top: 0;
      margin-left: -275px;
    }
    .content-1 {
      width: 100%;
      height: 460px;
      .title{
        line-height: 1;
        font-size: 36px;
        color: #fcf6ed;
        text-align: center;
        margin-bottom: 70px;
      }
      .items{
        width: 344px;
        margin: 0 auto 20px;
        font-size: 16px;
        overflow: hidden;
      }
      a {
        width: 120px;
        height: 56px;
        border-radius: 5px;
        float: right;
        font-size: 16px;
        line-height: 56px;
        text-align: center;
        color: #fffefe;
        background-color: #bdbdbd;
        &:hover {
          background-color: #ababab;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
  }
  .copyright{
    position: fixed;
    bottom: 32px;
    width: 100%;
    font-size: 12px;
    line-height: .2rem;
    text-align: center;
    color: #3c5373;
  }

</style>
