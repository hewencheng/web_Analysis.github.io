<template>
    <el-container>
      <el-main>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"
                 label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">系统登录</h3>
          <el-form-item prop="account">
            <span class="svg-container"><i class="el-icon-user-solid"></i></span>
            <el-input style="float: right;width: 290px" type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <span class="svg-container"><i class="el-icon-s-goods"></i></span>
            <el-input type="password" style="float: right;width: 290px" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:70%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
</template>

<script>
  import { requestLogin } from './api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(){
        this.logining = true;
        setTimeout(() => {
          this.loading=false
          this.$router.push({ name: '/home' });
        }, 2000);
      },
    }
  }

</script>

<style scoped>
  .el-container{
    height:940px;
  }
  .el-main{
    background-image:url("../../img/login.jpg");
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #080808;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 20px 200px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    width: 40px;
    float: left;
    padding-top: 0px;
    text-align: center;
    color: #889aa4;
    font-size: 20px;
  }
</style>
