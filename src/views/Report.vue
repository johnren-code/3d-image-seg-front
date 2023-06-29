<template>
    <div>
        <SectionTitle text-align="center" :title="titleName" description="" data-aos="fade-up" />
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic"
            :inline="true">
            <el-row class="photo">
                <el-col :span="10">
                    <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'快照' + index"
                        :key="domain.key1" :prop="'domains.' + index + '.desc'" :id="index + 'des'">
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false" :on-success="handleAvatarSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'描述' + index + 1"
                        :key="domain.key2" :prop="'domains.' + index + '.value'">
                        <div class="deleteInput">
                            <el-input type="textarea" autosize placeholder="请输入内容" v-model="domain.value">
                            </el-input>
                            <el-button @click.prevent="removeDomain(domain)" size="small" class="deleteDomin"
                                type="danger">删除</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-input type="textarea" :rows="2" placeholder="请输入结论和注意事项" v-model="reslut">
            </el-input>
        </el-row>
        <el-row class="conclusion">
            <el-col>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="addDomain">新增快照</el-button>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
// import axios from "axios";
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
// import cute from '~@/assets/images/banenr-image-02.png'
export default {
    name: "Report",
    components: { SectionTitle },
    data() {
        return {
            titleName: '用户' + this.$route.params.id + '编号为' + sessionStorage.getItem('historyId') + '的病例报告',
            dynamicValidateForm: {
                domains: [{
                    desc: '123',
                    value: '123'
                }],
            },
            reslut: '',
            dialogImageUrl: '',
            dialogVisible: false,
            imageUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.u8AG3p4JLjrdp-s90HXXrwHaD_&w=196&h=185&c=8&rs=1&qlt=90&o=6&dpr=2.5&pid=3.1&rm=2'
        };
    },
    methods: {
    },
    methods: {
        submitForm(formName) {
            alert('submit!');
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: '',
                desc: '',
                key1: Date.now(),
                key2: Date.now() + 1,
            });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        }
    }
}
</script>
  
<style scoped lang="scss">
::v-deep .el-input__inner {
    width: 50%;
}

.deleteInput {
    display: flex;
}

.conclusion {
    margin: auto;
    text-align: center;
}

.el-row {
    margin-top: 20px;
}

::v-deep .el-textarea__inner {
    background-color: transparent !important;
    border: 2px solid hsla(0, 0%, 100%, 0.1);
    color: #acacac
}

.photo {
    text-align: center;
}

.deleteDomin {
    margin-left: 50px;
}

::v-deep .avatar-uploader .el-upload {
    border-radius: 0px !important
}
</style>