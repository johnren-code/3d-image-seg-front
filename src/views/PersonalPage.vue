<template>
  <Layout :tab-name="5">
    <div class="rwt-team-area rn-section-gap">
      <div class="container">
        <el-row>
          <el-col :span="9">
            <div class="grid-content bg-purple">
              <div class="row row--15">
                <div class="col-lg-10 offset-lg-1"
                     v-for="(teamMember, index) in teamData"
                     :key="index">
                  <Team :team-member="teamMember"/>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple-light">
              <div class="row">
                <div class="col-lg-10 offset-lg-1" style="margin-top: -50px;">
                  <SectionTitle
                      subtitle="Complete Condition"
                      title="病人诊断完成情况"
                      data-aos="fade-up"
                  />
                </div>
              </div>
              <Progressbar :progress-data="progressOneData"/>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

<!--    <Separator/>-->

<!--    <div class="rwt-portfolio-area rn-section-gap">-->
<!--      <div class="container">-->
<!--        <div class="row">-->
<!--          <div class="col-lg-12">-->
<!--            <SectionTitle-->
<!--                text-align="center"-->
<!--                subtitle="Image History"-->
<!--                title="图片历史记录"-->
<!--                data-aos="fade-up"-->
<!--                data-aos-delay="60"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--        <Portfolio class="mt&#45;&#45;20" ref="portfolio" column="col-lg-3 col-md-6 mt&#45;&#45;30"/>-->
<!--      </div>-->
<!--    </div>-->
  </Layout>
</template>

<script>
import Layout from '../components/common/Layout.vue'
import Team from '../components/elements/team/Team.vue'
import SectionTitle from '../components/elements/sectionTitle/SectionTitle.vue'
import Separator from '../components/elements/separator/Separator.vue'
import Portfolio from '../components/elements/portfolio/Portfolio.vue'
import PortfolioItemMixin from '../mixins/PortfolioItemMixin.js'
import Progressbar from '../components/elements/progressbar/Progressbar.vue'
import Button from '../components/elements/button/Button.vue'
import axios from "axios";

export default {
  name: 'PersonalPage',
  components: {Layout, Team, SectionTitle, Separator, Portfolio, Progressbar, Button},
  data() {
    return {
      // avatarUrl:this.$global.apiUrl+'file/uploadAvatar/'+this.$ls.get('userInfo').id,
      teamData: [
        {
          image: '',
          name: '',
          email: '',
          description: '',
        }
      ],
      progressOneData: []
    };
  },
  mounted() {
    console.log(this.$ls.get('userInfo'))
    if(this.$ls.get('userInfo')!==null){
      this.getPercentage()
      this.setUserInfo()
      // this.$refs.portfolio.portfolioData=this.portfolioItems
    }
    axios.post('/api/processStatus')
    .then(res=>{
      console.log(res.data)
      if(res.data.code === 400){
        this.$message.error(res.data.message)
      }else {
        const patientInfo = res.data.result
        for(var i=0;i<patientInfo.length;i++){
          this.progressOneData.push({
            id:i,
            title:patientInfo[i].name,
            percentage: patientInfo[i].degreeOfCompletion,
            progressClass: 'bar-color-1'
          })
        }
      }
    })
  },
  methods: {
    setUserInfo(){
      this.teamData[0].image = this.$ls.get('userInfo').avatar
      this.teamData[0].name = this.$ls.get('userInfo').username
      this.teamData[0].email = this.$ls.get('userInfo').email
      this.teamData[0].description = this.$ls.get('userInfo').description || '这家伙很懒，什么都没有留下'
    },
    getPercentage(){
      // var that = this;
      // that.$axios.get(this.$global.apiUrl+'record/statistics?userId='+this.$ls.get('userInfo').id)
      //     .then(res=>{
      //       // console.log(this.$global.apiUrl+'record/statistics?userId='+this.$ls.get('userInfo').id)
      //       var percentageArray = res.data.data;
      //       that.progressOneData[0].percentage = Math.round(100*percentageArray.目标提取)
      //       that.progressOneData[1].percentage = Math.round(100*percentageArray.变化检测)
      //       that.progressOneData[2].percentage = Math.round(100*percentageArray.目标检测)
      //       that.progressOneData[3].percentage = Math.round(100*percentageArray.地物分类)
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
    }
  }
}
</script>
