<template>
  <div id="app">
    <mHeader></mHeader>
    <mLeft></mLeft>
    <mFooter></mFooter>
    <router-view class="router-view" :id="theme"></router-view>
  </div>
</template>

<script>
import mHeader from './components/mHeader.vue'
import mLeft from './components/mLeft.vue'
import mBody from './components/mBody.vue'
import mFooter from './components/mFooter.vue'
export default {
  name: 'App',
  components:{
    mHeader,
    mLeft,
    mBody,
    mFooter
  },
  computed: {
  // isShowPlay() {
  //   return this.$store.state.showPlay
  // },
  theme() {
    return this.$store.state.theme
  }
  }
}
</script>


<style lang="scss">
@import 'style/app';
</style>
