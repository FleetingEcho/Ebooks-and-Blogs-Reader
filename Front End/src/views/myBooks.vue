<template>
    <div class="container">

    <!-- <Upload
        multiple
        ref="ebookUpload"
        type="drag"
        :on-success="handleSuccess"
        :show-upload-list="false"
        :action="`${baseURL}/upload_file`">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" ></Icon>
            <p>Click or drag Ebooks here to upload  :)</p>
        </div>
    </Upload> -->
     <div style="margin-top:50px;width:400px;text-align:center">
         <h3 style="margin-left:50%;margin-right:50%;width:400px;"><div>Search My Ebook</div></h3>
        <Input :value="searchValue" @on-search="clickToSearch" style="margin-left:68%" search enter-button placeholder="Enter to search..." />
     </div>
	<div class="container" style="margin-top:-60px">
        	<header class="eight columns">
                <h3 class="subtitle">Ebooks</h3>
            </header >

	<div class="row">
    <ul id="filterOptions">
    </ul>
		<ul class="gallery holder gallery-3col">
      <template v-for="item in response[1]" >
          	<li class="one-third columns gallery-item" :key="item.key" data-id="id-1" data-type="web">
            	<a href="#" @click="jumpToBook(item.key)" class="gallery-thumb gallery-3-col" data-rel="prettyPhoto">
           <img v-if="Math.floor(Math.random() * 100) > 50" :src="imgSrc" class="scale-with-grid" alt="Image" />
          <img  v-else :src="imgSrc1" class="scale-with-grid" alt="Image" />
                    <span class="date"><span>{{item.updatedAt.substr(8,2)}}</span>
                    {{new Date(item.updatedAt).toString().substr(4,3)}}
                    </span>
                    <span class="shade-thumb">
                        <span class="img-zoom"></span>
                    </span>
                </a>
                <a href="#" @click="jumpToBook(item.key)" class="project-details">
                	<span class="project-title">{{item.file_name}}</span><br />
                    <span class="project-desc">{{item.updatedAt.substr(0,10)}}</span>
                </a>
            </li>
      </template>

        </ul>
        </div>

    <Page
      @on-change="pageChange"
            prev-text="Previous"
      next-text="Next"
      style="margin-top:-40px;text-align:center"
      :total="page_total"
      :page-size="page_size"
    />
	</div>

    </div>
</template>

<script>
import {fetchEbooks,fetchMyBook} from "@/api/data"
import { baseURL } from '@/config'
export default {
        data () {
            return {
                switch1: false,
                searchValue:'',
                goSearch:'',
                baseURL,
                      page_total: 1,
      page_size: 6, // page size
            imgSrc: "",
            // imgSrc: `../images/Ebook/art-${Math.floor(Math.random() * 8)}.jpg`,
      imgSrc1: "",
      imgSrc2: "",
        response: Array
            }
        },
          props: {
    current: {
      type: Number
    }
  },
  mounted() {
    this.pageChange();
  },
        methods:{
          // monthFormat(month){
          //   const number=['01','02','03','04','05','06','07','08','09','10','11','12'],
          //   const Eng=[]
          // },

          jumpToBook(key){
            // const key=userKey
            // fetchMyBook(userKey).then(res=>{
            //   console.log(res);
            // }).catch(err=>{console.log(err)})

      const userKey=key
        this.$router.push({
        path:'/ebook',
        query: { bookId: userKey }

      })
          },
          clickToSearch(value){
            // console.log(value);
            this.goSearch= value;
            this.pageChange()

          },
              pageChange(clickPage) {
                clickPage ? (clickPage = clickPage) : (clickPage = 1);
                // console.log('click');
                // console.log(clickPage);
                const searchVal= this.goSearch
            fetchEbooks(clickPage,searchVal).then(
                  res=>{
                    // console.log(res);
          this.response = res;
          const totalNumber = JSON.stringify(res[0][0]);
          this.page_total = Number(totalNumber);
          const randomNum = Math.floor(Math.random() * 8);
          // random iamge link
          this.imgSrc = `../images/Ebook/art-${randomNum}.jpg`;
          const randomNum1 = Math.floor(Math.random() * 8);
          // random image link
          this.imgSrc1 = `../images/Ebook/art-${randomNum1}.jpg`;
          const randomNum2 = Math.floor(Math.random() * 8);
          // random image link
          this.imgSrc2 = `../images/Ebook/art-${randomNum2}.jpg`;
                  }
                ).catch(err=>console.log(err))
    },

              handleSuccess () {
      this.$Message.success('upload successfully')
      this.file = null
       this.$router.push('/upload');
    },
        }
}
</script>

<style lang="css" scoped>
@import '../assets/stylesheets/base.css';
@import '../assets/stylesheets/layout.css';
@import '../assets/stylesheets/skeleton.css';
</style>
