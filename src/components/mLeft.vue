<template>
  <div class="leftBox">
    <p>推荐</p>
    <ul>
      <li>
        <a href=""><i class="iconfont">&#xe602;</i>发现音乐</a>
      </li>
      <li>
        <a href=""><i class="iconfont">&#xe7c0;</i>私人FM</a>
      </li>
      <li>
        <a href=""><i class="iconfont">&#xeaba;</i>视频</a>
      </li>
      <li>
        <a href=""><i class="iconfont">&#xe7e3;</i>朋友</a>
      </li>
    </ul>
    <div class="playBox">
      <div class="playleft">
        <img :src="this.nowMusic.album.picUrl">
      </div>
      <div class="playright">
        <em>{{this.nowMusic.name}}</em>
        <i>{{this.nowMusic.artists[0].name}}</i>
      </div>
    </div>
  </div>
</template>
<script>
import eventBus from './public/eventBus.vue';
export default {
  name:'mLeft',
  props:{
      
  },
  data(){
    return{
        nowMusic:[]
    }
  },
  created(){
    let that = this
    eventBus.$on('nowMusic', function (msg) {//取出当前播放的音乐数据
      that.nowMusic = msg
    })
  },
  methods: {

  }
}
</script>
<style lang="scss">
@import '../style/left';
</style>