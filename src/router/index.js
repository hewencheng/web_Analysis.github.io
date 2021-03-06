import Vue from 'vue'
import Router from 'vue-router'
//登录
import login from '@/components/Login/Login'
//主页
import home from '@/components/Home/home'
import Hitmovies from '@/components/Movie/Hitmovies'
import Scorechart from '@/components/Movie/Score-chart'
import CreateData from '@/components/Movie/CreateData'
import Hitmusic from '@/components/Music/Hitmusic'
import Fish_anchor from '@/components/Fish/Fish_anchor'
import Fish_Statistics from '@/components/Fish/Fish_Statistics'


Vue.use(Router)
export default new Router({
  routes: [
    // 登录
    {
      path: '/',
      name: 'login',
      component: login
    },
    // 主页
    {
      path: '/home',
      name: '/home',
      component: home,
      children: [
            { path: '/Hitmovies',
              component: Hitmovies,
              meta:{title:'豆瓣电影 Top 250'}},
            { path: '/Scorechart',
              component: Scorechart,
              meta:{title:'豆瓣数据分析'}},
            { path: '/CreateData',
              component: CreateData,
              meta:{title:'创建-数据'}},
            { path: '/Hitmusic',
              component: Hitmusic,
              meta:{title:'热门-音乐'}},
            { path: '/Fish_anchor',
              component: Fish_anchor,
              meta:{title:'主播-信息'}},
            { path: '/Fish_Statistics',
              component: Fish_Statistics,
              meta:{title:'创建-分析' +
                  '' +
                  '' +
                  ''}},
        ]},
    
    //功能
    // {
    //   path: '/FunctionalHome',
    //   name: 'FunctionalHome',
    //   component: FunctionalHome
    // },
    
  ]
})
