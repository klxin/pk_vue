<template>
  <div class="intro-parts">
    <p>美女二选一，谁的颜值高？</p>
    <p class="desc">闯过<span class="normal">{{myLevel}}</span>关平分<span class="normal prize">8888</span>元现金</p>
  </div>
</template>

<script>
  export default {
    props: {
      myLevel: {
        type: Number,
        default: localStorage.getItem('level')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../common/css/utils/variables';
	.intro-parts{
    font-size: 15px;
    line-height: 25px;
    font-style: italic;
    padding: 0 30px;
    text-align: center;
    .desc{
      position: relative;
      &::before,&::after{
        content: '\20';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background:left top no-repeat;
        background-size:100% 100%;
        width: 23px;
        height: 23px;
      }
      &::before{
        background-image:url('../../common/images/icon-langle.png');
        left: 2px;
      }
      &::after{
        background-image:url('../../common/images/icon-rangle.png');
        right: 2px;
      }
    }
    .normal{
      font-style: normal;
      color: #ff697b;
      padding-left: 4px;
      &.prize{
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
</style>
