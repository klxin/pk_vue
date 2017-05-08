<template>
	<div class="toast toast-fail">
    <img src="../../common/images/fail-bg.png" class="fail-bg" alt="">
		<span class="title">你的审美得分是<span class="report">{{failText.score}}</span>分</span>
		<div class="extension moudle-base">
      <img class="extension-avatar" v-bind:src="failText.pic" alt="">
			<p class="extension-intro">{{failText.text}}</p>
		</div>
    <div class="btn-area">
      <a class="btn block btn-pk mt25" @click.stop.prevent="goVote">给她投票</a>
      <a class="btn block btn-pk mt25"  @click.stop.prevent="againTest">重玩一次</a>
      <a class="btn block btn-pk mt25"  @click.stop.prevent="shareOut">分享</a>
    </div>
	</div>
</template>

<script>
  export default {
    props: {
      failText: Object
    },
    methods: {
      againTest() {
        this.$emit('increment')
      },
      goVote() {
        /* eslint-disable no-undef */
        this.$emit('vote')
        if (this.failText.flag) {
          try {
            // 新版本
            // client.toStar('全民厂花', `${localStorage.getItem('links')}`)
            client.toStar('全民厂花', `${localStorage.getItem('homepage')}`)
          } catch (e) {
            window.location.href = localStorage.getItem('homepage')
          }
        }
      },
      shareOut() {
        alert(121212)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../common/css/utils/variables';
@import '../../common/css/utils/helpers';
	.toast-fail{
    font-size: 14px;
    width: 85%;
    padding: 88px 28px 0 23px;
    .fail-bg{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
    }
    .title{
      width: 180px;
      height: 100px;
      position: absolute;
      background:url('../../common/images/fail-cloud.png') left top no-repeat;
      background-size: contain;
      top: -50px;
      font-size: 15px;
      padding-top: 20px;
      padding-right: 10px;
      .report{
        color: $red;
        font-weight: bold;
        padding: 0 -2px;
      }
    }
    .moudle-base{
      border-radius: 6px;
      border-color: $brown;
      &::before{
        border-radius: 6px;
        left: 5px;
        top: 6px;
        border-color: $brown;
      }
    }
  	.extension{
  		display: flex;
      padding: 6px;
  		&-avatar{
  			width: 62px;
        height: 62px;
        border: 2px solid #fff;
  			
  		}
  		&-intro{
    		word-break:break-all;
        padding: 0 5px;
        font-size: 12px;
        line-height: 18px;
        @extend %img-center;
        flex: 1;
  		}
  	}
    .btn-area{
      padding: 12px 4px 30px;
    }
    .btn-inner{
      display: flex;
      .btn{
        flex:1;
        font-size: 18px;
        &::after{
          display: none;
        }
        &:first-child{
          margin-right: 10px;
        }
      }
    }
    .btn-again{
      background-color: #e86575;
    }
	}
</style>
