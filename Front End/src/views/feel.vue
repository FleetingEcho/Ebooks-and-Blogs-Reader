<template>
  <div class="container">
    <Button @click="handleSubmit" type="primary">Submit</Button>
    <div class="titleControl" >
         <div class="outsideControl"> <span style="float:left; width:20%;">Title</span><Input  v-model="titleValue" style="float:left; width:80%;" placeholder="Enter something..." /></div>
         <div class="outsideControl"> <span  style="float:left; width:20%;">Select Date</span>
         <DatePicker v-model="dateValue" :options="options3" type="date"  style="float:left; width:80%;"  placeholder="Select date"></DatePicker></div>
         <div class="outsideControl">
      <span  style="float:left; width:20%;margin-top:20px">Reading Time:</span>
      <Rate class="rateStyle" v-model="rateValue"  icon="ios-cafe" />
         </div>
    </div>
    <div id="editor">
      <mavon-editor
        language="en"
        :toolbars="toolbars"
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
import { sentFormData } from "@/api/data";

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
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: false // 预览
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
    handleSubmit() {
      if(this.titleValue==='' || this.dateValue===''){
        alert('Title and Date cannot be empty.')
        return
      }
        this.valueData["title"]=this.titleValue
        this.valueData["date"]=this.dateValue
      // console.log(('输入框内容是')+JSON.stringify(this.valueData));
      this.valueData[this.markdownContent]=this.doc
      this.valueData[this.rateToday]=this.rateValue
      // console.log('handleSubmit打印'+JSON.stringify(this.valueData));

        sentFormData({
          url: this.url,
          data: this.valueData
        })
          .then(res => {
            this.$emit("on-submit-success", res);
          })
          .catch(err => {
            this.$emit("on-submit-error", err);
            for (let key in err) {
              this.errorStore[key] = err[key];
            }
          });
       this.$Message.success( 'Successfully Published' )
      this.$router.push({
      path:'/blogs',
      })
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
