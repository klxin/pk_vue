/*
* @Author: klxin
* @Date:   2017-03-07 09:27:54
* @Last Modified by:   win7
* @Last Modified time: 2017-04-07 14:33:49
*/

'use strict'
/* javascript */

!(function(win, doc) {
    function setFontSize() {
        // 获取window 宽度
        var winWidth = window.innerWidth
        // doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px'
        var size = (winWidth / 750) * 100
        doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px'
    }
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize'
    var timer = null
    win.addEventListener(evt, function () {
        clearTimeout(timer)
        timer = setTimeout(setFontSize, 300)
    }, false)
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(timer)
            timer = setTimeout(setFontSize, 300)
        }
    }, false)
    // 初始化
    setFontSize()
}(window, document))

