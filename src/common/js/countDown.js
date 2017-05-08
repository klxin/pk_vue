/*
* @Author: klxin
* @Date:   2017-03-21 10:08:12
* @Last Modified by:   win7
* @Last Modified time: 2017-04-06 12:04:55
*/

export class CountDown {
  constructor(endTime) {
    this.endTime = new Date(endTime)
  }
  getRTime() {
    let target = {}
    let curTime = new Date()
    let t = parseInt(this.endTime.getTime() - curTime.getTime())
    target.d = Math.floor(t / 1000 / 60 / 60 / 24)
    target.h = Math.floor(t / 1000 / 60 / 60 % 24)
    target.m = Math.floor(t / 1000 / 60 % 60)
    target.s = Math.floor(t / 1000 % 60)
    target.d = target.d < 10 && target.d > 0 ? '0' + target.d : target.d
    target.h = target.h < 10 && target.d > 0 ? '0' + target.h : target.h
    target.m = target.m < 10 && target.d > 0 ? '0' + target.m : target.m
    target.s = target.s < 10 && target.d > 0 ? '0' + target.s : target.s
    // console.log(`${target.d}天${target.h}小时${target.m}分${target.s}秒`)
    return target
  }
}

