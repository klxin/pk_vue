/*
* @Author: klxin
* @Date:   2017-03-21 10:08:12
* @Last Modified by:   win7
* @Last Modified time: 2017-04-11 12:39:01
*/
var browser = {
  versions: (function () {
    var u = navigator.userAgent
    // var app = navigator.appVersion
    return {
       trident: u.indexOf('Trident') > -1,
       presto: u.indexOf('Presto') > -1,
       webKit: u.indexOf('AppleWebKit') > -1,
       gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
       mobile: !!u.match(/AppleWebKit.*Mobile.*/),
       ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
       android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
       iPhone: u.indexOf('iPhone') > -1,
       iPad: u.indexOf('iPad') > -1,
       webApp: u.indexOf('Safari') === -1
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
function getDevice() {
  if (browser.versions.mobile) {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return 'wechat'
    }
    if (ua.match(/WeiBo/i) === 'weibo') {
      return 'weibo'
    }
    if (ua.match(/QQ/i) === 'qq') {
      return 'qq'
    }
    if (browser.versions.ios) {
      return 'ios'
    }
    if (browser.versions.android) {
      return 'android'
    }
  } else {
      return 'pc'
  }
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
export {getDevice, getQueryString}
