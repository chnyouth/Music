<template>
  <div class="musicBox" v-show="playBox">
    <a v-on:click="close" class="close iconfont">&#xe7af;</a>
    <div class="playMusic_top">
      <div class="musicScroll">
        <div class="song-disc">
          <div class="song-turn">
            <div class="song-rollwrap">
              <div class="song-img a-circling">
                <img class="u-img" src="http://p1.music.126.net/YLuPxIioBX6TneLAv8dr2Q==/109951163858116619.jpg?imageView&amp;thumbnail=380y380&amp;quality=100&amp;tostatic=0">
                </div>
            </div>
            <div class="song-lgour a-circling">
              <div class="song-light"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="musicIrc"></div>
    </div>
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
    this.nowMusic = JSON.parse(localStorage.getItem('nowMusic'))
    console.log(this.nowMusic)
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