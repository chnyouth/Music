<template>
  <div class="musicBox" v-show="playBox">
    <a v-on:click="close"></a>
  </div>
</template>
<script>
import eventBus from './public/eventBus.vue';
export default {
  name:'play',
  props:{
      
  },
  data(){
    return{
        nowMusic:[],
        playBox:false
    }
  },
  created(){
    let that = this
    eventBus.$on('nowMusic', function (msg) {
      that.nowMusic = msg
    })
    eventBus.$on('playBox', msg => {that.playBox = msg})//取出当前播放的音乐数据
  },
  methods: {
    close(){
      this.playBox = false//关闭播放页面
    }
  }
}
</script>
<style lang="scss">
@import '../style/play';
</style>