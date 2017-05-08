<template>
  <div class="hello">
    xiangyang路由切换成功这里是襄阳
    <tabs></tabs>
  </div>
  
</template>

<script>
import { bus } from '../common/js/test.js'
import tabs from './tab.vue'
export default {
  components: {
    tabs
  },
  mounted() {
    bus.$on('tip', function(text) {
      console.log(text)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  height:1000px;
  line-height: 1000px;
  color: red;
  text-align: center;
}
</style>
