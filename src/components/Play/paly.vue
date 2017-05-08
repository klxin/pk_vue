<template>
  <div class="container">
    <h2 class="title"><i class="icon-lt"></i><span>第{{results.current_level}}关</span><i class="icon-gt"></i></h2>
    <div class="moudle-base">
      <p class="free-help" :class="{'free-help-disabled':!answer_tl}" @click.stop.prevent="helpToggle">
        <img src="../../common/images/play-help1.png" v-if="answer_tl" alt="">
        <img src="../../common/images/play-help0.png" v-else alt="">
      </p>
      <ul class="star" ref="ulTip">
        <li class="star-item" v-for="(item, index) in results.data">
          <div class="img-area">
            <div class="beauty-girl"><img v-bind:src="item.pic" alt="测审美头像"></div>
            <p class="txt">{{votes[index]}}</p>
            <transition name="fade">
              <span class="img-area-status" v-show="results.data[index].show" :class="results.data[index].select_result ? 'status1' : 'status2'"></span>
            </transition>
          </div>
            <div class="operation"><a href="javascript:;" class="btn block btn-pk" :class="{'btn-pk-tl': results.data[index].flag}" @click="selected(index)">选她</a></div>
        </li>
        <!-- <li class="star-item">
          <div class="img-area">
            <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2138460373,2431522454&fm=58" alt="">
            <p class="txt">我才最美</p>
          </div>
          <div class="operation"><a href="javascript:;" class="btn block btn-pk btn-pk-tl">选她</a></div>
        </li> -->
      </ul>
    </div>
    
      <!-- ****************************  弹层  ******************************-->
      <!-- 遮罩层 -->
      <div class="mask" v-show="mask"></div>
    <!-- 审美弹出层 闯关失败-->
    <div class="toast toast-fail" v-show="mask">
    <img src="../../common/images/fail-bg.png" class="fail-bg" alt="">
    <span class="title">你的审美得分是<span class="report">{{fail_text.score}}</span>分</span>
    <div class="extension moudle-base">
      <img class="extension-avatar" v-bind:src="fail_text.pic" alt="">
      <p class="extension-intro">{{fail_text.text}}</p>
    </div>
    <div class="btn-area">
      <div class="btn-inner">
        <a class="btn block btn-pk mt25" @click.stop.prevent="golinks">给她投票</a>
        <a class="btn block btn-pk mt25"  @click.stop.prevent="shareOut">分享给好友</a>
      </div>
      <a class="btn block btn-pk btn-again mt25"  @click.stop.prevent="refresh('again')">重玩一次</a>
      <p class="desc">闯过<span class="normal">{{level}}</span>关平分<span class="normal prize">8888</span>元现金</p>
    </div>
  </div>
    <Fail v-if="false" :fail-text="fail_text" @increment="refresh" @vote="golinks"></Fail>
    <!-- 底部提示栏 -->
    <Footer-Tip :txt-tl="results.text"></Footer-Tip>
    <!-- toast 弹层 -->
    <transition name="fade-ts">
      <div class="toast toast-error" v-show="toastFlag">分享给好友可无限次玩哦</div>
    </transition>
  </div>
</template>

<script>
  import Fail from 'components/Toast/fail'
  import FooterTip from 'components/Footer/footer'
  // import {client} from 'common/js/mockClient'
  var throttle = false
  var isHelp = false
  // var curlink = window.location.href
  /* eslint-disable quotes */
  export default {
    components: {
      FooterTip,
      Fail
    },
    data() {
      return {
        results: {
          data: [{
            id: 0,
            pic: '',
            flag: false,
            select_result: false,
            show: false
          },
          {
            id: 0,
            pic: '',
            flag: false,
            select_result: false,
            show: false
          }],
          current_level: 1,
          join_count: 1,
          text: '',
          has_help_chance: true
        },
        mask: false,
        answer_tl: true,
        jump_over: false,
        votes: ['我最美', '我最美'],
        fail_text: {
          score: 0,
          pic: '',
          text: '我那么美，竟然比不上她'
        },
        homepage: "",
        level: localStorage.getItem('level'),
        frequency: false,
        toastFlag: false
      }
    },
    methods: {
      selected(index) {
        // alert(index)
        if (throttle !== true) {
          throttle = true
          this.$http.post('/pk/select', {
            'join_count': this.results.join_count,
            'current_level': this.results.current_level,
            'select': this.results.data[index].id,
            'userinfo': localStorage.getItem('userinfo')
          })
          .then((response) => {
            if (response.data.errCode === 0) {
              if (!this.answer_tl) {
                this.results.data[0].flag = false
                this.results.data[1].flag = false
              }
              let res = response.data.results
              // console.log(res)
              let self = this
              setTimeout(function() {
                throttle = false
              }, 400)
              self.votes[0] = `${res.votes[0]}票`
              self.votes[1] = `${res.votes[1]}票`
              if (res.select_result) {
                this.results.data[index].show = true
                this.results.data[index].select_result = true
                if (res.continue) { // 不是最后一关的状态
                  setTimeout(function() {
                    self.results.data[0].id = res.page_down.star_left.id
                    self.results.data[0].pic = res.page_down.star_left.pic
                    self.results.data[1].id = res.page_down.star_right.id
                    self.results.data[1].pic = res.page_down.star_right.pic
                    self.results.current_level = res.page_down.current_level
                    self.results.join_count = res.join_count
                    self.results.text = res.page_down.text
                    self.votes[0] = '我最美'
                    self.votes[1] = '我最美'
                    self.answer_tl = res.page_down.has_help_chance
                    // 还原 勾 × 为默认状态
                    self.results.data[index].show = false
                    // self.results.data[index].select_result = false
                  }, 400)
                  // console.log(self.results.data[index].show)
                } else {
                    // 最后一关状态
                    this.$router.replace('/resulted')
                }
              } else {
                // 选择错误 弹出失败弹层
                this.fail_text.score = res.page_down.score
                this.fail_text.pic = res.page_down.pic
                this.homepage = res.page_down.homepage
                this.frequency = res.page_down.tusi_status
                localStorage.setItem('homepage', this.homepage + '&if_sp=1')
                this.fail_text.text = res.page_down.text
                this.results.data[index].show = true
                this.results.data[index].select_result = false
                setTimeout(function() {
                  self.mask = true
                }, 400)
              }
            } else if (Number(response.data.errCode) === 1401) {
                // 登录失败
                /* eslint-disable no-undef */
                try {
                    client.toLogingAct()
                } catch (e) {
                    console.log(e + '1.1登录页失败play')
                }
            } else {
              console.log(response.data.errorStr)
            }
          })
          .catch(function(err) {
            setTimeout(function() {
              throttle = false
            }, 400)
            console.log(err + '网络异常1')
          })
        }
      },
      helpToggle() {
        if (isHelp !== true) {
          isHelp = true
          this.$http.post('/pk/help', {
            'join_count': this.results.join_count,
            'current_level': this.results.current_level,
            'userinfo': localStorage.getItem('userinfo')
          })
          .then((response) => {
            if (response.data.errCode === 0) {
              isHelp = false
              let res = response.data.results
              // this.results.has_help_chance = answer_tl.help_status
              if (this.results.has_help_chance) {
                this.answer_tl = false
                if (res.content === 'left') {
                  this.results.data[0].flag = true
                } else {
                  this.results.data[1].flag = true
                }
              } else {
                this.answer_tl = false
              }
            } else if (Number(response.data.errCode) === 1401) {
                  // 登录失败
                  /* eslint-disable no-undef */
                  try {
                      client.toLogingAct()
                  } catch (e) {
                      console.log(e + '1.2登录页失败play')
                  }
            } else {
              console.log(response.data.errorStr)
            }
          })
          .catch(function(err) {
            isHelp = false
            console.log(err + '网络异常2')
          })
        }
      },
      againComputer(statue) {
        this.results.data[0].show = false
        this.results.data[1].show = false
        this.results.data[0].select_result = false
        this.results.data[1].select_result = false
        this.votes[0] = '我最美'
        this.votes[1] = '我最美'
        this.$http.get('/pk/start', {
          params: {
             'userinfo': localStorage.getItem('userinfo')
          }
        })
        .then((response) => {
          if (response.data.errCode === 0) {
            this.answer_tl = true
            this.mask = false
            let res = response.data.results
            this.results.data[0].id = res.star_left.id
            this.results.data[0].pic = res.star_left.pic
            this.results.data[1].id = res.star_right.id
            this.results.data[1].pic = res.star_right.pic
            this.results.current_level = res.current_level
            this.results.join_count = res.join_count
            this.results.text = res.text
            this.results.has_help_chance = res.has_help_chance
            if (statue === 'flag') {
              throttle = true
              setTimeout(function() {
                throttle = false
              }, 3000)
              try {
                // 新版本
                // client.toStar('全民厂花', `${localStorage.getItem('links')}`)
                client.toStar('全民厂花', `${localStorage.getItem('homepage')}`)
              } catch (e) {
                window.location.href = localStorage.getItem('homepage')
              }
            }
          } else if (Number(response.data.errCode) === 1401) {
              // 登录失败
              /* eslint-disable no-undef */
              try {
                  client.toLogingAct()
              } catch (e) {
                  alert(e + '1.3登录页失败play')
              }
          } else {
            alert(response.data.errorStr)
          }
        }, (err) => {
          console.log(err)
        })
      },
      refresh(statue) {
        if (statue === 'again') {
          if (this.frequency) {
              this.frequency = false
              this.toastFlag = true
              let self = this
              setTimeout(function() {
               self.toastFlag = false
              }, 1500)
          } else {
            this.againComputer()
          }
        }
      },
      golinks() {
        this.againComputer('flag')
      },
      shareOut() {
        try {
          /* eslint-disable no-undef */
          client.shareUrl(`${window.location.origin}/pk/index.html#/shared`, '闯关测审美赢万元大奖', '美女二选一谁的颜值高？ 试试你能闯多少关！', 'http://cdn.julanling.com/jjb/imageslogo.png')
        } catch (e) {
          console.log(e + '分享失败')
        }
      }
    },
    created() {
      // this.mask = false
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创
      // this.$router.go(0)
      this.$http.get('/pk/start', {
        params: {
          'userinfo': localStorage.getItem('userinfo')
        }
      })
      .then((response) => {
        if (response.data.errCode === 0) {
          this.$nextTick(() => {
            let res = response.data.results
            this.results.data[0].id = res.star_left.id
            this.results.data[0].pic = res.star_left.pic
            this.results.data[1].id = res.star_right.id
            this.results.data[1].pic = res.star_right.pic
            this.results.current_level = res.current_level
            this.results.join_count = res.join_count
            this.results.text = res.text
            this.results.has_help_chance = res.has_help_chance
          })
        } else if (Number(response.data.errCode) === 1401) {
            // 登录失败
            /* eslint-disable no-undef */
            try {
                client.toLogingAct()
            } catch (e) {
                alert(e + '1.4登录页失败play')
            }
        } else {
          alert(response.data.errorStr)
        }
      }, (err) => {
        console.log(err)
      })
    },
    beforeRouteleave  (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      if (from.path !== '/' && from.path !== '/home') {
        this.refresh()
        this.mask = false
      }
      next()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../common/css/utils/variables';
@import '../../common/css/utils/helpers';
    .container{
        text-align: center;
        padding: 0 12px;
        overflow: hidden;
        font-size: 14px;
        .toast-error{
          white-space: nowrap;
          border-radius: 5px;
        }
        >.title{
            margin: 22px auto;
            font-weight: bold;
            font-size: 16px;
            color: $brown;
            >span{
              padding: 0 10px;
            }
        }
        .free-help{
            width: 72px;
            position: absolute;
            bottom: 100%;
            right:-10px;
            >img{
                width: 100%;
                pointer-events:none;
            }
            &-disabled{
                pointer-events:none;
            }
        }
        .star{
            display: flex;
            margin: 22px 20px;
            &-item{
                flex: 1;
                .beauty-girl{
                    margin-top: 3px;
                    height: 96px;
                    overflow: hidden;
                    @extend %img-center;
                    >img{
                        width: 100%;
                        vertical-align: middle;
                    }
                }
                &:first-child{
                    padding-right: 12px;
                    .img-area{
                      background-image: url('../../common/images/home-limg.png');
                    }
                }
                &:last-child{
                    padding-left: 12px;
                    .img-area{
                        background-image: url('../../common/images/home-rimg.png');
                    }
                    .operation{
                        position: relative;
                        &::before{
                            content:'\20';
                            width: calc(200% + 20px);
                            position: absolute;
                            top: 0;
                            height: 34px;
                            background-color: #000;
                            left: calc(-100% - 20px);
                            background:url('../../common/images/play-vs.png') center no-repeat;
                            background-size: contain;
                      }
                    }
                }
                .img-area{
            position: relative;
            background:left top no-repeat;
            background-size: cover;
            padding: 25px 10px 0;
            // height: 180px;
            &-status{
                position: absolute;
                width: 59px;
                height: 46px;
                background: left top no-repeat;
                background-size: contain;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                &.status1{
                    background-image: url('../../common/images/play-true.png');
                }
                &.status2{
                    background-image: url('../../common/images/play-false.png');
                }
            }
            >img{
                width: 100%;
            }
            .txt{
                line-height: 32px;
                font-size: 14px;
                color: $brown;
            }
                }
                .operation{
                padding-top: 35px;
                .btn-pk{
                    &:active{
                        background-color: #fc5367;
                    }
                    &::after{
                        width:25px;
                        height: 7px;
                    }
                    &-tl{
                        &:active{
                            background-color:#fc5367;
                        }
                        color:$yellow;
                        animation:bounce .5s infinite;
                        -webkit-animation:bounce .5s infinite; /* Safari 和 Chrome */
                        box-shadow:-2px 0px 5px #FFFD10,   /*左边阴影*/ 
                                   0px -2px 5px #FFFD10,   /*上边阴影*/ 
                                   2px 0px 5px #FFFD10,    /*右边阴影*/ 
                                   0px 2px 5px #FFFD10;    /*下边阴影*/
                    }
                }
                }
            }
        }
        .desc{
          margin-top: 10px;
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
    }
  .fade-enter-active {
    transition: opacity 0s
  }
  .fade-leave-active{
    transition: opacity .4s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  @keyframes bounce {
    0% {
      box-shadow: none;
    }
    50% {
      box-shadow:-2px 0px 5px #FFFD10,   /*左边阴影*/ 
                                   0px -2px 5px #FFFD10,   /*上边阴影*/ 
                                   2px 0px 5px #FFFD10,    /*右边阴影*/ 
                                   0px 2px 5px #FFFD10;    /*下边阴影*/
    }
    100% {
      box-shadow: none
    }
  }
</style>
