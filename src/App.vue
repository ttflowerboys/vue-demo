<template>
  <div id="wrap">
      <div id="main">
          <HeaderView v-show="headShow"></HeaderView>

          
            <router-view></router-view>
          

          <FooterView v-show="footerShow"></FooterView>
      </div>
  </div> 
</template>

<script>
import HeaderView from './components/Header.vue'
import FooterView from './components/Footer.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed:mapGetters([
      'headShow',
      'footerShow'
  ]),
  mounted(){
    var path=this.$route.path.substring(1);
      this.headerChange(path);
      this.footerChange(path);
  },
  watch:{
    $route(to){
      var path=to.path.substring(1);
      this.headerChange(path);
      this.footerChange(path);
    }
  },
  methods:{
    headerChange(path){
      if(path=='post' || path.indexOf('article')!=-1){
        this.$store.dispatch('SHOW_HEAD_FAIL')
      }else{
        this.$store.dispatch('SHOW_HEAD_SUCC')
      }
    },
    footerChange(path){
      if(path.indexOf('article')==-1){
        this.$store.dispatch('showFooter');
      }else{
        this.$store.dispatch('hideFooter');
      }
    }
  },
  components: {
    HeaderView,
    FooterView
  }
}
</script>






