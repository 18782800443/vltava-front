<template>
    <div id="trace-filter">
        <va-card title="Filter">
            <div class="card-body-content">
                <div class="va-row row ">
                    <div class="filter-text">增量代码:</div>
                    <va-input label="From Commit" v-model="fromVersion" placeholder="必填，不包含输入版本"></va-input>
                    <va-input class="version-input" label="To Commit" v-model="toVersion"
                              placeholder="非必填，为空则默认为最新版本"></va-input>

                </div>
                <div class="row">
                    <div class="filter-text">测试追踪:</div>
                    <va-date-picker class="date-picker" label="from date" v-model="fromDate"
                                    :config="dateConfig"></va-date-picker>
                    <va-date-picker class="date-picker" label="to date" v-model="toDate"
                                    :config="dateConfig"></va-date-picker>
                    <va-input label="Param Regex" class="param-regex-input" v-model="paramRegex"></va-input>
                    <va-button @click="submit">Submit</va-button>
                </div>
            </div>
        </va-card>
    </div>
</template>

<script>
  import VaSelect from 'vuestic-ui/src/components/vuestic-components/va-select/VaSelect'
  import VaInput from 'vuestic-ui/src/components/vuestic-components/va-input/VaInput'
  import VaDatePicker from 'vuestic-ui/src/components/vuestic-components/va-date-picker/VaDatePicker'
  import VaButton from 'vuestic-ui/src/components/vuestic-components/va-button/VaButton'
  import VaCard from 'vuestic-ui/src/components/vuestic-components/va-card/VaCard'

  export default {
    name: 'TraceFilter',
    components: {VaCard, VaButton, VaDatePicker, VaInput, VaSelect},
    props: {
    },
    data() {
      return {
        fromVersion: '',
        toVersion: '',
        fromDate: '',
        toDate: '',
        paramRegex: '',
        commitList: [],
        dateConfig: {enableTime: true},
      }
    },
    watch: {

    },
    methods: {
      submit() {
        if (this.fromVersion === '') {
          this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: '请选择起始 From Commit'});
          return
        }
        this.$emit('submit', {
          fromVersion: this.fromVersion,
          toVersion: this.toVersion,
          fromDate: this.fromDate,
          toDate: this.toDate,
          paramRegex: this.paramRegex
        })
      },
    },

  }
</script>

<style scoped>
    #base-filter {
        margin: 10px;
    }

    .version-input {
        margin-left: 10px;
    }

    .filter-text{font-weight: 700; font-size: 14px;line-height: 37px; color: rgb(44, 130, 224)}

    .date-picker {
        margin-right: 10px;
    }

    .param-regex-input {
        width: 40%;
    }


</style>
