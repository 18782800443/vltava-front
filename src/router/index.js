import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'
import ToOtherPage from "../vltava-components/admin/ToOtherPage.vue";

Vue.use(Router)

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    {
      name: '*',
      path: '/demo',
      component: () => import('../pages/demo.vue'),
    },
    {
      name: 'applicationManage',
      path: '/applicationManage',
      component:()=>import('../pages/application/ApplicationManage.vue')
    },
    {
      name: 'coverageManage',
      path: '/coverageManage',
      component:()=>import('../pages/coverage/CoverageManage.vue')
    },
    {
      name: 'mockManage',
      path: '/mockManage',
      component:()=>import('../pages/mock/MockManage.vue')
    },
    {
      name: 'userManual',
      path:'/ToOtherPage',
      component:ToOtherPage
    },
  ],
})
