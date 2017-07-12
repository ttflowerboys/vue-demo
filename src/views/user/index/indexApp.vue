<template>
  <div>
      <ZHeader></ZHeader>
      <div class="w clearfix">
        <div class="aside">
          <el-tree class="myTree" :data="tree" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :indent="10"></el-tree>
        </div>
        <div class="Main">
          <h1 class="title">名标名录管理</h1>

          <Form :model="formItem" class="clearfix">
              <Form-item label="地域:">
                  <Select v-model="formItem.select" placeholder="全部">
                      <Option value="1">武汉市工商局</Option>
                      <Option value="2">合肥市工商局</Option>
                      <Option value="3">南昌市工商局</Option>
                      <Option value="4">长沙市工商局</Option>
                  </Select>
              </Form-item>
              <Form-item label="时间:">
                  <Date-picker type="date" placeholder="选择日期" v-model="formItem.startdate" style="width:132px"></Date-picker>
              </Form-item>
              <Form-item>
                  <Date-picker type="date" placeholder="选择日期" v-model="formItem.enddate" style="width:132px"></Date-picker>
              </Form-item>


              <Form-item label="关键字:">
                  <Input v-model="formItem.input" placeholder="请输入关键字"></Input>
              </Form-item>
              <button type="button" class="search-btn search-btn-red" @click="search()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命加载中">搜索</button>
              <div class="ivu-form-item">
                <button type="button" class="search-btn search-btn-red" @click="add()">增加</button>
                <!-- <button type="button" class="search-btn search-btn-red">编辑</button> -->
                <button type="button" class="search-btn search-btn-red" @click="deleteArr()">删除</button>
              </div>

          </Form>

          <div v-loading="loading" element-loading-text="拼命加载中">
            <div class="noData" v-show="list.length==0"></div>
            <div v-show="list.length>0" v-loading="tableLoading">
              <Table border :columns="columns4" :data="list" stripe></Table>
              <div style="margin: 10px;overflow: hidden">
                  <div style="float: right;">
                      <Page :total="listLength" :page-size="5" :current="1" @on-change="changePage"></Page>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>

  </div>
</template>

<script>
  import ZHeader from 'components/header';

  import { Notice,Form,Table,Button,Modal,Message } from 'iview';
  import { Tree,Loading } from 'element-ui'

  import { asideListData } from 'src/service/getData.js'

  import ajax from 'src/assets/js/ajax.js'

  export default {
    name: 'user',
    components: {
      ZHeader,
      Tree
    },
    data () {
      return {
        list: [],
        listLength:0,
        columns4: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                title: '序号',
                width: 80,
                align: 'center',
                key: 'id'
            },
            {
                title: '标题',
                key: 'title'
            },
            {
                title: '更新时间',
                key: 'addtime',
                width: 148,
                render: (h, params) => {
                    return h('div', this.formatDate(this.list[params.index].addtime));
                }
            },
            {
                title: '发布者',
                width: 100,
                key: 'author'
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.show(params.index)
                                }
                            }
                        }, '查看'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(this.list[params.index].id)
                                }
                            }
                        }, '删除')
                    ]);
                  }
            }
        ],
        formItem: {
          input: '',
          select: ''
        },
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        loading: false,
        tableLoading: false,
        fullscreenLoading: false
      }
    },
    mounted(){
      this.checkStatus()
    },
    methods: {
      checkStatus(){
        if(!localStorage.getItem('seccLogin')) {
          location.href = '/views/login/index.html'
        }else{
          asideListData().then(res => {
            this.tree=res;
          })
          this.getList()
        }
      },
      getList(){
        var self = this;
        this.loading = true;
        ajax({
          url: 'list.php',
          success: function (res){
            self.list = res.data;
            self.listLength = res.total;
            setTimeout(()=>{
              self.loading = false;
            },10);
          }
        });
      },
      handleNodeClick(data) {
        this.$Notice.success({desc: '你点击了：'+data.label});
      },
      add(){
        this.$Message.loading({
          content: '我要去添加信息。。。',
          duration: 3,
          onClose: function(){
            location.href="/views/user/add.html"
          }
        });
      },
      show (index) {
          this.$Modal.info({
              title: '标题信息',
              content: `标题：${this.list[index].title}
              <br>更新时间：${this.formatDate(this.list[index].addtime)}
              <br>发布者：${this.list[index].author}
              <br>内容：${this.list[index].content}`
          })
      },
      remove (id) {
          var self = this;
          this.$alert('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            confirmButtonText: '确定',
            callback: action => {
              if (action === 'confirm') {
                // run your code.
                ajax({
                  url: 'do.php',
                  type: 'post',
                  data: {action:'remove',id:id},
                  success: function (res){
                    if (res.status == 1) {
                      self.$Notice.success({desc: '操作成功！'});
                      self.getList()
                    }else{
                      self.$Notice.error({desc: '糟糕，出现了一个惊天大BUG!'});
                    }
                  }
                })
              }
            }
          });
          //this.list.splice(index, 1);
      },
      changePage (page) {
        var self = this;
        this.tableLoading = true;
        ajax({
          url: 'list.php',
          params: {'page':page},
          success: function (res){
            self.list = res.data;
            setTimeout(()=>{
              self.tableLoading = false;
            },10);
          }
        });
      },
      search (){
        var self = this;
        // if (this.formItem.input == '') {
        //   this.$Notice.error({desc: '关键字不能为空'});
        //   return false;
        // }
        this.fullscreenLoading = true;
        ajax({
          url: 'do.php',
          type: 'post',
          data: {
            action:'search',
            title: self.formItem.input,
            startdate: self.formItem.startdate,
            enddate: self.formItem.enddate
          },
          success: function (res){
            if (res.status == 1) {
              self.list = res.data;
              self.listLength = res.total;
              self.fullscreenLoading = false;
            }else{
              self.$Notice.error({desc: '糟糕，出现了一个惊天大BUG!'});
            }
          },
          error: function(req){
            self.fullscreenLoading = false;
            self.$Notice.error({desc: '糟糕，出现了一个惊天大BUG!'});
          }
        })
      },
      deleteArr () {
        this.$Notice.info({desc: '稍等，正在开发中。。。'});
      },
      formatDate (date) {
          const time = new Date(parseInt(date) * 1000)
          let y = time.getFullYear();
          let m = this.addZero(time.getMonth() + 1);
          let d = this.addZero(time.getDate());
          let h = this.addZero(time.getHours());
          let mm = this.addZero(time.getMinutes());
          let s = this.addZero(time.getSeconds());
          return y + '-' + m + '-' + d + ' ' + h + ':' + mm;
      },
      addZero (val) {
        return val = val < 10 ? ('0' + val) : val;
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
  .header{
    position: relative!important;
  }
  .header-wrap{
    width: 100%;
    height: 300px;
    background: url('~assets/images/user.jpg') top center no-repeat;
    max-width: 1920px;
    margin: 0 auto;
  }

  .ivu-form-item{float: left;margin-right: 10px;margin-bottom: 16px;}
  .ivu-input,.ivu-select-single .ivu-select-selection{
    border: 1px solid #ddd;
    border-radius: 5px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#f8f8f8));
  }
  .ivu-form .ivu-form-item-label{
    font-size: 16px;
  }
  .ivu-form-item-content{
    float: left;
  }
  .ivu-select-dropdown{
    width: auto!important;
    left: 0!important;
    font-size: 14px!important;
  }
  .ivu-select-item{font-size: 16px!important;}
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
    font-size: 16px!important;
  }
  .ivu-select-single .ivu-select-selection{
    width: 66px;
  }
  .myTree{
    .el-tree-node__expand-icon{
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -6px;
      &:after{
        position: absolute;
        top: -6px;
        left: -9px;
        content: "";
        width: 0;
        height: 0;
        z-index: 2;
        overflow: hidden;
        display: block;
        border: 6px solid transparent;
        border-right-width: 0;
        border-left-color: #fff;
        border-left-width: 7px;
      }
    }
    .el-tree-node__content{
      position: relative;
      border-bottom: 1px solid #d1dbe5;
      &:hover{
        .el-tree-node__expand-icon:after{
          border-left-color: #e4e8f1;
        }
      }
    }
    .el-tree-node__label{
      margin-left: 16px;
    }
    .is-current{
      .el-tree-node__label{
        color: #f03;
      }

    }

  }
</style>
