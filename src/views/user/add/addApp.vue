<template>
  <div>
      <ZHeader></ZHeader>
      <div class="w clearfix">
        <div class="aside">
          aside
        </div>
        <div class="Main">
          <h1 class="title">名标名录管理</h1>

          <Form :model="form" label-position="right" :label-width="100">
              <Form-item label="标题:">
                  <Input v-model="form.title"></Input>
              </Form-item>
              <Form-item label="介绍:">
                  <Input v-model="form.content" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入..."></Input>
              </Form-item>
              <Form-item label="附件:">
                <Upload
                 :show-upload-list="true"
                 action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
              </Form-item>
              <Form-item>
                  <Button type="primary" @click="handleSubmit()">提交</Button>
                  <Button type="ghost" @click="handleReset()" style="margin-left: 8px">重置</Button>
              </Form-item>
          </Form>





        </div>
      </div>

  </div>
</template>

<script>
  import ZHeader from 'components/header';

  import { Notice,Form,Upload } from 'iview';

  import ajax from 'src/assets/js/ajax.js'


  export default {
    name: 'user',
    components: {
      ZHeader
      // ,Notice,
      // Form
    },
    data () {
      return {
        form: {
          title: '',
          content: ''
        }
      }
    },
    methods: {
      handleSubmit () {
        var self = this;
        if (this.checkTitle() && this.checkContent()) {
          ajax({
            url: 'do.php',
            type: 'post',
            data: {
              action: 'add',
              title: self.form.title,
              content: self.form.content
            },
            success: function (res){
              if (res.status == 1) {
                self.$Notice.success({desc: res.info});
              }else{
                self.$Notice.error({desc: '糟糕，出现了一个惊天大BUG!'});
              }
            }
          })
        }
      },
      handleReset () {
        this.form.title=''
        this.form.content=''
      },
      checkTitle(){
        if (this.form.title == '') {
          this.$Notice.error({desc: '标题不能为空'});
          return false;
        }else if(this.form.title.length<6){
          this.$Notice.error({desc: '标题长度大干6个字符'});
          return false;
        }else{
          return true;
        }
      },
      checkContent(){
        if (this.form.content == '' || this.form.content.length<5) {
          this.$Notice.error({desc: '内容太少啦！'});
          return false;
        }else{
          return true;
        }
      }
    }

  }
</script>

<style lang="less">
  .w{
    position: relative;
    width: 1080px;
    margin: 20px auto 50px;
    .aside{
      width: 220px;
      float: left;
    }
    .Main{
      width: 830px;
      float: right;
      .title{
        font-weight: bold;
        font-size: 20px;
        height: 58px;
        line-height: 32px;
        border-bottom: 1px solid #ddd;
        color: #ff0033;
        padding: 20px 0 5px;
        margin-bottom: 20px;
      }
      .search{
        padding-top: 20px;
        &-btn{
          text-align: center;
          display: inline-block;
          background-color: #fb0033;
          border-radius: 5px;
          font-size: 15px;
          color: #fff;
          padding: 0 18px;
          &-red{
            border: 1px solid #f03;
            margin-top: 0;
            height: 34px;
            background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fe0034), to(#ee0032));
          }
        }
      }
    }
  }
  .header-wrap{
    width: 100%;
    height: 300px;
    background: url('~assets/images/user.jpg') top center no-repeat;
    max-width: 1920px;
    margin: 0 auto;
  }

  .ivu-input,.ivu-select-single .ivu-select-selection{
    border: 1px solid #ddd;
    border-radius: 5px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#f8f8f8));
  }
  .ivu-form-item-content{
    margin-left: 0;
  }
  .ivu-form-item-label{
    font-size: 16px!important;
  }
</style>
