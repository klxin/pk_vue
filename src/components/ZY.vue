<template>
  <div class="hello">
    枣阳枣阳路由切换成功
    <p class="test" refs>sdfasdf</p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  created() {
    /* axios.get('/api/seller')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    }) */
    let url = 'http://bing.com/HPImageArchive.aspx?format=js&idx=16&n=1'
    this.$http.get('https://bird.ioliu.cn/v1?url=' + url)
    .then(function (response) {
      console.log(response, 'success')
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    border:1px solid blue;
    &::before{
      content:'fdfdsfs';
      color:red;
    }
  }
  .test{
    color:red;
    font-size:.30rem;
    height: 2000px;
    background-color: gold;
  }
</style>
