<template>
<div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider :width="200" collapsible hide-trigger reverse-arrow v-model="collapsed" class="sider-outer">
        <side-menu :collapsed="collapsed" :list="routers"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" :size="32"/>
            <div style="width:150px" class="logoutButton">
                    <Icon type="md-person" style="font-size:30px;float:left;margin-top:15px" />
                     <span style="font-size:18px;display:inline-block;float:left">Logout</span>
            <i-switch
              true-color="#13ce66"
              false-color="#ff4949"
              :before-change="handleBeforeChange"
              size="large"
              style="float:right;margin-top:20px"
            >
              <span slot="close">OFF</span>
            </i-switch>



          </div>
        </Header>
        <Content class="content-con">
          <div>
            <Tabs type="card" @on-click="handleClickTab" :value="getTabNameByRoute($route)">
              <TabPane :label="labelRender(item)" :name="getTabNameByRoute(item)" v-for="(item, index) in tabList" :key="`tabNav${index}`"></TabPane>
            </Tabs>
          </div>
          <div class="view-box">
            <Card shadow class="page-card">
              <EbookUpload v-if="showHome" />
              <!-- <router-view /> -->
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import SideMenu from '@/components/side-menu'
import EbookUpload from '@/views/ebookUpload'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getTabNameByRoute, getRouteById } from '@/lib/util'
import ebookUpload from '@/views/ebookUpload.vue';


export default {
  props: {
      //    homeShow:{
      //   type: Boolean,
      //   default: true
      // },
  },
  components: {
    SideMenu,
    EbookUpload
  },
  data () {
    return {
      searchId:'',
      showHome:Boolean,
      showOthers:Boolean,
      collapsed: false,
     getTabNameByRoute
    }
  },
  computed: {

    triggerClasses () {
      return [
        'trigger-icon',
        this.collapsed ? 'rotate' : ''
      ]
    },
      ...mapState({
      tabList: state => state.tabNav.tabList,
      routers: state => state.router.routers.filter(item => {
        return item.path !== '*' && item.name !== 'login'
      })
    })
  },
  mounted(){
    // window.addEventListener('onload', e => this.onloadFn(e))
  },
//   destroyed() {
//   window.removeEventListener('onload', e => this.onloadFn(e))
// },

  watch:{
    $route(to,from){
      if(to.path===from.path){
        // console.log(111);
        this.init()
        // to.path ==='/' ? this.showHome=true : this.showHome=false
      }
     if(to.path !=='/'){
      //  this.showOthers= true
       this.showHome=false
     }else{
      // this.showOthers= false
       this.showHome=true
     }
    }
      // '$route':'init'
},

   methods: {
     onloadFn(e) {
    console.log(e)
    this.init()
    // alert(e)
    // ...
  },
     init(){
     if(this.$route.path !=='/' ){
       this.showHome=false
      //  this.showOthers=false
     }else{
      this.showHome=true
      //  this.showOthers=true
     }
     },
    ...mapActions([
      'handleRemove',
      'logout'
    ]),

      handleLogout() {
      this.logout();
      this.$router.push({
        name: "login"
      });
    },
        handleBeforeChange() {
      return new Promise(resolve => {
        this.$Modal.confirm({
          title: "Close Confirm",
        okText:'OK',
        cancelText:'Cancel',
          content: "Are you sure to logout?",
          onOk: () => {
            // resolve();
            this.handleLogout();
          }
        });
      });
    },
    handleCollapsed () {
      this.collapsed = !this.collapsed
      // console.log('tabList content'+this.tabList);
    },
    handleClickTab (id) {
      let route = getRouteById(id)
      console.log(route);
      this.searchId=route.name
      const val=this.$route.fullPath
      if(route.query !==undefined){
        this.searchId=route.query.blogId
      }
      if(val.indexOf(this.searchId) <0){
        this.$router.push(route)
      }
    },
    handleTabRemove (id, event) {
      event.stopPropagation()
      this.handleRemove({
        id,
        $route: this.$route
      }).then(nextRoute => {
        // console.log(nextRoute.name);
        if (nextRoute.name!=='Home') this.$router.push(nextRoute)
      })
    },
    labelRender (item) {
      return h => {
        return (
          <div>
            <span>{item.meta.title}</span>
            <icon nativeOn-click={this.handleTabRemove.bind(this, getTabNameByRoute(item))} type="md-close-circle" style="line-height:10px;"></icon>
          </div>
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.logoutText {
  font-size: 16px;
  color: rgb(26, 204, 228);
  margin-left: 10px;
  float: left;
  height: 10px;
}
.logoutButton {
  float: right;
  margin-right: 40px;
}
.layout-wrapper, .layout-outer{
  height: 100%;
  .header-wrapper{
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
    padding: 0 23px;
    .trigger-icon{
      cursor: pointer;
      transition: transform .3s ease;
      &.rotate{
        transform: rotateZ(-90deg);
        transition: transform .3s ease;
      }
    }
  }
  .sider-outer{
    height: 100%;
    overflow: hidden;
    .ivu-layout-sider-children{
      margin-right: -20px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
  .content-con{
    padding: 0;
    .ivu-tabs-bar{
      margin-bottom: 0;
    }
    .view-box{
      padding: 0;
    }
  }
  .page-card{
    min-height: ~"calc(100vh - 84px)";
  }
}
</style>
