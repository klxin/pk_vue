<template>
    <div class="result">
        <article class="result-info">
            <div class="success-tl"><img src="../../common/images/result-share.png" alt=""></div>
            <div class="content content-top">
                <p class="intro-desc"> 安心记加班-闯关测审美活动，美女二选一，谁的颜值高？试试你的审美得分是多少！</p>
            </div>
            <img src="../../common/images/home-pkimg.jpg" class="select-avatar" alt="">
            <p class="intro-title">美女二选一，谁的颜值高？</p>
            <p class="intro-title">一万名全民厂花等你来选！</p>
        </article>

        <!-- <Intro-prize :my-level="20"></Intro-prize> -->
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.julanling.app&ckey=CK1361894262570" class="btn block btn-pk">我也要玩</a>
    </div>
</template>

<script>
  import IntroPrize from 'components/Basic/introparts'
  // import {getDevice} from 'common/js/getDevice'
  export default {
    components: {
      IntroPrize
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../common/css/utils/variables';
    .result{
        font-size: 14px;
        background-color: #FFE1E1;
        min-height: 100vh;
        overflow: hidden;
        .btn-pk{
            margin: 10px auto 10px;
            width: 220px;
            font-size: 18px;
            &::after{
                content:'\20';
                width: 35px;
                height: 9px;
            }
        }
        .select-avatar{
            width: 100%;
            display: block;
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
                    height: 25px;
                    text-align: center;
                    font-size: 14px;
                }
                .intro-desc{
                    padding:0 45px;
                    text-align: center;
                    margin: 2px 0 0 0;
                    font-size: 15px;
                    .report{
                        color:$red;
                        padding:0 2px;
                        font-weight: bold;
                    }
                }
                .intro-parts{
                    margin-top: -10px;
                }
                .btn-pk{
                    margin: 0 auto;
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
        .intro-title{
            padding: 0 30px;
            text-align: center;
        }
    }
</style>
