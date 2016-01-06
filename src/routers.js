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
        '/project':{
            name:'project',
            component:require('./views/Project.vue')
        },
        '/worklog':{
            name:'worklog',
            component:require('./views/Home.vue')
        },
        '/userinfo':{
            name:'userinfo',
            component:require('./views/UserInfo.vue'),
            auth:true
        },
        '/workflow':{
            name:'workflow',
            component:require('./views/WorkFlow.vue')
        },
        '/login':{
            name:'login',
            component:require('./views/Login.vue')
        },
        /* 404路由 */
        '*': {
            component: require('./views/Home.vue')
        }
        
    })
}