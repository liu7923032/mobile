<template>
  <div class="page" transition="app">
    <nav-bar text="首页"></nav-bar>
    
    <div class="page-bd space">
      <div class="title">
        <h3>信息管理系统移动版</h3>
        <p>麦迪斯顿医疗科技</p>
      </div>
      <grids>
          <grid v-for="item in items" :router-link="{path: '/' + item.link}" :image-url="item.image" :label="item.text"></grid>
      </grids>
    </div>
</div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import {Grids,Grid} from 'vue-weui'

export default {
  name: 'index',
  components: {
    NavBar,
    Grids,
    Grid
  },
  data () {
    return {
      items: [{
        link: 'project',
        text: '项目',
      }, {
        link: 'cell',
        text: '日志'
      }, {
        link: 'toast',
        text: '流程'
      }, {
        link: 'dialog',
        text: '个人'
      }, {
        link: 'progress',
        text: 'Progress'
      }, {
        link: 'login',
        text: '登陆'
      }, {
        link: 'article',
        text: 'Article'
      }, {
        link: 'actionsheet',
        text: 'ActionSheet'
      }, {
        link: 'icons',
        text: 'Icons'
      }, {
        link: 'dialog',
        text: 'Dialog'
      }, {
        link: 'progress',
        text: 'Progress'
      }, {
        link: 'msg',
        text: 'Msg'
      }, {
        link: 'article',
        text: 'Article'
      }, {
        link: 'actionsheet',
        text: 'ActionSheet'
      }, {
        link: 'icons',
        text: 'Icons'
      }, {
        link: 'icons',
        text: 'Icons'
      }, {
        link: 'dialog',
        text: 'Dialog'
      }, {
        link: 'progress',
        text: 'Progress'
      }, {
        link: 'msg',
        text: 'Msg'
      }, {
        link: 'article',
        text: 'Article'
      }, {
        link: 'actionsheet',
        text: 'ActionSheet'
      }, {
        link: 'icons',
        text: 'Icons'
      }]
    }
  },

  route: {
    data ({ to }) {
    }
  },

  created () {
    // store.on('topstories-updated', this.update)
  },

  destroyed () {
    // store.removeListener('topstories-updated', this.update)
  },

  methods: {
    update () {
      // store.fetchItemsByPage(this.page).then(items => {
      //   this.items = items
      // })
    }
  },

  filters: {
  }
}
</script>

<style >
  .page-bd>.title{
    width: 100%;
    text-align: center;
    margin: 10px 0px;
  }

  .title>p{
    font-size: 12px;
  }
</style>
