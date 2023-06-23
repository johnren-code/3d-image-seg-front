<template>
  <Layout header-class="header-transparent" :show-newsletter="true" :show-cta="false">
    <div class="service-area rn-section-gapTop">
      <div class="container">
        <div>
          <el-select v-model="value" placeholder="请选择模型">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary">点击进行重建</el-button>
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <span>重建结果：</span>
        <div>
          <img :src="sample1"/>
          <img :src="sample2"/>
          <img :src="sample3"/>
          <img :src="samplemean"/>
          <span style="margin-left:100px;margin-right: 280px">sample1</span>
          <span style="margin-right: 250px">sample2</span>
          <span style="margin-right: 250px">sample3</span>
          <span>sample_mean</span>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData">
        <el-table-column label="选择颜色" width="120" >
          <template slot-scope="scope">
            <el-color-picker v-model="scope.row.color" color-format="rgb"></el-color-picker>
          </template>
        </el-table-column>
        <el-table-column label="label" prop="otherProperty"></el-table-column>
        <el-table-column label="RGB值" prop="otherProperty"></el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/common/Layout'
import Separator from '../components/elements/separator/Separator'
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
import AboutFour from '../components/elements/about/AboutFour'
import ServiceOne from '../components/elements/service/ServiceOne'
import Timeline from '../components/elements/timeline/Timeline'
import Counter from '../components/elements/counterUp/Counter'
import Brand from '../components/elements/brand/Brand'
import Team from '../components/elements/team/Team'

export default {
  name: 'Test',
  components: {Team, Brand, Counter, Timeline, ServiceOne, AboutFour, SectionTitle, Separator, Layout},
  data() {
    return {
      options: [{
        value: '选项1',
        label: 'Posterior Sampling DDPM'
      }, {
        value: '选项2',
        label: 'MC-DDPM'
      }],
      value: '',
      imageUrl: '',
      sample1:require('@/assets/images/ddpm_test/sample_1.png'),
      sample2:require('@/assets/images/ddpm_test/sample_2.png'),
      sample3:require('@/assets/images/ddpm_test/sample_3.png'),
      samplemean:require('@/assets/images/ddpm_test/sample_mean.png')
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-table, .el-table__expanded-cell {
  background-color: transparent !important;
}
.el-table th,
.el-table tr,
.el-table td {
    background-color: transparent !important;
}

</style>