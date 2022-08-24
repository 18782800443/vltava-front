<template>
    <div id="coverage-manage">
        <base-manage ref="baseManage" :title="title" :fields="fields" system-path="coverage" :filter-list="filterList"
                     @addNew="addNew" @edit="edit" @changeStatus="changeStatus"></base-manage>
        <coverage-modal ref="coverageModal" :mode="mode" @refresh="refresh"></coverage-modal>
        <status-manage-modal ref="statusManageModal" system="converage" v-model="status" :select-task-info="selectTaskInfo" @refresh="refresh"></status-manage-modal>
    </div>
</template>

<script>
  import BaseManage from "../../vltava-components/base-manage/BaseManage";
  import CoverageModal from "./modal/CoverageModal";
  import store from "@/store";
  import StatusManageModal from "../../vltava-components/base-manage/base-modal/StatusManageModal";

  export default {
    name: "CoverageManage",
    components: {StatusManageModal, CoverageModal, BaseManage},
    data() {
      return {
        title: '覆盖率统计',
        fields: [
          {name: 'id', title: 'ID'},
          {name: 'appName', title: '应用名称'},
          {name: 'taskName', title: '需求名称'},
          {name: 'fileFilters', title: '文件过滤条件'},
          {name: 'msgFilters', title: '消息过滤条件'},
          {name: 'msgCount', title: '请求数'},
          {name: 'totalCoverage', title: '总覆盖率'},
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
        filterList: ['appName', 'requirementName'],
        mode: '',
        status: 0,
        selectTaskInfo: {},
      }
    },
    methods: {
      addNew() {
        this.mode = 'new';
        this.$refs.coverageModal.openModal()
      },
      edit(val) {

      },
      changeStatus(val) {
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