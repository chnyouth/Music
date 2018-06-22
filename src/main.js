import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    musicList: {'musicData': []},
    theme: 'red',
    isPlaying: false,
    nowPlayIndex: 0,
    showMiniAudio: true,
    commendList: {'commendList': []},
    curTimeNum: 0,
    showPlay: false,
    showAbout: false,
    showLogin: false,
    day: {'musicData': []},
    theme: ''
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
