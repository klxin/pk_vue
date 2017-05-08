/*
* @Author: win7
* @Date:   2017-03-09 11:09:14
* @Last Modified by:   win7
* @Last Modified time: 2017-03-10 16:34:06
*/

'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/products.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 整和各个模块
  modules: {
    index
  }
})

