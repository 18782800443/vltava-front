<template>
    <div id="application-manage">
        <base-manage ref="baseManage" :title="title" system-path="application" :filterList="filterList" :fields="fields"
                     @addNew="addNew"></base-manage>
        <application-modal ref="appModal" :mode="mode" @refresh="refresh"></application-modal>
    </div>
</template>

<script>
  import BaseManage from "../../vltava-components/base-manage/BaseManage";
  import ApplicationModal from "./modal/ApplicationModal";
  import store from "@/store"

  export default {
    name: "ApplicationManage",
    components: {ApplicationModal, BaseManage},
    data() {
      return {
        title: '应用管理',
        filterList: ['appName'],
        fields: [{name: 'appName', title: '应用名称'}, {name: 'systemUniqueName', title: '应用唯一名称'},{name: 'zone', title: '部署单元'}, {name: 'buildGroup', title: '部署分组'},{
          name: 'updateTime', title: '修改时间', callback(val){
            return store.getters.getFormatDate(val);
          }
        }],
        mode: '',
        totalPages: 2,
      }
    },
    methods: {
      addNew() {
        this.mode = 'new';
        this.$refs.appModal.openModal();
      },
        refresh(){
          this.$refs.baseManage.getFilterPage()
        }
    }
  }
</script>

<style scoped>

</style>
