export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'mockManage',
      displayName: '动态mock',
      meta: {
        iconClass: 'fa-tasks',
      },
    },
    {
      name: 'applicationManage',
      displayName: '应用管理',
      meta: {
        iconClass: 'fa-tasks',
      },
    },
    {
        name: 'userManual',
        displayName: '使用手册',
        meta: {
            iconClass: 'fa-chain',
        },
    },
  ],
}
