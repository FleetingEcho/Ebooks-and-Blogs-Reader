import Vue from 'vue'
import VueRouter from 'vue-router'
import {routerMap,routes} from './router'
import {setTitle} from '@/lib/util'
import store from '@/store'
import clonedeep from 'clonedeep'
import { setToken, getToken } from '@/lib/util'
import ViewUI from 'view-design';
Vue.use(VueRouter)
Vue.use(ViewUI);


const router = new VueRouter({
  // default is hash mode， 即 model:'hash'
  mode:'history',
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  },
  routes:routes,
  // routes:routerMap  //Note that you can't just write a routerMap export directly here

})

// The logic before the jump
// const HAS_LOGIN=false
const HAS_LOGIN=true
// As long as HAS_LOGIN is false, all interfaces cannot be accessed, and only the login page can be continuously jumped to

// Global resolution guard (beforeEach): Triggered before the route jump, this hook is mainly used for login verification
router.beforeEach((to,from,next)=>{
  // window.scrollTo(0, 0)
  // next()
  to.meta && setTitle(to.meta.title)  // this is a Conditional check
  ViewUI.LoadingBar.start();

  // =========================================================
  // !!!   Method 1
   //Check token and then open all the routers
  // const token = getToken()
  // if (token) {
  //   store.dispatch('authorization', token).then(() => {
  //     if (to.name === 'login') next({ name: 'home' }) //it's ok to return to login
  //     else next()
  //   }).catch(() => {
  //     setToken('') // !!! important
  //     next({ name: 'login' })
  //   })
  // } else {
  //   if (to.name === 'login') next()
  //   else next({ name: 'login' })
  // }

  // =========================================================
    // !!!   Method 2
// Obtain authorization management authority from the backend, and then judge.
// If you do not need this permission determination, you need to change the relevant configuration of routes to routerMap, and make some other changes.
  const token = getToken()
  if (token) {
            if(!store.state.router.hasGetRules){
              store.dispatch('authorization').then((rules) => {
                store.dispatch('concatRoutes',rules).then(routers=>{
                  router.addRoutes(clonedeep(routers))
                  // Sometimes routers are not mounted, and direct calls will cause errors
                  next({...to,replace:true})
                  // next({path: '/index',replace:true})
                }).catch(()=> {
                  next({name:'login'})
                })
              })
            }else{
              next()
            }
     } else {
    if (to.name === 'login') next()
    else next({ name: 'login' })
  }

// =========================================================
  // !!!   Method 3
  //Log in directly by default, let go of all routes

  // if (to.name !== 'login'){
  //   if(HAS_LOGIN) next()
  //   else next({name:'login'})  //next() is important

  // }else{
  //   if(HAS_LOGIN) next({ name: 'Home'})
  //   else next()
  // }

})

// router.beforeResolve    //It is the guard after routing confirmation, there are also single page guard and component guard


// Global post hook (afterEach): Contrary to beforeEach, it is triggered after the route jump is completed
// It happens after beforeEach and beforeResolve, and before beforeRouteEnter (guard in component).
// These hooks do not accept next functions and do not change the navigation itself.
router.afterEach((to, from)=>{
  window.scrollTo(0,0);
  ViewUI.LoadingBar.finish();
  // Do some simple logic processing, such as displaying loading when loading, and closing styles after loading;
  // loginIng= false
})

export default router

