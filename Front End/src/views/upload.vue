<template>
  <div>
    <!-- <Upload ref="upload" :action="`${baseURL}/upload_file`" multiple :before-upload="beforeUpload" :on-success="handleSuccess" :show-upload-list="false">
      <Button icon="ios-cloud-upload-outline">Upload Files</Button>
    </Upload> -->
        <Upload
        style="width:70%;margin-left:15%;margin-bottom:30px;color: #3399ff"
        multiple
        ref="ebookUpload"
        type="drag"
        :on-success="handleSuccess"
        :show-upload-list="false"
        :action="`${baseURL}/upload_file`">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" ></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>

 <Input :value="searchValue" @on-search="clickToSearch" style="width:50%;margin-left:25%;margin-bottom:30px;"  search enter-button placeholder="Enter to search..." />
    <!-- <Button @click="handleUpload">Click To Upload</Button> -->
    <Table :columns="columns" :data="fileList"></Table>
    <!-- read Md value -->
    <Modal v-model="showModal">
      <div style="height: 300px; overflow: auto">
        {{ content }}
      </div>
    </Modal>
      <Page style="margin-top:50px;text-align:center"
      :total="page_total"
      prev-text="Previous"
      next-text="Next"
      :page-size="page_size"
      @on-change="pageChange"
      />
  </div>
</template>

<script>
import { baseURL } from '@/config'
import { getFileList, getFile, deleteFile } from '@/api/data'
import { downloadFile } from '@/lib/util'
export default {
  data () {
    return {
      baseURL,
      page_total:1,
      searchValue:'',
      showModal: false,
      page_size:5,
      content: '',
      file: {},
      goSearch:'',
      columns: [
        { title: 'Ebook Name', key: 'file_name',
                  render: (h, { row }) => {
            return (
              <span style={{height:'20px',display:'block',
              overflow:'hidden','textOverflow':'ellipsis', 'whiteSpace':'nowrap'
              }} >{ row.file_name }</span>
            )
          }
           },
        { title: 'Ebook Type', key: 'file_type' },
        { title: 'Ebook Size', key: 'file_size',
        render: (h, { row }) => {
            return (
              <span style={{paddingLeft:'20px;font-style:italic;'}} >{ ((row.file_size)/1000).toFixed(0) } <span style="font-style:italic;">KB</span></span>
            )
          }
           },
        { title: 'Upload Time', key: 'createdAt',
          render: (h, { row }) => {
            return (
              <span >{ row.createdAt.substr(0,10) }</span>
            )
          }
        },
        {
          title: 'Storage Time',
          key: 'storage_time',
          render: (h, { row }) => {
            return (
              <span >{ row.storage_time ? row.storage_time : 'permanent' }</span>
            )
          }
        },
        {
          title: 'Action',
          key: 'handle',
          render: (h, { row }) => {
            return (
              <span style="display:block; width:20%;margin-left: -17px">
                <i-button style="width:110px;margin-top:10px;margin-bottom:10px;margin-right:10px"  icon="ios-download-outline" type="primary" on-click={this.download.bind(this, row.key)}>Download</i-button>
                <i-button style="width:110px;margin-bottom:10px" type="error" icon="ios-trash-outline" on-click={this.deleteFile.bind(this, row.key)}> Delete </i-button>
              </span>
            )
          }
        }
      ],
      fileList: []
    }
  },
  methods: {
                  clickToSearch(value){
            // console.log(value);
            this.goSearch= value;
            this.pageChange()

          },
    pageChange(clickPage){
      // console.log('this page is open');
      clickPage ? (clickPage = clickPage) : (clickPage = 1);
       const searchVal= this.goSearch
        this.updateFileList (clickPage,searchVal)

    },
    // beforeUpload (file) {
    //   this.file = file
    //   return false
    // },
    // handleUpload () {
    //   this.$refs.upload.post(this.file)
    // },
    handleSuccess () {
      this.$Message.success('Successfully uploaded')
      // this.updateFileList()
      this.file = null
       this.pageChange()

      //  this.$router.push('/upload');
    },
    download (key) {
      downloadFile({
        url: `/data/getFile`,
        params: {
          key,
          type: 'download'
        }
      })
    },
    showFileContent (key) {
      getFile({
        key,
        type: 'text'
      }).then(res => {
        this.content = res
        this.showModal = true
      })
    },
    deleteFile (key) {
      this.$Modal.confirm({
   okText:'Delete',
   cancelText:'Cancel',
     title: 'Warning',
     content: `Are you sure to delete this file ?`,
     onOk: () => {
      deleteFile(key).then(res => {
        // console.log(res);
        this.$Message.success('Successfully deleted')
        // this.updateFileList()
         this.pageChange()
        // clickToSearch(1)
      })
     },
     onCancel:()=>{
       // this.resetInfo()
     }
   })

    },
    updateFileList (thisPage,searchVal) {
      getFileList(thisPage,searchVal).then(res => {
        this.fileList = res[1]
        const total =res[0][0]
        this.page_total=Number(total)
        // console.log(this.page_total);
      })
    }
  },
  mounted () {
    this.pageChange()
  }
}
</script>

<style lang="css" scoped >
.ivu-upload-drag{
  background: deepskyblue !important;
  /* color:rgba(62, 14, 236, 0.8) */
}
</style>
