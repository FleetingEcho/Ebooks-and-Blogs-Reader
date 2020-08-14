<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="css">
   ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
html,body{
  height: 100%;
   width: 100%;
}
.ivu-upload-drag{
  background: rgba(248, 241, 241, 0.986) !important;
  /* margin: 30px 50% 50px 50%; */
  /* opacity:1; */
  border: 1px dashed #0c52df !important;
}
p{font-size: 16px !important; color:'#000000 !important'}
h1{ font-size: 32px !important;}
h2{ font-size: 24px !important;}
h3{ font-size: 18.72px !important;}
h4{ font-size: 16px !important;}
h5{ font-size: 13.28px !important;}
h6{ font-size: 12px !important;}
body{
  margin: 0;
}

 #app {
   width: 100%;
   height: 100%;
 }
</style>

<script>
// In order to monitor routing changes and change the tab page, you need to monitor and call methods in the global APP.vue
import { mapMutations } from 'vuex'
window.addEventListener('beforeunload',e=>{
  window.scrollTo(0,0)
})
export default {

  data () {
    return {
      routerTransition: ''
    }
  },
  watch: {
    '$route' (newRoute) {
      this.UPDATE_ROUTER(newRoute)
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_ROUTER'
    ])
  }
}
</script>
