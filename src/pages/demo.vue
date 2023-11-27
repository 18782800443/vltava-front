<template>
    <div>
        <div class="row">
            <div class="filter">
                <TraceFilter @submit="submit"></TraceFilter>
            </div>
            <div class="jenkins">
                <jenkins-info job-name="trade.testhuamou.com" @feedback="getJenkinsFeedback"></jenkins-info>
            </div>
        </div>
        <div v-for="file in codeData.detailList">
            <git-code-viewer :data="file"></git-code-viewer>
        </div>
    </div>
</template>

<script>
  import GitCodeViewer from '../vltava-components/git-code/gitCodeViewer'
  import JenkinsInfo from '../vltava-components/jenkins/JenkinsInfo'
  import TraceFilter from '../vltava-components/filter/TraceFilter'

  export default {
    name: 'demo',
    components: {TraceFilter, JenkinsInfo, GitCodeViewer},
    data() {
      return {
        commitList: [],
        codeData: '',
        gitId: 542,
        jenkinsInfo: '',
      }
    },
    methods: {
      submit(val) {
        let toVersion = val.toVersion === '' ? this.jenkinsInfo.gitVersion : val.toVersion;
        if (toVersion === val.fromVersion) {
          this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: 'From Commit 不能与当前Jenkins最新版本一致，两者无差异'});
          return
        }
        this.$axios.post('/git/getIncreasedCode', {
          'gitId': this.gitId,
          'fromVersion': val.fromVersion,
          'toVersion': toVersion,
        }).then((resp) => {
          this.codeData = resp.data.data
        })
      },

      getJenkinsFeedback(val) {
        this.jenkinsInfo = val.data
      },
    },

  }
</script>

<style scoped>
    .filter {
        width: 62.5%
    }

    .jenkins {
        width: 37.5%
    }


</style>
