<template>
  <Layout>
    <SectionTitle text-align="center" subtitle="Personal Information" title="个人信息" description="" data-aos="fade-up" />
    <center>
      <div class="edit_form" data-aos="fade-up">
        <form class="contact-form-1" action="" @submit.prevent="sendEditInformation">
          <div class="form-group">
            <el-upload class="avatar-uploader" action="/api/uploadUseravatar" :before-upload="beforeAvatarUpload" :show-file-list="false" :on-success="handleAvatarSuccess">
              <img v-model="userData.avatarUrl" v-if="userData.avatarUrl" :src="userData.avatarUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="form-title">用户名</div>
          <div class="form-group">
            <input type="text" name="username" placeholder="请输入新用户名" required v-model="userData.username" />
          </div>
          <div class="form-title">邮箱</div>
          <div class="form-group">
            <input type="text" name="phone" placeholder="请输入新邮箱" required v-model="userData.email" />
          </div>
          <div class="form-title">新密码</div>
          <div class="form-group">
            <input type="text" name="password" placeholder="请输入新密码" required v-model="userData.password" />
          </div>
          <div class="form-title">个人简介</div>
          <div class="form-group">
            <input type="text" name="description" placeholder="请输入个人简介" required v-model="userData.description" />
          </div>
          <div class="form-group">
            <button class="btn-default btn-large">保存</button>
          </div>
        </form>
      </div>
    </center>
  </Layout>
</template>

<script>
import Layout from '../components/common/Layout.vue'
import SectionTitle from '../components/elements/sectionTitle/SectionTitle.vue'
import eventBus from "../global/eventBus";
import axios from "axios";
export default {
  name: 'EditUserInfo',
  components: { Layout, SectionTitle },
  data() {
    return {
      // avatarUrl:this.$global.apiUrl+'file/uploadAvatar/'+this.$ls.get('userInfo').id,
      userData: {
        avatarUrl: '',
        username: '',
        email: '',
        password: '',
        description: '',
      }
    };
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo(){
      this.userData.avatarUrl = this.$ls.get('userInfo').avatar
      this.userData.username = this.$ls.get('userInfo').username
      this.userData.email = this.$ls.get('userInfo').email
      this.userData.description = this.$ls.get('userInfo').description || '这家伙很懒，什么都没有留下'
    },
    handleAvatarSuccess(res, file) {
      if(res.code===400){
        this.$message.error('上传失败，请稍后再试')
      }else {
        this.userData.avatarUrl = res.result.avatar
        this.$message.success('上传成功')
        this.$ls.set('userInfo',res.result)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'|| file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    sendEditInformation(){
      axios.post('/api/editUserInformation',{
        username:this.userData.username,
        password:this.userData.password,
        email:this.userData.email,
        description:this.userData.description
      }).then(res=>{
        if(res.data.code === 400){
          this.$message.error(res.data.message)
        }else {
          this.$message.success('修改成功')
          this.$ls.set('userInfo',res.data.result)
          eventBus.$emit('userLogin',true)
          this.$router.push('/personal')
        }
      }).catch(error=>{
        this.$message.error('发生错误，请稍后再试')
      })
    }
  }
}
</script>

<style>
.edit_form {
  width: 750px;

}

.form-title {
  font-size: 20px;
  font-weight: 600;
  font-family: "Times New Roman", Times, serif;
  margin-bottom: 5px;
  margin-left: -650px;
}

.avatar-uploader .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 90px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 103px;
  line-height: 178px;
  text-align: center;
  margin-top: 75px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
