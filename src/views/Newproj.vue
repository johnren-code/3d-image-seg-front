<template>
  <div>
    <div class="col-lg-12">
      <SectionTitle text-align="center" title="新建项目" description="" data-aos="fade-up" />
      <div class="peopleDes">
        <el-descriptions direction="vertical" :column="3" border>
          <el-descriptions-item label="用户名" :contentStyle='contentStyle'>
            <div class="inputDeep">
              <el-input v-model="form.name"></el-input>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="项目描述" :contentStyle='contentStyle'>
            <div class="inputDeep">
              <el-input v-model="form.description"></el-input>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="出生日期" :contentStyle='contentStyle'>
            <div class="inputDeep">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"
                style="width: 100%;"></el-date-picker>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="身高（cm）">
            <el-input v-model="form.height"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="体重（kg）">
            <el-input v-model="form.weight"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="籍贯">
            <el-input v-model="form.location"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="联系方式">
            <el-input v-model="form.phone"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="血型">
            <el-select v-model="form.bloodType" placeholder="请选择血型" style="{width:100%}">
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
        bloodType: ''
      },
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
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
      console.log(typeof (7.5))
      axios.post('/api/proj/creat', {
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
          this.$router.push(`/history/${res.data.result.id}`)
        }
      }, err => {
        console.log(err);
      })
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