<template>
  <div class="tab">
  	这里是tab组件
  	<div><button @click="send">数据发送给兄弟组件</button></div>
  </div>
</template>

<script>
import {bus} from '../common/js/test.js'
export default {
  methods: {
    send() {
      bus.$emit('tip', 'text')
      this.$http.get('/book/1003078')
      .then(function (response) {
        console.log(response, 'success6666666')
        alert(66666)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tab{
	line-height: 50px;
	text-align: center;
	background-color: yellow;
}
</style>
