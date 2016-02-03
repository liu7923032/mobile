'use strict'

import Project from './views/Project.vue'
import Index from './views/Index.vue'

export default function(router){
    router.map({
        '/':{				//首页
            name:'index',
            auth:true,
            component:Index
        },
        // 首页
        '/index':{
            name:'index',
            auth:true,
            component:Index
        },
        // 项目
        '/project':{
            name:'project',
            auth:true,
            component:Project
        },
        // 工作日志
        '/worklog':{
            name:'worklog',
            auth:true,
            component:require('./views/WorkLog.vue')
        },
        // 个人信息
        '/userinfo':{
            name:'userinfo',
            auth:true,
            component:require('./views/UserInfo.vue')
        },
        // 流程信息
        '/workflow':{
            name:'workflow',
            auth:true,
            component:require('./views/WorkFlow.vue')
        },
        // 登陆页面
        '/login':{
            name:'login',
            component:require('./views/Login.vue')
        },
        // 知识分享
        '/knownledge':{
            name:'comment',
            component:require('./views/Comment.vue')
        },
        /* 404路由 */
        '*': {
            name:'index',
            auth:true,
            component:Index
        }
        
    })
}