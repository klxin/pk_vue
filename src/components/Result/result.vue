<template>
    <div class="result">
        <article class="result-info">
            <div class="success-tl"><img src="../../common/images/result-success.png" alt=""></div>
            <div class="content content-top">
                <h2 class="content-tl"><i class="icon-lt"></i><span class="center-txt">审美100分</span><i class="icon-gt"></i></h2>
                <p class="intro-desc">你的审美得分为100分，活动结束后可参与平分<span class="report">8888</span>现金，点击登记领奖信息</p>
                <a href="javascript:;" class="btn block btn-pk" @click="register">登记领奖信息</a>
                <p class="time" v-if="!overdue"><i class="icon-time"></i>活动倒计时<span>{{date.d}}</span>天<span>{{date.h}}</span>小时<span>{{date.m}}</span>分<span>{{date.s}}</span>秒</p>
                <p class="time" v-if="overdue">领取时间已过期</p>
            </div>
        </article>
        <transition name="fade-g">
            <div class="toast toast-error" v-show="error">活动已过期</div>
        </transition>
    </div>
</template>

<script>
  import {CountDown} from 'common/js/countDown'
  /* eslint-disable no-unused-vars */
  export default {
    components: {
    },
    data() {
      return {
        overdue: false,
        error: false,
        date: {
            d: 0,
            h: 0,
            m: 0,
            s: 0
        }
      }
    },
    created() {
        // 因为当钩子执行前，组件实例还没被创建
        if (localStorage.getItem('overdue')) {
            this.overdue = true
        } else {
            // 判断是否 过期如下
            let activeTime = new CountDown(localStorage.getItem('countdown'))
            let self = this
            setInterval(function() {
                self.date.d = activeTime.getRTime().d
                self.date.h = activeTime.getRTime().h
                self.date.m = activeTime.getRTime().m
                self.date.s = activeTime.getRTime().s
            }, 100)
            if (this.date.s < 0 || this.date.m < 0 || this.date.h < 0 || this.date.d < 0) {
                this.overdue = true
                localStorage.setItem('overdue', true)
            }
        }
    },
    methods: {
      register() {
        if (this.overdue) {
          // 活动结束了
          this.error = true
          let self = this
          setTimeout(function() {
            self.error = false
          }, 1500)
        } else {
          this.$http.get('/pk/share', {
            params: {
                'userinfo': localStorage.getItem('userinfo')
            }
          })
          .then((response) => {
            if (response.data.errCode === 0) {
                let res = response.data.results
                console.log(res)
                if (!res.share_status) {
                    try {
                      /* eslint-disable no-undef */
                      client.shareUrl(`${window.location.origin}/pk/shared`, '我闯过15关平分了8888现金', '我在安心记加班闯过15关，平分了8888现金，你也快来吧！', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4004913132,2736252349&fm=117&gp=0.jpg')
                    } catch (e) {
                      console.log(e + '分享失败')
                    }
                } else {
                  this.$router.replace('/resulted')
                }
            } else if (Number(response.data.errCode) === 1401) {
                // 登录失败
                /* eslint-disable no-undef */
                try {
                    client.toLogingAct()
                } catch (e) {
                    alert(e + '1.1登录页失败result')
                }
            } else {
              console.log('分享数据请求失败')
            }
          }, (err) => {
            console.log(err)
          })
        }
      },
        changeShared() {
          this.$http.get('/pk/share_success', {
              params: {
                  'userinfo': localStorage.getItem('userinfo')
              }
            })
            .then((response) => {
              if (response.data.errCode === 0) {
                  let res = response.data.results
                  console.log(res + '用户分享状态为已分享')
              } else if (Number(response.data.errCode) === 1401) {
                  // 登录失败
                  try {
                      client.toLogingAct()
                  } catch (e) {
                      alert(e + '1.3登录页失败resulted')
                  }
              } else {
                console.log('分享数据请求失败')
              }
            }, (err) => {
              console.log(err)
            })
        }
    },
    beforeRouteEnter(to, from, next) {
      next()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../common/css/utils/variables';
    .result{
        min-height: calc(100vh - 40px);
        font-size: 14px;
        .btn-pk{
            margin: 0 auto;
            width: 4.52rem;
            font-size: .38rem;
            &::after{
                content:'\20';
                width: .70rem;
                height: .18rem;
            }
        }
        &-info{
            .success-tl{
                // background-color: $bgc;
                // padding-top: .20rem;
                >img{
                    width: 100%;
                    display: block;
                }
            }
            .content{
                .center-txt{
                    margin: 0 .10rem;
                }
                &-tl{
                    height: .50rem;
                    text-align: center;
                }
                .intro-desc{
                    font-size: .32rem;
                    padding:0 .90rem;
                    text-align: center;
                    margin: .60rem 0 .90rem;
                }
                .time{
                    font-size: .28rem;
                    margin: .35rem 0;
                    height: .50rem;
                    line-height: .50rem;
                    text-align: center;
                    .icon-time{
                        margin-right: .18rem;
                        margin-top: -4px;
                    }
                }
            }
            .content-top{
                margin-top: -.15rem;
            }
        }
        &-vote{
            text-align: center;
            padding-bottom: .41rem;
            .player{
                display: flex;
                margin: .32rem .32rem .28rem;
                &-item{
                    flex: 1;
                    margin: 0 .08rem;
                    >img{
                        width:100%;
                        display: block;
                        border: 2px solid #fff;
                    }
                }
            }
            .btn-pk{
                background-color: $blue;
                text-shadow: none;
            }
        }
        .time{
            color: #FF8493;
            >span{
                color: $brown;
            }
        }
    }
    .fade-g-enter-active, .fade-g-leave-active {
      transition: opacity .5s
    }
    .fade-g-enter, .fade-g-leave-active {
      opacity: 0
    }
</style>
