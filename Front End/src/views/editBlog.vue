<template>
  <div class="container">
    <Button @click="handleSubmit" type="primary">Update</Button>
    <div class="titleControl" >
         <div class="outsideControl"> <span style="float:left; width:20%;">Title</span><Input  v-model="titleValue" style="float:left; width:80%;" placeholder="Enter something..." /></div>
         <div class="outsideControl"> <span  style="float:left; width:20%;">Select Date</span><DatePicker :options="options3" v-model="dateValue" type="date"  style="float:left; width:80%;"  placeholder="Select date"></DatePicker></div>
         <div class="outsideControl">
      <span  style="float:left; width:20%;margin-top:20px">Reading Time:</span>
      <Rate class="rateStyle" v-model="rateValue"  icon="ios-cafe" />
         </div>
    </div>
    <div id="editor">
      <mavon-editor
        language="en"
        :toolbars="toolbars"
        :value="finalHtml"
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
        @change="change"
        @save="saveDoc"
        v-model="doc"
        style="height:100%"
        ref="md"
      />
      <!-- <mavon-editor style="height: 100%"   ref=md @imgAdd="imgAdd" @imgDel="$imgDel"></mavon-editor> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import clonedeep from "clonedeep";
import { editBlogs,getMdVal } from "@/api/data";
Vue.use(mavonEditor); //Let Vue use the mavonEditor
import axios from "../api/index";

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "editor",
  components: {
    mavonEditor,
  },
  data() {
    return {
      options3: {
          disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;
          }
      },
      temp:'',
      finalHtml:'',
      mdTitle:'',
      mdTime:'',
      mdRate:'',
      userKey:'',
      doc: "",
      titleValue:"",
      dateValue:"",
      url: "/data/formData",
      rateValue: 4,
      markdownContent:'markdownContent',
      rateToday:'rateToday',
      valueData: {},
      ruleData: {},
      errorStore: {},
      initValueData: {},
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        /* 1.3.5 */
        undo: true,
        redo: true,
        trash: true,
        save: true,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: false
      }
    };
  },
  props: {
    //   value: {
    // type: String,
    // default: ''
    // },
  },
  methods: {
    init(){
       this.$route.query.blogId? this.userKey=this.$route.query.blogId : this.userKey=''
      // console.log(this.userKey);
       const userKeyUnique=this.userKey
        getMdVal(userKeyUnique).then(res => {
        const responseData=JSON.parse(JSON.stringify(res))
        // console.log(responseData[0]["markdownContent"]);
        const temp=responseData[0]["markdownContent"]
         this.titleValue=responseData[0]["title"]
         this.dateValue=responseData[0]["time"]
         this.rateValue=Number(responseData[0]["rateToday"])
        this.doc = temp
        }).catch(err => {
          // console.log(err);
        })
    },
    handleSubmit() {
        this.valueData["title"]=this.titleValue
        this.valueData["date"]=this.dateValue
      this.valueData[this.markdownContent]=this.doc
      this.valueData[this.rateToday]=this.rateValue
      // console.log('handleSubmit打印'+JSON.stringify(this.valueData));

        editBlogs({
          url: this.url,
          data: {
            value: this.valueData,
            userKey:this.userKey
          }
        })
          .then(res => {
            if(res.status_code===200){
      this.$Message.success( 'Edited Successfully' )
      this.$router.push({
      path:'/blogs',
      })
            }
            this.$emit("on-submit-success", res);
          })
          .catch(err => {
            this.$emit("on-submit-error", err);
            for (let key in err) {
              this.errorStore[key] = err[key];
            }
          });

    },
    handleReset() {
      this.valueData = clonedeep(this.initValueData);
    },

    //Monitor markdown changes
    change(markdown, html) {
    },
    saveDoc(markdown, html) {
      let markdownVal = this.$refs.md.d_value;
    },
    //Upload picture interface pos represents the first picture
    handleEditorImgAdd(pos, $file) {
      const formdata = new FormData();
      formdata.append("file", $file);
      // console.log(formdata);
      axios.request({
          url: "data/markdown",
          method: "post",
          data: formdata
        })
        .then(res => {
          const url = res.path.replace(/\\/g, "/");
          let index = url.lastIndexOf("/file_storage");
          const urlProcess = url.slice(index + 1);
          this.$refs.md.$img2Url(pos, urlProcess); //Here is to refer to ref = md and then call the $img2Url method to replace the address.
        });
    },
    handleEditorImgDel() {}
  },
  mounted() {
    this.init()
  }
};
</script>

<style lang="css" scoped>
.rateStyle{
   width:80%;margin-top:13px;margin-left:-210px
}
.titleControl{
 width:50%;margin-left:25%;margin-bottom:30px;text-align:center
}
.ivu-input-wrapper{
      margin-bottom: 20px;
}
.outsideControl{
 width:100%;
 /* margin-left:25%; */
 margin-bottom:30px;
 /* margin-bottom:30px; */
 text-align:center
}
.insideControl{
 width:50%;margin-left: 10%;margin-bottom:20px;
}
.insideControl{
 margin-bottom:20px;
}
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
.v-note-wrapper.shadow {
  z-index: 0;
  margin-top: 20px;
}
</style>
