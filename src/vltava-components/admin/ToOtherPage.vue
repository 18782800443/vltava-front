<!--<template>-->
<!--<div>-->
<!--&lt;!&ndash;<button @click="ToOtherPage">去首页</button>&ndash;&gt;-->
<!--<va-card :title="使用手册"></va-card>-->
<!--<va-button class="base-filter-btn-new" @click="ToOtherPage">使用手册</va-button>-->
<!--</div>-->
<!--</template>-->
<template>
    <div
            class="va-othercard"
    >
        <div

                class="va-othercard__stripe"
        ></div>
        <div v-if="image" class="va-card__image">
            <img :src="image" :alt="imageAlt">
            <div class="va-othercard__image-overlay" v-if="overlay"></div>
        </div>

        <div
                class="va-othercard__header"
                :class="{'va-card__header--over': image && titleOnImage}"
        >
            <div class="va-othercard__header-inner">
                <slot name="header">
                    <div
                            @click="ToOtherPage"
                            class="va-othercard__header-title"
                            :style="{color: this.titleOnImage ? 'white' : this.$themes.info}"
                    >
                        点击查看Mock平台使用手册~
                    </div>
                    <div
                            class="va-othercard__header-titleOther"
                            :style="{color: this.titleOnImage ? 'white' : this.$themes.info}"
                    >
                        Enjoy it and have fun!
                    </div>
                    <div class="va-othercard__header-actions">
                        <slot name="actions"/>
                    </div>
                </slot>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ToOtherPage",
        methods: {
            ToOtherPage() {
                window.open("https://duodian.feishu.cn/docx/Fl1Gd510sojiu7x3lGrclsnAncb", '_blank')
            }
        }
    }
</script>

<style lang="scss">
    .card-body-content {
        margin-top: 0.75rem;
    }

    .va-othercard {
        border-radius: $card-border-radius;
        border: none;
        box-sizing: border-box;
        box-shadow: $card-box-shadow;
        word-wrap: break-word;
        background-color: $white;
        position: relative;
        overflow: hidden;

        &__header {
            &-inner {
                display: flex;
                padding: 0.5rem $card-padding;
                min-height: 8.5rem;
                align-items: center;
            }

            &-title {
                font-weight: $font-weight-bold;
                font-size: 1.025rem;
                letter-spacing: $card-title-letter-spacing;
                text-transform: uppercase;
                color: $card-title-color;
                cursor: pointer;
                text-decoration: underline;
            }

            &-titleOther {
                font-weight: $font-weight-bold;
                font-size: 1.025rem;
                letter-spacing: $card-title-letter-spacing;
                color: $card-title-color;
            }

            /*&-actions {*/
            /*margin-left: auto;*/
            /*flex: 0 0 auto;*/
            /*}*/

            /*&--over {*/
            /*position: absolute;*/
            /*padding-top: 56%;*/
            /*width: 100%;*/
            /*top: 0;*/
            /*left: 0;*/

            /*&:last-child {*/
            /*height: 100%;*/
            /*}*/

            /*& > div {*/
            /*position: absolute;*/
            /*width: 100%;*/
            /*bottom: 0;*/
            /*left: 0;*/
            /*}*/
            /*}*/
        }

        &__body {
            padding: 0 $card-padding $card-padding;
            flex: 1 1 auto;
            overflow-x: auto;

            &--no-padding-v {
                padding: 0 $card-padding;
            }

            &--no-padding-h {
                padding: $card-padding 0;
            }

            &--no-padding {
                padding: 0;
            }

            &--padding-top {
                padding-top: $card-padding;
            }
        }

        /*&__image {*/
        /*padding-bottom: 56%;*/
        /*position: relative;*/
        /*height: auto;*/
        /*min-height: 100%;*/

        /*img {*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*height: 100%;*/
        /*width: 100%;*/
        /*display: block;*/
        /*object-fit: cover;*/
        /*}*/

        /*&-overlay {*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*height: 100%;*/
        /*width: 100%;*/
        /*background-color: rgba(0, 0, 0, .3);*/
        /*pointer-events: none;*/
        /*}*/
        /*}*/

        /*&__stripe {*/
        /*content: '';*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*height: 0.5rem;*/
        /*z-index: 1;*/
        /*}*/
    }
</style>
