import Vue from 'vue'

import Router from 'vue-router'
import myView from './views/MyView.vue'
import
homeView
from './views/Home.vue'
import {  aside } from 'vue-strap'


    // 1:创建启动的版本

Vue.use(Router)

var router = new Router({
        hashbang: true,
        // root:'/home',
        // history:true,
        saveScrollPosition:true
})
    // 路由器需要一个根组件。
    // 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({
	data() {
        return {
            isShow: false,
            effect:'fade'
		}
	},
	components: {
	    aside
	}
})



// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置


// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/user': {
        component: myView
    },
    '/home': {
        component: homeView
    }
})


router.redirect({
	"*":'/home'
})

router.afterEach(function(transition) {
    console.log('成功浏览到: ' + transition.to.path)
})


// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
