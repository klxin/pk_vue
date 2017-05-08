<template>
	<div class="toast toast-register">
		<i class="icon-close" @click.stop.prevent="closeToast"></i>
		<h2 class="title" v-if="!regStatue">登记领取信息</h2>
		<h2 class="title" v-show="regStatue">温馨提示</h2>
		<p class="prompt" v-if="!regStatue">请填写真实信息，活动结束后，现金将直接发送至银行卡内</p>
		<p class="prompt" v-show="regStatue">您已提交领取信息，请耐心等待活动结束，我们会将平分后的现金直接打款至您的银行卡。</p>
		<p class="prompt" v-show="regStatue">官方微信号：anxinjjb</p>
		<div class="content" v-if="!regStatue">
			<ul class="list">
				<li class="list-item"><input v-model="realname" onchange="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))" maxlength="5" type="text" placeholder="输入真实姓名"></li>
				<li class="list-item"><input v-model="card" @keyup="cardCheck($event)" type="text" placeholder="输入银行卡号码"></li>
				<li class="list-item"><input v-model="bankname" maxlength="20" type="text" placeholder="输入银行名称"></li>
				<li class="list-item"><input v-model="phone" @keyup="phoneCheck($event)" type="text" maxlength="13" placeholder="输入手机号码" onkeyup="value=value.replace(/[^\d\s]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d\s]/g,''))"></li>
			</ul>
		</div>
    <a class="btn block btn-submit" v-if="!regStatue" @click.prevent.stop="regInfo">提交</a>
		<a class="btn block btn-submit" v-show="regStatue" @click.prevent.stop="konwn">确定</a>
		<transition name="fade-info">
	    	<div class="toast toast-error" v-show="error">{{tl}}</div>
		</transition>
	</div>
</template>

<script>
  var luhmflag = false
  import {bankData} from 'common/js/bankData'
  // import {luhmCheck} from 'common/js/Luhm'
  export default {
    data() {
      return {
        error: false,
        tl: '信息填写不完整，请重新填写',
        realname: '',
        card: '',
        bankname: '',
        phone: ''
      }
    },
    props: {
     regStatue: {
        type: Boolean,
        default: false
     }
    },
    methods: {
      cardCheck(e) {
        /* eslint-disable */
        // 验证银行名称
        e.target.value=e.target.value.replace(/\D/g,'').replace(/....(?!$)/g,'$& ')
        if (e.target.value.length > 3 ) {
          // alert(e.target.value.replace(/\/s/g, ''))
          var temp = e.target.value.replace(/\s/ig, '')
          /*if (e.target.value.indexOf(' ') !== -1) {
            // temp = e.target.value.split(' ').join('')
          }*/
          // console.log(temp)
          if (temp.length < 11) { 
            bankData.forEach((item, i) => {
              if (temp == item.bin) {
                this.bankname = item.bankName
              }
            })
          }
        }
        if (e.target.value.length > 23) {
          // alert(e.target.value.length)
          this.card = e.target.value.slice(0, 23)
        }
      },
      phoneCheck(e) {
        if (e.target.value.length > 13) {
          e.target.value = e.target.value.slice(0, 13)
        }
        if(event.keyCode==8){
            return;
        }
        if(e.target.value.length == 3 || e.target.value.length == 8){
            var phone = e.target.value + " "
            e.target.value = phone
        }
      },
      errTitle() {
        this.error = true
        let self = this
        setTimeout(function() {
         self.error = false
        }, 1500)
      },
      submitInfo() {
        var cardNumber = this.card.replace(/\s/ig, '')
        var phone = this.phone.replace(/\s/ig, '')
         /* eslint-disable */
        function luhmCheck(bankno) {
          var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
          var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
          var newArr=new Array();
          for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
              newArr.push(first15Num.substr(i,1));
          }
          var arrJiShu=new Array();  //奇数位*2的积 <9
          var arrJiShu2=new Array(); //奇数位*2的积 >9
           
          var arrOuShu=new Array();  //偶数位数组
          for(var j=0;j<newArr.length;j++){
              if((j+1)%2==1){//奇数位
                  if(parseInt(newArr[j])*2<9)
                  arrJiShu.push(parseInt(newArr[j])*2);
                  else
                  arrJiShu2.push(parseInt(newArr[j])*2);
              }
              else //偶数位
              arrOuShu.push(newArr[j]);
          }
           
          var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
          var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
          for(var h=0;h<arrJiShu2.length;h++){
              jishu_child1.push(parseInt(arrJiShu2[h])%10);
              jishu_child2.push(parseInt(arrJiShu2[h])/10);
          }        
           
          var sumJiShu=0; //奇数位*2 < 9 的数组之和
          var sumOuShu=0; //偶数位数组之和
          var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
          var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
          var sumTotal=0;
          for(var m=0;m<arrJiShu.length;m++){
              sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
          }
           
          for(var n=0;n<arrOuShu.length;n++){
              sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
          }
           
          for(var p=0;p<jishu_child1.length;p++){
              sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
              sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
          }      
          //计算总和
          sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
           
          //计算Luhm值
          var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
          var luhm= 10-k;
           
          if(lastNum == luhm){
            luhmflag = true
            return true;
          }
          else{
            luhmflag = false
            return false;
          }        
        }
        luhmCheck(cardNumber)
        if (luhmflag) {
          this.$http.post('/pk/submit_info', {
            'realname': this.realname,
            'card': cardNumber,
            'bank_name': this.bankname,
            'phone': phone,
            'userinfo': localStorage.getItem('userinfo')
          })
          .then((response) => {
            if (response.data.errCode === 0) {
              this.$emit('isRegister')
            } else if (Number(response.data.errCode) === 1401) {
                // 登录失败
                /* eslint-disable no-undef */
                try {
                  client.toLogingAct()
                } catch (e) {
                  alert(e + '1.2登录页失败resulted')
                }
            } else {
              console.log('用户领奖信息请求失败')
            }
          }, (err) => {
            console.log(err)
          })
        } else {
          this.tl = '银行卡号输入有误，请重新输入'
          this.errTitle()
        }
      },
      regInfo() {
        if (this.realname && this.card && this.bankname && this.phone) {
          let namereg = /^[\u4e00-\u9fa5]+$/.test(this.realname)
          // let cardreg = /^(\d{16}|\d{19})$/.test(this.card)
          let cardreg = this.card
          let banknamereg = /^\S+$/.test(this.bankname)
          let phonereg = /0?(13|14|15|18|17)[0-9|\s]{9}/.test(this.phone)
          if (namereg) {
            if (cardreg) {
              if (banknamereg) {
                if (phonereg) {
                  // alert('验证通过')
                  this.submitInfo()
                } else {
                  this.tl = '手机号码输入有误，请重新输入'
                  this.errTitle()
                }
              } else {
                this.tl = '银行名称输入有误，请重新输入'
                this.errTitle()
              }
            } else {
              this.tl = '银行卡号输入有误，请重新输入'
              this.errTitle()
            }
          } else {
            this.tl = '姓名输入有误，请重新输入'
            this.errTitle()
          }
        } else {
          this.errTitle()
        }
      },
      closeToast() {
        this.$emit('isClose')
      },
      konwn() {
        this.$emit('isKonwn')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../common/css/utils/variables';
	.toast-register{
		width: 86%;
		border-top: 2px solid #FB8696;
		padding: 0 20px;
		background-color: #fff;
		.icon-close{
			position: absolute;
			top: -5px;
			right: 18px;
		}
		>.title{
			color: $brown;
			font-size: 18px;
			line-height: 40px;
			padding-top: 5px;
			text-align: center;
			font-weight: bold;
		}
		>.prompt{
			font-size: 14px;
			color: #696969;
			line-height: 18px;
		}
		.list{
			margin-top: 15px;
			&-item{
				font-size: 16px;
				margin-top: 8px;
				border: 1px solid #e5e5e5;
				>input{
					text-align: center;
					height: 43px;
					width: 100%;
					outline: none;
					border: none;
					background-color: #f4f4f4;
				}
			}
		}
		.btn-submit{
			background-color: $blue;
			color: #fff;
			font-size: 20px;
			width: 208px;
			margin: 22px auto;
		}
	}
	.fade-info-enter-active, .fade-info-leave-active {
	  transition: opacity .5s
	}
	.fade-info-enter, .fade-info-leave-active {
	  opacity: 0
	}
</style>
