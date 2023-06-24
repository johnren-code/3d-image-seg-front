<template>
    <div>
        <SectionTitle text-align="center" :title="titleName" description="" data-aos="fade-up" />
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <!-- <el-row class="projname">
                <el-form-item size='medium' label="项目名称" width="400px">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
            </el-row>
            <el-form-item label="项目描述">
                <el-input v-model="formLabelAlign.region" type="textarea" :rows="2"></el-input>
            </el-form-item> -->
            <div class="peopleDes">
                <el-descriptions direction="vertical" :column="3" border>
                    <el-descriptions-item label="用户名" :contentStyle='contentStyle'>
                        <div class="inputDeep">
                            {{ form.name }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="性别" :contentStyle='contentStyle'>
                        <div class="inputDeep">
                            {{ form.sex }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="出生日期" :contentStyle='contentStyle'>
                        <div class="inputDeep">
                            {{ form.date }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="身高（cm）">
                        {{ form.height }}
                    </el-descriptions-item>
                    <el-descriptions-item label="体重（kg）">
                        {{ form.weight }}
                    </el-descriptions-item>
                    <el-descriptions-item label="年龄">
                        {{ form.age }}</el-descriptions-item>
                    <el-descriptions-item label="籍贯">
                        {{ form.home }}
                    </el-descriptions-item>
                    <el-descriptions-item label="联系方式">
                        {{ form.tel }}
                    </el-descriptions-item>
                    <el-descriptions-item label="血型">
                        {{ form.blood }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <el-row>
                <el-col :span="16">历史记录</el-col>
                <el-col :span="3">
                    <el-input v-model="searchInfo" prefix-icon="el-icon-search" style="width: 90%;margin-right: 10px"
                        clearable @clear="search" @keydown.enter.native="search"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button icon="el-icon-search" type="primary" @click="search" size="mini" style="width: 90%;">
                        搜索记录
                    </el-button>
                </el-col>
                <el-col :span="3"> <el-button size="mini" type="success" class="addHistory"
                        @click="dialogFormVisible = true">添加历史记录</el-button></el-col>
            </el-row>
            <el-form-item>
                <div class="user_skills">
                    <el-table :data="tableData" style="width: 100%" background-color="transparent"
                        element-loading-background="rgba(0,0,0,0.5)" cell-style="color:white" width="400">
                        <el-table-column prop="id" label="编号" width="180">
                        </el-table-column>
                        <el-table-column prop="image" label="缩略图" width="180">
                        </el-table-column>
                        <el-table-column prop="introduction" label="简介" width="280">
                        </el-table-column>
                        <el-table-column prop="time" label="上次修改时间" width="420">
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" width="300">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" @click="generateReport">生成报告</el-button>
                                <el-button size="mini" @click="checkHistory">查看</el-button>
                                <el-button size="mini" type="danger" @click="open">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
        </el-form>
        <el-dialog title="新建历史记录" :visible.sync="dialogFormVisible">
            <el-form :model="formNewhistory">
                <el-form-item label="日期：" :label-width="formLabelWidth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formNewhistory.date"
                        style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="病人描述：" :label-width="formLabelWidth">
                    <el-input v-model="formNewhistory.introduction" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendFormValue">确 定</el-button>
            </div>
        </el-dialog>
        <!-- <img alt="slime" src="{{ url_for('static', filename='images/002.png') }}"> -->
    </div>
</template>


<script>
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
import Vue from 'vue'
import VueRouter from 'vue-router'
// Vue.use(VueRouter)
import axios from "axios";

// this.sendFormValue()
export default {
    name: 'UserProj',
    components: { SectionTitle },
    data() {
        return {
            searchInfo: '',
            titleName: '用户' + this.$route.params.id + '的项目',
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            tableData: [{
                id: '1',
                image: '王小虎',
                introduction: '上海市普陀区金沙江路 1518 弄',
                time: '2020.1.1'
            }, {
                id: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }],
            fileList: [],
            dialogFormVisible: false,
            dialogVisible: false,
            disabled: false,
            form: {
            },
            formLabelWidth: '120px',
            contentStyle: {
                'width': '300px',
                'height': '40px'
            },
            formNewhistory: {
                date: '',
                introduction: ''
            },

        }
    },
    methods: {
        sendFormValue() {
            this.dialogFormVisible = false
            this.$router.push('/segmentation')
            sessionStorage.setItem('historyId', JSON.stringify(this.form.name))
        },
        checkHistory() {
            axios.post('/login', {
                "username": "zyj",
                "password": "123456"
            }).then(res => {
                console.log(res.data);
            }, err => {
                console.log(err);
            })
            this.$router.push('/segmentation')
            sessionStorage.setItem('historyId', JSON.stringify('1'))
        },
        open() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post('/submitFile').then(res => {
                    console.log(res.data);
                }, err => {
                    console.log(err);
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        generateReport() {
            alert('生成报告')
        },

        // 搜索历史记录
        search() {
            alert(`查找项目名为${this.$route.params.id},搜索内容为${this.searchInfo}`)
        }

    },
    watch: {
        '$route.params.id': function (to, from) {
            console.log(to);
            this.titleName = '用户' + this.$route.params.id + '的项目'
            this.form.name = this.$route.params.id
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
    },
    mounted() {
        // axios.post('/login', form).then(res => {
        //     console.log(res.data);
        // }, err => {
        //     console.log(err);
        // })
        // alert(this.$route.params.id)
        this.form = {
            name: this.$route.params.id,
            sex: '男',
            date: '2000-10-21',
            height: '177',
            weight: '66',
            age: '12',
            home: '河南',
            tel: '1456454356',
            blood: 'A型'
        }
    }
}
</script>
<style scoped lang="scss">
.projname {
    width: 400px;
}


.fileUpload {
    display: flex;
}

.submitButton {
    margin-top: 50px;
}

.user_skills {
    margin: auto;
}

.el-table,
.el-table__expanded-cell {
    background-color: transparent !important;
}


.el-table th {
    background-color: transparent !important;
}

.el-table tr,
.el-table td {
    background-color: transparent !important;
    border: none !important;

}



::v-deep .el-table,
.el-table__expanded-cell {
    background-color: transparent !important;
}

::v-deep .el-table tr {
    background-color: transparent !important;
}

::v-deep .el-table tbody tr:hover>td {
    background-color: transparent !important
}

::v-deep .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
    background-color: transparent !important;
}

/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
    background-color: transparent !important;
}

/* 表格内背景颜色 */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
    background-color: transparent !important;
    border: 0; //去除表格
}

/*去除底边框*/
::v-deep.el-table td.el-table__cell {
    border: 0 !important;
}

// 表格顶部边框
::v-deep.el-table th.el-table__cell.is-leaf {
    // border: 0 !important;
}

/*去除底部灰条.el-table::before*/
::v-deep .el-table::before {
    // display: none;
}

// 去除row的白底
::v-deep .el-descriptions-item__cell,
::v-deep .el-descriptions-item__content {
    background-color: transparent !important;
    border: 0; //去除表格
}

::v-deep .el-descriptions__body {
    background-color: transparent !important;
    border: 0;
}

// 字体颜色
::v-deep .el-descriptions-item__label.is-bordered-label {
    color: white !important;
}

::v-deep .el-descriptions__body {
    color: wheat !important;
}

.peopleDes {
    width: 99%;
}

::v-deep .el-descriptions .is-bordered .el-descriptions-item__cell {
    border: 1px solid #868e96;
}
</style>

