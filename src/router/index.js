import Vue from 'vue'
import Router from 'vue-router'
import mBody from '../components/mBody.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mBody',
      component: mBody
    }
  ]
})
