module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0)
      routes.push(...[
        {
          name: 'layout',
          path: '/',
          component: resolve(__dirname, 'pages/layout-view.vue'),
          children: [
            {
              name: 'home',
              path: '', // 空就是默认子路由
              component: resolve(__dirname, 'pages/views/home-view.vue')
            },
            {
              name: 'login',
              path: '/login',
              component: resolve(__dirname, 'pages/views/login-register-view.vue')
            },
            {
              name: 'register',
              path: '/register',
              component: resolve(__dirname, 'pages/views/login-register-view.vue')
            },
            {
              name: 'profile',
              path: '/profile/:username',
              component: resolve(__dirname, 'pages/views/profile-view.vue')
            },
            {
              name: 'settings',
              path: '/settings',
              component: resolve(__dirname, 'pages/views/settings-view.vue')
            },
            {
              name: 'article',
              path: '/article/:slug',
              component: resolve(__dirname, 'pages/views/article-view.vue')
            },
            {
              name: 'editor',
              path: '/editor',
              component: resolve(__dirname, 'pages/views/edit-article-view.vue'),
            },
            {
              name: 'update',
              path: '/editor/:slug',
              component: resolve(__dirname, 'pages/views/edit-article-view.vue'),
            }
          ]
        }
      ])
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3004
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}