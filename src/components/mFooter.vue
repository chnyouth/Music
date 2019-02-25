<template>

  <div class="footerBox">
    <!-- <input type="text" v-on:keyup.space="submit" ref="input"> -->
    <div class="playIcon">
      <span class="iconfont" @click="prev">&#xe62e;</span>
      <span class="iconfont" @click="checkMusic">{{this.isPlay===true ? "&#xe674;":"&#xe62a;"}}</span>
      <span class="iconfont" @click="next">&#xe62f;</span>
    </div>
    <audio autoplay controls
      :src="musicUrl"
      v-show="false"
      @ended="mEnd(false)"
      ref="audio">
      </audio>
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
        <em class="" v-on:click="openMusicList()">{{songSheet==''?0:songSheet.length}}</em>
      </div>
    </div>
    <div class="musicListBox" v-show="musicListBox">
      <div class="title">
        <div class="close iconfont" v-on:click="openMusicList()">&#xe616;</div>
        <div class="type">
          <a href="javascript:;" :class="historyBox ? 'cur':''" v-on:click="history(1)">播放列表</a>
          <a href="javascript:;" :class="historyBox ? '':'cur'" v-on:click="history(0)">历史记录</a>
        </div>
      </div>
      <div class="list" v-show="historyBox">
        <div class="operationboard">
          总{{songSheet==''?0:songSheet.length}}首<span><em class="iconfont">&#xe6f9; 收藏全部</em><em class="iconfont">&#xe68e; 清空</em></span>
        </div>
        <div class="noList" v-if="songSheet==''">
          你还没有添加任何歌曲！<br>去首页<a href="javascript:;" v-on:click="menuChange()">发现音乐</a>
        </div>
        <div class="listItem" v-if="songSheet!=''">
          <ul>
            <li v-for="(item , index) in songSheet" :key="index" v-on:dblclick="toPlay(index)">
              <i class="iconfont">{{playData.id==item.id?'&#xe609;':'　'}}</i>
              <span class="name">{{item.name}}<em style="color:#999;font-style:normal;"><!--{{item.alias[0]==null?'':'('+item.alias[0]+')'}}--></em></span>
              <span class="singer" v-for="(music , musicIndex) in songSheet.ar" :key="musicIndex">{{music[0].name}}</span>
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
import vSlider from './public/slider.vue';
import axios from 'axios';
import eventBus from './public/eventBus.vue';
var currTime
export default {
  name:'bodyList',
  data(){
    return{
      musicListBox:false,
      historyBox:true,
      curTime:0,
      toltime:240000,//默认音频总长度
      tToltime:0,
      width:920,
      val:100,
      playData:[],//当前播放音乐数据
      musicUrl:'',
      songSheet:[],
      nowId:'0',
      listId:0
    }
  },
  created(){
    this.getMusicList
    // console.log(this.$store.state.isPlay)
    // if(this.$store.state.isPlay!=false){
      this.getStorage()
      console.log(this.songSheet)
    // }
  },
  components:{
    vSlider
  },
  filters:{
    formatDate: function (value) {//时间格式化
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
    getMusicList() {//子组件返回的音乐列表
      if(this.$store.state.getMusicList.musicData.length!=0){
        let musicListData = JSON.stringify(this.$store.state.getMusicList.musicData)
        localStorage.setItem('musicList',musicListData)//歌单存入localStorage
        this.getStorage()
      }
      return this.$store.state.getMusicList.musicData
    },
    isPlay(){//子组件返回的播放状态
      if(this.$store.state.isPlay==true){
        this.getMusicList
        // this.getStorage()
        // this.toPlay(0)
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
      this.$nextTick(function() {
          audio.play()
      });
    },
    prev(){//上一首
      let audio = this.$refs.audio
      if(this.listId===0){
        this.toPlay(this.songSheet.length-1)
        audio.load();
      }else{
        this.toPlay(this.listId-1)
        audio.load();
      }
    },
    next(){//下一首
      let audio = this.$refs.audio
      if(this.listId===this.songSheet.length-1){
        this.toPlay(0)
        audio.load();
      }else{
        this.toPlay(this.listId+1)
        audio.load();
      }
    },
    mEnd(){//音乐播放结束后
      let audio = this.$refs.audio
      if(this.listId===this.songSheet.length-1){
        this.toPlay(0)
        audio.load();
      }else{
        this.toPlay(this.listId+1)
        audio.load();
      }
    },
    move(value){//获取用户拖动过后的Time
      this.$refs.audio.currentTime=(value/this.width*this.toltime)/1000
    },
    valMove(value){//设置音量
      this.$refs.audio.volume=Number((value/70).toFixed(1))//volume值为0-1的数字，小数点后可带一位
      this.val=Number((value/70*100).toFixed())//放大一百倍
    },
    toPlay(i){//开始播放
      this.listId=i
      this.nowId = this.songSheet[i].id
      this.playData = this.songSheet[i]
      let nowMusic = JSON.stringify(this.songSheet[i])
      // localStorage.setItem('nowMusic',nowMusic)//歌单存入localStorage
      eventBus.$emit('nowMusic',this.songSheet[i]);
      this.getMusicSrc(this.nowId)
    },
    getMusicSrc(value){//获取音乐URL
    console.log(value)
      let that = this;
      axios.get(urlConfig.url+'song/url',{
        params:{
          id:value
        }
      })
      .then(function(res){
        console.log(res)
        if(res.data.code==200){
          that.musicUrl = res.data.data[0].url
          that.getDuration()
          currTime = setInterval(that.getMusicCurrTime,1000)
          // that.getDuration()
          that.$store.commit('isPlay', true)
        }else{
          console.log(res.statusText)
        }
      })
      .catch(function(err){
				console.log(err)
      })
    },
    getMusicCurrTime(){//获取歌曲当前进度
      this.curTime = Number((this.$refs.audio.currentTime).toFixed(3))
    },
    getDuration(){//音频加载完毕后获取音频时长
      let that = this
      this.$refs.audio.oncanplay = function(){
        that.toltime = Number(that.$refs.audio.duration)*1000
      }
    },
    getStorage(){//取出localStorage里的歌单数据
      this.songSheet = JSON.parse(localStorage.getItem("musicList"))//取出localStorage里的歌单
      this.toPlay(this.listId)
    }
  }
}
</script>
<style lang="scss">
@import '../style/footer';
</style>