<template>
  <div class="home">
    <div v-if="loginStatue">
      <i class="icon-rules home-rules" @click="toggleMask"></i>
      <div class="home-content moudle-base">
        <h2 class="title"><img src="../../common/images/home-title.png"alt=""></h2>
        <h3 class="subtitle">有{{online_user}}位小伙伴玩正在玩</h3>
        <ul class="beauty-girl">
          <li><img src="../../common/images/home-pkimg.jpg" alt="美女"></li>
        </ul>
        <Intro-prize :my-level="level"></Intro-prize>
        <router-link to="play" replace class="btn block btn-pk">开始闯关</router-link>
      </div>
      <!-- ****************************  弹层  ******************************-->
      <!-- 遮罩层 -->
      <div class="mask" v-show="mask" @click="toggleMask"></div>
      <div class="toast toast-register toast-rules" v-show="mask">
        <i class="icon-close" @click="toggleMask"></i>
        <h2 class="title">规则</h2>
        <p class="prompt">美女二选一，选择你喜欢的女孩，你可以有一次求助过关的机会，闯过{{level}}关，可以平分<span class="report">8888</span>元现金</p>
      </div>
    </div>
    <div class="low-version" v-if="lowVersion">
      <img src="http://cdn.julanling.com/girlsday/images/default_img.png" alt="">
      <p>您的手机安卓系统版本过低，不支持此游戏哦</p>
    </div>
    <div class="low-version" v-if="loginfail">
      <img src="http://cdn.julanling.com/girlsday/images/default_img.png" alt="">
      <p>加载失败，请退出后重试</p>
    </div>
  </div>
  
</template>

<script>
  import IntroPrize from 'components/Basic/introparts'
  // import {CountDown} from 'common/js/countDown'
  import {getDevice, getQueryString} from 'common/js/getDevice'
  // import {client} from 'common/js/mockClient'
  const errCode = 0
  export default {
    data() {
      return {
        mask: false,
        level: 20,
        success_user: 1523,
        pk_status: true,
        online_user: 1523,
        curr_user_status: false,
        share_status: false,
        loginStatue: false,
        lowVersion: false,
        loginfail: false
      }
    },
    components: {
      IntroPrize
    },
    created() {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        var userinfo = ''
        if (getDevice() === 'android') {
            // 安卓设备  版本4.5
            try {
              /* eslint-disable no-undef */
              userinfo = client.getJjbUserId()
            } catch (e) {
              alert(e + '1.1安卓设备请求用户信息失败')
            }
        } else if (getDevice() === 'ios') {
            // ios 设备
            try {
                /* eslint-disable no-undef */
                userinfo = getQueryString('userInfo')
            } catch (e) {
                alert(e + 'ios设备请求用户信息失败')
            }
        }
        // 低版本情况
        if (window.navigator.userAgent) {
          var userAgent = navigator.userAgent
          var index = userAgent.indexOf('Android')
          if (index >= 0) {
            var androidVersion = parseFloat(userAgent.slice(index + 8))
            if (androidVersion < 4.5 && userAgent.slice(index + 8, index + 13) !== '4.4.4') {
             // 版本小于4.5的事情
             var self = this
             setTimeout(function() {
                self.lowVersion = true
                self.loginStatue = false
                self.loginfail = false
             }, 1000)
            }
          }
        }
        // 1.判断是否 登录
        if (userinfo) {
            this.$http.get('/pk/data', {
                params: {
                  'userinfo': userinfo
                }
            })
            .then((response) => {
              /* eslint-disable */
                if (response.data.errCode === errCode) {
                    // 登录成功
                    let res = response.data.results
                    console.log(res)
                    this.level = res.level
                    this.success_user = res.success_user
                    this.online_user = res.online_user
                    this.countdown = res.countdown
                    this.pk_status = res.pk_status
                    this.curr_user_status = res.curr_user_status
                    // 存储本地用户信息
                    localStorage.setItem('countdown', res.countdown)
                    localStorage.setItem('userinfo', userinfo)
                    localStorage.setItem('level', this.level)
                    // 判断是否 过期如下
                    // 2.判断 活动是否过期
                    if (!this.pk_status) {
                      // 2.1  活动结束
                      localStorage.setItem('overdue', false)
                      // clearInterval(timer)
                      // 3.判断是否闯关成功
                      if (!this.curr_user_status) {
                        // 3.1.闯关成功 ——> 到领奖页面
                        this.$router.replace('/resulted')
                      } else {
                        // 3.2.闯关失败 ——> 到活动结束页面
                        this.$router.replace('/over')
                      }
                    } else {
                        // 2.2  活动未结束
                        localStorage.setItem('overdue', false)
                        if (!this.curr_user_status) {
                            // 3.1 闯关成功 ——> 领奖页面
                            this.$router.replace('/resulted')
                        } else {
                            // 3.2 闯关失败 ——> 首页接着玩
                            this.$router.replace('/home')
                            this.loginStatue = true
                            this.lowVersion = false
                            this.loginfail = false
                        }
                    }
                } else if (Number(response.data.errCode) === 1401) {
                    let self = this
                    setTimeout(function() {
                      self.loginfail = true
                      self.lowVersion = false
                      self.loginStatue = false
                    }, 3000)
                    // 登录失败
                    /* eslint-disable no-undef */
                    try {
                        client.toLogingAct()
                    } catch (e) {
                        alert(e + 'toLogingAct is false')
                    }
                } else {
                    console.log(response.data.errorStr)
                }
            }, (err) => {
                console.log(err)
            })
        } else {
            let self = this
            setTimeout(function() {
              self.loginfail = true
              self.lowVersion = false
              self.loginStatue = false
            }, 3000)
            /* eslint-disable no-undef */
            try {
              client.toLogingAct()
            } catch (e) {
              console.log(e + '1.2登录页失败home')
            }
        }
    },
    methods: {
      toggleMask() {
        this.mask = !this.mask
      }
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      this.loginStatue = false
      next()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../common/css/utils/variables';
@import '../../common/css/utils/helpers';
.home{
	padding: 103px 20px 0;
  font-size: 15px;
	&-content{
		padding-top: 34px;
		.title{
			position: absolute;
			left: 50%;
			top: -80px;
			transform: translateX(-50%);
			width: 213px;
      >img{
        width: 100%;
      }
		}
		.subtitle{
      font-size: 16px;
			height: 40px;
      line-height: 40px;
		}
		.beauty-girl{
			display: flex;
			li{
				flex:1;
				>img{
					max-width:100%;
				}
			}
		}
		.btn-pk{
			margin:23px 33px;
		}
	}
	.home-rules{
		position: absolute;
		left: 25px;
		top: -3px;
	}
	.toast-rules{
		padding-bottom: 20px;
	}
}
.low-version{
  text-align: center;
  @extend %position-center;
  margin-top: -40px;
  >p{
    margin-top: 20px;
  }
}
</style>
