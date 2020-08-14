import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import router from './module/router'
import tabNav from './module/tabNav'
import saveInLocal from './plugin/saveInLocal'
Vue.use(Vuex)

export default new Vuex.Store({
  // strict:true,  //strict mode
  strict:false,  //non-strict mode
  modules: {
    user,
    router,
    tabNav
  },
  // plugins: [ saveInLocal ]
})
