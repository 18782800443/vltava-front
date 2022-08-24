<template>
    <div id="mock-manage">
        <base-manage ref="baseManage" :title="title" :fields="fields" system-path="mock" :filter-list="filterList"
                     @addNew="addNew" @edit="edit" @changeStatus="changeStatus"></base-manage>
        <mock-modal ref="mockModal" :mode="mode" v-model="mockData" @refresh="refresh"></mock-modal>
        <status-manage-modal ref="statusManageModal" system="mock" :select-task-info="selectTaskInfo"
                             @refresh="refresh"></status-manage-modal>
    </div>
</template>

<script>
  import BaseManage from "../../vltava-components/base-manage/BaseManage";
  import store from "@/store";
  import MockModal from "./modal/MockModal";
  import StatusManageModal from "../../vltava-components/base-manage/base-modal/StatusManageModal";

  export default {
    name: "MockManage",
    components: {StatusManageModal, MockModal, BaseManage},
    data() {
      return {
        title: '动态Mock',
        fields: [
          {name: 'id', title: 'ID'},
          {name: 'appName', title: '应用名称'},
          {name: 'descriptions', title: '介绍'},
          {name: 'mockKey', title: 'mock key'},
          {
            name: 'implicit', title: '自动化验证', callback(val) {
              return val === 1 ? "是" : "否";
            }
          },
          {
            name: 'createTime', title: '开始时间', callback(val) {
              return store.getters.getFormatDate(val)
            }
          },
          {
            name: 'modifyTime', title: '修改时间', callback(val) {
              return store.getters.getFormatDate(val)
            }
          },
          {name: '__slot:redisStateSlot', title: '状态'},
          {name: '__slot:actionsSlot', title: '操作'}
        ],
        filterList: ['appId', 'description', 'className', 'methodName'],
        mode: '',
        status: 0,
        selectTaskInfo: {},
        mockData: {appId: '', mockActionList: [{mockType: 0}], implicit: 0, mockKey: this.guid(), entranceClassName: '', entranceMethodName: ''},
      }
    },
    methods: {
      addNew() {
        this.mode = 'new';
        this.mockData = {appId: '', mockActionList: [{mockType: 0}], implicit: 0, mockKey: this.guid(), entranceClassName: '', entranceMethodName: ''};
        this.$refs.mockModal.openModal()
      },
      edit(val) {
        this.mockData = JSON.parse(JSON.stringify(val.param));
        this.mode = 'edit';
        this.$refs.mockModal.openModal()
      },

      guid() {
        function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      },
      changeStatus(val) {
        console.log(val)
        this.status = val.taskStatus;
        this.selectTaskInfo = val;
        // 准备中
        if (this.status === 0) {
          this.$swal({
              title: 'Error', text: '准备中，无法修改状态；请等待状态为待运行后再次点击', type: 'error', confirmButtonColor: '#4ae387'
            }
          );
          return
        }
        if (this.status === 4) {
          this.$swal({
            title: 'Error', text: '已终止，无法修改状态', type: 'error', confirmButtonColor: '#4ae387'
          });
          return
        }
        this.$refs.statusManageModal.openModal()
      },
      refresh() {
        this.$refs.baseManage.getFilterPage()
      }
    }
  }
</script>

<style scoped>

</style>
