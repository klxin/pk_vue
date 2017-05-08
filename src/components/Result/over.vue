<template>
	<div class="gameover">
		<div class="gameover-inner">
			<img src="../../common/images/result-over.png" alt="">
			<p class="tip">您来晚了，共有4041人平分<span class="report">8888</span>元现金</p>
		</div>
	</div>
</template>

<script>
  export default {
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../common/css/utils/helpers';
@import '../../common/css/utils/variables';
	.gameover{
		height: calc(100vh - 40px);
		font-size: 14px;
		@extend %img-center;
		&-inner{
			width: 250px;
			>img{
				width: 100%;
				display: block;
			}
			.tip{
				margin-top: 20px;
				color: $brown;
			}
		}
	}
</style>
