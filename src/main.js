import Vue from 'vue'

import Router from 'vue-router'
//配置路由规则
import routerMap from './routers'

import FastClick from 'fastclick'
//加载触摸插件
import VueTouch from './plugns/vTouch'

//加载数据请求组件
import VueResource from 'vue-resource'

//加载weui

    // 1:创建启动的版本


Vue.use(Router)
Vue.use(VueTouch)
Vue.use(VueResource)

var router = new Router({
        hashbang: true,
        // root:'/home',
        // history:true,
        saveScrollPosition:true
})
    // 路由器需要一个根组件。
    // 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({
    
});

//设置访问的地址
Vue.http.options.root = 'http://ht.mdsd.cn:9000/api';


// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置


// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
//注册路由
routerMap(router);

// router.redirect({
// 	"*":'/home'
// })



//权限检查
router.beforeEach(transition => {
    //处理左侧滚动不影响右边
    // $("html, body, #page").removeClass("scroll-hide");
    FastClick.attach(document.body);

    if (transition.to.auth) {
        if (localStorage.userId) {
            transition.next();
        } else {
            var redirect = encodeURIComponent(transition.to.path);
            transition.redirect('/login?redirect=' + redirect);
        }
    } else {
        transition.next();
    }
})


// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
