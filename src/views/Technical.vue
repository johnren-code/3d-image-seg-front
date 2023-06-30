<template>
    <Layout :tab-name="tabName">
        <div class="rwt-tab-area rn-section-gap">
            <div class="container">
                <div class="row mb--40">
                    <div class="col-lg-12">
                        <SectionTitle text-align="center" subtitle="main point" title="技术要点与介绍" data-aos="fade-up"
                            data-aos-delay="60" />
                    </div>
                </div>
                <Tab :tab-data="tabData" />
            </div>
        </div>

        <Separator />

        <div class="rn-accordion-area rn-section-gap">

            <div class="container">
                <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                        <SectionTitle class="mb--30" text-align="center" subtitle="Q&A" title="问答" data-aos="fade-up"
                            data-aos-delay="60" />
                    </div>
                </div>
                <div class="row mt--35 row--20">
                    <div class="col-lg-10 offset-lg-1">
                        <Accordion id="accordionExampleOne" :accordion-content="[
                            {
                                id: 'One',
                                title: '基于阈值的提取方法适用于怎样的场景？',
                                description: '直方图呈现双峰一谷的情况；即只含有目标与 背景两类灰度等级，且灰度值差距比较大的情况。'
                            },
                            {
                                id: 'Two',
                                title: '基于颜色的提取方法适用于怎样的场景？',
                                description: '有明显颜色差异，或背景与目标颜色相差较大时，可通过强化某通道颜色来提取目标。'
                            },
                            {
                                id: 'Three',
                                title: '基于差分的目标提取方法适用于怎样的场景？',
                                description: '运动目标的提取；背景差分局限于摄像机固定不变且背景无光照变化。'
                            },
                        ]" data-aos="fade-up" data-aos-delay="60" />
                    </div>
                </div>
            </div>
        </div>

    </Layout>
</template>

<script>
import Layout from '../components/common/Layout.vue'
import SectionTitle from '../components/elements/sectionTitle/SectionTitle.vue'
import Separator from '../components/elements/separator/Separator.vue'
import Tab from '../components/elements/tab/Tab.vue'
import Accordion from '../components/elements/accordion/Accordion.vue'
// import UploadPic from "../components/function/UploadPic";
// import MyDrawer from "../components/modal/MyDrawer";
export default {
    name: 'Technical',
    components: { Layout, SectionTitle, Separator, Tab, Accordion },
    data() {
        return {
            tabName: 1,
            splitThreeData: {
                image: 'ObjectExtraction_example.png',
                // url:this.$global.apiUrl+'ai/objectExtraction',
                title: '目标提取',
                links: [{
                    funcName: '变化检测',
                    funcLink: 'changeDetection'
                }, {
                    funcName: '目标检测',
                    funcLink: 'objectDetection'
                }, {
                    funcName: '地物分类',
                    funcLink: 'terrainClassification'
                },],
                description: 'DeepLabV3p模型，在Massachusetts Roads道路提取数据集上F1：0.74',
            },
            tabData: {
                tabImage: 'ObjectExtraction.jpg',
                tabContent: [
                    {
                        id: 1,
                        menu: '基于阈值提取',
                        content:
                            `<p>
							对于一幅灰度图像，将灰度值从0到255等分为8个区间，然后遍历图像的每个像素，统计分别落入每个区间的像素的个数，最后将8个区间的像素个数除以像素总和进行归一化便得到直方图特征。
							<br/><br/>为了体现目标颜色的空间信息，可采用颜色空间二维直方图——将图像分割成若干个子区域，分别在各个子区域内统计颜色分布信息。将图像分割的块数越多越能体现目标颜色的空间信息，但是增大特征的存储空间，使跟踪性能下降。
							</p>`,
                    },
                    {
                        id: 2,
                        menu: '基于颜色提取',
                        content:
                            `<p>
							采用RGB空间、HSI空间分离通道、颜色差分均值阈值等方法，适用于有明显颜色差异，或背景与目标颜色相差较大时。
							<br/><br/>RGB（红绿蓝）是依据人眼识别的颜色定义出的空间，可表示大部分颜色。HSV颜色空间是一种面向视觉感知的颜色模型。H——色调，以角度表示；S——饱和度，V——亮度，二者取值都在0到1之间。HSV直接对应人眼色彩视觉特性的三要素，通道之间各自独立，可以被独立感知各颜色分量的变化，其中色调分量尤其影响人的视觉判断。
							</p>`,
                    },
                    {
                        id: 3,
                        menu: '图像阈值分割',
                        content: `<p>
							阈值分割法的特点是：<br/>（1）原理清晰、易懂<br/>（2）算法实现简单、清楚，运算量小<br/>（3）分割效果较好<br/>对于对比度分明、反差大的图像分割效果几乎与其它大运算量的方法相当阈值的选择要本着以下的原则： 背景区域尽可能的包含与背景相关联的灰度级， 而物体区域则应包含物体的所有灰度级。
							</p>`,
                    }
                ]
            },
        }
    }
}
</script>

<style></style>