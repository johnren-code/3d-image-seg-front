<template>
    <Layout>
        <div class="rwt-tab-area rn-section-gap">
            <div class="container">
                <div class="row mb--40">
                    <div class="col-lg-12">
                        <SectionTitle text-align="center" subtitle="main point" title="nnUnet模型" data-aos="fade-up"
                            data-aos-delay="60" />
                    </div>
                </div>
                <Tab :tab-data="tabData" />
            </div>
        </div>

        <Separator />
        <div class="rwt-tab-area rn-section-gap">
            <div class="container">
                <div class="row mb--40">
                    <div class="col-lg-12">
                        <SectionTitle text-align="center" subtitle="main point" title="vnet模型" data-aos="fade-up"
                            data-aos-delay="60" />
                    </div>
                </div>
                <Tab1 :tab-data1="tabDataVnet" />
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
                                title: '如何选择使用nnUnet或者vnet？',
                                description: 'vnet适用于对识别速度要求高但对精度要求不高的场景，nnUnet适用于对精度要求高但对速度要求不高的场景，具体使用哪个模型需要根据应用场景来选择'
                            },
                            {
                                id: 'Two',
                                title: '为什么nnUnet比传统Unet性能更好？',
                                description: 'nnUnet通过引入多尺度训练和预测、数据增强和预处理、强大的网络架构以及预训练和迁移学习等技术，能够在医学图像分割任务中获得更好的性能。这些改进使得nnUnet能够更好地处理不同尺度、形状和变化的医学图像，并提供更准确的分割结果。'
                            },
                            {
                                id: 'Three',
                                title: '为什么nnUnet要使用后处理脚本?',
                                description: 'nnUnet使用后处理脚本的目的是进一步改善分割结果的质量和准确性。尽管nnUnet具备强大的网络架构和训练策略，但在某些情况下，生成的分割结果可能还需要进行一些额外的处理才能达到最佳效果，比如：去除小的噪声、填补空洞、平滑边界和针对特定任务进行优化'
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
import Tab1 from '../components/elements/tab/Tab1.vue'
import Accordion from '../components/elements/accordion/Accordion.vue'
export default {
    name: 'Technical',
    components: { Layout, SectionTitle, Separator, Tab, Accordion, Tab1 },
    data() {
        return {
            tabData: {
                tabImage: 'nnUNet-workflow.jpg',
                tabContent: [
                    {
                        id: 1,
                        menu: '网络结构模块',
                        content:
                            `<p>
                                nnUNet提供了一系列经过验证的网络架构模块，用于医学图像分割任务。这些网络架构基于深度卷积神经网络（CNN）的设计，并针对医学图像特点进行了优化。每个网络架构都具有不同的结构和层数，以适应不同的分割任务。用户可以根据自己的需求选择适当的网络架构。
							<br/><br/>基础版UNet：2D UNet，3D UNet，UNet级联（第一级对下采样低分辨率图像进行粗分割，第二级结合第一级的结果进行微调，两级都用UNet）
                            <br/><br/>
							</p>`,
                    },
                    {
                        id: 2,
                        menu: '数据预处理模块',
                        content:
                            `<p>
                                整体数据裁剪(Crop)：只在非零区域内进行裁剪，减少计算消耗
							<br/><br/>重采样(Resample)：中值尺寸大于显存限制下可处理尺寸的4倍时（batch-size=2），采用级联策略，对数据进行下采样（采样2的倍数，直到满足前面的要求）；如果数据分辨率三个轴方向不相等，先降采样高分辨率轴使得三轴相等，再三轴同时降采样直到满足上述要求。
                            <br/><br/>正则化(Normalization)：对MR图像使用数据单独执行z-score归一化
							</p>`,
                    },
                    {
                        id: 3,
                        menu: '预测模块',
                        content: `<p>
							滑动窗口：窗口的大小等于训练时的patch_size，相邻的patch尺寸的预测（即滑动一次的两个块）具有一半的重叠比例。分割的准确率随着窗口边界的增大而降低。
                            <br/><br/>Test Time Augmentation：通过对测试样本应用各种数据增强技术来生成多个扩充的样本，然后对这些扩充的样本进行推理，最终的预测结果可以是单个样本的预测结果的平均或投票。
                            <br/><br/>5-Fold Ensemble：使用了5个训练的模型集成进行推理预测
							</p>`,
                    },
                    {
                        id: 4,
                        menu: '性能',
                        content: `<p>
							使用nnUNet的合理配置和调优，可以获得与当前领先方法相媲美甚至超越的性能。例如，在常见的医学图像分割任务中，如脑部肿瘤分割、心脏分割、肺部分割等，NNUNet在Dice系数（一种常用的评价指标）上可以达到高水平的分割准确性。
                            <br/><br/>为产生高精度的结果，模型进行了完备的后处理，使得模型在v100显卡上推理一张图片的时间大约为3分钟
                            <br/><br/>
							</p>`,
                    }
                ]
            },
            tabDataVnet: {
                tabImage1: 'vnet.png',
                tabContent1: [
                    {
                        id: 1,
                        menu: '网络模型模块',
                        content:
                            `<p>
                                vnet的网络结构是一种基于编码器-解码器结构的三维卷积神经网络，它由编码器部分和解码器部分组成，并包含跳跃连接来提高特征传递和分割准确性。
							<br/><br/>跳跃连接是vnet的关键特性，用于在解码器中融合编码器中不同层级的特征信息，可以通过将编码器的特征图与解码器的相应层级的特征图进行拼接来实现。使得网络能够同时利用局部和全局信息，从而更好地捕捉目标的细节和上下文信息。
							</p>`,
                    },
                    {
                        id: 2,
                        menu: '数据处理模块',
                        content:
                            `<p>
                                数据归一化：为了将数据缩放到相同的尺度并提高训练的稳定性，可以对体积数据进行归一化。一种常见的方法是将数据线性缩放到0-1范围之间，即将体素值除以其最大值。
							<br/><br/>数据裁剪和填充：由于不同的体积数据可能具有不同的尺寸，为了使输入数据具有一致的大小，可以进行数据裁剪或填充操作。裁剪操作可以截取体积的中心区域或感兴趣区域，使其具有相同的尺寸。填充操作可以在较小的体积周围添加零值或平均值，使其达到所需的尺寸。
						
                            </p>`,
                    },
                    {
                        id: 3,
                        menu: '推理模块',
                        content: `<p>
							分割预测：通过逐层上采样和卷积操作，解码器将逐步恢复特征图的尺寸，并将其映射到与目标类别数相同的通道数。最终输出层将生成分割预测结果，每个像素位置的预测值表示其所属的类别或分割标签。
                            <br/><br/>后处理：根据需要，可以对生成的分割预测结果进行后处理。这可能包括阈值处理、形态学操作、去噪等步骤，以进一步改善预测结果的质量和准确性。
							</p>`,
                    },
                    {
                        id: 4,
                        menu: '效率',
                        content: `<p>
							vnet在常见的医学图像分割任务中，如脑部肿瘤分割、心脏分割、肺部分割等，通常能够实现较高的分割准确性。此外能够有效地处理多模态医学图像分割任务，其中包括结构性医学图像（如CT扫描和MRI图像）以及其他模态的图像（如功能性图像、病理学图像等）。
                            <br/><br/>本平台使用vnet模型仅有编码器、解码器和跳跃连接组成，不涉及模型融合和后处理，因此在v100上推理单张图片所需时间仅为5s左右。
							</p>`,
                    }
                ]
            },
        }
    }
}
</script>

<style></style>