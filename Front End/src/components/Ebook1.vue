<template>
  <div class="ebook">
    <TitleBar :ifTitleAndMenuShow="ifTitleAndMenuShow" />
    <div
      ref="readWrapper"
      class="read-wrapper"
    >
      <div id="read"></div>
      <div class="mask">
        <div
          class="left"
          @click="prevPage"
        ></div>
        <div
          @click="toggleTitleAndMenu"
          class="center"
        ></div>
        <div
          class="right"
          @click="nextPage"
        ></div>
      </div>
    </div>
        <menu-bar
      ref="menuBar"
      :ifTitleAndMenuShow="ifTitleAndMenuShow"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :defaultTheme="defaultTheme"
      :themeList="themeList"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      :navigation="navigation"
      @jumpTo="jumpTo"
    ></menu-bar>
  </div>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  // console.log(fontSize)
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})

import {fetchEbooks,fetchMyBook} from "@/api/data"
import Epub from 'epubjs'
import TitleBar from '@/components/TitleBar'
import MenuBar from '@/components/MenuBar'

export default {
  name: 'Ebook',
  components: {
    TitleBar,
    MenuBar
  },
  data () {
    return {
      userKey:'',
      ifTitleAndMenuShow: false,
      bookAvailable: false,
      defaultFontSize: 16,
      bookPath:'',
      url:'',
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultTheme: 0,
      themeList: [
         {
          name: 'default',
          style: {
            body: {
              color: '#000',
              background: '#fff'
            }
          }
        },
        {
          name: 'Almond_Yellow',
          style: {
            body: {
              color: '#000',
              background: '#FAF9DE'
            }
          }
        },
        {
          name: 'Eye_Protection',
          style: {
            body: {
              color: '#000',
              background: '#FFF2E2'
            }
          }
        },
        {
          name: 'Aurora_Gray',
          style: {
            body: {
              color: '#000',
              background: '#EAEAEF'
            }
          }
        },
        {
          name: 'Grass',
          style: {
            body: {
              color: '#000',
              background: ' #E3EDCD'
            }
          }
        }
      ],
      navigation: {}
    }
  },
  methods: {
    init(){
        this.$route.query.bookId? this.userKey=this.$route.query.bookId : this.userKey=''
    if(this.userKey==='') {
     this.$Message.warning('Please select a book')
     this.$router.push({
        path:'/myBooks',
      })
  }
  const userKeyUnique=this.userKey
            fetchMyBook(userKeyUnique).then(res=>{
              // console.log(res);
              this.bookPath=res
            //  this.url= this.bookPath
if(this.bookPath!==''){
  // console.log(this.bookPath);
    process.nextTick(() => {
      this.showEpub()
    })
}
            }).catch(err=>{console.log(err)})
 this.$Message.success('Successfully fetched , Loading...')
    // this.showEpub()
    },
      showEpub () {
      // generate Book
      // this.book = new Epub(url)
      this.book = new Epub(this.bookPath)
      // console.log(this.book)
      // generate Rendition
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()
      this.themes = this.rendition.themes
      this.registerTheme()
      this.setTheme(this.defaultTheme)
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        return this.book.locations.generate()
      }).then(location => {
        // this.bookAvaliable = true
        this.locations = this.book.locations
        // this.onProgessChange(50)
         this.bookAvailable = true
      })
    },
      jumpTo(href) {
      this.rendition.display(href)
      this.hideTitleAndMenu()
    },
    hideTitleAndMenu() {
      // hide title bar and menu bar
      this.ifTitleAndMenuShow = false
      // hide settings
      this.$refs.menuBar.hideSetting()
      // hide content
      this.$refs.menuBar.hideContent()
    },
    onProgressChange (progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    setTheme (index) {
      this.themes.select(this.themeList[index].name)
      this.defaultTheme = index
    },
    setFontSize (fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    },
    toggleTitleAndMenu () {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
      }
    },
        registerTheme () {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';

.ebook {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  margin-top: -65px;
  .read-wrapper {
    position: absolute;
    top: px2rem(48);
    bottom: px2rem(48);
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    // overflow: hidden;
    .mask {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
