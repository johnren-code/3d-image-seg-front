<template>
  <div v-if="teamStyle === 1 || teamStyle === 2" :class="`rn-team ${checkTeamStyle}`">
    <div data-aos="fade-up" data-aos-delay="60">
      <div class="inner">
        <figure class="thumbnail">
          <img :src="teamMember.image"/>
        </figure>
        <figcaption class="content">
          <h2 class="title">{{ teamMember.name }}</h2>
          <h6 class="subtitle theme-gradient" style="text-transform: none">{{ teamMember.email }}</h6>
          <p class="description">{{ teamMember.description }}</p>

          <!--                    <ul class="social-icon social-default icon-naked mt&#45;&#45;20" >-->
          <!--                        <li v-for="(social, index) in teamMember.socialNetwork" :key="index">-->
          <!--                            <a :href="social.url"><Icon :name="social.icon"/></a>-->
          <!--                        </li>-->
          <!--                    </ul>-->
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="12">
                <div class="button-group" @click="toEditUserInfoPage">
                  <Button :read-more-button="true" data-aos="fade-up">
                    <span>修改信息</span>
                  </Button>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="button-group" @click="logout">
                  <Button :read-more-button="true" data-aos="fade-up">
                    <span>退出登录</span>
                  </Button>
                </div>
              </el-col>
            </el-row>
          </div>
        </figcaption>
      </div>
    </div>
  </div>

  <div v-else-if="teamStyle === 3" :class="`rn-team ${checkTeamStyle}`">
    <div data-aos="fade-up" data-aos-delay="60">
      <div class="inner">
        <figure class="thumbnail">
          <img :src="require(`@/assets/images/team/${teamMember.image}.jpg`)" :alt="teamMember.name"/>
        </figure>
        <figcaption class="content">
          <h2 class="title">{{ teamMember.name }}</h2>
          <h6 class="subtitle theme-gradient">{{ teamMember.designation }}</h6>
        </figcaption>
      </div>
    </div>
  </div>

  <div v-else-if="teamStyle === 4" :class="`rn-team ${checkTeamStyle}`">
    <div data-aos="fade-up" data-aos-delay="60">
      <div class="inner">
        <figure class="thumbnail">
          <img :src="require(`@/assets/images/team/${teamMember.image}.jpg`)" :alt="teamMember.name"/>
        </figure>
        <figcaption class="content">
          <div class="team-info">
            <h2 class="title">{{ teamMember.name }}</h2>
            <h6 class="subtitle theme-gradient">{{ teamMember.designation }}</h6>
            <div class="team-form">
              <span class="location">{{ teamMember.location }}</span>
            </div>
          </div>
        </figcaption>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../../icon/Icon";
import Button from "../button/Button.vue";
import eventBus from "../../../global/eventBus";
import axios from "axios";

export default {
  name: 'Team',
  components: {Icon, Button},
  props: {
    teamStyle: {
      type: Number,
      default: 1
    },
    teamMember: {}
  },
  computed: {
    checkTeamStyle() {
      if (this.teamStyle === 1) return 'team-style-default';
      else if (this.teamStyle === 2) return 'team-style-default style-two';
      else if (this.teamStyle === 3) return 'team-style-two';
      else if (this.teamStyle === 4) return 'team-style-three';
      else return '';
    }
  },
  methods: {
    toEditUserInfoPage() {
      this.$router.push('/editUserInfo');
    },
    logout() {
      this.$router.push('/');
      axios.get('/api/logout').then(res => {
        if (res.data.code === 400) {
          this.$message.error(res.data.message)
        } else {
          this.$message.success('登出成功')
        }
      }).catch(error => {
        this.$message.error('登出错误，请稍后再试')
      })
      this.$ls.clear()
      eventBus.$emit('userLogin', false)
    }
  }
}
</script>