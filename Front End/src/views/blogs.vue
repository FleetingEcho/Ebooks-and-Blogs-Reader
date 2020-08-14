<template >
  <div class="container" >
    <div id="page">
      <div style="height:300px">
        <img
          src="../assets/images/booksPage.png"
          class="cssImage"
           style="margin-left:0%;width:100%;height:300px"
          alt=""
        />
      </div>
      <div class="featured" style="text-align:center">
    </div>
      </div>

        <h1 class="blogCenter">My blogs</h1>
         <h3  class="blogCenter"><div>Search My Blogs</div></h3>

        <Input :value="searchValue" @on-search="clickToSearch" class="cssInput" search enter-button placeholder="Enter to search..." />

    <template v-for="item in response[1]">
      <div class="fh5co-post" :key="String(item.key)">
        <div class="fh5co-entry padding">
          <img v-if="Math.floor(Math.random() * 100) > 50" :src="imgSrc" />
          <img v-else :src="imgSrc1" />
          <div>
            <span class="fh5co-post-date">{{ item.time }} </span>
            <h2>
              <a @click="jumpToBlogs(item.key)">{{ item.title }}</a>
            </h2>
            <!-- <p>{{ item.date.substr(0,10) }}</p> -->
            <Button class="editButton" type="dashed"  @click="editBlogs(item.key)">Go Edit</Button>
            <Button type="text" class="delButton"  @click="delBlog(item.key)">Delete</Button>
          </div>
        </div>
      </div>
    </template>

    <Page
      @on-change="pageChange"
      prev-text="Previous"
      next-text="Next"
      style="margin-top:100px;text-align:center;"
      :total="page_total"
      :page-size="page_size"
    />
    <div class="gototop js-top">
      <a href="#" class="js-gotop"><i class="icon-arrow-up"></i></a>
    </div>
  </div>
</template>

<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/main.js"></script>
<script>
import { fetchBlogs ,delBlogs} from "@/api/data";
export default {
  data() {
    return {
      shouldClear:null,
      iconSize:'large',
      // current:1,
      imgSrc: "",
        searchValue:'',
                goSearch:'',
      imgSrc1: "",
      page_total: 1,
      page_size: 3, //每一页个数
      blogTitle: "",
      blogTime: "",
      blogKey: "",
      blogDate: "",
      response: Array
    };
  },
  props: {
    current: {
      type: Number
    }
    // response:{
    //   type:Array,
    // }
  },
  methods: {
      clickToSearch(value){
            // console.log(value);
            this.goSearch= value;
            this.pageChange()

          },
    jumpToBlogs(key) {
      const userKey=key
        this.$router.push({
        path:'/showMd',
        query: { blogId: userKey }
      })
    },
    delBlog(val){
    this.$Modal.confirm({
   okText:'Delete',
   cancelText:'Cancel',
     title: 'Warning',
     content: `Are you sure to delete this blog ?`,
     onOk: () => {
      delBlogs(val).then((res)=>{
        // let shouldClear
        // console.log(res);
        this.$Message.success( 'deleted Successfully' )
        this.shouldClear=window.setTimeout(()=>{
          this.pageChange()
        },800)
      }).catch(
        (err)=>{
          if (err) throw err
        }
      )
     },
     onCancel:()=>{
       // this.resetInfo()
     }
   })

      // console.log(val);

    },
    editBlogs(val){
      // console.log(val);
            const userKey=val
        this.$router.push({
        path:'/editBlog',
        query: { blogId: userKey }
            })
    },
    pageChange(clickPage) {
      clickPage ? (clickPage = clickPage) : (clickPage = 1);
       const searchVal= this.goSearch
      fetchBlogs(clickPage,searchVal)
        .then(res => {
          //  console.log(res);
          this.response = res;
          const totalNumber = JSON.stringify(res[0][0]);
          // console.log(totalNumber);
          this.page_total = Number(totalNumber);
          const randomNum = Math.floor(Math.random() * 10);
          this.imgSrc = `../images/project-${randomNum}.jpg`;
          const randomNum1 = Math.floor(Math.random() * 10);
          this.imgSrc1 = `../images/project-${randomNum1}.jpg`;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.pageChange();
  },
  beforeDestroy(){
      clearTimeout(this.shouldClear)
      this.shouldClear=null
  }
};
</script>

<style lang="css" scoped>
@import "../assets/styles/style.css";
.cssImage{
  width: 100%;height:500px;object-fit:cover;
}
.container{
  width: 100%;
}
.cssInput{
  width:50%;margin-left:25%;margin-bottom:30px;
}
.delButton{
  /* margin-right: 300px; */
float:right;
color: rgb(223, 51, 51);
}
.blogCenter{
  margin-top:20px;
  width:50%;margin-left:25%;margin-bottom:30px;text-align:center
}
.imgside {
  float: left;
  width: 290px;
  margin-top: 20px;
  /* height: 400px; */
}
.imgside img {
  max-width: 290px;
  margin-bottom: 30px;
  max-height: 150px;

}
/* .fh5co-entry{
  float:right !important;

} */
</style>
