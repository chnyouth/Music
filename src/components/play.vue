<template>
  <div class="musicBox blur" :style="`background:url(${nowMusic.album.picUrl}) no-repeat #fff center 20%;`">
    <div class="musicBoxMask">11</div>
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
        nowMusic:[]
    }
  },
  created(){
    let that = this
    eventBus.$on('nowMusic', function (msg) {
      that.nowMusic = msg
    })
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
@import '../style/play';
</style>