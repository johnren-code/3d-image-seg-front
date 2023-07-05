<template>
  <div>
    <SectionTitle text-align="center" :title="'病人' + form.name + '的项目'" description="" data-aos="fade-up"/>
    <el-row>
      <el-col :offset="19" class="deleHistory">
        <Button :read-more-button="true" v-if="edit">
          <span style="color: grey;" @click="editPersonal">修改病人信息</span>
        </Button>
        <el-button v-else="edit" size="mini" type="success" @click="completeEditPersonal">完成编辑
        </el-button>
        <el-button size="mini" type="danger" @click="delProj" style="margin-left: 20px">删除病人项目
        </el-button>
      </el-col>
    </el-row>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <div class="peopleDes">
        <div class="desc">
          <span style="font-size: 20px;color:#9ccef9;font-weight: bold">用户信息</span>
          <el-descriptions title="">
            <el-descriptions-item v-if="edit" label="生日">{{ formatDate(form.birthday) }}</el-descriptions-item>
            <el-descriptions-item v-else="edit" label="生日">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-descriptions-item>
            <el-descriptions-item v-if="edit" label="年龄">{{ form.age }}</el-descriptions-item>
            <el-descriptions-item v-else="edit" label="年龄">
              <el-input v-model="form.age"></el-input>
            </el-descriptions-item>
            <el-descriptions-item v-if="edit" label="联系方式">{{ form.phone }}</el-descriptions-item>
            <el-descriptions-item v-else="edit" label="联系方式">
              <el-input
                  v-model="form.phone"></el-input>
            </el-descriptions-item>
            <el-descriptions-item v-if="edit" label="身高(m)">{{ form.height }}</el-descriptions-item>
            <el-descriptions-item v-else="edit" label="身高(m)">
              <el-input
                  v-model="form.height"></el-input>
            </el-descriptions-item>
            <el-descriptions-item v-if="edit" label="体重(kg)">{{ form.weight }}</el-descriptions-item>
            <el-descriptions-item v-else="edit" label="体重(kg)">
              <el-input
                  v-model="form.weight"></el-input>
            </el-descriptions-item>
            <el-descriptions-item v-if="edit" label="血型">{{ form.bloodType }}</el-descriptions-item>
            <el-descriptions-item v-else="edit" label="血型">
              <el-input
                  v-model="form.bloodType"></el-input>
            </el-descriptions-item>
            <el-descriptions-item v-if="edit" label="居住地">{{ form.location }}</el-descriptions-item>
            <el-descriptions-item v-else="edit" label="居住地">
              <el-input
                  v-model="form.location"></el-input>
            </el-descriptions-item>
            <el-descriptions-item v-if="edit" label="情况描述">{{ form.description }}</el-descriptions-item>
            <el-descriptions-item v-else="edit" label="情况描述">
              <el-input
                  v-model="form.description"></el-input>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div ref="chart" class="echarts-chart"></div>
        <!--                     <SectionTitle text-align="center" title="这里可以放一个折线图" description="" data-aos="fade-up" />-->
      </div>
      <div>
        <span style="font-size: 20px;color:#9ccef9;font-weight: bold">历史记录</span>
        <el-date-picker type="date" placeholder="选择起始日期" v-model="queryStartDate" style="margin-left: 20px;width: 180px"></el-date-picker>
        <el-date-picker type="date" placeholder="选择结束日期" v-model="queryEndDate"  style="margin-left: 20px;width: 180px"></el-date-picker>
        <el-button icon="el-icon-search" type="primary" @click="search" size="mini" style="margin-left: 20px">
          搜索记录
        </el-button>
        <el-button icon="el-icon-search" type="primary" @click="searchAll" size="mini" style="margin-left: 20px">
          查询全部
        </el-button>
        <el-button size="mini" type="success" class="addHistory" @click="addHistory">添加病例
        </el-button>
        <el-radio-group v-model="selectStatus" style="margin-left: 150px;color: white">
          <el-radio :label="2">全部</el-radio>
          <el-radio :label="1">已完成</el-radio>
          <el-radio :label="0">未完成</el-radio>
        </el-radio-group>
      </div>
      <el-form-item>
        <div class="user_skills">
          <el-table :data="tableData" style="width: 100%;background-color:transparent"
                    element-loading-background="rgba(0,0,0,0.5)" cell-style="color:white;text-align:center" width="400">
            <el-table-column prop="id" label="编号" width="50" header-align="center">
            </el-table-column>
            <el-table-column prop="avatarFileUrl" label="快照" width="350" header-align="center">
              <template slot-scope="scope">
                <img v-if="scope.row.avatarFileUrl" :src="scope.row.avatarFileUrl" alt="">
                <span v-else>暂无快照</span>
              </template>
            </el-table-column>
            <el-table-column prop="desc_" label="描述" width="200" header-align="center">
            </el-table-column>
            <el-table-column prop="date" label="时间" width="150" header-align="center" :formatter="dateFormatter">
            </el-table-column>
            <el-table-column label="操作" width="300" header-align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="generateReport(scope.row.id, scope.row.status, scope.row.reportUrl)">下载报告</el-button>
                <el-button size="mini" @click="checkHistory(scope.row.id)">查看</el-button>
                <el-button size="mini" type="danger" @click="deleteHistory(scope.row.id)">删除</el-button>
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
    <el-dialog title="新建病例" :visible.sync="dialogFormVisible">
      <el-form :model="formNewhistory">
        <el-form-item label="病人描述：" :label-width="formLabelWidth">
          <el-input v-model="formNewhistory.introduction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendFormValue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'
import Vue from 'vue'
import VueRouter from 'vue-router'
// Vue.use(VueRouter)
import axios from "axios";
// import Storage from 'vue-ls';
import Button from "../components/elements/button/Button";
import moment from 'moment';
// this.sendFormValue()
import * as echarts from 'echarts';

export default {
  name: 'UserProj',
  components: {SectionTitle, Button},
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
      tableData: [],
      fileList: [],
      dialogFormVisible: false,
      dialogVisible: false,
      disabled: false,
      formLabelWidth: '120px',
      contentStyle: {
        'width': '300px',
        'height': '40px'
      },
      formNewhistory: {
        date: '',
        introduction: ''
      },
      form: {
        name: '',
        description: '',
        birthday: '',
        height: '',
        weight: '',
        age: '',
        location: '',
        phone: '',
        bloodType: '',
      },
      // dialogVisibleRule: false,
      rule: '',
      generateReportVisible: false,
      edit: true,
      projId: this.$route.params.id,
      scoreChart: {
        title: {
          textStyle: {
            color: '#333',
            fontSize: 24,
            fontWeight: 'bold'
          }
        },
        xAxis: {
          type: 'category',
          data: ['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04', '2019-01-05', '2019-01-06'],
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
            data: [1, 2, 3, 4, 5, 6],
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
      chart: '',
      queryStartDate:'',
      queryEndDate:'',
      selectStatus:2
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
    deleteHistory(id) {
      this.$confirm('此操作将永久删除该病例记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/api/proj/deleteHistory', {
          historyid: id
        }).then(res => {
          if (res.data.code === 400) {
            this.$message.error(res.data.message)
          } else {
            this.$message.success('删除成功')
            location.reload()
          }
        }).catch(error => {
          this.$message.error('删除失败，请稍后再试')
        })
      })
    },
    sendFormValue() {
      console.log('当前的projectId为：')
      console.log(this.projId)
      axios.post('/api/createhistory', {
        pid: this.$route.params.id,
        patient_id: this.form.patientId,
        Description: this.formNewhistory.introduction
      }).then(res => {
        console.log(res.data);
        if(res.data.code === 400){
          this.$message.error(res.data.message)
        }else {
          sessionStorage.setItem('historyId', JSON.stringify(res.data.result))
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '创建成功!'
          });
          location.reload()
        }
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
    // open() {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     axios.post('/api/submitFile').then(res => {
    //       console.log(res.data);
    //     }, err => {
    //       console.log(err);
    //     })
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
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
      if(!this.queryStartDate || !this.queryEndDate){
        this.$message.error('请选择起止日期')
      }else {
        axios.post('/api/proj/getFilesBetweenDates',{
          startDate:this.queryStartDate,
          endDate:this.queryEndDate,
          projectId:this.$route.params.id
        }).then(res=>{
          if(res.data.code===400){
            this.$message.error(res.data.message)
          }else {
            this.tableData = res.data.result
            this.$message.success('查询成功！')
          }
        }).catch(error=>{
          this.$message.error('发生错误，请稍后错误')
        })
      }
    },
    searchAll(){
      axios.get(`/api/proj/Info/${this.$route.params.id}`).then(res => {
        if(res.data.code===400){
          this.$message.error(res.data.message)
        }else {
          this.tableData = res.data.result.upLoadFiles
          this.queryStartDate = ''
          this.queryEndDate = ''
          console.log(res.data);
        }
      }, err => {
        console.log(err);
      })
    },
    addHistory() {
      this.dialogFormVisible = true
    },

    // 删除项目
    delProj() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.put(`/api/proj/delete`, {projectId: this.$route.params.id}).then(res => {
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
    // changeRule() {
    //   axios.post(`/api/proj/editPermission`, {
    //     uid: 4, pid: this.$route.params.id, permission: 'admin'
    //   }).then(res => {
    //     // console.log(res.data);
    //     this.$message({
    //       type: 'success',
    //       message: '修改权限成功!'
    //     });
    //     this.dialogVisibleRule = false
    //   }, err => {
    //     console.log(err);
    //   })
    // },
    // 修改权限的handleclose
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => { });
    // },
    completeEditPersonal() {
      if (!this.form.name || !this.form.location || !this.form.phone || !this.form.description || !this.form.height
          || !this.form.weight || !this.form.age || !this.form.bloodType || !this.form.birthday) {
        this.$message.error('请填写完整的信息')
      } else {
        axios.post('/api/proj/edit', {
          id: this.$route.params.id,
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
            this.$message.success('修改成功')
            this.edit = !this.edit
          }
        })
      }
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
    selectStatus(newVal,oldVal){
      console.log(newVal)
      if(newVal === 2){
        axios.get(`/api/proj/Info/${this.$route.params.id}`).then(res => {
          if(res.data.code===400){
            this.$message.error(res.data.message)
          }else {
            this.tableData = res.data.result.upLoadFiles
            console.log(res.data);
          }
        }, err => {
          console.log(err);
        })
      }else {
        axios.post('/api/proj/indexForCompletion',{
          projectid:this.$route.params.id,
          status:newVal ? '处理完成':'处理未完成'
        }).then(res=>{
          if(res.data.code===400){
            this.$message.error(res.data.message)
          }else {
            console.log(res.data)
            this.tableData = res.data.result
          }
        })
      }
    }
  },
  mounted() {
    console.log(this.projId)
    this.scoreChart.xAxis.data = []
    this.scoreChart.series[0].data = []
    axios.get(`/api/proj/Info/${this.$route.params.id}`).then(res => {
      if(res.data.code===400){
        this.$message.error(res.data.message)
      }else {
        console.log(res.data.result)
        this.form = res.data.result
        this.tableData = res.data.result.upLoadFiles
        const tempData = res.data.result.upLoadFiles
        for(var i=0;i<tempData.length;i++){
          if(tempData[i].status === 1){
            this.scoreChart.xAxis.data.push(this.formatDate(tempData[i].date))
            this.scoreChart.series[0].data.push(tempData[i].score)
          }
        }
        console.log('x轴的数据')
        console.log(this.scoreChart.xAxis.data)
        console.log(res.data);
      }
    }, err => {
      console.log(err);
    })
    const chartContainer = this.$refs.chart
    this.chart = echarts.init(chartContainer)
    if(this.scoreChart.xAxis.data.length === 0){
      this.scoreChart={
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
    console.log(this.scoreChart)
    this.chart.setOption(this.scoreChart)
  }
}
</script>
<style scoped lang="scss">

:deep(.el-radio__inner) {
  border-radius: 2px;
}

:deep(.el-radio__input.is-checked) .el-radio__inner::after {
  content: "";
  width: 10px;
  height: 5px;
  border: 1px solid white;
  border-top: transparent;
  border-right: transparent;
  text-align: center;
  display: block;
  position: absolute;
  top: 2px;
  left: 0px;
  vertical-align: middle;
  transform: rotate(-45deg);
  border-radius: 0px;
  background: none;
}

::v-deep th.el-table__cell.is-leaf {
  border-bottom: 1px solid grey !important;
}

.el-table::before {
  //border: 1px solid grey !important;
  // color: #043cbd;
  height: 0px;
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
  height: auto;
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
  color: #9ccef9;
  font-size: 20px;
}

.historyTitle {
  color: #9ccef9;
  font-weight: bold;
  font-size: 20px;
}


::v-deep .el-table .cell {
  line-height: 40px !important
}

.echarts-chart {
  width: 400px;
  height: 250px;
  right: 50px;
  top: 90px
}
</style>

