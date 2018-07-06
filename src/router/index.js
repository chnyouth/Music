import Vue from 'vue'
import Router from 'vue-router'
import mBody from '../components/mBody.vue'
import musicList from '../components/musicList.vue'
import newest from '../components/newest.vue'
import rankings from '../components/rankings.vue'
import singer from '../components/singer.vue'
import transceiver from '../components/transceiver.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mBody',
      component: mBody
    },
    {
      path: '/musicList',
      name: 'musicList',
      component: musicList
    },
    {
      path: '/newest',
      name: 'newest',
      component: newest
    },
    {
      path: '/rankings',
      name: 'rankings',
      component: rankings
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },
    {
      path: '/transceiver',
      name: 'transceiver',
      component: transceiver
    }
  ]
})
