<template>
  <div class="songSheet">
    <ul>
        <li>
            <div class="imgBox firstImg">
                <canvas id="myCanvas" width="400" height="400" v-show="false"></canvas>
                <div class="txtBox">根据您的音乐口味生成每日更新</div>
                <img :src="this.imgDate">
            </div>
            <div class="title">每日歌曲推荐</div>
        </li>
        <li v-for="(item,index) in musicList" v-bind:key="index">
            <div class="imgBox">
              <span><i class="iconfont">&#xe647;</i> {{item.playCount>10000?(((item.playCount-item.playCount%1000)/10000+'万')):(item.playCount)}}</span>
              <div class="txtBox">{{item.copywriter}}</div>
              <a href="javascript:;" :style="{backgroundImage: 'url(' + bg2 + ')' }" v-on:click="getSongsheetList(item.id)"></a>
              <img :src="item.picUrl">
            </div>
            <div class="title">{{item.name}}</div>
        </li>
    </ul>
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
        week:'',
        day:'',
        imgDate:'',
        musicList:[],
        bg2:Bg2
    }
	},
	created:function(){

	},
  computed: {

  },
  methods: {
    init(){
      const aData = new Date()//获取时间取星期和日期
      this.day = aData.getDate()
      var d=new Date()
      var weekday=new Array(7)
      weekday[0]="星期天"
      weekday[1]="星期一"
      weekday[2]="星期二"
      weekday[3]="星期三"
      weekday[4]="星期四"
      weekday[5]="星期五"
      weekday[6]="星期六"
      this.week=weekday[d.getDay()]

      var c=document.getElementById("myCanvas");//生成一个canvas实例
      var ctx=c.getContext("2d");

      function canvasFunction(font,color,txt,x,y){//封装的canvas
        ctx.font=font;
        ctx.fillStyle=color;
        ctx.fillText(txt,x,y);
      }
      canvasFunction("3rem 微软雅黑","#666",this.week,160,100)//星期
      let today = this.day.toString()
      if(today.length>1){
        canvasFunction("20rem Arial","#C62F2F",this.day,90,300)//日期
      }else{
        canvasFunction("20rem Arial","#C62F2F",this.day,150,300)//日期
      }
      this.imgDate = c.toDataURL()//将canvas转成base64的图片


      let that = this;
      axios.get(urlConfig.url+'personalized',{//获取歌单
        params:{

        }
      })
      .then(function(res){
        console.log(res.data.result)
        if(res.data.code==200){
          that.musicList = res.data.result
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
@import '../../style/songSheet';
</style>