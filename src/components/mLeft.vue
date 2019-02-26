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
    <div class="playBox" v-if="this.nowMusic!=''">
      <div class="playleft" v-on:click="showPlayBox">
        <img :src="this.nowMusic.al.picUrl">
      </div>
      <div class="playright">
        <em>{{this.nowMusic.name}}</em>
        <i v-for="( item , index ) in nowMusic.ar" :key="index">{{item.name}}<em v-if="index!=0" style="display:inline;">/</em></i>
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
    eventBus.$on('nowMusic', msg => {that.nowMusic = msg
    console.log(msg)})//取出当前播放的音乐数据
    
  },
  methods: {
    showPlayBox(){
      eventBus.$emit('playBox',true)
    }
  }
}
</script>
<style lang="scss">
@import '../style/left';
</style>