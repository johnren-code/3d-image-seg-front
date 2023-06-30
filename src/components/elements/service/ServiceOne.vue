<template>
    <div class="row row--15 service-wrapper">
        <div class="col-lg-4 col-md-6 col-sm-6 col-12" v-for="(service, index) in serviceList" :key=index>
            <div :class="`service ${serviceStyle} ${checkTextAlign}`" data-aos="fade-up" data-aos-delay="70">
                <div class="icon">
                    <Icon :name="service.icon" :class="`size-${iconSize}`" />
                </div>
                <div class="content">
                    <h4 class="title w-600">
                        {{ service.title }}
                    </h4>
                    <p class="description b1 color-gray mb--0" v-html="service.description" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../../icon/Icon'

export default {
    name: 'ServiceOne',
    components: { Icon },
    props: {
        serviceStyle: {
            type: String
        },
        iconSize: {
            type: String | Number,
            default: 62
        },
        textAlign: {
            type: String,
            default: 'left'
        }
    },
    data() {
        return {
            serviceList: [
                {
                    icon: 'activity',
                    title: '高精模型',
                    description: '基于官方提供的测试样本<br/>对11种器官平均识别精度为0.92567'
                },
                {
                    icon: 'cast',
                    title: '专业流程',
                    description: '平台模拟病人就诊全过程<br/>实现创建项目、图像解析、报告生成一体化'
                },
                {
                    icon: 'map',
                    title: '智能编辑',
                    description: '内置开源大模型<br/>为编辑病例报告提供专业智能化协助'
                },
            ]
        }
    },
    computed: {
        checkTextAlign() {
            if (this.textAlign === 'left') return 'text-start';
            else if (this.textAlign === 'center') return 'text-center';
            else if (this.textAlign === 'end') return 'text-end';
            else return '';
        }
    }
}
</script>