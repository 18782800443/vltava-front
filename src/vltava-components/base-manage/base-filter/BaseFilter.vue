<template>
    <div id="base-filter">
        <va-card title="Filter" v-if="showFilter">
            <div class="va-row row filter-part">
                <va-select class="flex xl3" v-model="appInfo" label="应用名称" v-if="show('appId')" :options="appList" text-by="appName"></va-select>
                <va-select class="flex xl3" v-model="appContent" label="应用名称" v-if="show('appName')" :options="appList" text-by="appName"></va-select>
                <va-input class="flex xl3" v-model="gitLabUrl" label="gitlab项目链接" v-if="show('gitLabUrl')"></va-input>
                <va-input class="flex xl3" v-model="jenkinsJobName" label="jenkins项目名称" v-if="show('jenkinsJobName')"></va-input>
                <va-input class="flex xl3" v-model="requirementName" label="需求名称" v-if="show('requirementName')"></va-input>
                <va-input class="flex xl3" v-model="className" label="类全称(com.xx.yService)" v-if="show('className')"></va-input>
                <va-input class="flex xl3" v-model="methodName" label="方法全称" v-if="show('methodName')"></va-input>
                <va-input class="flex xl3" v-model="description" label="介绍" v-if="show('description')"></va-input>
            </div>
            <div class="va-row">
                <va-button v-show="showNew" class="base-filter-btn-new" @click="addNew">New</va-button>
                <va-button class="base-filter-btn-filter" color="info" @click="clickAction">Filter</va-button>
            </div>
        </va-card>
    </div>
</template>

<script>
  import VaCard from "vuestic-ui/src/components/vuestic-components/va-card/VaCard";
  import VaInput from "vuestic-ui/src/components/vuestic-components/va-input/VaInput";
  import VaButton from "vuestic-ui/src/components/vuestic-components/va-button/VaButton";
  import store from '@/store';

  export default {
    name: "BaseFilter",
    components: {VaButton, VaInput, VaCard},
    props: {
      filterList: Array,
      showNew: {type: Boolean, default: true},
    },
    computed: {
      showFilter() {
        return typeof this.filterList !== "undefined" && this.filterList.length > 0;
      },
      // appList(){
      //   return store.getters.getAppList();
      // }
    },
    data() {
      return {
        appList: [],
        appInfo: '',
        appContent:'',
        gitLabUrl:'',
        jenkinsJobName:'',
        requirementName:'',
        className:'',
        methodName:'',
        description:'',
      }
    },
    methods: {
      show(val) {
        return this.filterList.includes(val);
      },
      addNew() {
        this.$emit("addNew");
      },
      clickAction() {
        let param = {appId: this.appInfo.id, appName: this.appContent.appName, description: this.description, className: this.className, methodName: this.methodName};
        this.$emit("click", param);
      }
    },

      created() {
          let val = {'pageSize': 200, 'pageNum': 1};
          this.$axios.post('/application/filter', val).then((resp) => {
              if (resp.data.success) {
                  this.appList = resp.data.data.resultList;
              } else {
                  this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
              }
          })
      }
  }
</script>

<style scoped>

    .base-filter-btn-filter {
        margin-left: 87%;
    }

    .filter-part{
        min-height: 1rem;
    }

    /*>>> .va-card__body {*/
        /*padding: 0.25rem 1rem;*/
    /*}*/

</style>
