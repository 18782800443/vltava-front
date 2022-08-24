<template>
    <va-modal :hideDefaultActions="$store.getters.TRUE" v-model="open" title="状态管理" @ok="submit">
        <va-button v-if="showRun" @click="run">运行</va-button>
        <va-button v-if="showRetry" @click="retry">重试</va-button>
        <va-button color="warning" v-if="showPause" @click="pause">暂停</va-button>
        <va-button color="danger" @click="terminal">终止</va-button>
    </va-modal>
</template>

<script>
  export default {
    name: "StatusManageModal",
    props: {
      system: {type: String, required: true},
      selectTaskInfo: {},
    },
    data() {
      return {
        open: false,
        selectedOption: this.value,
        status: this.selectTaskInfo.taskStatus,
        connect: this.selectTaskInfo.connect,
      }
    },
    computed: {
      showRun() {
        // 待运行、暂停中
        return (this.status === 1 || this.status === 3) && (this.connect === undefined || this.connect === 1)
      },
      showPause() {
        return this.status === 2 && (this.connect === undefined || this.connect === 1)
      },
      showRetry() {
        return this.connect === 0 || this.status === 5
      }
    },
    watch: {
      selectedOption() {
        this.$emit('input', this.selectedOption)
      },
      selectTaskInfo() {
        this.status = this.selectTaskInfo.taskStatus;
        this.connect = this.selectTaskInfo.connect
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

      },
      run() {
        this.baseAction(2, '为了环境稳定，请保证任务配置确定过滤合理！！确定开始吗？')
      },
      pause() {
        this.baseAction(3, '确定暂停吗？')
      },
      terminal() {
        this.baseAction(4, '一旦终止，无法再次开启，确定终止吗？')
      },
      retry() {
        this.$swal({
            title: 'Warning',
            text: '请确认目标服务健康 & 目标方法存在，点击确认将重新请求目标服务',
            type: 'warning',
            confirmButtonColor: '#cbd3da',
            showCancelButton: true,
            cancelButtonColor: '#e34a4a'
          }
        ).then(result => {
          if (Object.keys(result).includes("value") && result['value'] === true) {
            this.$axios.post('/' + this.system + '/retry', this.selectTaskInfo['id']).then(resp => {
              if (resp.data.success) {
                this.$swal({type: 'success', confirmButtonColor: '#4ae387', text: resp.data.msg}).then(() => {
                  this.$emit("refresh");
                  this.closeModal();
                });
              } else {
                this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
              }
            })
          }
        });
      },
      baseAction(status, msg, swalType) {
        this.$swal({
            title: 'Warning',
            text: msg,
            type: 'warning',
            confirmButtonColor: '#cbd3da',
            showCancelButton: true,
            cancelButtonColor: '#e34a4a'
          }
        ).then(result => {
          if (Object.keys(result).includes("value") && result['value'] === true) {
            let param = {
              id: this.selectTaskInfo['id'],
              appId: this.selectTaskInfo['appId'],
              version: this.selectTaskInfo['version'],
              taskStatus: status
            };
            this.$axios.post('/' + this.system + '/changeStatus', param).then(resp => {
              if (resp.data.success) {
                this.$swal({type: 'success', confirmButtonColor: '#4ae387', text: resp.data.msg}).then(() => {
                  this.$emit("refresh");
                  this.closeModal();
                });
              } else {
                this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>