<template>
  <div>
    <el-col :offset="9">
      <SectionTitle title="新建项目"  />
    </el-col>

    <el-card class="new_proj">
      <div>
    <el-form direction="vertical" :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="color: #ffffff">
      <el-row :gutter="24">
      <el-col :span="8">
      <el-form-item label="就诊人名称">
              <el-input v-model="form.name"style="width: 70%;"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="就诊人id" >
            <el-input v-model="form.patientId"style="width: 70%;"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="出生日期" >
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"
                style="width: 70%;"></el-date-picker>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="身高（m）">
            <el-input v-model="form.height"style="width: 70%;"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">

          <el-form-item label="体重（kg）">
            <el-input v-model="form.weight"style="width: 70%;"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="年龄">
            <el-input v-model="form.age"style="width: 70%;"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="籍贯">
            <el-input v-model="form.location"style="width: 70%;"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"style="width: 70%;"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="血型">
            <el-select v-model="form.bloodType" placeholder="请选择血型" >
              <el-option label="A型" value="A"></el-option>
              <el-option label="B型" value="B"></el-option>
              <el-option label="AB型" value="AB"></el-option>
              <el-option label="O型" value="O"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="就诊人描述"style="width: 70%;">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
      </el-col>
      </el-row>
        </el-form>

         </div>
      <el-col :offset="9">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button type="danger" @click="reset">重置</el-button>
      </el-col>
      <br><br>
    </el-card>
  </div>
</template>

<script>
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";

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
        description: '',
        birthday: '',
        height: "",
        weight: "",
        age: "",
        location: '',
        phone: '',
        bloodType: '',
        patientId: ''
      },
      // dialogImageUrl: 'D:/runajianbeiA3/front/3d-image-seg-front/src/assets/images/about/about-1.png',
      dialogVisible: false,
      disabled: false,
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
      if(!this.form.patientId||!this.form.name||!this.form.location||!this.form.phone||!this.form.description||!this.form.height
          ||!this.form.weight ||!this.form.age||!this.form.bloodType||!this.form.birthday){
        this.$message.error('请输入所有的信息')
      }else {
        axios.post('/api/proj/findPatient',{
          patientId:this.form.patientId
        }).then(res=>{
          if(res.data.code===400){
            this.$message.error(res.data.message)
          }else {
            axios.post('/api/proj/creat', {
              patientId:this.form.patientId,
              name: this.form.name,
              location: this.form.location,
              phone: this.form.phone,
              description: this.form.description,
              height: this.form.height,
              weight: this.form.weight,
              age: this.form.age,
              bloodType: this.form.bloodType,
              birthday: this.form.birthday
            }).then(res => {
              if (res.data.code === 400) {
                this.$message.error(res.data.message)
              } else {
                console.log(res.data);
                this.$message({
                  message: '创建成功',
                  type: 'success'
                });
                axios.post('/api/proj/findPatient', {
                  patientId: this.form.patientId,
                  projectId: res.data.result.id
                }).then(res1 => {
                  console.log(res1.data);
                  this.$message({
                    message: '绑定数据成功',
                    type: 'success'
                  });
                  this.$router.push(`/history/${res.data.result.id}`)
                }, err => {
                  console.log(err);
                })
              }
            }, err => {
              console.log(err);
            })
          }
        })
      }
    },
    reset() {
      this.form = []
    }
  }
}

</script>

<style scoped lang="scss">
.projname {
  width: 400px;
}
::v-deep .el-form-item__label {
  color: whitesmoke;
}
.new_proj{
  width: 100%;
  border:1px solid  transparent;
  border-radius: 15px;
  padding-right: 30px;
  /* 为其整体设置接近透明的效果*/
  background-color: rgba(255,255,255,0.03);
  /* 设置box-shadow使其有立体感 */
  box-shadow: 5px 5px 0 0  rgba(0,0,0,0.2);
  position: relative;
  left: -15px;
}
</style>