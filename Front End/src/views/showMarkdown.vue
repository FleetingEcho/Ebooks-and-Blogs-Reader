<template>
    <div class="container scroll-content" ref="scollElement" >
<div style="margin-bottom:50px;text-align:center">
<div style="height:300px" >
  <img src="../assets/images/booksPage.png" style="width: 100%;height: 100%;object-fit:cover;;object-fit: cover;" alt="">
</div>
  <h1 style="text-transform:capitalize;margin-top:30px;color: lightseagreen;"> {{this.mdTitle}}</h1>
      <h3 style="margin-top:30px;">{{this.mdTime}}</h3>
          <span  style="margin-top:30px;display:inline-block">Reading Time:</span>
      <Rate style="margin-left:10px" v-model="rateValue" icon="ios-cafe" />
  </div>
      <div  class="showFile" style="margin: 0 auto !important;width:900px" >
      <div id="showmd"  ref="father"  class="vhtml" v-highlight v-html="finalHtml"></div>
      <!-- <div ref="father"  v-html="finalHtml" v-highlight  id="showmd"></div> -->
</div>
 <h1 class="theEnd"> The Ends </h1>
<div style="margin-left:30%;width:40%;margin-bottom:100px">
            <Button class="editButton" type="dashed"  @click="editBlogs()">Go Edit</Button>
          <Button type="dashed" class="delButton"  @click="delBlog()">Delete</Button>
</div>
      <!-- ========== -->
      	<div class="fh5co-navigation">
		<div class="fh5co-cover prev fh5co-cover-sm" style="background-image: url(../images/prePage.jpg)">
			<div class="overlay"></div>

			<a class="copy"  @click="handleNextMd">
				<div class="display-t">
					<div class="display-tc">
						<div>
							<span>Previous Blog</span>
                <span>{{this.mdNextTime}}</span>
              	<h2>{{this.mdNextTitle}}</h2>

						</div>
					</div>
				</div>
			</a>

		</div>
		<div class="fh5co-cover next fh5co-cover-sm" style="background-image: url(../images/nextPage.jpg)">
			<div class="overlay"></div>
			<a class="copy" @click="handleLastMd">
			<!-- <a class="copy"> -->
				<div class="display-t">
					<div class="display-tc">
						<div>
							<span>Next Blog</span>
              <span>{{this.mdLastTime}}</span>
							<h2>{{this.mdLastTitle}}</h2>
						</div>
					</div>
				</div>
			</a>

		</div>
	</div>

    </div>
</template>


<script>

import showdown from 'showdown'
import clonedeep from 'clonedeep'
import showdownHighlight from 'showdown-highlight'
import { getMdVal, editBlogs, delBlogs } from '@/api/data';

export default{
  data(){
    return {
      userKey:'',
      temp:'',
      finalHtml:'',
      mdTitle:'',
      mdTime:'',
      mdRate:'',
      rateValue: 5,
      input:'',
      children:Object,
      mdNextKey:'',
      mdLastKey:'',
      mdNextTitle:'',
      mdLastTitle:'',
      mdNextTime:'',
      mdLastTime:'',
  finalHtml:'',
   }
},
computed: {
},
created(){
    let scrollContent = document.querySelector('.scroll-content');
    if (scrollContent){
        scrollContent.scrollTop = 0;
        scrollContent.scrollLeft = 0;
    }

    },
mounted() {
  this.init()
},

watch: {
	  '$route' (to, from) { //listen the router changes
		  if(to.query.blogId != from.query.blogId){
  window.addEventListener('beforeunload',e=>{
  window.scroll(0,0)
  this.init()
})
			  this.init();//reload data
		  }
	  }
},
methods:{
  handleLastMd() {

 const userKey=this.mdLastKey
        this.$router.push({

       path:'/showMd',
        query: { blogId: userKey }
      })
  },
  editBlogs(){
        const userKey=this.userKey
        this.$router.push({
        path:'/editBlog',
        query: { blogId: userKey }
            })
  },
  delBlog(){
    this.$Modal.confirm({
   okText:'Delete',
   cancelText:'Cancel',
     title: 'Warning',
     content: `Are you sure to delete this blog ?`,
     onOk: () => {
       const val=this.userKey
      delBlogs(val).then((res)=>{
        this.$Message.success( 'deleted Successfully' )
                this.$router.push({
        path:'/blogs',
            })
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
  },
    handleNextMd() {
 const userKey=this.mdNextKey

      this.$router.push({
      path:'/showMd',
        query: { blogId: userKey }
        // path:`/showMd/${userKey}`,
      })
  },

//   dom() {
//     const father=this.$refs.father
//   const m=father.children

//   m.forEach(item=>{
//     // console.log(item);
//   })

// },

  init(){

  let converter = new showdown.Converter({parseImgDimensions: true,extensions:[showdownHighlight]});
  // {parseImgDimensions: true}, {extensions:[showdownHighlight]}
   this.$route.query.blogId? this.userKey=this.$route.query.blogId : this.userKey=''
  if(this.$route.query.blogId===undefined) {
    //  this.$Message.warning('Please select a blog')
     this.$router.push({
        path:'/blogs',
      })
  }
  //  this.$route.params.blogId? this.userKey=this.$route.params.blogId : ''
  const userKeyUnique=this.userKey
  getMdVal(userKeyUnique).then(res => {
        const responseData=JSON.parse(JSON.stringify(res))
        // console.log(responseData[0]["markdownContent"]);
        const temp=responseData[0]["markdownContent"]
         this.mdTitle=responseData[0]["title"]
         this.mdTime=responseData[0]["time"]
         this.rateValue=Number(responseData[0]["rateToday"])
        // console.log(responseData);
        this.mdNextKey=responseData[1]["nextKey"]
        this.mdNextTime=responseData[1]["nextTime"]
        this.mdNextTitle=responseData[1]["nextTitle"]

        this.mdLastKey=responseData[1]["lastKey"]
        this.mdLastTime=responseData[1]["lastTime"]
        this.mdLastTitle=responseData[1]["lastTitle"]

              this.finalHtml = converter.makeHtml(temp);
              // console.log(finalHtml);
              // document.getElementById('showmd').innerHTML = finalHtml;
        }).catch(err => {
          // console.log(err);
        })

        // this.dom()
  }
},
}

</script>

<style lang="css" scoped>
@import '../assets/styles/style.css';
.delButton{
  /* margin-right: 300px; */
float:right;
color: rgb(223, 51, 51);
}
.showFile{
	align-items:center;
	/* justify-content:center; */
  /* width: 800px !important; */
  height: 100%;
  /* margin-left: 50px; */
margin:0 auto;
}
.theEnd{
  text-transform:capitalize;margin-top:30px;color:teal;
  text-align: center;
  font-style:italic;
  margin-bottom: 50px;
}
.vhtml >>> img{ width: 100% !important;}
.vhtml >>> p{ color: #000 !important; margin-bottom:10px}
.vhtml >>> h1{ color: #000 !important;margin-bottom:10px}
.vhtml >>> h2{ color: #000 !important;margin-bottom:10px}
.vhtml >>> h3{ color: #000 !important;margin-bottom:10px}
.vhtml >>> h4{ color: #000 !important;margin-bottom:10px}
.vhtml >>> h5{ color: #000 !important;margin-bottom:10px}
.vhtml >>> h6{ color: #000 !important;margin-bottom:10px}
</style>
