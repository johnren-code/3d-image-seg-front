<template>
  <div>
    <Layout header-class="header-transparent" :show-cta="false" :footer-style="1">
      <div class="container">
        <SectionTitle text-align="center" :title="'病人' + form.name + '的病例'" description="" data-aos="fade-up"/>
        <el-row>
          <el-col :offset="19" class="deleHistory">
          </el-col>
        </el-row>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <div class="peopleDes">
            <div class="desc">
              <el-descriptions title="">
                <el-descriptions-item label="生日">{{ formatDate(form.birthday) }}</el-descriptions-item>
                <el-descriptions-item label="年龄">{{ form.age }}</el-descriptions-item>
                <el-descriptions-item label="联系方式">{{ form.phone }}</el-descriptions-item>
                <el-descriptions-item label="身高(m)">{{ form.height }}</el-descriptions-item>
                <el-descriptions-item label="体重(kg)">{{ form.weight }}</el-descriptions-item>
                <el-descriptions-item label="血型">{{ form.bloodType }}</el-descriptions-item>
                <el-descriptions-item label="居住地">{{ form.location }}</el-descriptions-item>
                <el-descriptions-item label="情况描述">{{ form.description }}</el-descriptions-item>
              </el-descriptions>
            </div>
            <div ref="chart" class="echarts-chart"></div>
          </div>
          <el-form-item>
            <div class="user_skills">
              <el-table :data="tableData" style="width: 80%;margin-left: 130px" background-color="transparent"
                        element-loading-background="rgba(0,0,0,0.5)" :row-style="{ height: '60px' }"
                        cell-style="color:white;text-align:center" width="400">
                <el-table-column prop="id" label="编号" width="100" header-align="center">
                </el-table-column>
                <el-table-column prop="desc_" label="病况描述" width="300" header-align="center">
                </el-table-column>
                <el-table-column prop="date" label="修改时间" width="200" header-align="center" :formatter="dateFormatter">
                </el-table-column>
                <el-table-column label="操作" width="300" header-align="center">
                  <template slot-scope="scope">
                    <el-button size="large" type="primary"
                               @click="generateReport(scope.row.id,scope.row.status,scope.row.reportUrl)">下载报告
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="完成状态" width="280" header-align="center">
                  <template slot-scope="scope">
                    <i v-if="scope.row.status" class="el-icon-circle-check" style="color:#67C23A"></i>
                    <i v-if="!scope.row.status" class="el-icon-circle-close" style="color:#F56C6C;"></i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </el-form>
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
import * as echarts from "echarts";
import moment from 'moment';
// import Storage from 'vue-ls';
// this.sendFormValue()
export default {
  name: 'Patient',
  components: {SectionTitle, Layout, BlogSidebar},
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
      tableData: [{id: 1, image: 'image', desc_: '没事装的', date: '123'}],
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
      dialogVisibleRule: false,
      rule: '',
      generateReportVisible: false,
      option: {
        title: {
          textStyle: {
            color: '#333',
            fontSize: 24,
            fontWeight: 'bold'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            rotate: 45,
            color: '#666'
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '评分',
          nameTextStyle: {
            color: '#666',
            fontSize: 14
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            type: 'line',
            data: [],
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              color: '#009688',
              width: 2
            },
            itemStyle: {
              color: '#009688'
            }
          }
        ]
      },
      chart: ''
    }
  },
  methods: {
    dateFormatter(row, column, cellValue) {
      // 使用你想要的日期格式
      return moment(cellValue).format('YYYY-MM-DD');
    },
    formatDate(dateStr) {
      return moment(dateStr).format('YYYY-MM-DD');
    },
    generateReport(id,status,url) {
      if(!status || !url){
        this.$message.error('病例还未分析完毕，无法下载')
      }else {
        let a = document.createElement('a')
        a.href = url
        a.click();
      }
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
    this.option.xAxis.data = []
    this.option.series.data = []
    console.log(this.option)
    axios.post('/api/report/info').then(res=>{
      if(res.data.code===400){
        this.$message.error(res.data.message)
      }else {
        this.form = res.data.result
      }
      console.log(res.data)
    }).catch(error=>{
      this.$message.error('获取信息错误，请稍后再试')
    })
    axios.post('/api/report/getAll').then(res=>{
      if(res.data.code === 400){
        this.$message.error(res.data.message)
      }else {
        console.log(res.data)
        this.tableData = res.data.result
        const tempData = res.data.result
        for(var i=0;i<tempData.length;i++){
          if(tempData[i].status){
            this.option.xAxis.data.push(this.formatDate(tempData[i].date))
            this.option.series.data.push(tempData[i].score)
          }
        }
      }
    }).catch(error=>{
      this.$message.error('获取信息错误，请稍后再试')
    })
    const chartContainer = this.$refs.chart
    this.chart = echarts.init(chartContainer)
    if(this.option.xAxis.data.length === 0){
      this.option={
        title: {
          text:'暂无评分数据',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#333',
            fontSize: 24,
            fontWeight: 'bold'
          }
        }
      }
    }
    this.chart.setOption(this.option)
  }
}
</script>
<style scoped lang="scss">

::v-deep th.el-table__cell.is-leaf {
  border-bottom: 2px solid grey !important;
}

.el-table::before {
  border: 1px solid grey !important;
  // color: #043cbd;
}
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

::v-deep .el-table tbody tr:hover > td {
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
  color: white !important;
  font-size: 15px;
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
  margin-left: 130px;
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

.echarts-chart {
  position: absolute;
  width: 400px;
  height: 250px;
  right: 150px;
  top:80px
}
</style>
  
  