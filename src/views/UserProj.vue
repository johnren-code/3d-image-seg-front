<template>
    <div>
        <SectionTitle text-align="center" :title="titleName" description="" data-aos="fade-up" />
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-row class="projname">
                <el-form-item size='medium' label="项目名称" width="400px">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
            </el-row>
            <el-form-item label="项目描述">
                <el-input v-model="formLabelAlign.region" type="textarea" :rows="2"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="10">历史记录</el-col>
                <el-col :span="3" :offset="11"> <el-button size="mini" type="success" class="addHistory"
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
                                <el-button size="mini" type="primary">生成报告</el-button>
                                <el-button size="mini" @click="checkHistory">查看</el-button>
                                <el-button size="mini" type="danger" @click="open">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
        </el-form>
        <el-dialog title="新建历史记录" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="日期：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="病人描述：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
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

export default {
    name: 'UserProj',
    components: { SectionTitle },
    data() {
        return {
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
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        sendFormValue() {
            this.dialogFormVisible = false
            this.$router.push('/segmentation')
            sessionStorage.setItem('historyId', JSON.stringify('1'))
        },
        checkHistory() {
            // axios.post('/submitFile').then(res => {
            //     console.log(res.data);
            // }, err => {
            //     console.log(err);
            // })
            this.$router.push('/segmentation')
            sessionStorage.setItem('historyId', JSON.stringify('1'))
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handleSuccess(response, file, fileList) {
            console.log(response)
        },
        handleDelete() {
            this.$router.push('/segmentation')
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
        }

    },
    watch: {
        '$route.params.id': function (to, from) {
            console.log(to);
            this.titleName = '用户' + this.$route.params.id + '的项目'
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
    }
}
</script>
<style lang="scss">
.projname {
    width: 400px;
}

.el-textarea__inner,
.el-input__inner {
    background: transparent !important;
    border-color: #242636 !important;
}

.inputDeep>>>.el-input__inner {
    border: 0;
}

.fileUpload {
    display: flex;
}

.submitButton {
    margin-top: 50px;
}

.user_skills {
    // width: 50%;
    margin: auto;
}

.el-table,
.el-table__expanded-cell {
    background-color: transparent !important;
}

// ::v-deep .

.el-table th {
    background-color: transparent !important;
}

.el-table tr,
.el-table td {
    background-color: transparent !important;
    border: none !important;

}
</style>

