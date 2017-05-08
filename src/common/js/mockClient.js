/*
* @Author: klxin
* @Date:   2017-03-21 10:08:12
* @Last Modified by:   win7
* @Last Modified time: 2017-04-13 13:38:47
*/

let client = {
  // 构造函数
  // mock 是否是新版本
  isNew: function() {
    return 'v5.24'
  },
  isShared: function() {
    return 'yes'
  },
  getJjbUserId: function() {
    return 'b54d94ab9b107b853f561bd65b054040a5e556c80c1cb876c4862d2d2b8c1811ded3db7618214c16d3265d90c0f192137b5a7a61d28cb9b009c4ee4b12bd3d06'
  },
  shareUrl: function(){
    alert('恭喜你分享成功')
  }
}
export {client}
