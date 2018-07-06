<template>
  <div class="mbody" :id="theme">
    <div class="menu">
      <ul>
        <li @click="menuChange('mBody')">个性推荐</li>
        <li @click="menuChange('musicList')">歌单</li>
        <li @click="menuChange('transceiver')">主播电台</li>
        <li @click="menuChange('rankings')">排行榜</li>
        <li @click="menuChange('singer')">歌手</li>
        <li class="active">最新音乐</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:'bodyList',
  data(){
    return{

    }
  },
  computed: {
    theme() {
      return this.$store.state.theme
    }
  },
  methods: {
    menuChange(value){//菜单跳转
      this.$router.push({
          name: value
      });
    }
  }
}
</script>
<style lang="scss">
@import '../style/newest';
</style>