<template>
    <div class="result">
        <article class="result-info">
            <div class="success-tl"><img src="../../common/images/result-success.png" alt=""></div>
            <div class="content content-top">
                <h2 class="content-tl"><i class="icon-lt"></i><span class="center-txt">审美100分</span><i class="icon-gt"></i></h2>
                <p class="intro-desc">你的审美得分为100分，活动结束后可参与平分<span class="report">8888</span>现金，点击登记领奖信息</p>
                <a href="javascript:;" v-if="!regStatue" class="btn block btn-pk" @click.stop.prevent="register">登记领奖信息</a>
                <a href="javascript:;" v-if="regStatue" class="btn block btn-pk" @click.stop.prevent="register">查看领奖进度</a>
                <p class="time" v-if="!overdue"><i class="icon-time"></i>登记倒计时<span>{{date.d}}</span>天<span>{{date.h}}</span>小时</p>
                <p class="time" v-if="overdue">领取时间已过期</p>
            </div>
        </article>
        <article class="result-vote">
            <p class="tip">你喜欢的选手正在参加全民厂花大赛去给她们投一票吧</p>
            <ul class="player">
                <li class="player-item" v-for="item in selected_star"><img :src="item" alt=""></li>
            </ul>
            <a href="javascript:;" class="btn block btn-pk" @click.stop.prevent="golinks">去投一票</a>
        </article>

        <!-- ****************************  弹层  ******************************-->
        <!-- 遮罩层 -->
        <div class="mask" v-show="mask" @click.stop.prevent="toggleMask"></div>
        <!-- 闯关成功页面 1.登记领奖信息-->
        <Register v-show="mask" @isClose="toggleMask" @isRegister="registerMethods" @isKonwn="konwnMethods" :reg-statue="regStatue"></Register>
        <!-- toast 弹层 -->
        <transition name="fade-ts">
            <div class="toast toast-overdue" v-show="toastStatus">领奖时间已结束</div>
        </transition>
        
    </div>
</template>

<script>
  import Register from 'components/Toast/register'
  import Registered from 'components/Toast/registered'
  import {CountDown} from 'common/js/countDown'
  export default {
    components: {
      Register,
      Registered
    },
    data() {
      return {
        mask: false,
        overdue: false,
        toastStatus: false,
        regStatue: false,
        date: {
            d: 0,
            h: 0,
            m: 0,
            s: 0
        },
        selected_star: {},
        links: ''
      }
    },
    created() {
        // 因为当钩子执行前，组件实例还没被创建
        if (localStorage.getItem('overdue') === true) {
            this.overdue = true
        } else {
            this.overdue = false
            // 判断是否 过期如下
            /* eslint-disable */
            var endTime = localStorage.getItem('countdown') || '2017/04/28 18:30:00'
            let activeTime = new CountDown(endTime)
            this.isEnroll()
            let self = this
            var timer = setInterval(function() {
                self.date.d = activeTime.getRTime().d
                self.date.h = activeTime.getRTime().h
                self.date.m = activeTime.getRTime().m
                self.date.s = activeTime.getRTime().s
                // 2.判断 活动是否过期
                if (self.date.s < 0 || self.date.m < 0 || self.date.h < 0 || self.date.d < 0) {
                  // 2.1  活动结束
                  self.overdue = true
                  localStorage.setItem('overdue', true)
                  clearInterval(timer)
                }
            }, 1000)
        }
        // 分享成功展示最后5个参赛选手
        this.$http.get('/pk/share_data', {
          params: {
            'userinfo': localStorage.getItem('userinfo')
          }
        })
        .then((response) => {
          if (response.data.errCode === 0) {
            let res = response.data.results
            this.selected_star = res.selected_star
            this.links = res.url
            localStorage.setItem('links', this.links)
          } else if (Number(response.data.errCode) === 1401) {
                // 登录失败
                /* eslint-disable no-undef */
                try {
                    client.toLogingAct()
                } catch (e) {
                    console.log(e + '1.1登录页失败resulted')
                }
          } else {
            console.log(response.data.errorStr)
          }
         }, (err) => {
            console.log(err)
        })
    },
    methods: {
        toggleMask() {
          this.mask = !this.mask
        },
        register() {
          if (this.overdue) {
              // 活动时间已过期
              this.toastStatus = true
              let self = this
              setTimeout(function() {
               self.toastStatus = false
              }, 1500)
          } else {
              // 活动未过期
              this.isShare()
          }
        },
        isShare() {
            // 活动分享情况 1.已分享 2.未分享
            this.$http.get('/pk/share', {
              params: {
                  'userinfo': localStorage.getItem('userinfo')
              }
            })
            .then((response) => {
                if (response.data.errCode === 0) {
                    let res = response.data.results
                    if (res.share_status) {
                        // 1.已分享
                        this.isEnroll()
                        if (this.regStatue) {
                            // 1.1 登记了领奖信息
                            this.regStatue = true
                            this.mask = true
                        } else {
                            this.mask = true
                        }
                    } else {
                        // 2.未分享 ——> 调用分享弹窗 让他去分享
                        this.changeShared()
                        try {
                          /* eslint-disable no-undef */
                          client.shareUrl(`${window.location.origin}/pk/index.html#/share`, `我闯过${localStorage.getItem('level')}关平分了8888现金`, `我在安心记加班闯过${localStorage.getItem('level')}关，平分了8888现金，你也快来吧！`, 'http://cdn.julanling.com/jjb/imageslogo.png')
                        } catch (e) {
                          console.log(e + '分享失败')
                        }
                    }
                } else if (Number(response.data.errCode) === 1401) {
                    // 登录失败
                    /* eslint-disable no-undef */
                    try {
                        client.toLogingAct()
                    } catch (e) {
                        alert(e + '1.2登录页失败resulted')
                    }
                } else {
                  console.log(response.data.errorStr)
                }
            }, (err) => {
              console.log(err)
            })
        },
        isEnroll() {
          this.$http.get('/pk/checkin_status', {
            params: {
                'userinfo': localStorage.getItem('userinfo')
            }
          })
          .then((response) => {
            if (response.data.errCode === 0) {
                let res = response.data.results
                if (res.checkin_status ===true) {
                  this.regStatue = true
                } else {
                  this.regStatue = false
                }
            } else if (Number(response.data.errCode) === 1401) {
                // 登录失败
                try {
                    client.toLogingAct()
                } catch (e) {
                    console.log(e + '1.5注册失败resulted')
                }
            } else {
              console.log(response.data.errorStr)
            }
          }, (err) => {
            console.log(err)
          })
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
                      console.log(e + '1.3登录页失败resulted')
                  }
              } else {
                console.log(response.data.errorStr)
              }
            }, (err) => {
              console.log(err)
            })
        },
        registerMethods() {
          this.regStatue = true
          this.mask = false
        },
        konwnMethods() {
          this.mask = false
        },
        golinks() {
          try {
            // 新版本
            client.toStar('全民厂花', `${localStorage.getItem('links')}`)
          } catch (e) {
            window.location.href = this.links
          }
        }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../common/css/utils/variables';
    .result{
      font-size: 14px;
        min-height: calc(100vh - 40px);
        background-color: #FFE1E1;
        .btn-pk{
            margin: 0 auto;
            width: 220px;
            font-size: 18px;
            line-height: 36px;
            &::after{
                content:'\20';
                width: 35px;
                height: 9px;
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
                    margin: 0 5px;
                }
                &-tl{
                    height: 24px;
                    font-size: 16px;
                    text-align: center;
                }
                .intro-desc{
                    font-size: 16px;
                    padding:0 25px;
                    text-align: center;
                    margin: 30px 0 45px;
                }
                .time{
                    font-size: 14px;
                    margin: 16px 0;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    .icon-time{
                        margin-right: 9px;
                        margin-top: -4px;
                    }
                }
            }
            .content-top{
                margin-top: -7px;
            }
        }
        &-vote{
            text-align: center;
            padding-bottom: 20px;
            .tip{
                color: $brown;
                margin: 0 10px;
            }
            .player{
                display: flex;
                margin: 16px 16px 14px;
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
        .toast-overdue{
            background-color: rgba(0,0,0,.5);
            color: #fff;
            padding: 5px 15px;
        }
    }
    .fade-ts-enter-active, .fade-ts-leave-active {
      transition: opacity .3s
    }
    .fade-ts-enter, .fade-ts-leave-active {
      opacity: 0
    }
</style>
