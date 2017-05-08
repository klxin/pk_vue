<template>
	<footer class="footer">
		<div class="avatar"><img src="../../common/images/footer-avatar.png" alt=""></div>
		<div class="tip">{{txtTl}}</div>
		<span class="direct-tl"></span>
	</footer>
</template>

<script>
  export default {
    props: {
      txtTl: {
        type: String,
        required: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../common/css/utils/variables';
@import '../../common/css/utils/helpers';
	.footer{
		position: relative;
		margin-top: 50px;
		left: 0;
		bottom: 0;
		z-index: 1;
		display: flex;
		width: 100%;
		padding: 0 45px;
		.avatar{
			width: 35px;
			>img{
				width: 100%;
			}
		}
		.tip{
			flex: 1;
			@extend %img-center;
			text-align: left;
			color: $brown;
			font-size: 16px;
			padding-left: 10px;
		}
		.direct-tl{
			position: absolute;
			top: 0;
			transform: translateY(-60%);
			right: 80px;
			width: 84px;
			height: 66px;
			background: url('../../common/images/footer-direct.png') left top no-repeat;
			background-size: contain;
		}
	}
</style>
