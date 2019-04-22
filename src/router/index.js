import Vue from 'vue'
import Router from 'vue-router'

const Testing = () => import('@/Views/Testing')
const Stage = () => import('@/Views/Stage')
const Form = () => import('@/Views/Form')

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Stage',
      component: Stage
    },
    {
      path: '/testing',
      name: 'Testing',
      component: Testing
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    }
  ]
})
