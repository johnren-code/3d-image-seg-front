<template>
    <ul class="mainmenu">
        <li><router-link to="/home">首页</router-link></li>
        <li><router-link to="/segmentation">3D影像分割</router-link></li>
        <li><router-link to="/test">测试</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/history/">项目管理</router-link></li>
        <li><router-link to="/personal">个人界面测试</router-link></li>
    </ul>
</template>

<script>
import Icon from "../../icon/Icon";
export default {
    name: 'Nav',
    components: { Icon }
}
</script>