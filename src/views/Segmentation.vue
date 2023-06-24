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
      <!-- 侧边栏 -->
      <el-container>
        <Menu></Menu>
<!--        <el-aside class="side-menu" :width="isCollapse ? '65px' : '350px'">-->
<!--          <i v-show="!isCollapse" class="el-icon-s-fold" style="font-size: 30px;margin-left: 320px;cursor: pointer"-->
<!--             @click="isCollapse=true"></i>-->
<!--          <i v-show="isCollapse" class="el-icon-s-unfold" style="font-size: 30px;margin-left: 20px;cursor: pointer"-->
<!--             @click="isCollapse=false"></i>-->
<!--          <el-menu-->
<!--              default-active="1"-->
<!--              class="el-menu-vertical-demo"-->
<!--              background-color="transparent"-->
<!--              text-color="#fff"-->
<!--              active-text-color="#0072FF"-->
<!--              style="border: none"-->
<!--              :collapse="isCollapse"-->
<!--              :collapse-transition="false"-->
<!--          >-->
<!--            <el-menu-item index="1">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="2">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="3">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="4">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="5">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="6">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="7">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="8">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="9">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="10">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <span style="margin-left: 20px">病人编号123456</span>-->
<!--            </el-menu-item>-->
<!--          </el-menu>-->
<!--        </el-aside>-->
        <el-main>
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
                      :before-upload="addData"
                      :data="additionalData"
                  >
                    <i class="t-active iconfont el-icon-folder-opened" title="上传原文件"
                       style="font-size:28px;margin-top: 5px;margin-right: 10px"></i>
                  </el-upload>

                  <!--上传标签文件-->
                  <el-upload
                      action="/api/uploadlabel"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="addData"
                      :data="additionalData"
                  >
                    <i class="t-active iconfont el-icon-upload2" title="上传分割文件"
                       style="font-size:28px;margin-top: 5px;margin-right: 10px;margin-left: 10px"></i>
                  </el-upload>

                  <!-- 移动 -->
                  <div
                      :class="['s-other t-dialog3', viewStatus ? '' : '']"
                      title="移动"
                  >
                    <i class="t-active iconfont iconimage-move"></i>
                    <div class="r-tools">
                      <div
                          v-for="(meas, index) in moveList"
                          :key="meas.iconfont"
                          :class="['s-color', meas.status ? '' : '']"
                          @click="clickMoves(meas, index)"
                          :title="meas.title"
                      >
                        <span>{{ meas.title }}</span>
                      </div>
                    </div>
                  </div>

                  <!--移动-->
                  <!--                  <div-->
                  <!--                      v-for="(item, index) in moveList"-->
                  <!--                      :key="item.iconfont"-->
                  <!--                      :class="['s-other', item.status ? 's-select' : '']"-->
                  <!--                      :title="item.title"-->
                  <!--                      @click="clickMoves(item, index)"-->
                  <!--                  >-->
                  <!--                    <i :class="'t-active iconfont ' + item.iconfont" style="font-size:28px;margin-top: 15px"></i>-->
                  <!--                  </div>-->

                  <div
                      v-for="(item, index) in toolList"
                      :key="item.iconfont"
                      :class="['s-other', item.status ? 's-select' : '']"
                      :title="item.title"
                      @click="clickTools(item, index)"
                  >
                    <i :class="'t-active iconfont ' + item.iconfont"></i>
                  </div>

                  <el-popover
                      placement="bottom"
                      width="200"
                      trigger="click"
                      :popper-options="{ boundariesElement: 'window', removeOnDestroy: true }">
                    <el-slider v-model="crosshairSlider" :format-tooltip="formatTooltip"></el-slider>
                    <div
                        slot="reference"
                        v-for="(item, index) in crosshairList"
                        :key="item.iconfont"
                        :class="['s-other', item.status ? 's-select' : '']"
                        :title="item.title"
                        @click="clickCrossHair(item, index)"
                    >
                      <i :class="'t-active iconfont ' + item.iconfont"></i>
                    </div>
                  </el-popover>

                  <div
                      v-for="(item, index) in planeList"
                      :key="item.iconfont"
                      :class="['s-other', item.status ? 's-select' : '']"
                      :title="item.title"
                      @click="clickPlane(item, index)"
                  >
                    <i :class="'t-active iconfont ' + item.iconfont" style="font-size:28px;margin-top: 20px"></i>
                  </div>

                  <div
                      v-for="(item, index) in cameraList"
                      :key="item.iconfont"
                      :class="['s-other', item.status ? 's-select' : '']"
                      :title="item.title"
                      @click="clickCamera(item, index)"
                  >
                    <i :class="'t-active iconfont ' + item.iconfont" style="font-size:22px;margin-top: 19px"></i>
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
                  <div
                      v-for="(item, index) in originalList"
                      :key="item.iconfont"
                      :class="['s-other', item.status ? 's-select' : '']"
                      :title="item.title"
                      @click="clickOriginal(item, index)"
                  >
                    <i v-show="isVolumeVisible" :class="'t-active iconfont ' + 'icon-yanjing_xianshi_o'"
                       style="font-size:28px;margin-top: 20px"></i>
                    <i v-show="!isVolumeVisible" :class="'t-active iconfont ' + 'icon-yanjing_yincang_o'"
                       style="font-size:28px;margin-top: 20px"></i>
                  </div>
                  <!-- colorMap -->
                  <div
                      :class="['s-other t-dialog2', colorStatus ? 's-select' : '']"
                      :title="'colorMap'"
                  >
                    <i class="t-active iconfont iconiamge-colormap"></i>
                    <div class="r-tools" style="max-height: 300px; overflow-y: auto;">
                      <div
                          v-for="(color, index) in colorlist"
                          :key="color.id"
                          :class="['s-color', color.status ? 's-select' : '']"
                          @click="clickColors(color.id, index)"
                          :title="color.id"
                      >
                        <span> {{ color.name }}</span>
                      </div>
                    </div>
                  </div>
                  <!--                  标签透明度更改-->
                  <el-popover
                      placement="bottom"
                      width="200"
                      trigger="click"
                      :popper-options="{ boundariesElement: 'window', removeOnDestroy: true }">
                    <el-slider v-model="opacitySlider" :format-tooltip="formatTooltipOpacity"></el-slider>
                    <div
                        slot="reference"
                        v-for="(item, index) in opacityList"
                        :key="item.iconfont"
                        :class="['s-other', item.status ? 's-select' : '']"
                        :title="item.title"
                        @click="clickOpacity(item, index)"
                    >
                      <i :class="'t-active iconfont ' + item.iconfont"></i>
                    </div>
                  </el-popover>

                  <!-- 画笔操作 -->
                  <el-popover
                      placement="bottom"
                      width="250"
                      trigger="click"
                      :popper-options="{ boundariesElement: 'window', removeOnDestroy: true }">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <el-color-picker v-model="penColor" size="medium" color-format="rgb"></el-color-picker>
                      <el-select v-model="penValue" placeholder="请选择画笔类型" style="width: 80%;">
                        <el-option
                            v-for="item in penType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div
                        slot="reference"
                        v-for="(item, index) in penList"
                        :key="item.iconfont"
                        :class="['s-other', item.status ? 's-select' : '']"
                        :title="item.title"
                        @click="clickOpacity(item, index)"
                    >
                      <i :class="'t-active iconfont ' + item.iconfont" style="margin-top: 17px"></i>
                    </div>
                  </el-popover>

                  <el-popover
                      placement="bottom"
                      width="200"
                      trigger="click"
                      :popper-options="{ boundariesElement: 'window', removeOnDestroy: true }">
                    <el-select v-model="eraserValue" placeholder="请选择橡皮擦类型">
                      <el-option
                          v-for="item in eraserType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                    <div
                        slot="reference"
                        v-for="(item, index) in eraserList"
                        :key="item.iconfont"
                        :class="['s-other', item.status ? 's-select' : '']"
                        :title="item.title"
                        @click="clickOpacity(item, index)"
                    >
                      <i :class="'t-active iconfont ' + item.iconfont" style="margin-top: 17px"></i>
                    </div>
                  </el-popover>

                  <!-- 撤回操作 -->

                  <div
                      v-for="(item, index) in backList"
                      :key="item.iconfont"
                      :class="['s-other', item.status ? 's-select' : '']"
                      :title="item.title"
                      @click="clickBack(item, index)"
                  >
                    <i :class="'t-active iconfont ' + item.iconfont"></i>
                  </div>

                  <!-- 删除标签、下载标签操作 -->
                  <div
                      v-for="(item, index) in editList"
                      :key="item.iconfont"
                      :class="['s-other', item.status ? 's-select' : '']"
                      :title="item.title"
                      @click="clickEdits(item, index)"
                  >
                    <i :class="'t-active iconfont ' + item.iconfont" style="font-size:24px;margin-top: 17px"></i>
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
                      :class="['s-other t-dialog3', viewStatus ? '' : '']"
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
                          v-for="(item, index) in dataAnalysisList"
                          :key="item.id"
                          v-show="dataAnalysisList.length !== 0"
                      >
                        <div class="e-title">
                        <span class="e-e">
                          <el-input
                              size="mini"
                              v-model="item.name"
                              maxlength="20"
                              :placeholder="'' + item.name "
                              @blur="blurTitle(item, index)"
                          >
                          </el-input>
                        </span>
                          <span class="e-icon">
                          <i
                              class="el-icon-more"
                              @click.stop="showDetails(item, index)"
                              title="查看详细信息"
                          ></i>
                        </span>
                        </div>
                        <div class="e-result">
                          {{ item.value }}
                        </div>
                      </div>
                      <div v-show="dataAnalysisList.length === 0" class="e-none">
                        暂无数据
                      </div>
                    </div>
                  </div>
                  <div class="n-echarts" v-if="echartStatus">
                    <div id="echarts"></div>
                  </div>
                  <el-select v-model="modelValue" placeholder="请选择模型" style="width: 150px;">
                    <el-option
                        v-for="item in modelType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button type="primary" @click="doSegmentation" round style="margin-left:10px">点击进行分割</el-button>
                  <el-button type="primary" @click="getDrawBitMap" round style="margin-left:10px">getBitmap</el-button>
                  <el-button type="primary" @click="saveCurrentState" round style="position: absolute;right:100px">保存</el-button>
<!--                  <el-button type="primary" @click="clickVisible">测试数据可视化</el-button>-->
                  <el-dialog title="label Editor" :visible.sync="dialogTableVisible" center :append-to-body='true'
                             :lock-scroll="false" width="30%">
                    <Table @update-parent-var="onUpdateParentVar" :drawTableDataFromParent="drawTableData"></Table>
                  </el-dialog>
                  <br>
                  <div style="margin: 50px;">
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
              <!--  -->
              <el-dialog
                  :title="'器官测量'"
                  :visible="organMeasurementVisible"
                  width="500px"
                  :before-close="handleOrganClose"
                  class="dialog"
                  top="23vh"
                  :close-on-press-escape="false"
                  :close-on-click-modal="false"
                  v-dialogDrag
              >
                <!--                <div-->
                <!--                    :style="{ height: Math.round(spliceList.length / 7) * 150 + 'px' }"-->
                <!--                    class="g-dis s-scrollbar"-->
                <!--                ></div>-->

                <div v-for="(item,index) in organDataList" :key="index">
                  <span style="color: #9ccef9;font-size: 14px;font-weight: bold;">{{ item.name }}:{{item.data}}</span>
                </div>
              </el-dialog>

              <el-dialog
                  :title="'上传后处理脚本'"
                  :visible="uploadScriptVisible"
                  width="500px"
                  :before-close="handleUploadClose"
                  class="dialog"
                  top="23vh"
                  :close-on-press-escape="false"
                  :close-on-click-modal="false"
                  v-dialogDrag
              >
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    style="margin: 15px"
                    :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-dialog>

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
        </el-main>
      </el-container>
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
// import * as niivue from '../niivue/niivue.umd.js'
import Table from "../components/table/Table"
import {Dialog} from "element-ui";
import {Niivue} from '@niivue/niivue'
import axios from 'axios'
import Menu from "../components/history/menu";

const nv = new Niivue({
  logging: true,
  dragAndDropEnabled: true,
  backColor: [0, 0, 0, 1],
  show3Dcrosshair: true,
  // onLocationChange: this.locationChangeHandler,
})
export default {
  name: 'Segmentation',
  components: {Menu, Table, Team, Brand, Counter, Timeline, ServiceOne, AboutFour, SectionTitle, Separator, Layout},
  data() {
    return {
      components: {
        Table
      },
      penColor: 'rgb(102,205,170)',
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
      penType: [{
        value: '0',
        label: '取消画笔'
      }, {
        value: '1',
        label: '线型画笔'
      }, {
        value: '2',
        label: '填充型画笔'
      }],
      eraserType: [{
        value: '0',
        label: '取消橡皮擦'
      }, {
        value: '1',
        label: '线型橡皮擦'
      }, {
        value: '2',
        label: '填充型橡皮擦'
      },
        {
          value: '3',
          label: '整块擦除'
        }],
      modelType: [{
        value: '1',
        label: 'vnet'
      }, {
        value: '2',
        label: 'nnUnet'
      }],
      modelValue:'',
      penValue: '',
      eraserValue: '',
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
          title: '三视图',
          status: '',
          value: 'nifti-imagex,nifti-imagey,nifti-imagez',
          num: 5,
          titleEng: 'MultiPlanar'
        },
        {
          title: '所有视图',
          status: true,
          num: 6,
          titleEng: 'MultiPlanarRender'
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
      ],
      crosshairList: [
        {
          title: '十字线',
          iconfont: 'iconremark-crossline',
          status: '',
          value: 'crosshair',
        }
      ],
      opacityList: [
        {
          title: '标签透明度',
          iconfont: 'iconimage-level',
          status: '',
          value: 'opacity',
        }
      ],
      cameraList: [
        {
          title: '快照',
          iconfont: 'el-icon-camera',
          status: '',
          value: 'camera',
        },
      ],
      editList: [
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
          value: 'save',
        }
      ],
      planeList: [
        {
          title: '3D分割截面',
          iconfont: 'icon-jiemian',
          status: true,
          value: 'plane',
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
      originalList: [
        {
          title: '显示/隐藏volume',
          iconfont: 'icon-yanjing_xianshi_o',
          status: '',
          value: 'eye',
        }
      ],
      penList: [
        {
          title: '画笔',
          iconfont: 'el-icon-edit',
          status: '',
          value: 'pen',
        }
      ],
      eraserList: [
        {
          title: '橡皮擦',
          iconfont: 'iconremark-erase',
          status: '',
          value: 'eraser',
        }
      ],
      backList: [
        {
          title: '撤回',
          iconfont: 'iconimage-recover',
          status: '',
          value: 'back',
        },
      ],
      organDataList: [
        {
          name:'心脏',
          data:1111
        },
        {
          name:'肠道',
          data:222
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
      dataAnalysisList: [
        {
          name: '器官测量'
        },
        {
          name: '病灶计数'
        },
        {
          name: '上传后处理脚本'
        }
      ],
      imageMarkCopy: [],
      currentRawImageUrl: '',
      volumeList: [
        {
          url: "/file/image/202302/0b2be9e0-886b-4144-99f0-8bb4c6eaa848.nii.gz",
          colorMap: "gray",
          opacity: 1,
          visible: true
        },
      ],
      isCollapse: true,
      crosshairSlider: 10,
      opacitySlider: 100,
      isClipPlane: true,
      isVolumeVisible: true,
      drawcmap: {
        R: [0, 255, 255, 0, 255, 0, 255, 255, 0, 205, 210, 102, 0, 0, 46, 255, 106],
        G: [0, 0, 0, 0, 255, 255, 0, 239, 0, 133, 180, 205, 0, 139, 139, 228, 90],
        B: [0, 0, 225, 255, 0, 255, 255, 213, 205, 63, 140, 170, 128, 139, 87, 225, 205],
        A: [0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
      },
      currentDrawIndex: 11,
      drawTableData: '',
      additionalData: {},
      organMeasurementVisible: false,
      uploadScriptVisible:false
    }
  },
  watch: {
    crosshairSlider(newVal, oldVal) {
      nv.setCrosshairWidth(newVal / 10)
    },
    opacitySlider(newVal, oldVal) {
      nv.setDrawOpacity(newVal * 0.01)
    },
    eraserValue(newVal, oldVal) {
      if (newVal === '0') {
        nv.setDrawingEnabled(false)
        this.eraserList[0].status = false
      } else if (newVal === '1') {
        nv.setDrawingEnabled(true)
        nv.setPenValue(0)
        this.eraserList[0].status = true
      } else if (newVal === '2') {
        nv.setDrawingEnabled(true)
        nv.setPenValue(0, true)
        this.eraserList[0].status = true
      } else {
        nv.setDrawingEnabled(true)
        nv.setPenValue(-0, true)
        this.eraserList[0].status = true
      }
    },
    penValue(newVal, oldVal) {
      if (newVal === '0') {
        nv.setDrawingEnabled(false)
        this.penList[0].status = false
      } else if (newVal === '1') {
        nv.setDrawingEnabled(true)
        nv.setPenValue(this.currentDrawIndex)
        this.penList[0].status = true
      } else {
        nv.setDrawingEnabled(true)
        nv.setPenValue(this.currentDrawIndex, true)
        this.penList[0].status = true
        nv.setDrawColormap()
      }
    },
    penColor(newVal, oldVal) {
      let numbers = newVal.match(/\d+/g).map(Number);
      this.currentDrawIndex = this.currentDrawIndex + 1
      this.drawcmap.R[this.currentDrawIndex] = numbers[0]
      this.drawcmap.G[this.currentDrawIndex] = numbers[1]
      this.drawcmap.B[this.currentDrawIndex] = numbers[2]
      this.drawcmap.A[this.currentDrawIndex] = 255
      nv.setDrawColormap(this.drawcmap)
      if (this.penValue === '1') {
        nv.setPenValue(this.currentDrawIndex)
      }
      if (this.penValue === '2') {
        nv.setPenValue(this.currentDrawIndex, true)
      }
      this.updateDrawTableData();
    }
  },
  methods: {
    getDrawBitMap(){
      console.log(nv.drawBitmap)
    },
    saveCurrentState(){
      this.saveImageToServer('/api/uploadlabel','new.nii.gz',true,{'historyid':'2'})
      this.saveSceneToServer('/api/uploadavatar','screenshot.png',{'historyid':'2'})
    },
    handleOrganClose() {
      this.organMeasurementVisible = false
    },
    handleUploadClose(){
      this.uploadScriptVisible = false
    },
    showDetails(item, index) {
      if (item.name === '器官测量') {
        this.organMeasurementVisible = true
      }
      if(item.name === '上传后处理脚本'){
        this.uploadScriptVisible = true
      }
    },
    clickVisible() {
      this.visable = true
    },
    addData() {
      this.additionalData.historyid = '2'
      return true
    },
    updateDrawTableData() {
      console.log("监听到了")
      let newColors = [];
      for (let i = 1; i <= this.currentDrawIndex; i++) {
        let r = this.drawcmap.R[i];
        let g = this.drawcmap.G[i];
        let b = this.drawcmap.B[i];
        let colorString = `rgb(${r}, ${g}, ${b})`;
        newColors.push(colorString);
      }

      // 创建新的 tableData
      this.drawTableData = [];
      for (let i = 0; i < newColors.length; i++) {
        this.drawTableData.push({color: newColors[i], label: `label ${i + 1}`});
      }
    },
    clickBack(item, index) {
      nv.drawUndo()
    },
    clickOriginal(item, index) {
      if (this.isVolumeVisible) {
        nv.volumes[0].opacity = 0
      } else {
        nv.volumes[0].opacity = 1
      }
      this.isVolumeVisible = !this.isVolumeVisible
      nv.updateGLVolume()
    },
    clickPlane(item, index) {
      if (this.isClipPlane) {
        nv.setClipPlane(false);
      } else {
        nv.setClipPlane([0.3, 270, 0])
      }
      this.isClipPlane = !this.isClipPlane
      this.planeList[index].status = !item.status
    },
    clickColors(id, index) {
      nv.volumes[0].colorMap = id;
      this.colorlist.forEach((item) => {
        item.status = false;
      });
      this.colorlist[index].status = true;
      nv.updateGLVolume();
    },
    formatTooltip(val) {
      return val / 10;
    },
    formatTooltipOpacity(val) {
      return val / 100;
    },
    clickPalette(index, value) {
      this.dialogTableVisible = true
    },
    recordTab() {
      this.tabStatus = !this.tabStatus;
      this.closeTools();
    },
    closeTools() {
      this.measureList.forEach((item) => {
        item.status = false;
      });
      this.measureStatus = false;
      // cornerstoneToolsCore.setToolEnabled(this.selectTool);
      this.toolList.forEach((element) => {
        element.status = false;
      });
      this.selectTool = null;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
      this.visable = false
    },
    clickEdits(item, index) {
      if (item.value === 'pen') {
        nv.setDrawingEnabled(true)
        nv.setPenValue(15)
      }
      if (item.value === 'save') {
        nv.saveImage("draw.nii.gz", true)
        // nv.saveImageToServer('/api/uploadlabel','test.nii.gz',true,{'historyid':'2'})
      }
      if (item.value === 'back') {
        nv.drawUndo()
      }
    },
    clickCamera(item, index) {
      // nv.saveScene("ScreenShot.png")
      nv.saveSceneToServer('/api/uploadavatar', 'test.png', {'historyid': '2'})
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
      if (item.value === 'radiological') {
        nv.opts.isRadiologicalConvention = !nv.opts.isRadiologicalConvention;
        nv.drawScene();
      }
      if (item.value === 'crosshair') {
        nv.setCrosshairWidth(1)
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
      if(this.modelValue === '1' || this.modelValue === '2') {
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
      }else {
        this.$message.error('请选择分割要使用的模型！')
      }
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
      if (meas.titleEng === 'MultiPlanarRender') {
        nv.opts.multiplanarForceRender = true
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
    onUpdateParentVar(newVal) {
      console.log(newVal)
      let cmap = {
        R: [0],
        G: [0],
        B: [0],
        A: [0]
      }
      for (let i = 0; i < newVal.length; i++) {
        let numbers = newVal[i].color.match(/\d+/g).map(Number);
        cmap.R[i + 1] = numbers[0]
        cmap.G[i + 1] = numbers[1]
        cmap.B[i + 1] = numbers[2]
        cmap.A[i + 1] = 255
      }
      this.drawcmap = cmap
      nv.setDrawColormap(this.drawcmap)
    },
    labelEditor() {
      this.dialogTableVisible = true;
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
    // this.drawcmap.R[this.currentDrawIndex] = 255
    // this.drawcmap.G[this.currentDrawIndex] = 0
    // this.drawcmap.B[this.currentDrawIndex] = 0
    // nv.setDrawColormap(this.drawcmap)
    let newColors = [];
    for (let i = 1; i <= this.currentDrawIndex; i++) {
      let r = this.drawcmap.R[i];
      let g = this.drawcmap.G[i];
      let b = this.drawcmap.B[i];
      let colorString = `rgb(${r}, ${g}, ${b})`;
      newColors.push(colorString);
    }

    // 创建新的 tableData
    this.drawTableData = [];
    for (let i = 0; i < newColors.length; i++) {
      this.drawTableData.push({color: newColors[i], label: `label ${i + 1}`});
    }

    let cmaps = nv.colorMaps()
    for (var i = 0; i < cmaps.length; i++) {
      if (cmaps[i] !== 'gray') {
        this.colorlist.push({'id': cmaps[i], 'name': cmaps[i], 'status': ''})
      }
    }
    this.colorlist.unshift({'id': 'gray', 'name': 'gray', 'status': true})
    nv.setInterpolation(false)
    nv.setRadiologicalConvention(false)
    nv.opts.multiplanarForceRender = true
    nv.attachTo('gl')
    nv.loadVolumes(this.volumeList).then(() => {
      nv.loadDrawingFromUrl("/file/image/202302/0b2be9e0-886b-4144-99f0-8bb4c6eaa848-label.nii.gz");
    })
        .catch(err => {
          console.error(err);
        });
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


.el-button--primary {
  color: #f7f4f4!important;
  background-color: #067df5!important;
  border-color: #1E90FF!important;
}
.el-main {
  padding: 0px !important;
}

.side-menu {
  left: 0;
  top: 85px;
  width: 200px;
  overflow: auto;
  z-index: 2000;
  border: none;
}

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