<template>
    <va-modal :auto-close="$store.getters.FALSE" v-model="open" :title="getTitle" @ok="submit">
        <va-select v-model="appId" :options="appOptions" label="所属应用" text-by="appName"></va-select>
        <va-input class="app-modal-input" label="需求名称" v-model="taskName"></va-input>
        <va-input class="app-modal-input" label="文件过滤条件" v-model="fileFilters"
                  placeholder='工程package通用路径，例如：com.dmall.trade.* '></va-input>
        <va-input class="app-modal-input" label="消息过滤条件" v-model="msgFilters"
                  placeholder='参考grep多条件以|隔开，禁用*，例如："Id":"1"|"name":"test"'></va-input>
        <va-progress-bar :buffer="rate" v-if="showRate"></va-progress-bar>
    </va-modal>
</template>

<script>
  import VaModal from "vuestic-ui/src/components/vuestic-components/va-modal/VaModal";
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";
  import VaSelect from "vuestic-ui/src/components/vuestic-components/va-select/VaSelect";
  import VaProgressBar from "vuestic-ui/src/components/vuestic-components/va-progress-bar/progress-types/VaProgressBar";
  import store from '@/store';

  export default {
    name: "CoverageModal",
    components: {VaProgressBar, VaSelect, VaInput, VaModal},
    props: {
      mode: {type: String, required: true}
    },
    data() {
      return {
        appOptions: [],
        appId: '',
        taskName: '',
        fileFilters: '',
        msgFilters: '',
        open: false,
        taskId: '',
        rate: 0,
        showRate: false,
      }
    },
    computed: {
      getTitle() {
        return this.$store.getters.getModeName(this.mode) + "覆盖率统计"
      }
    },
    methods: {
      openModal() {
        this.open = true;
      },
      closeModal() {
        this.open = false;
      },
      submit() {
        this.showRate = false;
        this.rate = 0;
        if (this.appId === '' || this.taskName === '' || this.fileFilters === '' || this.msgFilters === '') {
          this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: '所有参数都是必填项，请检查后提交'});
          return
        }
        if (this.fileFilters === '*') {
          this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: '为了运行稳定，文件过滤禁止为全匹配'});
          return
        }
        if (this.msgFilters.includes('*')) {
          this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: '为了运行稳定，消息过滤禁止为全匹配'});
          return
        }
        this.$axios.post('/coverage/save', {
          appId: this.appId.id,
          taskName: this.taskName,
          fileFilters: this.fileFilters,
          msgFilters: this.msgFilters,
        }).then((resp) => {
          if (resp.data.success) {
            this.taskId = resp.data.data;
            this.getRate();
          } else {
            this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
          }
        })
      },
      getRate() {
        this.webSocket = new WebSocket(`${store.getters.getWebSocketBaseUrl()}`);
        this.webSocket.onopen = () => {
          // 1 -> coverage
          this.webSocket.send(`1@${this.taskId}`);
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
      let val = {'pageSize': 10, 'pageNum': 1};
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
    .app-modal-input {
        width: 28rem;
    }

</style>