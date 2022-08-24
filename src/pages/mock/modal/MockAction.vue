<template>
    <div id="mock-actions">
        <va-card class="mock-action" v-for="(action,index) in actionData" v-if="showAction(action)">
            <div class="va-row row justify--end icon-style align--baseline" slot="actions">
                <va-button class="flex" flat small color="info" icon="glyphicon glyphicon-arrow-up"
                           v-if="showUp(index)"
                           @click="clickUp(index)"></va-button>
                <va-button class="flex" flat small color="info" icon="glyphicon glyphicon-arrow-down"
                           v-if="showDown(index)"
                           @click="clickDown(index)"></va-button>
                <va-button class="flex" flat small icon="glyphicon glyphicon-plus"
                           @click="clickPlus(index)"></va-button>
                <va-button class="flex" flat small color="danger" icon="glyphicon glyphicon-remove"
                           v-if="showRemove"
                           @click="clickRemove(index)"></va-button>
            </div>
            <div class="va-row row align--center">
                <va-input class="flex xl7 " label="className" v-model="action.className"
                          placeholder="com.dmall.y.XService；为环境稳定，禁用*" :disabled="disable"></va-input>
                <va-input class="flex xl4 app-modal-input" label="methodName" v-model="action.methodName"
                          placeholder="为环境稳定，禁用*" :disabled="disable"></va-input>
            </div>
            <transition name="change-height">
            <va-input label="匹配条件" v-if="implicit === 0" v-model="action.expectKey"
                      placeholder="匹配条件为JSON.toString.contains；为环境稳定，禁用*; 自动化验证模式下，使用MOCK KEY,不需要该数据"></va-input>
            </transition>
            <va-tabs v-model="action.mockType" class="tab" :center="$store.getters.TRUE" :grow="$store.getters.TRUE">
                <va-tab v-for="ele in tabTitles" :key="ele.key">
                    {{ele.text}}
                </va-tab>
            </va-tabs>

            <div class="tab-content">

                <va-input type="textarea" label="期望返回值" v-model="action.expectValue" v-if="action.mockType===0"
                          :autosize="$store.getters.TRUE"></va-input>

                <div v-if="action.mockType===1">
                    <va-tabs v-model="action.sleepTimeVO.needRandom" class="small-tab margin25"
                             :center="$store.getters.TRUE"
                             :grow="$store.getters.TRUE" @input="needRandomChanged">
                        <va-tab v-for="ele in sleepTitles" :key="ele.key" >
                            {{ele.text}}
                        </va-tab>
                    </va-tabs>
                    <va-input class="small-input margin25" label="固定延迟时间" v-model="action.sleepTimeVO.baseTime"
                              v-if="!action.sleepTimeVO.needRandom"></va-input>
                    <div class="va-row row" v-else>
                        <va-input class="flex xl3 margin25" label="随机延迟min"
                                  v-model="action.sleepTimeVO.randomStart"></va-input>
                        <va-input class="flex xl3 margin1" label="随机延迟max"
                                  v-model="action.sleepTimeVO.randomEnd"></va-input>
                    </div>
                </div>

                <va-input class="" label="报错消息" v-model="action.errorMsg" v-if="action.mockType===2"></va-input>

            </div>
        </va-card>
    </div>
</template>

<script>
  import store from '@/store';

  export default {
    name: "MockAction",
    props: {
      value: Array,
      implicit: Number,
    },
    data() {
      return {
        tabTitles: [{key: 0, text: "返回参数"}, {key: 1, text: "返回延迟"}, {key: 2, text: "返回报错"}],
        sleepTitles: [{key: 0, text: "固定延迟"}, {key: 1, text: "随机延迟"}],
        actionData: this.value,
        disable: false,
      }
    },
    watch:{
      actionData(){
        this.$emit('input',this.actionData)
      },
    },
    computed: {

      showRemove() {
        return this.actionData.length !== 1;
      },
    },
    methods:{
        needRandomChanged(){
            this.sleepTitles.push({})
            this.sleepTitles.pop()
        },
      showAction(action){
        return action.entrance === false || action.entrance === undefined
      },
      showUp(index) {
        return index !== 0;
      },
      showDown(index) {
        return index+1 !== this.actionData.length;
      },
      clickUp(index) {
        let tmp = this.actionData.splice(index,1);
        this.actionData.splice(index-1,0,tmp[0]);
      },
      clickDown(index) {
        let tmp = this.actionData.splice(index,1);
        this.actionData.splice(index+1,0,tmp[0]);
      },
      clickPlus(index) {
        this.actionData.splice(index+1, 0, {mockType: 0,expectKey:null, expectValue:null,errorMsg:null, sleepTimeVO:{baseTime:null, needRandom:0, randomEnd:null, randomStart:null}})
      },
      clickRemove(index) {
        this.actionData.splice(index,1)
      },
    },
    created() {
      for (let i = 0; i < this.actionData.length; i++) {
        if (!Object.keys(this.actionData[i]).includes("sleepTimeVO")) {
          this.actionData[i]['sleepTimeVO'] = {'needRandom': 0}
        }
      }
    }
  }
</script>

<style scoped>
    .tab {
        width: 100%;
    }

    .small-tab {
        width: 50%;
    }

    .small-input {
        width: 50%;
    }

    .margin25 {
        margin-left: 25%;
    }

    .margin1 {
        margin-left: 3px;
    }

    .mock-action {
        margin-bottom: 1rem;
        width: 98%;
    }

    #mock-actions{
        max-height: 700px;
        overflow: auto;
    }

    .tab-content {
        margin-top: 0.2rem;
    }

    .icon-style {
        height: 1rem;
    }

    .app-modal-input {
        margin-left: 2rem;
    }

    .change-height-enter-active, .change-height-leave-active {
        transition: opacity 0.5s;
    }
    .change-height-enter, .change-height-leave-to  {
        opacity: 0;
    }
</style>
