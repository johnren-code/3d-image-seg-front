<template>
    <!-- <body id="paper"> -->
    <Layout header-class="header-transparent" :show-newsletter="true" :show-cta="false">
        <!-- <p>历史记录！！！</p> -->
        <div class="rn-service-area rn-section-gap">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <SectionTitle text-align="center" title="历史记录" description="" data-aos="fade-up" />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    <!-- </body> -->
</template>
<script>
import axios from "axios";
import Layout from '../components/common/Layout'
import SectionTitle from '../components/elements/sectionTitle/SectionTitle'

export default {
    name: 'History',
    components: { Layout, SectionTitle },
    data() {
        return {
        }
    },
    methods: {

    }
}
</script>
<style lang="scss">
/* flex 居中3 */
@import "../assets/icon/iconfont.css";

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

                    >div {
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
                        background: linear-gradient(90deg,
                                rgba(254, 0, 0, 1) 0%,
                                rgba(255, 171, 60, 1) 100%);
                    }

                    .color-barblues {
                        background: linear-gradient(90deg,
                                rgba(95, 180, 231, 1) 0%,
                                rgba(203, 234, 255, 1) 100%);
                    }

                    .color-barbone {
                        background: linear-gradient(90deg,
                                rgba(52, 52, 112, 1) 0%,
                                rgba(93, 103, 135, 1) 100%);
                    }

                    .color-barcool {
                        background: linear-gradient(90deg,
                                rgba(148, 106, 254, 1) 0%,
                                rgba(8, 250, 254, 1) 100%);
                    }

                    .color-barcoolwarm {
                        background: linear-gradient(90deg,
                                rgba(56, 76, 200, 1) 0%,
                                rgba(255, 210, 188, 1) 62%,
                                rgba(196, 216, 255, 1) 100%);
                    }

                    .color-barcopper {
                        background: linear-gradient(90deg,
                                rgba(100, 57, 30, 1) 0%,
                                rgba(171, 108, 69, 1) 100%);
                    }

                    .color-bargray {
                        background: linear-gradient(90deg,
                                rgba(45, 45, 45, 1) 0%,
                                rgba(127, 127, 127, 1) 100%);
                    }

                    .color-barhot {
                        background: linear-gradient(90deg,
                                rgba(236, 2, 0, 1) 0%,
                                rgba(72, 0, 0, 1) 100%);
                    }

                    .color-barhotIron {
                        background: linear-gradient(90deg,
                                rgba(163, 0, 1, 1) 0%,
                                rgba(118, 0, 0, 1) 100%);
                    }

                    .color-barhotMetalBlue {
                        background: linear-gradient(90deg,
                                rgba(0, 16, 136, 1) 0%,
                                rgba(207, 61, 0, 1) 100%);
                    }

                    .color-barhsv {
                        background: linear-gradient(90deg,
                                rgba(253, 16, 1, 1) 0%,
                                rgba(86, 232, 46, 1) 53%,
                                rgba(255, 215, 22, 1) 100%);
                    }

                    .color-barjet {
                        background: linear-gradient(90deg,
                                rgba(4, 0, 174, 1) 0%,
                                rgba(63, 246, 160, 1) 56%,
                                rgba(247, 246, 0, 1) 100%);
                    }

                    .color-barpet {
                        background: linear-gradient(90deg,
                                rgba(0, 108, 105, 1) 0%,
                                rgba(28, 79, 169, 1) 56%,
                                rgba(191, 44, 202, 1) 100%);
                    }

                    .color-barpet20Step {
                        background: linear-gradient(90deg,
                                rgba(99, 0, 83, 1) 0%,
                                rgba(78, 79, 176, 1) 56%,
                                rgba(78, 187, 79, 1) 100%);
                    }

                    .color-barspectral {
                        background: linear-gradient(90deg,
                                rgba(107, 0, 129, 1) 0%,
                                rgba(6, 12, 214, 1) 49%,
                                rgba(0, 205, 10, 1) 100%);
                    }

                    .color-barspring {
                        background: linear-gradient(90deg,
                                rgba(254, 9, 248, 1) 0%,
                                rgba(253, 164, 91, 1) 100%);
                    }

                    .color-barsummer {
                        background: linear-gradient(90deg,
                                rgba(0, 128, 102, 1) 0%,
                                rgba(151, 203, 102, 1) 100%);
                    }

                    .color-barwinter {
                        background: linear-gradient(90deg,
                                rgba(12, 2, 254, 1) 0%,
                                rgba(2, 167, 172, 1) 100%);
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
