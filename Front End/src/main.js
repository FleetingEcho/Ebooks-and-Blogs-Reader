import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/icon.css'
import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


import echarts from "echarts";
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

Vue.prototype.$echarts = echarts;
Vue.use(mavonEditor)  //Let Vue use the mavonEditor
// Introduce md text editor

Vue.config.productionTip = false


Vue.use(ViewUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
