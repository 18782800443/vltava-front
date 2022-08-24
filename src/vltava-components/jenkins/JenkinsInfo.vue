<template>
    <va-card id="jenkins-info" title="Jenkins Info">
        <div class="card-body-content">
            <div class="va-row row">
                <div class="jenkins-input-long">
                    <va-input label="任务名称" v-model="data.jobName"></va-input>
                </div>
                <div class="jenkins-input">
                    <va-input class="xs1" label="分支" v-model="data.branch"></va-input>
                </div>
                <div class="jenkins-input">
                    <va-input class="xs1" label="构建序号" v-model="data.lastSuccessfulBuild"></va-input>
                </div>

            </div>
            <div class="va-row row">
                <div class="jenkins-input-long">
                    <va-input class="xs2" label="当前最新已构建Git版本" v-model="data.gitVersion"></va-input>
                </div>
                <div class="jenkins-input">
                    <va-input class="xs2" label="构建者" v-model="data.builder"></va-input>
                </div>
                <div class="jenkins-input">
                    <va-input class="xs2" label="构建时间" v-model="showTime"></va-input>
                </div>

            </div>
        </div>
    </va-card>
</template>

<script>
  import VaCard from 'vuestic-ui/src/components/vuestic-components/va-card/VaCard'
  import VaInput from 'vuestic-ui/src/components/vuestic-components/va-input/VaInput'
  import store from '@/store'

  export default {
    name: 'JenkinsInfo',
    components: {VaInput, VaCard},
    props: {jobName: {type: String, required: true}},
    data() {
      return {
        data: '',
        timer: '',
      }
    },
    watcher: {
      jobName() {
        this.getInfo()
      },
    },
    computed: {
      showTime() {
        return store.getters.getShortFormatDate(this.data.buildTime)
      },
    },
    methods: {
      getInfo() {
        this.$axios.post('/jenkins/getInfo', {jobName: this.jobName}).then((resp) => {
          if (resp.data.success) {
            this.data = resp.data.data
            this.$emit('feedback', {data: this.data})
          }
        })
      },
    },
    created() {
      this.getInfo();
      this.timer = setInterval(() => {
        this.getInfo()
      }, 60000)

    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
    #jenkins-info {
        margin-left: 10px;
    }

    .jenkins-input {
        margin-left: 10px;
        width: 20%;
    }

    .jenkins-input-long {
        width: 55%;
    }
</style>
