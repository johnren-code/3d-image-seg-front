<template>
  <ul class="mainmenu">
    <li>
      <router-link to="/home">首页</router-link>
    </li>
    <li>
      <router-link to="/history/" v-if="userInfo && isDoctor">病人项目管理</router-link>
    </li>
    <li>
      <router-link to="/patient/" v-if="userInfo && isPatient">我的病例</router-link>
    </li>
    <li>
      <router-link to="/technical">技术要点与介绍</router-link>
    </li>
<!--    <li>-->
<!--      <router-link to="/segmentation">3D影像分割</router-link>-->
<!--    </li>-->
    <!--        <li><router-link to="/test">测试</router-link></li>-->
    <!--        <li><router-link to="/contact">Contact</router-link></li>-->

    <!--        <li><router-link to="/personal">个人界面测试</router-link></li>-->
<!--    <li>-->
<!--      <router-link to="/shareEdit">协同编辑测试</router-link>-->
<!--    </li>-->
  </ul>
</template>

<script>
import Icon from "../../icon/Icon";

export default {
  name: 'Nav',
  components: {Icon},
  data(){
    return {
      userInfo:'',
      isDoctor:false,
      isPatient:false,
    }
  },
  mounted() {
    this.userInfo = this.$ls.get('userInfo')
    if(this.userInfo.role === 'doctor'){
      this.isDoctor = true
      this.isPatient = false
    }else {
      this.isPatient = true
      this.isDoctor = false
    }
    console.log('用户信息')
    console.log(this.userInfo)
  }
}
</script>