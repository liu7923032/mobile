'use strict'

export default function(router){
    router.map({
        '/':{				//首页
            name:'home',
            component:require('./views/Home.vue')
        },
        '/home':{
            name:'home',
            component:require('./views/Home.vue')
        },
        '/userInfo':{
            name:'userInfo',
            component:require('./views/MyView.vue'),
            auth:true
        },
        '/login':{
            name:'login',
            component:require('./views/Login.vue')
        },
        /* 404路由 */
        '*': {
            component: require('./views/MyView.vue')
        }
        
    })
}