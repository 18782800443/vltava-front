<template>
    <va-modal :auto-close="$store.getters.FALSE" v-model="open" :title="getTitle" @ok="submit" size="huge">
        <div class="mock-card container">
            <div id="info" class="va-row row align--center">
                <va-select class="flex xl3" v-model="autoApp" :options="appOptions" label="所属应用"
                           text-by="appName" :disabled="disable"></va-select>
                <va-input class="flex mock-input" v-bind:class="descriptionLength" @click="clickDes" @blur="blurDes"
                          label="描述" :disabled="disable"
                          v-model="mockData.descriptions"></va-input>
                <va-toggle class="flex implicit-toggle" v-model="mockData.implicit" :true-value="1" :false-value="0"
                           label="自动化验证"
                           :small="$store.getters.TRUE"></va-toggle>
                <va-input class="flex mock-key" v-bind:class="mockKeyLength" v-if="mockData.implicit === 1"
                          label="mock Key" :disabled="$store.getters.TRUE"
                          v-model="mockData.mockKey"></va-input>
            </div>
            <div class="va-row row align--center" v-if="mockData.implicit===1">
                <label class="entrance-label">接口入口 : </label>
                <va-input class="flex xl7 " label="className" v-model="mockData.entranceClassName"
                          placeholder="com.testhuamou.y.XService；为环境稳定，禁用*" :disabled="disable"></va-input>
                <va-input class="flex xl4 entrance-method" label="methodName" v-model="mockData.entranceMethodName"
                          placeholder="为环境稳定，禁用*" :disabled="disable"></va-input>
            </div>
            <mock-action ref="mockAction" v-model="mockData.mockActionList" :implicit="mockData.implicit"></mock-action>
            <va-progress-bar :buffer="rate" v-if="showRate"></va-progress-bar>
        </div>
    </va-modal>
</template>

<script>
  import MockAction from "./MockAction";
  import store from '@/store'

  export default {
    name: "MockModal",
    components: {MockAction},
    props: {
      value: {type: Object},
      mode: String,
    },
    data() {
      return {
          appOptions:[],
        open: false,
        expectType: 1,
        mockData: this.value,
        rate: 0,
        showRate: false,
        clickDescription: false,
      }
    },
    computed: {
      // appOptions() {
      //   return store.getters.getAppList()
      // },

      getTitle() {
        return this.mode + " mock"
      },
      autoApp: {
        get() {
          if (this === undefined) {
            return {}
          }
          if (this.mockData.appId === '' || this.appOptions === []) {
            return {}
          }
          let list = this.appOptions.filter(item => {
            return item.id === this.mockData.appId
          })
          if (list.length === 1) {
            return list[0]
          } else {
            return {}
          }
        },
        set(val) {
          this.mockData.appId = val.id;
        }
      },
      disable() {
        return this.mode !== 'edit' && this.mode !== 'new';
      },
      descriptionLength() {
        return this.clickDescription ? "xl6" : "xl3"
      },
      mockKeyLength() {
        return this.clickDescription ? "xl1" : "xl4"
      }
    },

    watch: {
      value() {
        this.mockData = JSON.parse(JSON.stringify(this.value));
      }
    }
    ,
    methods: {
      openModal() {
        this.open = true;
      }
      ,
      closeModal() {
        this.open = false;
      }
      ,
      clickDes() {
        this.clickDescription = true
      },
      blurDes() {
        this.clickDescription = false
      },
      submitCheck() {
        function check(val, simple = true) {
          if (simple) {
            return typeof val === "undefined" || val === '';
          } else {
            return typeof val === "undefined" || val === '' || val.indexOf("*") !== -1;
          }
        }

        let errorList = []
        let referenceList = []
        if (check(this.mockData.appId)) {
          errorList.push("系统为必选项")
        }
        for (let action in this.mockData.actionList) {
          if (check(action.className, false)) {
            errorList.push("类名为必选项,且不能含有*")
          }
          if (check(action.methodName, false)) {
            errorList.push("方法名为必选项,且不能含有*")
          }
          if (this.implicit) {
            if (this.mockData.entranceClassName === '' || this.mockData.entranceMethodName === '') {
              errorList.push("自动化验证模式下，入口信息必填")
            }
            if (!referenceList.includes(action.className + '#' + action.methodName)) {
              referenceList.push(action.className + '#' + action.methodName);
            } else {
              errorList.push("自动化验证模式下，一个mockKey包含的方法不能重复")
            }
          } else {
            if (check(action.expectKey, false)) {
              errorList.push("expectKey为必选项,且不能含有*")
            }
          }
        }
        if (errorList.length !== 0
        ) {
          this.$swal({
              title: 'Error', text: errorList.join('\r\t'), type: 'error', confirmButtonColor: '#4ae387'
            }
          );
        }
        return errorList.length === 0
      }
      ,
      submit() {
        if (this.submitCheck()) {
          this.$axios.post('/mock/save', this.mockData).then((resp) => {
            if (resp.data.success) {
              this.taskId = resp.data.data;
              this.$swal({type: 'success', confirmButtonColor: '#4ae387', text: resp.data.msg}).then((result) => {
                this.$emit("refresh")
                this.closeModal()
              });

              // this.getRate();
            } else {
              this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
            }
          })
        }
      }
      ,
      getRate() {
        this.webSocket = new WebSocket(`${store.getters.getWebSocketBaseUrl()}`);
        this.webSocket.onopen = () => {
          // 2 -> mock
          this.webSocket.send(`2@${this.taskId}`);
          this.showRate = true;
        };
        this.webSocket.onmessage = val => {
          this.rate = val.data;
        };
        this.webSocket.onerror = (error) => {
          this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: error});
        }
        this.webSocket.onclose = () => {
          if (this.rate === '100') {
            this.$swal({type: 'success', confirmButtonColor: '#4ae387', text: 'Success!'}).then(() => {
              this.$emit('refresh');
              this.closeModal();
            });
          } else {
            this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: '系统错误'}).then(() => {
              // this.$emit('refresh');
              // this.closeModal();
            });
          }
          ;
        }
      },

    },
    created() {
        let val = {'pageSize': 200, 'pageNum': 1};
        this.$axios.post('/application/filter', val).then((resp) => {
            if (resp.data.success) {
                this.appOptions = resp.data.data.resultList;
            } else {
                this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
            }
        })
    }

  }
</script>

<style scoped>
    #mock-modal {
    }

    #info {
        width: 100%;

    }

    .mock-card {
        width: 1100px;
        background-color: #f1f5f5;
        padding-left: 1rem;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
    }


    .mock-input {
        margin-left: 10px;
        margin-right: 5px;
        transition: 0.5s;
    }

    .mock-key {
        transition: 0.5s;
        margin-left: 8px;
    }

    .entrance-label {
        font-weight: 600;
        font-size: 13px;
        color: #4ae387;
    }

    .entrance-method {
        margin-left: 1rem;
    }


</style>
