<template>
    <div>
        <div class="col-lg-12">
            <SectionTitle text-align="center" title="新建项目" description="" data-aos="fade-up" />
            <!-- <el-form ref="form" :model="form" label-width="80px" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="性别">
                            <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%;">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系方式">
                            <el-input v-model="form.tel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生年月">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form> -->
            <div class="peopleDes">
                <el-descriptions direction="vertical" :column="3" border>
                    <el-descriptions-item label="用户名" :contentStyle='contentStyle'>
                        <div class="inputDeep">
                            <el-input v-model="form.name"></el-input>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="性别" :contentStyle='contentStyle'>
                        <div class="inputDeep">
                            <el-select v-model="form.sex" placeholder="请选择性别" style="{width:100%}">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="出生日期" :contentStyle='contentStyle'>
                        <div class="inputDeep">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                                style="width: 100%;"></el-date-picker>
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="身高（cm）">
                        <el-input v-model="form.height"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item label="体重（kg）"><el-input v-model="form.weight"></el-input></el-descriptions-item>
                    <el-descriptions-item label="年龄">
                        <el-input v-model="form.age"></el-input></el-descriptions-item>
                    <el-descriptions-item label="籍贯">
                        <el-input v-model="form.home"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item label="联系方式">
                        <el-input v-model="form.tel"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item label="血型">
                        <el-select v-model="form.blood" placeholder="请选择血型" style="{width:100%}">
                            <el-option label="A型" value="A型"></el-option>
                            <el-option label="B型" value="B型"></el-option>
                            <el-option label="AB型" value="AB型"></el-option>
                            <el-option label="O型" value="O型"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-descriptions-item>
                </el-descriptions>
                <el-col :offset="11">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button type="danger" @click="reset">重置</el-button>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script>
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
import Vue from 'vue'
import VueRouter from 'vue-router'
export default {
    name: 'Newproj',
    components: { SectionTitle },
    data() {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                region: '',
                type: ''
            },
            form: {
                name: '',
                sex: '',
                date: '',
                height: '',
                weight: '',
                age: '',
                home: '',
                tel: '',
                blood: ''
            },
            fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
            dialogImageUrl: 'D:/runajianbeiA3/front/3d-image-seg-front/src/assets/images/about/about-1.png',
            dialogVisible: false,
            disabled: false,
            contentStyle: {
                'width': '450px'
            }
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        onSubmit() {
            console.log(this.form)
            // axios.post('/login', form).then(res => {
            //     console.log(res.data);
            // }, err => {
            //     console.log(err);
            // })
            let id = 1
            this.$router.push(`/history/${id}`)
            this.$message({
                message: '创建成功',
                type: 'success'
            });
        },
        reset() {
            this.form = []
        }
    }
}

</script>

<style scoped lang="scss" >
.projname {
    width: 400px;
}

.el-textarea__inner,
.el-input__inner {
    background: transparent !important;
    /* // border-color: #242636 !important; */
    border: 0;
}

.inputDeep>>>.el-input__inner {
    border: 0;
    width: 100%;
}

>>>.el-descriptions__body {
    width: 100%;
}

>>>.el-input__inner {
    border: 0 !important;
}

/* .inputDeep {
    width: 300px;
} */

.peopleDes>>>.el-table {
    background-color: transparent;
}

/* .el-table__expanded-cell {
    background-color: transparent;
} */

.el-descriptions {
    background: transparent !important;
}

.fileUpload {
    display: flex;
}

.submitButton {
    margin-top: 50px;
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

::v-deep .el-descriptions-item__label.is-bordered-label {
    // color: white !important;
    color: #868e96 !important
}

::v-deep .el-input__inner {
    color: white !important;
    border: none;
}

::v-deep .el-descriptions .is-bordered .el-descriptions-item__cell {
    border: 1px solid #868e96;
}
</style>