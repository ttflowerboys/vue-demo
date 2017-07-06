<template>
  <div>
      <ZHeader></ZHeader>
      <div class="w clearfix">
        <div class="aside">
          aside
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
              <button type="button" class="search-btn search-btn-red">搜索</button>
              <div class="ivu-form-item">
                <button type="button" class="search-btn search-btn-red" @click="add()">增加</button>
                <button type="button" class="search-btn search-btn-red">编辑</button>
                <button type="button" class="search-btn search-btn-red">删除</button>
              </div>

          </Form>

          <div class="noData" v-show="list.length==0"></div>
          <div v-show="list.length>0">
            <Table border :columns="columns4" :data="list"></Table>
          </div>



        </div>
      </div>

  </div>
</template>

<script>
  import ZHeader from 'components/header';

  import { Notice,Form,Table,Button,Modal } from 'iview';



  export default {
    name: 'user',
    components: {
      ZHeader
      // ,Notice,
      // Form
    },
    data () {
      return {
        list:[
          {
              no: 1,
              title: '北京市朝阳区芍药居',
              name: '王小明',
              uptime: '2017-1-7'
          },
          {
              no: 2,
              title: '北京市朝阳区芍药居',
              name: '王明',
              uptime: '2017-2-7'
          }
        ],
        columns4: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                title: '序号',
                key: 'no'
            },
            {
                title: '标题',
                key: 'title'
            },
            {
                title: '更新时间',
                key: 'uptime'
            },
            {
                title: '发布者',
                key: 'name'
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
                                    this.remove(params.index)
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
        }
      }
    },
    methods: {
      add(){
        location.href="/views/user/add.html"
      },
      show (index) {
          this.$Modal.info({
              title: '用户信息',
              content: `标题：${this.list[index].title}<br>更新时间：${this.list[index].uptime}<br>发布者：${this.list[index].name}`
          })
      },
      remove (index) {
          this.list.splice(index, 1);
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
</style>
