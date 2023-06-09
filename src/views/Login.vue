<template>

  <body id="paper">
  <div class="login-container">
    <el-form :model="loginForm" label-position="left"
             label-width="0px" v-loading="loading">
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <br>
      <el-form-item class="login-button">

      </el-form-item>
    </el-form>
    <el-button type="primary" v-on:click="login">登录</el-button>
  </div>
  </body>
</template>
<script>
import axios from "axios";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    login() {
      const _this = this
      axios.post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(rep => {
            if (rep.data.code === 200) {
              _this.store.commit('login', rep.data.result)

              this.$router.push('/video')//否则跳转至首页
            } else {
              this.$message(rep.data.message)
            }

          })
          .catch(failResponse => {
            console.log(failResponse.response)
          })
    }
  }
}
</script>
<style>
#paper {
  background: url("../assets/images/pageBg.png") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0;
}

.login-container {

  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #000000;
  box-shadow: 0 0 25px #cac6c6;
  text-align: center;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  font-size: 30px;
  color: #3f3f3f;
}

.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}

.login-button {
  width: 100%;
  text-align: center;
}

</style>
