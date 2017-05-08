/*
* @Author: klxin
* @Date:   2017-03-07 09:27:54
* @Last Modified by:   win7
* @Last Modified time: 2017-04-07 14:12:25
*/

'use strict'

var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
       correctPx()
    };
     // 校正
    function correctPx(){
      var docEl = document.documentElement;
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      var div = document.createElement('div');
      div.style.width = '1.4rem';
      div.style.height = '0';
      document.body.appendChild(div);
      var ideal = 140 * clientWidth / 320;
      var rmd = (div.clientWidth / ideal);
      if(rmd >1.2)
        docEl.style.fontSize = 100 * (clientWidth / 320)/ rmd + 'px';
      document.body.removeChild(div);
    }
// Abort if browser does not support addEventListener
if (!doc.addEventListener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false);