<template>
    <va-modal v-model="open" :title="getTitle" @ok="submit">
        <va-input class="app-modal-input" label="应用名称" v-model="appName"></va-input>
        <va-input class="app-modal-input" label="系统唯一名称" v-model="systemUniqueName"
                  placeholder="docker终端url中appUniqCode参数值，例：dmall-trade-api"></va-input>
        <va-input class="app-modal-input" label="部署单元" v-model="zone"
                  placeholder="运行详情页中的部署单元，例：gz01a"></va-input>
        <va-input class="app-modal-input" label="部署分组" v-model="buildGroup"
                  placeholder="运行详情页中的部署分组，例：blue"></va-input>
    </va-modal>
</template>

<script>
  import VaModal from "vuestic-ui/src/components/vuestic-components/va-modal/VaModal";
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";

  export default {
    name: "ApplicationModal",
    components: {VaInput, VaModal},
    props: {
      mode: {type: String, required: true}
    },
    data() {
      return {
        appName: '',
        systemUniqueName: '',
        zone: '',
        buildGroup: '',
        open: false,
      }
    },
    computed: {
      getTitle() {
        return this.$store.getters.getModeName(this.mode) + "应用"
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
        if (this.appName === '' || this.systemUniqueName === '' || this.zone === '' || this.group === '') {
          this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: '所有参数都是必填项，请检查后提交'});
          return
        }
        this.$axios.post('/application/save', {
          appName: this.appName,
          systemUniqueName: this.systemUniqueName,
          zone: this.zone,
          buildGroup: this.buildGroup,
        }).then((resp) => {
          if (resp.data.success) {
              this.$swal({type: 'success', confirmButtonColor: '#4ae387', text: resp.data.msg});
              this.$emit('refresh');
              this.closeModal();

          } else {
            this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
          }
        })

      }
    }
  }
</script>

<style scoped>
    .app-modal-input {
        width: 28rem;
    }

</style>
