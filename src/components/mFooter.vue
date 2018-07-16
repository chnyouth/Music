<template>

  <div class="footerBox">
    <!-- <input type="text" v-on:keyup.space="submit" ref="input"> -->
    <div class="playIcon">
      <span class="iconfont">&#xe62e;</span>
      <span class="iconfont" @click="checkMusic">{{this.isPlay===true ? "&#xe674;":"&#xe62a;"}}</span>
      <span class="iconfont" @click="getType">&#xe62f;</span>
    </div>
    <audio autoplay controls
      :src="musicUrl"
      v-show="false"
      @ended="mEnd(false)"
      ref="audio"></audio>
    <div class="progress">
      <i>{{this.curTime*1000 | formatDate}}</i>
      <!-- <div class="progressBox"><span class="currbg"><em><i></i></em></span></div> -->
      <v-slider
        :value="curTime"
        :tolval="toltime"
        :width="width"
        :curr="parseFloat((this.curTime*1000 / this.toltime * this.width).toFixed())"
        @move="move"
      ></v-slider>
      <i>{{this.toltime | formatDate}}</i>
    </div>
    <div style="float:right;width:25rem;">
      <div class="value">
        <i class="iconfont">&#xe607;</i>
        <v-slider
          :value="100"
          :tolval="100"
          :width="70"
          :curr="this.val/100*70"
          @valMove="valMove"
        ></v-slider>
      </div>
      <div class="playType iconfont">
        &#xe620;
      </div>
      <div class="playList">
        <i class="iconfont" v-on:click="openMusicList()">&#xe75c;</i>
        <em class="" v-on:click="openMusicList()">{{musicList.length}}</em>
      </div>
    </div>
    <div class="musicListBox" v-show="musicListBox">
      <div class="title">
        <div class="close iconfont" v-on:click="openMusicList()">&#xe616;</div>
        <div class="type">
          <a href="javascript:;" :class="historyBox ? 'cur':''" v-on:click="history(1)">播放列表</a>
          <a href="javascript:;" :class="!historyBox ? 'cur':''" v-on:click="history(0)">历史记录</a>
        </div>
      </div>
      <div class="list" v-show="historyBox">
        <div class="operationboard">
          总{{musicList.length}}首<span><em class="iconfont">&#xe6f9; 收藏全部</em><em class="iconfont">&#xe68e; 清空</em></span>
        </div>
        <div class="noList" v-if="musicList.length==0">
          你还没有添加任何歌曲！<br>去首页<a href="javascript:;" v-on:click="menuChange()">发现音乐</a>
        </div>
        <div class="listItem" v-if="musicList.length!=0">
          <ul>
            <li v-for="(item , index) in musicList" :key="index">
              <i class="iconfont">&#xe609;</i>
              <span class="name">{{item.name}}</span>
              <span class="singer">{{item.artists[0].name}}</span>
              <span class="time">{{item.duration | formatDate}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list history" v-show="!historyBox">
        <div class="operationboard">
          总0首<span><em class="iconfont">&#xe68e; 清空</em></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import urlConfig from '../urlConfig.vue';
import vSlider from './public/slider.vue'
import axios from 'axios';
var currTime
export default {
  name:'bodyList',
  data(){
    return{
      musicListBox:false,
      historyBox:true,
      curTime:0,
      toltime:240000,
      tToltime:0,
      width:920,
      val:100,
      playData:[],
      musicUrl:''
    }
  },
  created(){
    console.log(this.$store.state.musicList.musicData)
  },
  components:{
    vSlider
  },
  filters:{
    formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return m + ':' + s;
      }
  },
  computed: {
    musicList() {
      return this.$store.state.musicList.musicData
    },
    isPlay(){
      if(this.$store.state.isPlay==true){
        this.toPlay(0)
      }
      return this.$store.state.isPlay
    }
  },
  mounted(){
    // this.$refs.input.focus()
  },
  methods: {
    openMusicList(){
      this.musicListBox=!this.musicListBox
    },
    history(value){
      if(value===1){
        this.historyBox=true
      }else{
        this.historyBox=false
      }
    },
    menuChange(){//菜单跳转
      this.$router.push({
          name: 'musicList'
      });
    },
    checkMusic(){//按下播放按钮
      let audio = this.$refs.audio
      if(this.isPlay===true){
        this.$store.commit('isPlay',false)
        audio.pause()
        clearInterval(currTime)
        return
      }
      this.$store.commit('isPlay',true)
      audio.play()
    },
    mEnd(){//音乐播放结束后
      let audio = this.$refs.audio
      audio.pause()
      clearInterval(currTime)
    },
    move(value){//获取用户拖动过后的Time
      this.$refs.audio.currentTime=(value/this.width*this.toltime)/1000
    },
    valMove(value){//设置音量
      this.$refs.audio.volume=Number((value/70).toFixed(1))//volume值为0-1的数字，小数点后可带一位
      this.val=Number((value/70*100).toFixed())//放大一百倍
    },
    toPlay(i){//开始播放
      this.playData = this.musicList[i]
      this.getMusicSrc()
    },
    getMusicSrc(){//获取音乐URL
      let that = this;
      axios.get(urlConfig.url+'music/url',{
        params:{
          id:this.playData.id
        }
      })
      .then(function(res){
        if(res.data.code==200){
          that.musicUrl = res.data.data[0].url
          console.log(that.$refs.audio.paused)
          if(that.$refs.audio.paused===false){
            that.toltime = Number(that.$refs.audio.duration)*1000
            currTime = setInterval(that.getMusicCurrTime,1000)
          }
        }else{
          console.log(res.statusText)
        }
      })
      .catch(function(err){
				console.log(err)
      })
    },
    getMusicCurrTime(){//获取歌曲总长度
      let that=this
      that.curTime = Number((that.$refs.audio.currentTime).toFixed(3))
    }
    // submit:function(){
    //   console.log('按下了')
    //   this.checkMusic()
    // }
  }
}
</script>
<style lang="scss">
@import '../style/footer';
</style>