<template>
    <div class="progressBox" :style="`width:${width}px`">
        <span class="currbg" :style="{width: isChange ? `${changeCurr}px`:`${curr}px`}" ref="slider">
            <em @mousedown="touchIcon" :style="{transform:isChange ? `translateX(${changeCurr-8}px)`:`translateX(${curr-8}px)`}">
                <i></i>
            </em>
        </span>
    </div>
</template>
<script>
export default {
  name:'vSlider',
  props:{
      value:{//当前播放位置
        type:Number,
        default:0
      },
      tolval:{//歌曲总长度
        type:Number,
        default:0
      },
      width:{//slider宽度
        type:Number,
        default:0
      },
      curr:{
        type:Number,
        default:0
      }
  },
  data(){
    return{
        cur:this.curr,
        curTime:this.value,
        flag: false,
        isChange: false,
        changeCurr:0
    }
  },
  methods: {
      touchIcon(e){
        this.flag=false
        document.addEventListener('mousemove',this.moveHandle,false)
        document.addEventListener('mouseup',this.upHandle,false)
        document.addEventListener('dragenter', e => {
            e.preventDefault()
        })
        document.addEventListener('dragover', e => {
        e.preventDefault()
        document.removeEventListener('mousemove', this.moveHandle, false)
        document.removeEventListener('mouseup', this.upHandle, false)
        this.isChange = false
      })
      },
      moveHandle(e){
        if(this.flag){
            document.removeEventListener('mousemove', this.moveHandler, false) 
            return
        }
        this.isChange = true
        document.addEventListener('mousemove',this.moveHandle,false)
        document.addEventListener('mouseup',this.upHandle,false)
        let curr = e.clientX-this.$refs.slider.offsetLeft
        if(curr<=0) return this.changeCurr=0
        if(curr>this.width) return this.changeCurr = this.width
        return this.changeCurr = curr
      },
      upHandle(e){
        this.isChange = false
        this.flag = true
        document.removeEventListener('mousemove',this.moveHandle,false)
        document.removeEventListener('mouseup',this.upHandle,false)
        this.$emit('move', this.changeCurr)
        this.$emit('valMove', this.changeCurr)
      }
  }
}
</script>
<style lang="scss">
@import '../../style/slider';
</style>