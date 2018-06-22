<template>
  <div class="mbody" :id="theme">
    
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
}
</script>
<style lang="scss">
@import '../style/body';
</style>