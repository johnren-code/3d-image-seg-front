<template>
    <div>
        <div class="col-lg-12">
            <SectionTitle text-align="center" title="新建项目" description="" data-aos="fade-up" />
            <el-form label-position="top" label-width="80px" :model="formLabelAlign">
                <el-row class="projname">
                    <el-form-item size='medium' label="项目名称" width="400px">
                        <el-input v-model="formLabelAlign.name" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                </el-row>
                <el-form-item label="项目描述">
                    <el-input v-model="formLabelAlign.region" placeholder="请输入项目描述" type="textarea" :rows="4"></el-input>
                </el-form-item>
                <el-row type="flex" justify="center" class="submitButton">
                    <el-button type="primary">提交</el-button>
                    <el-button type="danger">重置</el-button>
                </el-row>
            </el-form>
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
            fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
            dialogImageUrl: 'D:/runajianbeiA3/front/3d-image-seg-front/src/assets/images/about/about-1.png',
            dialogVisible: false,
            disabled: false
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
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
</style>