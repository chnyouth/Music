<template>
  <div class="musicType">
    <div class="musicTypeAll">
      <span>全部歌单 <i class="iconfont">&#xe603;</i></span>
      <div class="model">
        <p>添加标签</p>
        <a href="javascript:;">全部歌单</a>
        <div class=""></div>
      </div>
    </div>
    <div class="hotType">热门标签：<a href="javascript:;" v-for="(item,index) in hotTags" :key="index">{{item.name}}</a></div>
    <ul>
      <li v-for="(item,index) in musicList" v-bind:key="index">
        <div class="imgBox">
          <span><i class="iconfont">&#xe647;</i> {{item.playCount>10000?(((item.playCount-item.playCount%1000)/10000+'万')):(item.playCount)}}</span>
          <a href="javascript:;" :style="{backgroundImage: 'url(' + bg2 + ')' }" v-on:click="getSongsheetList(item.id)"></a>
          <img :src="item.coverImgUrl">
        </div>
        <div class="title">{{item.name}}</div>
      </li>
    </ul>
    <div class="page">
      <span class="iconfont">&#xe604;</span>
      <a href="">1</a>
      <a href="">2</a>
      <span class="iconfont">&#xe606;</span>
    </div>
  </div>
</template>
<script>
import urlConfig from '../../urlConfig.vue';
import axios from 'axios';
import MC from 'mcanvas';
import Bg2 from '../../public/iconall.png';
export default {
  name:'bodyList',
  data(){
    return{
        bg2:Bg2,
        hotTags:[],
        musicList:[]
    }
	},
	created:function(){

	},
  computed: {

  },
  methods: {
    init(){
      let that = this;
      // axios.get(urlConfig.url+'playlist/catlist',{//获取歌单分类
      //   params:{

      //   }
      // })
      // .then(function(res){
      //   // console.log(res)
      //   if(res.data.code==200){
      //     that.musicList = res.data.result
      //   }else{
      //     // console.log(res.statusText)
      //   }
      // })
      // .catch(function(err){
			// 	console.log(err)
      // })


      axios.get(urlConfig.url+'playlist/hot',{//热门歌单分类
        params:{

        }
      })
      .then(function(res){
        if(res.data.code==200){
          // console.log(res.data.tags)
          that.hotTags = res.data.tags
        }else{
          console.log(res.statusText)
        }
      })
      .catch(function(err){
				console.log(err)
      })

      axios.get(urlConfig.url+'top/playlist',{//热门歌单分类
        params:{
          limit:100,
          offset:1,
          order:'hot'
        }
      })
      .then(function(res){
        if(res.data.code==200){
          console.log(res)
          that.musicList = res.data.playlists
        }else{
          console.log(res.statusText)
        }
      })
      .catch(function(err){
				console.log(err)
      })
    
    },
    getSongsheetList(value){
      let that = this;
      axios.get(urlConfig.url+'playlist/detail',{//获取歌单详细
        params:{
          id:value
        }
      })
      .then(function(res){
        if(res.data.code==200){
          // localStorage.setItem('musicList',JSON.stringify(res.data.result.tracks))
          that.$store.commit('getMusicList', res.data.result.tracks)
          that.$store.commit('isPlay', true)
        }else{
          console.log(res.statusText)
        }
      })
      .catch(function(err){
				console.log(err)
      })
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
@import '../../style/musicType';
</style>