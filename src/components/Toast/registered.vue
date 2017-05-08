<template>
	<div class="toast toast-register">
		<i class="icon-close"></i>
		<h2 class="title" v-if="!register">登记领取信息</h2>
		<h2 class="title" v-else>温馨提示</h2>
		<p class="prompt" v-if="!register">请填写真实信息，活动结束后，现金将直接发送至银行卡内</p>
		<p class="prompt" v-else>您已提交领取信息，请耐心等待活动结束，我们会将平分后的现金直接打款至您的银行卡。</p>
		<p class="prompt" v-if="register"官方微信号：anxinjjb</p>
		<div class="content" v-if="!register">
			<ul class="list">
				<li class="list-item"><input type="text" placeholder="输入真实姓名"></li>
				<li class="list-item"><input type="text" placeholder="输入银行卡号码"></li>
				<li class="list-item"><input type="text" placeholder="输入银行名称"></li>
				<li class="list-item"><input type="text" placeholder="输入手机号码"></li>
			</ul>
			
		</div>
		<a href="javascript:;" class="btn block btn-submit" @click="submitInfo">提交</a>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        register: false,
        userinfo: {
          Userid: '',
          Logintime: '',
          Checkcode: ''
        }
      }
    },
    components: {
      submitInfo() {
        this.$emit('isRegister')
      }
    },
    created() {
      this.userinfo.Userid = localStorage.getItem('Userid')
      this.userinfo.Logintime = localStorage.getItem('Logintime')
      this.userinfo.Checkcode = localStorage.getItem('Checkcode')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../common/css/utils/variables';
</style>
