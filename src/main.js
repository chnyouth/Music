import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';

Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    getMusicList: {'musicData': []},
    theme: 'red',
    isPlay: false,
    nowPlayIndex: 0,
    showMiniAudio: true,
    commendList: {'commendList': []},
    curTimeNum: 0,
    showPlay: false,
    showAbout: false,
    showLogin: false,
    day: {'musicData': []},
    theme: ''
  },
  mutations: {
    getMusicList(state,playload){
      state.getMusicList.musicData=playload
    },
    isPlay(state,playload){
      state.isPlay=playload
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
