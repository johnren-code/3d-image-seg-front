<template>
  <Layout header-class="header-transparent" :show-newsletter="true" :show-cta="false">
    <!-- Start Service Area -->
    <div class="rn-service-area rn-section-gap">
      <!--      <div class="container">-->
      <!--        <div class="row">-->
      <!--          <div class="col-lg-12">-->
      <!--            <SectionTitle-->
      <!--                text-align="center"-->
      <!--                subtitle="我们能为你做什么？"-->
      <!--                title="精准的3D医学影像分割"-->
      <!--                description="There are many variations of passages of Lorem Ipsum available, <br /> but the majority have suffered alteration."-->
      <!--                data-aos="fade-up"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="dicom-main">
        <div class="l-bottom">
          <div class="m-left">
            <div
                class="t-tools-dis"
                v-show="percentage < 100 && percentage != 0"
            ></div>
            <!-- 工具集 -->
            <div :class="['t-tools']">
              <div class="s-title">
                <div slot="trigger" class="e-upload">
                  <i class="iconfont iconMRIjiancha"></i>
                  <span>3D影像在线查看</span>
                </div>
              </div>
              <div class="s-box">
                <i class="iconfont iconmenu-list" @click="recordTab"></i>
              </div>
              <div class="s-percent" v-show="percentage < 100 && percentage != 0">
                <span>正在加载：{{ percentage + '%' }}</span>
              </div>
              <!-- volume -->
              <!--              <div class="s-volume">-->
              <!--                <span class="e-span">volume：</span>-->
              <!--                <el-input-number-->
              <!--                    v-model="num"-->
              <!--                    controls-position="right"-->
              <!--                    @change="changeVolume"-->
              <!--                    :min="1"-->
              <!--                    :max="timeSlices"-->
              <!--                    size="small"-->
              <!--                    :disabled="timeSlices == 1"-->
              <!--                ></el-input-number>-->
              <!--              </div>-->
              <!-- 其他工具 -->
              <!--上传文件-->
              <el-upload
                  action="/api/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="getUploadFile">
                <i class="t-active iconfont el-icon-folder-opened"
                   style="font-size:28px;margin-top: 5px;margin-right: 10px"></i>
              </el-upload>

              <!--移动-->
              <div
                  v-for="(item, index) in moveList"
                  :key="item.iconfont"
                  :class="['s-other', item.status ? 's-select' : '']"
                  :title="item.title"
                  @click="clickMoves(item, index)"
              >
                <i :class="'t-active iconfont ' + item.iconfont" style="font-size:28px;margin-top: 15px"></i>
              </div>

              <div
                  v-for="(item, index) in toolList"
                  :key="item.iconfont"
                  :class="['s-other', item.status ? 's-select' : '']"
                  :title="item.title"
                  @click="clickTools(item, index)"
              >
                <i :class="'t-active iconfont ' + item.iconfont"></i>
              </div>

              <!-- 度量 -->
              <div
                  :class="['s-other t-dialog1', measureStatus ? 's-select' : '']"
                  title="工具"
              >
                <i class="t-active iconfont iconremark-measure"></i>
                <div class="r-tools">
                  <div
                      v-for="(meas, index) in measureList"
                      :key="meas.iconfont"
                      @click="clickInstros(meas, index)"
                      :class="[meas.status ? 's-select' : '']"
                  >
                    <i :class="'iconfont ' + meas.iconfont"></i
                    ><span>{{ meas.title }}</span>
                  </div>
                </div>
              </div>
              <!-- 颜色 -->
              <div
                  :class="['s-other t-dialog2', colorStatus ? 's-select' : '']"
                  :title="'colorMap'"
              >
                <i class="t-active iconfont iconiamge-colormap"></i>
                <div class="r-tools">
                  <div
                      v-for="(color, index) in colorlist"
                      :key="color.id"
                      :class="['s-color', color.status ? 's-select' : '']"
                      @click="colorMap(color.id, index)"
                      :title="color.id"
                  >
                    <i :class="['color-bar' + color.id]"></i
                    ><span> {{ color.name }}</span>
                  </div>
                </div>
              </div>
              <!-- 编辑操作 -->
              <div
                  v-for="(item, index) in editList"
                  :key="item.iconfont"
                  :class="['s-other', item.status ? 's-select' : '']"
                  :title="item.title"
                  @click="clickEdits(item, index)"
              >
                <i :class="'t-active iconfont ' + item.iconfont" style="font-size:25px;margin-top: 15px"></i>
              </div>

              <!-- 调色盘 -->
              <div
                  v-for="(item, index) in paletteList"
                  :key="item.iconfont"
                  :class="['s-other', item.status ? 's-select' : '']"
                  :title="item.title"
                  @click="clickPalette(item, index)"
              >
                <i :class="'t-active iconfont ' + item.iconfont" style="font-size:25px;margin-top: 15px"></i>
              </div>

              <!-- 视图 -->
              <div
                  :class="['s-other t-dialog3', viewStatus ? 's-select' : '']"
                  title="视图"
              >
                <i class="t-active iconfont iconimage-view"></i>
                <div class="r-tools">
                  <div
                      v-for="(meas, index) in viewList"
                      :key="meas.iconfont"
                      :class="['s-color', meas.status ? 's-select' : '']"
                      @click="changeView(meas, index)"
                      :title="meas.title"
                  >
                    <span>{{ meas.title }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- dicom 图 -->
            <div class="t-main">
              <div class="n-list" v-show="tabStatus">
                <!-- 图像评估 -->
                <div class="t-image">
                  <div
                      class="e-card"
                      v-for="(item, index) in imageMark"
                      :key="item.id"
                      @mouseenter="enterOrLeaveTool(item, true)"
                      @mouseleave="enterOrLeaveTool(item, false)"
                      v-show="imageMark.length != 0"
                  >
                    <div class="e-title">
                        <span class="e-e">
                          <el-input
                              size="mini"
                              v-model="item.title"
                              maxlength="20"
                              :placeholder="'#-' + index"
                              @blur="blurTitle(item, index)"
                          >
                          </el-input>
                        </span>
                      <span class="e-icon">
                          <i
                              class="el-icon-close"
                              @click.stop="deleteTool(item, index)"
                              title="删除图像评估"
                          ></i>
                        </span>
                    </div>
                    <div class="e-result">
                      {{ item.value }}
                    </div>
                  </div>
                  <div v-show="imageMark.length == 0" class="e-none">
                    暂无数据
                  </div>
                </div>
              </div>
              <!-- 图像 -->
              <div
                  class="n-image"
                  :style="{
                    height: echartStatus ? 'calc(100% - 199px)' : 'calc(100% - 42px)',
                  }"
                  v-if="niftiStatus"
              >
                <div
                    id="nifti-imagex"
                    v-show="niftiNum == 1 || niftiNum == 4"
                    :class="['e-x', selectView == 'nifti-imagex' ? 'n-active' : '']"
                    @click="clickView('nifti-imagex')"
                ></div>
                <div
                    id="nifti-imagey"
                    v-show="niftiNum == 2 || niftiNum == 4"
                    :class="['e-y', selectView == 'nifti-imagey' ? 'n-active' : '']"
                    @click="clickView('nifti-imagey')"
                ></div>
                <div
                    id="nifti-imagez"
                    v-show="niftiNum == 3 || niftiNum == 4"
                    :class="['e-z', selectView == 'nifti-imagez' ? 'n-active' : '']"
                    @click="clickView('nifti-imagez')"
                ></div>
              </div>
              <div class="n-echarts" v-if="echartStatus">
                <div id="echarts"></div>
              </div>
              <el-select v-model="selectValue" placeholder="请选择" v-on:change="drawPen">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="selectViewValue" placeholder="请选择" v-on:change="showView">
                <el-option
                    v-for="item in viewOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" @click="doLeft">left</el-button>
              <el-button type="primary" @click="doRight">right</el-button>
              <el-button type="primary" @click="doPosterior">posterior</el-button>
              <el-button type="primary" @click="doAnterior">anterior</el-button>
              <el-button type="primary" @click="doInferior">inferior</el-button>
              <el-button type="primary" @click="saveLabel">saveLabel</el-button>
              <el-button type="primary" @click="getBitMap">getBitMap</el-button>
              <el-button type="primary" @click="labelEditor">label editor</el-button>
              <el-button type="primary" @click="undo">undo</el-button>
              <el-button type="primary" @click="doSegmentation">3D分割</el-button>
              <el-dialog title="label Editor" :visible.sync="dialogTableVisible" center :append-to-body='true'
                         :lock-scroll="false" width="30%">
                <Table @update-parent-var="onUpdateParentVar"></Table>
              </el-dialog>
              <div class="block">
                <span class="demonstration">Draw Opacity</span>
                <el-slider v-on:change="doDrawOpacity" v-model="sliderValue"></el-slider>
              </div>
              <el-color-picker
                  v-model="fontColor"
                  color-format="rgb"
              ></el-color-picker>
              <br>
              <div>
                <canvas id="gl" height="480" width="640"></canvas>
              </div>
              <!-- 底部坐标 -->
              <div class="n-xyz">
                <span>X：{{ imagX }}</span>
                <span>Y：{{ imagY }}</span>
                <span>Z：{{ imagZ }}</span>
                <span class="w90">Val：{{ imgVal }}</span>
                <span>Img：{{ currentThanLayers }}</span>
              </div>
            </div>
          </div>
          <!--          </div>-->
          <!--  -->
          <el-dialog
              :title="'Slices，共' + spliceList.length + '个（' + splicePrecent + '%）'"
              :visible="visable"
              width="1060px"
              :before-close="handleClose"
              class="dialog"
              top="7vh"
              :close-on-press-escape="false"
              :close-on-click-modal="false"
              v-dialogDrag
          >
            <div
                :style="{ height: Math.round(spliceList.length / 7) * 150 + 'px' }"
                class="g-dis s-scrollbar"
            ></div>
            <div class="g-main">
              <div class="d-dicom" v-for="(item, i) in spliceList" :key="i">
                <div :id="'d-dicom' + i" class="m-image"></div>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>

    <!--    <Separator/>-->

    <AboutFour :image="require(`@/assets/images/about/contact-image.jpg`)"/>

    <!-- Start Elements Area -->
    <div class="rwt-counterup-area pb--100">
      <div class="container mt_dec--30">
        <Counter
            :counter-style="5"
            text-align="center"
            :counter-data="counterData"
            column="col-lg-3 col-md-6 col-sm-6 col-12"
        />
      </div>
    </div>
    <!-- End Elements Area -->

    <Separator/>

    <!-- Start Elements Area -->
    <div class="rwt-team-area rn-section-gap">
      <div class="container">
        <div class="row mb--20">
          <div class="col-lg-12">
            <SectionTitle
                text-align="center"
                subtitle="Our Corporate Team."
                title="Corporate Team Member."
                data-aos="fade-up"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-xl-3 col-md-6 col-12 mt--30"
               v-for="(teamMember, index) in teamData"
               :key="index">
            <Team :team-member="teamMember" :team-style="4"/>
          </div>
        </div>
      </div>
    </div>
    <!-- End Elements Area -->
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
import {Niivue} from '@niivue/niivue'
import Table from "../components/table/Table"
import {Dialog} from "element-ui";
import axios from 'axios'

const nv = new Niivue({
  logging: true,
  dragAndDropEnabled: true,
  backColor: [0, 0, 0, 1],
  show3Dcrosshair: true,
  // onLocationChange: this.locationChangeHandler,
})
export default {
  name: 'Segmentation',
  components: {Table, Team, Brand, Counter, Timeline, ServiceOne, AboutFour, SectionTitle, Separator, Layout},
  data() {
    return {
      components: {
        Table
      },
      dialogTableVisible: false,
      fontColor: "",
      sliderValue: 80,
      viewOptions: [{
        value: 'Axial',
        label: 'Axial'
      }, {
        value: 'Coronal',
        label: 'Coronal'
      }, {
        value: 'Sagittal',
        label: 'Sagittal'
      }, {
        value: 'Render',
        label: 'Render'
      }, {
        value: 'MultiPlanar',
        label: 'MultiPlanar'
      }
      ],
      options: [{
        value: '-1',
        label: '关闭'
      }, {
        value: '0',
        label: '橡皮擦'
      }, {
        value: '1',
        label: '红色'
      }, {
        value: '2',
        label: '绿色'
      }, {
        value: '3',
        label: '蓝色'
      }, {
        value: '8',
        label: 'Filled Erase'
      }, {
        value: '9',
        label: 'Filled Red'
      }, {
        value: '10',
        label: 'Filled Green'
      }, {
        value: '11',
        label: 'Filled Blue'
      }, {
        value: '12',
        label: 'Erase Selected Cluste'
      }, {
        value: '13',
        label: 'measurement'
      }
      ],
      selectValue: '',
      selectViewValue: '',
      testUrl: '',
      md5Par: null,
      checked: false,
      visable: false,
      issonStatus: false,
      tabStatus: false,
      num: '',
      rowResultStatus: true,
      /* 颜色值 */
      colorlist: [],
      /* 视图 */
      viewList: [
        {title: '矢状图', status: '', value: 'nifti-imagex', num: 1, titleEng: 'Sagittal'},
        {title: '冠状图', status: '', value: 'nifti-imagey', num: 2, titleEng: 'Coronal'},
        {title: '横断图', status: '', value: 'nifti-imagez', num: 3, titleEng: 'Axial'},
        {
          title: '3D图',
          status: '',
          value: 'nifti-imagex,nifti-imagey,nifti-imagez',
          num: 4,
          titleEng: 'Render'
        },
        {
          title: '所有视图',
          status: true,
          num: 5,
          titleEng: 'MultiPlanar'
        }
      ],
      /* 度量 */
      measureList: [
        {
          title: '长度',
          iconfont: 'iconrule-line',
          status: '',
          value: 'Length',
        },
        {
          title: '角度',
          iconfont: 'iconrule-angle',
          status: '',
          value: 'Angle',
        },
        {
          title: '椭圆',
          iconfont: 'iconrule-circle',
          status: '',
          value: 'EllipticalRoi',
        },
        {
          title: '矩形',
          iconfont: 'iconrule-rect',
          status: '',
          value: 'RectangleRoi',
        },
      ],
      /* 工具类 */
      moveList: [
        {
          title: '左移',
          iconfont: 'el-icon-back',
          status: '',
          value: 'left',
        },
        {
          title: '右移',
          iconfont: 'el-icon-right',
          status: '',
          value: 'right',
        },
        {
          title: '前移',
          iconfont: 'el-icon-bottom-left',
          status: '',
          value: 'anterior',
        },
        {
          title: '后移',
          iconfont: 'el-icon-bottom-right',
          status: '',
          value: 'posterior',
        },
        {
          title: '上移',
          iconfont: 'el-icon-top',
          status: '',
          value: 'superior',
        },
        {
          title: '下移',
          iconfont: 'el-icon-bottom',
          status: '',
          value: 'inferior',
        }
      ],
      /* 工具类 */
      toolList: [
        {
          title: '放大/缩放',
          iconfont: 'iconimage-zoom',
          status: false,
          value: 'pan',
        },
        {
          title: '放射学方向',
          iconfont: 'iconflip-leftright',
          status: '',
          value: 'radiological',
        },
        {
          title: '十字线',
          iconfont: 'iconremark-crossline',
          status: '',
          value: 'cross',
        },
        {
          title: '快照',
          iconfont: 'el-icon-camera',
          status: '',
          value: 'camera',
        },
      ],
      editList: [
        {
          title: '画笔',
          iconfont: 'el-icon-edit',
          status: '',
          value: 'pen',
        },
        {
          title: '橡皮擦',
          iconfont: 'iconremark-erase',
          status: '',
          value: 'eraser',
        },
        {
          title: '撤回',
          iconfont: 'iconimage-recover',
          status: '',
          value: 'back',
        },
        {
          title: '删除标签',
          iconfont: 'el-icon-delete',
          status: '',
          value: 'delete',
        },
        {
          title: '保存标签',
          iconfont: 'el-icon-download',
          status: '',
          value: 'delete',
        }
      ],
      paletteList: [
        {
          title: '标签颜色更改',
          iconfont: 'icon-zhuti_tiaosepan_o',
          status: '',
          value: 'palette',
        }
      ],
      imageList: {}, // 存取所有图片集合
      percentage: 0, // 进度
      selectView: null,
      selectTool: '',
      crossStatus: false, // 十字线状态
      measureStatus: '',
      colorIndex: '',
      colorStatus: false,
      viewStatus: true,
      niftiNum: 4,
      timeSlices: 0, //volume 值
      echartStatus: false,
      niftiStatus: true,
      /* 底部坐标值 */
      imagX: '',
      imagY: '',
      imagZ: '',
      imgVal: 0, // 点击val值
      currentThanLayers: '', // 当前图层/全部图层
      loading: false,
      /* echarts 数据 */
      optionEcharts: {
        backgroundColor: '#333',
        color: '#0070F5',
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#5b5b5b',
              },
            },
            axisLabel: {
              interval: 10,
            },
            type: 'category',
            data: [0],
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: 30,
          right: 30,
          bottom: 8,
          top: 30,
          containLabel: true,
        },
        yAxis: {
          type: 'value',
          min: 0,
          axisLine: {
            lineStyle: {
              color: '#5b5b5b',
            },
          },
          splitLine: {
            lineStyle: {
              color: ['#5b5b5b'],
            },
          },
        },
        series: [
          {
            data: [0],
            symbol: 'none',
            type: 'line',
          },
        ],
      },
      myChart: null,
      parXYZ: {}, // 鼠标移动图层转换后的坐标
      spliceList: [], // 切片数组
      splicePrecent: 0, // 处理全部切片进度
      imageMark: [],
      imageMarkCopy: [],
      currentRawImageUrl: ''
    }
  },
  methods: {
    clickEdits(item, index) {

    },
    clickTools(item, index) {
      if (item.value === 'pan') {
        if (!item.status) {
          nv.opts.dragMode = nv.dragModes.pan;
        } else {
          nv.opts.dragMode = nv.dragModes.contrast
        }
        this.toolList[index].status = !item.status;
      }
      console.log(this.toolList)
    },
    clickMoves(item, index) {
      if (item.value === "left") {
        nv.moveCrosshairInVox(-1, 0, 0);
      }
      if (item.value === "right") {
        nv.moveCrosshairInVox(1, 0, 0);
      }
      if (item.value === "posterior") {
        nv.moveCrosshairInVox(0, -1, 0);
      }
      if (item.value === "anterior") {
        nv.moveCrosshairInVox(0, 1, 0);
      }
      if (item.value === "inferior") {
        nv.moveCrosshairInVox(0, 0, -1);
      }
      if (item.value === "superior") {
        nv.moveCrosshairInVox(0, 0, 1);
      }
    },
    doSegmentation() {
      axios.post('/seg', {
        uploadFileUrl: this.currentRawImageUrl
      }).then(response => {
        if (response.data.code === 200) {
          console.log(response)
          nv.loadVolumes([{url: response.data.result.OriginFileUrl}]).then(() => {
            nv.loadDrawingFromUrl(response.data.result.PredictFileUrl);
          })
              .catch(err => {
                console.error(err);
              });
        }
      }).catch(failResponse => {
        console.log(failResponse)
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.currentRawImageUrl = res.result;
      nv.loadVolumes([{url: res.result}])

    },
    getUploadFile(file) {
      console.log(file.name)
      nv.loadVolumes([{url: file.name}])
    },
    changeView(meas, index) {
      if (meas.titleEng === 'Axial') {
        nv.setSliceType(nv.sliceTypeAxial)
        this.viewList.forEach((item) => {
          item.status = false;
        });
        this.viewList[index].status = true;
        console.log(this.viewList)
      }
      if (meas.titleEng === 'Coronal') {
        nv.setSliceType(nv.sliceTypeCoronal)
        this.viewList.forEach((item) => {
          item.status = false;
        });
        this.viewList[index].status = true;
        console.log(this.viewList)
      }
      if (meas.titleEng === 'Sagittal') {
        nv.setSliceType(nv.sliceTypeSagittal)
        this.viewList.forEach((item) => {
          item.status = false;
        });
        this.viewList[index].status = true;
      }
      if (meas.titleEng === 'Render') {
        nv.setSliceType(nv.sliceTypeRender)
        this.viewList.forEach((item) => {
          item.status = false;
        });
        this.viewList[index].status = true;
      }
      if (meas.titleEng === 'MultiPlanar') {
        nv.opts.multiplanarForceRender = false
        nv.setSliceType(nv.sliceTypeMultiplanar)
        this.viewList.forEach((item) => {
          item.status = false;
        });
        this.viewList[index].status = true;
      }
    },
    clickInstros(meas, index) {
    },
    locationChangeHandler(data) {
      console.log(data);
    },
    showView() {
      const viewValue = this.selectViewValue
      if (viewValue === 'Axial') {
        nv.setSliceType(nv.sliceTypeAxial)
      }
      if (viewValue === 'Coronal') {
        nv.setSliceType(nv.sliceTypeCoronal)
      }
      if (viewValue === 'Sagittal') {
        nv.setSliceType(nv.sliceTypeSagittal)
      }
      if (viewValue === 'Render') {
        nv.setSliceType(nv.sliceTypeRender)
      }
      if (viewValue === 'MultiPlanar') {
        nv.opts.multiplanarForceRender = false
        nv.setSliceType(nv.sliceTypeMultiplanar)
      }
    },
    undo() {
      nv.drawUndo()
    },
    onUpdateParentVar(newVal) {
      const hexColor = newVal[0].color;
      const red = parseInt(hexColor.substring(1, 3), 16);
      const green = parseInt(hexColor.substring(3, 5), 16);
      const blue = parseInt(hexColor.substring(5, 7), 16);
      let cmap = {
        R: [0, red, 0, 0, 255, 0, 255, 255, 0, 205, 210, 102],
        G: [0, green, 255, 0, 255, 255, 0, 239, 0, 133, 180, 205],
        B: [0, blue, 0, 255, 0, 255, 255, 213, 205, 63, 140, 170],
        A: [0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
      };
      nv.setDrawColormap(cmap)
    },
    getBitMap() {

    },
    labelEditor() {
      this.dialogTableVisible = true;
    },
    doLeft() {
      nv.moveCrosshairInVox(-1, 0, 0)
    },
    doRight() {
      nv.moveCrosshairInVox(1, 0, 0)
    },
    doPosterior() {
      nv.moveCrosshairInVox(0, -1, 0)
    },
    doAnterior() {
      nv.moveCrosshairInVox(0, 1, 0)
    },
    doInferior() {
      nv.moveCrosshairInVox(0, 0, -1)
    },
    saveLabel() {
      nv.saveImage("draw.nii", true);
      nv.drawGrowCut()
    },
    drawPen() {
      const mode = parseInt(this.selectValue)
      nv.setDrawingEnabled(mode >= 0);
      if (mode >= 0) {
        nv.setPenValue(mode & 7, mode > 7)
      }
      if (mode === 12) {
        //erase selected cluster
        nv.setPenValue(-0)
      }
      if (mode === 13) {
        nv.opts.dragMode = nv.dragModes.measurement
      }
    },
    doDrawOpacity() {
      nv.setDrawOpacity(this.sliderValue * 0.01)
    }
  },
  mounted() {
    nv.setInterpolation(false)
    nv.setRadiologicalConvention(false)
    nv.opts.multiplanarForceRender = true
    nv.attachTo('gl')
    nv.setSliceType(nv.sliceTypeMultiplanar)
    nv.setClipPlane([0.3, 270, 0]);
    nv.setRenderAzimuthElevation(120, 10);
    nv.setSliceMM(true);
    nv.graph.autoSizeMultiplanar = true
    nv.drawMeasurementTool()
    // nv.overlayRGBA()
    // console.log(nv.drawBitmap)
  }
}
</script>
<style lang="scss">
/* flex 居中3 */
@import "../assets/icon/iconfont.css";
@import "../assets/icon-expand/iconfont.css";
@mixin fcc {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* flex 居中3 */
@mixin fh {
  display: flex;
  align-items: center;
}

@mixin el {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.dicom-main {
  height: 100%;
  width: 100%;
  min-width: 1366px;
  background: #f5f7fa;

  .dialog {

    .el-dialog {
      border: 2px solid #262626;
    }

    .el-dialog__header {
      background: #333;
      height: 48px;
      line-height: 48px;
      padding: 0 10px;
      font-weight: 550;

      .el-dialog__title {
        color: white;
        font-weight: 500;
      }

      .el-dialog__headerbtn {
        top: 15px;
        right: 15px;

        .el-dialog__close {
          color: white;
          font-size: 23px;
        }

      }
    }

    .el-dialog__body {
      min-height: 300px;
      background: black;
      max-height: 700px;
      overflow: auto;
      padding: 0;
      position: relative;

      .g-dis {
        position: absolute;
        width: 100%;
      }

      .g-main {
        width: 100%;
        overflow: auto;
        flex-wrap: wrap;
        display: flex;

        .d-dicom {
          width: 150px;
          height: 150px;

          .m-image {
            width: 150px;
            height: 150px;
          }

        }
      }
    }

    /* 设置滚动条样式 */
    .el-dialog__body::-webkit-scrollbar {
      width: 3px;
      height: 10px;
      background: #262626;
    }

    .el-dialog__body::-webkit-scrollbar-thumb {
      border-radius: 0;
      background: #737373;
    }

    .el-dialog__footer {
      display: none;
    }

  }

  .dialog2 {

    .el-dialog__header {
      height: 56px;
      line-height: 56px;
      padding: 0 16px;
      font-size: 18px;
      background: #0070f5;
    }

    .el-dialog__title {
      color: rgba(255, 255, 255, 0.85);
    }

    .el-dialog__headerbtn {
      top: 15px;
      right: 15px;

      .el-dialog__close {
        color: white;
        font-size: 23px;
      }

    }

    .el-dialog__body {
      padding: 0;

      .g-submit {
        padding: 4px 16px;
        box-sizing: border-box;
        line-height: initial;

        .t-title {
          height: 56px;
          @include fh;
          color: #ce2200;
        }

        .e-center {
          color: rgba(0, 0, 0, 0.85);
          justify-content: center;
          height: 32px;
        }

        .r-top {
          margin-top: 16px;
        }

        .r-bot {
          margin-bottom: 16px;
        }

        .t-row {
          height: 40px;
          @include fh;

          span {
            display: inline-block;
            width: 33%;
            text-align: center;
            @include el;
          }

        }

        .w-bck {
          background: #f5f5f5;
        }

        .mbt {
          margin-bottom: 24px;

          :last-child {
            color: #ce2200;
          }

        }

        .g-btn {
          height: 64px;
          @include fcc;

          .n-cancel,
          .n-confirm {
            width: 96px;
            height: 40px;
            border-radius: 4px;
            border: 1px solid #e6e6e6;
            color: #000000a6;
            padding: 0;
          }

          .n-confirm {
            background: #0070f5;
            color: #ffffffd9;
            margin-left: 16px;
          }

          .m-err {
            border: 1px solid #ce2200;
            color: #ce2200;
          }

          .m-err:hover {
            background: #fff2e8;
          }

        }
      }
    }
  }

  .l-top {
    height: 64px;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    @include fh;
    position: relative;
    font-size: 14px;

    .p-return {

      button {
        width: 72px;
        height: 32px;
        background: #e6f0ff;
        border-radius: 4px;
        color: #0070f5;
        padding: 0;
        border: 0;
      }

      i {
        font-size: 12px;
        margin-left: -6px;
      }

    }

    .p-msg {
      color: #000000d9;
      font-size: 14px;
      height: 64px;
      line-height: 64px;
      padding-left: 16px;
      position: relative;
      cursor: pointer;

      i {
        margin-right: 5px;
      }

      span {
        text-decoration: underline;
        font-weight: 530;
      }

      .g-dialog {
        width: 368px;
        height: 88px;
        background: white;
        position: absolute;
        margin-top: -1px;
        z-index: 12;
        padding: 0 4px;
        display: none;

        .g-row {
          height: 40px;
          display: flex;
          @include fh;
          padding: 0 16px;

          div {
            flex: 1;
            height: 100%;
            @include fh;
            display: flex;
            line-height: initial;
            width: 130px;

            span {
              color: #00000059;
              width: 70px;
              text-decoration: none;
            }

            i {
              margin-right: 5px;
              display: inline-block;
              flex: 1;
              font-style: normal;
              @include el;
            }

          }

          .w200 {
            width: 194px;
            @include el;
          }

          .w-time {

            :last-child {
              @include el;
              display: inline-block;
              width: 98px;
              color: #000000d9;
            }

          }
        }
      }
    }

    .p-msg:hover {

      .g-dialog {
        display: block;
      }

    }

    .p-center {
      position: absolute;
      height: 64px;
      line-height: 63px;
      right: 50%;
      text-align: right;
      cursor: pointer;

      .r-index {
        color: #0070f5;
      }

      .iconmenu-list {
        font-size: 12px;
      }

      .r-dialog {
        width: 312px;
        min-height: 200px;
        background: white;
        border-radius: 0 0 4px 4px;
        padding: 8px 0;
        box-sizing: border-box;
        position: relative;
        left: 50px;
        display: none;
        z-index: 22;

        .g-title {
          margin-bottom: 8px;
        }

        .g-title,
        .g-list {
          height: 40px;
          @include fh;
          padding: 0 16px;
        }

        .g-list {

          .t-1 {
            width: 80px;
            line-height: 40px;
            text-align: left;
            @include el;
          }

          .t-2 {
            width: 100px;
            line-height: 40px;
            color: #000000a6;
            text-align: center;
            @include el;

            .icondian {
              color: #ffa940;
            }

            .font3 {
              color: rgba(166, 166, 166, 1);
            }

            .font2 {
              color: rgba(0, 112, 245, 1);
              margin-left: -15px;
            }

          }

          .t-3 {
            flex: 1;
            text-align: left;
            line-height: 40px;
            color: #00000059;
            @include el;
          }

        }

        .g-active {
          background: #f5f7fa;
          color: #0070f5;
        }

      }
    }

    .p-center:hover {

      .r-dialog {
        display: block;
      }

    }

    .p-right {
      position: absolute;
      right: 16px;

      .t-save {
        border: 1px solid #bfdbfc;
        color: #0070f5;
      }

      .t-submit {
        background: #0070f5;
        border: 0;
        color: #ffffffd9;
      }

    }

    .p-right200 {
      position: absolute;
      right: 180px;

      .t16 {
        margin-right: 16px;
      }

    }
  }

  .l-bottom {
    height: 100%;
    width: 100%;
    display: flex;

    .m-right {
      width: 360px;
      height: 100%;
      border: 1px solid #e6e6e6;
      padding: 8px;
      font-size: 14px;
      padding-top: 0;
      box-sizing: border-box;

      .t-row1 {
        height: 48px;
        position: relative;
        @include fh;
        padding: 0 8px;
        border-bottom: 1px solid #e6e6e6;

        .w-title1 {
          font-weight: 550;
          color: #0070f5;
          margin-right: 16px;
        }

        .w-title2 {
          font-weight: 500;
          color: #d94f00;
          display: inline-block;
          height: 24px;
          background: #fff2e8;
          border-radius: 4px;
          line-height: 24px;
          padding: 0 5px;
        }

        .e-true {
          color: #000000a6;
          background: #e6e6e6;
        }

        i {
          position: absolute;
          right: 10px;
          cursor: pointer;
        }

      }

      .t-row5 {
        overflow: auto;
        height: calc(100% - 50px);

        .e-none {
          height: 100%;
          width: 100%;
          @include fcc;
          color: #000000d9;
        }

        .w-main {
          height: 40px;
          @include fh;
          padding: 0 8px;
          border-bottom: 1px solid #e6e6e6;
          position: relative;

          .n-left,
          .n-right {
            display: inline-block;
            flex: 0.5;
          }

          i {
            position: absolute;
            right: 10px;
            color: rgba(0, 0, 0, 0.35);
          }

          .n-left {
            width: 160px;

            .t-active {
              color: #e34242;
              height: 24px;
              background: #fff2e8;
              border-radius: 2px;
              padding: 0 5px;
              display: inline-block;
              line-height: 24px;
            }

            span {
              @include el;
              width: 100%;
              display: inline-block;
            }

          }
        }
      }

      .t-index {
        height: calc(100% - 256px);

        .t-row4 {
          height: 48px;
          position: relative;
          @include fh;
          padding: 0 8px;
          overflow: auto;

          .w-box,
          .el-input--mini {
            flex: 0.5;
          }

          .el-input--mini .el-input__inner {
            border: 0;
            border-radius: 0;
            background: #f5f7fa;
            box-shadow: 0 1px 0 0 #dedede;
          }

        }
      }

      .t-row3 {
        height: 48px;
        position: relative;
        @include fh;
        padding: 0 8px;
        border-bottom: 1px solid #e6e6e6;

        .mright16 {
          margin-right: 16px;
        }

        .w-title2 {
          font-weight: 500;
          color: #00000073;
          height: 49px;
          line-height: 55px;
          cursor: pointer;
        }

        .e-active {
          border-bottom: 1px solid #0070f5;
          margin-bottom: -1px;
          color: #0070f5;
          font-weight: 550;
        }

        .w-main {
          height: 49px;
          position: absolute;
          right: 10px;
          display: flex;
          align-items: center;
        }

        .w-back {
          background: #e6e6e6;
          width: 88px;
          height: 24px;
          @include fcc;
          color: #000000a6;
          position: relative;
          cursor: pointer;

          i {
            font-size: 14px;
            margin-right: 3px;
          }

          .k-return {
            width: 208px;
            background: white;
            z-index: 2;
            position: absolute;
            top: 30px;
            right: -1px;
          }

        }

        .w-main:hover {

          .k-return {
            display: block;
          }

        }
      }

      .t-row2 {

        .w-culome {
          height: 40px;
          @include fh;
          display: flex;
          padding: 0 8px;

          > div {
            flex: 1;
            display: flex;

            span {
              color: #00000059;
              width: 71px;
              display: inline-block;
            }

            .e-more {
              flex: 1;
            }

            .e-auto {
              @include el;
              color: #2c3e50;
            }

          }

          .e-other {
            @include el;
            width: 260px;
          }

        }
      }
    }

    .m-left {
      flex: 1;
      height: 100%;
      width: 100%;
      position: relative;

      .n-echarts {
        height: 156px;
        background: rgba(51, 51, 51, 1);
        width: 100%;

        #echarts {
          height: 100%;
          width: 100%;
        }

      }

      .t-main {
        padding: 0 16px;
        box-sizing: border-box;
        position: relative;

        .n-list {
          width: 322px;
          height: calc(100% - 2px);
          position: absolute;
          right: 0px;
          border: 1px solid #20a5d6;
          background: #000;
          z-index: 222;
        }

        .t-image {
          overflow: auto;
          height: 100%;

          .e-none {
            height: 100%;
            width: 100%;
            @include fcc;
            color: #888;
          }

          .e-card {
            width: 314px;
            height: 73px;
            border-bottom: 1px solid #333;
            padding: 0 8px;
            box-sizing: border-box;
            color: #9ccef9;

            .e-title {
              height: 40px;
              @include fh;
              display: flex;
              position: relative;

              .e-e {
                flex: 1;
                display: inline-block;
                @include el;
                font-weight: 550;

                .el-input--mini .el-input__inner {
                  border: 0;
                  width: 100%;
                  background: #000;
                  padding: 0 3px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #9ccef9;
                  border-radius: 0;
                }

              }

              .e-icon {
                width: 30px;
                position: relative;
                height: 100%;
                line-height: 25px;
                margin-top: 46px;
                right: -16px;
                display: block;
                font-size: 18px;
                color: #9ccef9;
                cursor: pointer;
              }

              .e-icon:hover {

                .n-dialog {
                  display: block;
                }

              }
            }

            .e-result {
              width: 272px;
              color: #9ccef9;
              height: 28px;
              font-size: 14px;
              height: 28px;
              padding-left: 3px;
              line-height: 28px;
            }

          }

          .e-card:hover {
            cursor: pointer;

            .e-icon {
              display: block;
            }

          }
        }

        .n-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;

          .n-value {
            position: absolute;
            right: 50%;
            margin-right: -128px;
            color: rgba(255, 255, 255, 0.65);
            font-size: 16px;
            top: 16px;

            .e-val {
              color: rgba(245, 247, 250, 1);
            }

          }
        }

        .n-image {
          display: flex;
          height: calc(100% - 199px);
          box-sizing: border-box;
          width: 100%;

          div {
            flex: 1;
            margin-right: 16px;
            border: 1px solid #2e2e2e;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .n-active {
            border: 1px solid #a10000;
          }

          .e-z {
            margin-right: 0;
          }

        }

        .n-xyz {
          height: 42px;
          @include fh;
          color: #9ccef9;

          span {
            display: inline-block;
            width: 70px;
          }

          :last-child {
            width: 125px;
          }

          .w90 {
            width: 90px;
          }

        }
      }

      .t-tools-dis {
        position: absolute;
        height: 56px;
        z-index: 22;
        width: 100%;
        cursor: not-allowed;
        background: #988e8e;
        opacity: 0.3;
      }

      .t-tools {
        height: 56px;
        width: 100%;
        background: url("../assets/images/pageBg.png");
        @include fh;
        padding-left: 252px;
        box-sizing: border-box;
        position: relative;
        color: #9ccef9;

        .s-box {
          position: absolute;
          right: 16px;
          cursor: pointer;

          i {
            font-size: 18px;
          }

        }

        .s-percent {
          position: absolute;
          right: 66px;
          font-size: 18px;
          color: #a91414;
        }

        .s-title {
          position: absolute;
          left: 16px;
          font-size: 21px;
          @include fh;

          i {
            font-size: 40px;
            margin-right: 6px;
          }

          .e-upload {
            @include fh;
          }

        }

        .s-volume {
          margin-right: 10px;

          .el-input-number--small {
            width: 80px;
          }

          .el-input__inner {
            padding-left: 8px;
            padding-right: 42px;
            background: #000;
            color: #9ccef9;
            border: 1px solid #9ccef9;
          }

          .e-span {
            margin-right: 5px;
          }

          .el-input-number__decrease,
          .el-input-number__increase {
            background: #000;
            color: #9ccef9;
            border-left: 1px solid #9ccef9;
          }

          .el-input-number__increase {
            border-bottom: 1px solid #9ccef9;
          }

        }

        .s-other {
          width: 48px;
          text-align: center;
          cursor: pointer;
          position: relative;
          height: 56px;
          line-height: 56px;

          i {
            font-size: 21px;
          }

          .r-tools {
            position: absolute;
            width: 90px;
            background: #222;
            top: 55px;
            right: -21px;
            padding: 4px 0;
            box-sizing: border-box;
            display: none;
            z-index: 22;

            div {
              height: 32px;
              @include fcc;
              color: #9ccef9;

              span {
                font-size: 14px;
                height: 32px;
                line-height: 32px;
              }

              i {
                height: 32px;
                line-height: 32px;
                font-size: 12px;
                margin-right: 5px;
              }

            }

            div:hover {
              color: #0070f5;

              i {
                color: #0070f5;
              }

            }

            .s-select {
              background: #444;
              color: #0070f5;

              i {
                color: #0070f5;
              }

            }
          }
        }

        .t-dialog3 {

          .r-tools {
            width: 71px;
            right: -11px;
          }

        }

        .s-other:hover {

          .t-active {
            color: #ce2200;
            font-size: 22px;
          }

        }

        .s-select {

          .t-active {
            color: #0070f5;
            font-size: 22px;
          }
        }

        .t-dialog1:hover {

          .r-tools {
            display: block;
          }

        }

        .t-dialog2:hover {

          .r-tools {
            display: block;
          }

        }

        .t-dialog2 {

          i {
            width: 16px;
            height: 12px;
            display: inline-block;
          }

          .s-color {
            padding: 0 8px;
            justify-content: left !important;

            i {
              height: 12px !important;
            }

            span {
              @include el;
              width: 53px;
              justify-content: left;
              text-align: left;
            }

          }

          .color-barautumn {
            background: linear-gradient(
                    90deg,
                    rgba(254, 0, 0, 1) 0%,
                    rgba(255, 171, 60, 1) 100%
            );
          }

          .color-barblues {
            background: linear-gradient(
                    90deg,
                    rgba(95, 180, 231, 1) 0%,
                    rgba(203, 234, 255, 1) 100%
            );
          }

          .color-barbone {
            background: linear-gradient(
                    90deg,
                    rgba(52, 52, 112, 1) 0%,
                    rgba(93, 103, 135, 1) 100%
            );
          }

          .color-barcool {
            background: linear-gradient(
                    90deg,
                    rgba(148, 106, 254, 1) 0%,
                    rgba(8, 250, 254, 1) 100%
            );
          }

          .color-barcoolwarm {
            background: linear-gradient(
                    90deg,
                    rgba(56, 76, 200, 1) 0%,
                    rgba(255, 210, 188, 1) 62%,
                    rgba(196, 216, 255, 1) 100%
            );
          }

          .color-barcopper {
            background: linear-gradient(
                    90deg,
                    rgba(100, 57, 30, 1) 0%,
                    rgba(171, 108, 69, 1) 100%
            );
          }

          .color-bargray {
            background: linear-gradient(
                    90deg,
                    rgba(45, 45, 45, 1) 0%,
                    rgba(127, 127, 127, 1) 100%
            );
          }

          .color-barhot {
            background: linear-gradient(
                    90deg,
                    rgba(236, 2, 0, 1) 0%,
                    rgba(72, 0, 0, 1) 100%
            );
          }

          .color-barhotIron {
            background: linear-gradient(
                    90deg,
                    rgba(163, 0, 1, 1) 0%,
                    rgba(118, 0, 0, 1) 100%
            );
          }

          .color-barhotMetalBlue {
            background: linear-gradient(
                    90deg,
                    rgba(0, 16, 136, 1) 0%,
                    rgba(207, 61, 0, 1) 100%
            );
          }

          .color-barhsv {
            background: linear-gradient(
                    90deg,
                    rgba(253, 16, 1, 1) 0%,
                    rgba(86, 232, 46, 1) 53%,
                    rgba(255, 215, 22, 1) 100%
            );
          }

          .color-barjet {
            background: linear-gradient(
                    90deg,
                    rgba(4, 0, 174, 1) 0%,
                    rgba(63, 246, 160, 1) 56%,
                    rgba(247, 246, 0, 1) 100%
            );
          }

          .color-barpet {
            background: linear-gradient(
                    90deg,
                    rgba(0, 108, 105, 1) 0%,
                    rgba(28, 79, 169, 1) 56%,
                    rgba(191, 44, 202, 1) 100%
            );
          }

          .color-barpet20Step {
            background: linear-gradient(
                    90deg,
                    rgba(99, 0, 83, 1) 0%,
                    rgba(78, 79, 176, 1) 56%,
                    rgba(78, 187, 79, 1) 100%
            );
          }

          .color-barspectral {
            background: linear-gradient(
                    90deg,
                    rgba(107, 0, 129, 1) 0%,
                    rgba(6, 12, 214, 1) 49%,
                    rgba(0, 205, 10, 1) 100%
            );
          }

          .color-barspring {
            background: linear-gradient(
                    90deg,
                    rgba(254, 9, 248, 1) 0%,
                    rgba(253, 164, 91, 1) 100%
            );
          }

          .color-barsummer {
            background: linear-gradient(
                    90deg,
                    rgba(0, 128, 102, 1) 0%,
                    rgba(151, 203, 102, 1) 100%
            );
          }

          .color-barwinter {
            background: linear-gradient(
                    90deg,
                    rgba(12, 2, 254, 1) 0%,
                    rgba(2, 167, 172, 1) 100%
            );
          }

        }

        .t-dialog3:hover {

          .r-tools {
            display: block;
          }

        }
      }

      .t-main {
        height: calc(100% - 56px);
        width: 100%;
        background: url("../assets/images/pageBg.png");
      }

    }
  }
}
</style>