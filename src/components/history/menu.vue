<template>
    <div>
        <el-aside class="side-menu" :width="isCollapse ? '50px' : '300px'">
            <i v-show="!isCollapse" class="el-icon-s-fold" style="font-size: 30px;margin-left: 200px;cursor: pointer"
                @click="isCollapse = true"></i>
            <i v-show="isCollapse" class="el-icon-s-unfold" style="font-size: 30px;margin-left: 20px;cursor: pointer"
                @click="isCollapse = false"></i>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                :collapse="isCollapse" background-color="transparent" text-color="#EBEEF5" router
                :collapse-transition="false">
                <el-menu-item index="/history/new">
                    <el-button icon="el-icon-plus" type="text">新建项目</el-button>
                </el-menu-item>

                <el-menu-item :index="item.id.toString()" v-for="item in tableData">
                    <!-- <i class="el-icon-menu"></i> -->
                    <span slot="title">{{ item.date }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
    </div>
</template>
  
<script>
export default {
    name: "Menu",
    data() {
        return {
            isCollapse: true,
            tableData: [{
                id: 1,
                date: '病人1'
            },
            {
                id: 2,
                date: '病人2'
            },
            {
                id: 3,
                date: '病人3'
            },
            {
                id: 4,
                date: '病人4'
            }],
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
    border: none;
    text-align: center;
}

::v-deep .el-button--text {
    background-color: #202123 !important;
    width: 150px
}

.el-button--text {
    /* position: relative;
    left: 20px; */
    background-color: #202123;
    border: solid;
}
</style>