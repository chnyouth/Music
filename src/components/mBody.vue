<template>
  <div class="mbody" :id="theme">
    <div class="menu">
      <ul>
        <li class="active">个性推荐</li>
        <li @click="menuChange('musicList')">歌单</li>
        <li @click="menuChange('transceiver')">主播电台</li>
        <li @click="menuChange('rankings')">排行榜</li>
        <li @click="menuChange('singer')">歌手</li>
        <li @click="menuChange('newest')">最新音乐</li>
      </ul>
    </div>
		<div></div>
    <v-banner :imgs="this.imgs"  v-if="imgs.length!=0"></v-banner>
		<div class="commend"><span>更多></span>推荐歌单</div>
    <s-sheet></s-sheet>
  </div>
</template>
<script>
import vBanner from './banner.vue'
import sSheet from './musicList/songSheet.vue'
import urlConfig from '../urlConfig.vue'
import axios from 'axios'
export default {
  name:'bodyList',
  data(){
    return{
			imgs: [],
			myId:'100'
    }
	},
  components:{
    vBanner,
    sSheet
  },
	created:function(){
		let that = this;
      axios.get(urlConfig.url+'banner',{
        params:{

        }
      })
      .then(function(res){
				that.imgs=res.data.banners
      })
      .catch(function(err){
				console.log(err)
      })
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
    },
    init(){
      
    }
  },
  mounted(){
    this.init();
  },
  watch:{
    '$route' (to, from){
      this.init();
    }
  }
}
</script>
<style lang="scss">
@import '../style/body';
</style>
