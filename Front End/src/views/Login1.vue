<template>
    <div class="container">
     <div class="box">
    <!-- <h1 class="title"><Strong>Ebook Login</Strong></h1> -->
    <h1 class="title">Ebook Login</h1>

    <div class="inputBox">
      <input v-model="userName" type="text" name="" required="">
      <label>username</label>
    </div>
    <div class="inputBox">
		<input type="password" name="password" v-model="password" required="">
		<label>password</label>
    </div>
      <Button type="primary" class="buttonLogin" @click="handleSubmit">Login</Button>
    <!-- <input type="submit" name="" @click="handleSubmit" value="login"> -->
	</div>
     <!-- <Button v-if="serverError=false" @click="instance('error')">Error</Button> -->
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login_page',
  data () {
    return {
      userName: '',
      password: '',
    }
  },
    props:{
//
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    resetInfo(){
   this.userName='',
  this.password= ''
    },
    handleSubmit () {
      this.login({
        userName: this.userName,
        password: this.password
      }).then(() => {
        console.log('success!!')
      this.$Message.success( 'Successfully loged in' )
        this.$router.push({
          name: 'Home'
        })
      }).catch(error => {
        console.log(error)
        if (error.code===401) {
          this.$Message.error( 'Error in username or password' )
    //  alert('Error in username or password')===undefined ? this.resetInfo(): ''
      // this.$Modal.error({
      //   okText:'OK',
      //   cancelText:'Cancel',
      //     title: 'Error',
      //     content: `Error in username or password.`,
      //     onOk: () => {
      //        this.resetInfo()
      //     },
      //     // onCancel:()=>{
      //     //   this.resetInfo()
      //     // }
      //   })
        }
      })
    },
    instance (type) {
    const title = 'Error';
    const content = '<p>user name or password is wrong</p>';
    switch (type) {
        case 'error':
            this.$Modal.error({
                title: title,
                content: content
            });
            break;
    }
}
  }
}
</script>

<style lang="css" scoped>
.buttonLogin{
  /* margin-left: 100px; */
  width:40%;margin-left:31%;
}
.title{
  text-align: center;
  color:#ec6200;
}
.container{
  height: 100%;
  width:100%;
    margin:0;
    padding: 0;
    font-family: sans-serif;
    background: url("../../public/static/1000.png") no-repeat;
    background-size: cover;
}
.box
{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width:400px;
 	padding: 40px;
    background:rgba(108 50 40 0.8);
	box-sizing:border-box;
	/* box-shadow:0 10px 20px rgba(180, 81, 23, 0.5); */
	border-radius: 10px;
}
.box h2
{
	margin:0 0 30px;
	padding:0;
	color:rgb(238, 238, 238);
	text-align:center;
	}
	.box .inputBox
	{
		position:relative;
	}
.box .inputBox input
{
	width: 100%;
	padding: 10px 0;
	font-size:16px;
	color: rgb(255, 255, 255);
	letter-spacing: 1px;
	margin-bottom:30px;
	border:none;
	border-bottom:1px solid rgb(255, 255, 255);
	outline:none;
	background:transparent;
}
.box .inputBox label
{
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}
.box .inputBox input:focus ~ label,
.box .inputBox input:valid ~ label
{
    top: -10px;
	left: 0;
	color: #5fecce;
	font-size: 12px;
}
.box  input[type="submit"]
{
	background: transparent;
	border: none;
	outline: none;
	color: #fff;
	background: #1e88eb;
	padding: 10px 50px;
  cursor: pointer;
  margin-left:100px;
	border-radius: 5px;
}
</style>
