<template>
    <div>
        <Layout header-class="header-transparent" :show-cta="false" :footer-style="1">
            <div class="container">
                <SectionTitle text-align="center" :title="'病人' + form.name + '的项目'" description="" data-aos="fade-up" />
                <el-row>
                    <el-col :offset="19" class="deleHistory">
                    </el-col>
                </el-row>
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <div class="peopleDes">
                        <div class="desc">
                            <el-descriptions title="用户信息">
                                <el-descriptions-item v-if="edit" label="生日">{{ form.birthday }}</el-descriptions-item>
                                <el-descriptions-item v-else="edit" label="生日"><el-input
                                        v-model="form.birthday"></el-input></el-descriptions-item>
                                <el-descriptions-item v-if="edit" label="年龄">{{ form.age }}</el-descriptions-item>
                                <el-descriptions-item v-else="edit" label="年龄"><el-input
                                        v-model="form.age"></el-input></el-descriptions-item>
                                <el-descriptions-item v-if="edit" label="联系方式">{{ form.phone }}</el-descriptions-item>
                                <el-descriptions-item v-else="edit" label="联系方式"><el-input
                                        v-model="form.phone"></el-input></el-descriptions-item>
                                <el-descriptions-item v-if="edit" label="身高(m)">{{ form.height }}</el-descriptions-item>
                                <el-descriptions-item v-else="edit" label="身高(m)"><el-input
                                        v-model="form.height"></el-input></el-descriptions-item>
                                <el-descriptions-item v-if="edit" label="体重(kg)">{{ form.weight }}</el-descriptions-item>
                                <el-descriptions-item v-else="edit" label="体重(kg)"><el-input
                                        v-model="form.weight"></el-input></el-descriptions-item>
                                <el-descriptions-item v-if="edit" label="血型">{{ form.bloodType }}</el-descriptions-item>
                                <el-descriptions-item v-else="edit" label="血型"><el-input
                                        v-model="form.bloodType"></el-input></el-descriptions-item>
                                <el-descriptions-item v-if="edit" label="居住地">{{ form.location }}</el-descriptions-item>
                                <el-descriptions-item v-else="edit" label="居住地"><el-input
                                        v-model="form.location"></el-input></el-descriptions-item>
                                <el-descriptions-item v-if="edit" label="情况描述">{{ form.description }}</el-descriptions-item>
                                <el-descriptions-item v-else="edit" label="情况描述"><el-input
                                        v-model="form.description"></el-input></el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </div>
                    <el-form-item>
                        <div class="user_skills">
                            <el-table :data="tableData" style="width: 100% ,  " background-color="transparent"
                                element-loading-background="rgba(0,0,0,0.5)" :row-style="{ height: '60px' }"
                                :cell-style="{ color: 'white', 'font-size': '30px', 'line-height': '40px' }" width="400">
                                <el-table-column prop="id" label="编号" width="380">
                                </el-table-column>
                                <el-table-column prop="image" label="缩略图" width="380">
                                </el-table-column>
                                <el-table-column prop="desc_" label="简介" width="480">
                                </el-table-column>
                                <el-table-column prop="date" label="上次修改时间" width="420">
                                </el-table-column>
                                <el-table-column label="操作" fixed="right" width="300">
                                    <template slot-scope="scope">
                                        <el-button size="large" type="primary"
                                            @click="generateReport(scope.row.id)">下载报告</el-button>
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
                <el-dialog title="修改用户权限" :visible.sync="dialogVisibleRule" width="30%" :before-close="handleClose">
                    <el-select v-model="rule" placeholder="请选择权限" style="{width:100%}">
                        <el-option label="admin" value="admin"></el-option>
                        <el-option label="owner" value="owner"></el-option>
                        <el-option label="not" value="not"></el-option>
                    </el-select>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisibleRule = false">取 消</el-button>
                        <el-button type="primary" @click="changeRule">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </Layout>
    </div>
</template>
  
  
<script>
import Layout from '../components/common/Layout'
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
import BlogSidebar from '../components/blog/BlogSidebar'
import Vue from 'vue'
import VueRouter from 'vue-router'
// Vue.use(VueRouter)
import axios from "axios";
// import Storage from 'vue-ls';

// this.sendFormValue()
export default {
    name: 'UserProj',
    components: { SectionTitle, Layout, BlogSidebar },
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
            tableData: [{ id: 1, image: 'image', desc_: '没事装的', date: '123' }],
            fileList: [],
            dialogFormVisible: false,
            dialogVisible: false,
            disabled: false,
            form: {
                name: '小明',
                description: '病人体态臃肿',
                birthday: '2000-07-09',
                height: "1.75",
                weight: "75",
                age: "23",
                location: '河南郑州',
                phone: '14543567658',
                bloodType: 'A型',
                patientId: ''
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
            dialogVisibleRule: false,
            rule: '',
            generateReportVisible: false,
            edit: true,
        }
    },
    methods: {
        sendFormValue() {
            axios.post('/api/createhistory', {
                pid: this.$route.params.id,
                Date: this.formNewhistory.date,
                Description: this.formNewhistory.introduction
            }).then(res => {
                console.log(res.data);
                // this.$router.push('/segmentation')
                this.$router.push(`/segmentation/${res.data.result}`)
                sessionStorage.setItem('historyId', JSON.stringify(res.data.result))
                this.dialogFormVisible = false
                this.$message({
                    type: 'success',
                    message: '创建成功!'
                });
            }, err => {
                console.log(err);
            })
        },
        checkHistory(id) {
            // alert(id)
            sessionStorage.setItem('historyId', id)
            this.$router.push(`/segmentation/${id}`)
            // sessionStorage.setItem('historyId', JSON.stringify('1'))
        },
        open() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post('/api/submitFile').then(res => {
                    Info
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
        generateReport(id) {
            alert(`下载id为${id}的报告`)

        },

        // 搜索历史记录
        search() {
            // alert(`查找项目名为${this.$route.params.id},搜索内容为${this.searchInfo}`)

        },
        addHistory() {
            this.dialogFormVisible = true
            axios.post('/createhistory', {
                Date: this.formNewhistory.date,
                Description: this.formNewhistory.introduction,
                patient_id: this.form.patientId,
                pid: this.$route.params.id
            }).then(res => {
                this.form = res.data.result
                console.log(res.data);
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
            }, err => {
                console.log(err);
            })
        },

        // 删除项目
        delProj() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.put(`/api/proj/delete`, { projectId: this.$route.params.id }).then(res => {
                    console.log(res.data);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push(`/history/`)
                }, err => {
                    console.log(err);
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 修改权限
        changeRule() {
            axios.post(`/api/proj/editPermission`, {
                uid: 4, pid: this.$route.params.id, permission: 'admin'
            }).then(res => {
                // console.log(res.data);
                this.$message({
                    type: 'success',
                    message: '修改权限成功!'
                });
                this.dialogVisibleRule = false
            }, err => {
                console.log(err);
            })
        },
        // 修改权限的handleclose
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        editPersonal() {
            this.edit = !this.edit
        }
    },
    watch: {
        '$route.params.id': function (to, from) {
            console.log(to);
            this.titleName = '用户' + this.$route.params.id + '的项目'
            // this.form.name = this.$route.params.id
            // this.form = ''
            axios.get(`/api/proj/Info/${this.$route.params.id}`).then(res => {
                this.form = res.data.result
                this.tableData = res.data.result.upLoadFiles
                console.log(this.tableData);
            }, err => {
                console.log(err);
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
    },
    mounted() {
        axios.get(`/api/proj/Info/${this.$route.params.id}`).then(res => {
            this.form = res.data.result
            this.tableData = res.data.result.upLoadFiles
            console.log(res.data);
        }, err => {
            console.log(err);
        })
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
    font-size: 20px;
}

.peopleDes {
    display: flex;
    width: 99%;
    text-align: center;
}

::v-deep .el-descriptions .is-bordered .el-descriptions-item__cell {
    border: 1px solid #868e96;
}

.deleHistory {
    position: relative;
    top: -10px;
}

.desc {
    width: 60%;
    margin-right: 30px;
}

::v-deep .el-descriptions {
    color: #efca09;
}

.historyTitle {
    color: #efca09;
    font-weight: bold
}

.container {
    // display: flex;
    justify-content: space-between;
    margin-top: 0;
    padding: 0px;
    position: relative;
    top: 80px;
    max-width: 100%;
    height: 800px;
}

::v-deep .w-600 {
    margin-top: 30px !important
}

::v-deep .el-table .cell {
    line-height: 40px !important
}
</style>
  
  