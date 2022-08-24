<template>
    <div id="base-manage">
        <va-card :title="title"></va-card>
        <base-filter class="mt-4" :filter-list="filterList" @click="clickFilter" @addNew="addNew"></base-filter>
        <base-table class="mt-4" :fields="fields" :data="tableData" :per-page="perPage"
                    :total-pages="totalPages" v-on="$listeners" @pageSelected="pageSelected" @remove="remove"></base-table>
    </div>
</template>

<script>
  import BaseFilter from "./base-filter/BaseFilter";
  import BaseTable from "./base-table/BaseTable";
  import VaCard from "vuestic-ui/src/components/vuestic-components/va-card/VaCard";

  export default {
    name: "BaseManage",
    components: {VaCard, BaseTable, BaseFilter},
    props: {
      title: {type: String, required: true},
      // filter
      systemPath: {type: String, required: true},
      filterList: Array,
      // table
      fields: {type: Array, required: true},

      perPage: {
        type: Number,
        default: 10,
      },
      initTable: {
        type: Boolean,
        default: true
      }

    },
    data() {
      return {
        filter: {},
        tableData: [],
        totalPages:0,
        pageNum: 1,
      }
    },
    methods: {
      clickFilter(val) {
        this.filter = val;
        this.getFilterPage()
      },
      addNew() {
        this.$emit("addNew");
      },
      remove(val){
        if (val.param.taskStatus !== 4){
          this.$swal({
              title: 'Error', text: '请先结束规则后再尝试删除', type: 'error', confirmButtonColor: '#4ae387'
            }
          )
        } else {
          this.$swal({type: 'warning', confirmButtonColor: '#4ae387', text: '确认删除该规则吗？'}).then(result => {
            if (Object.keys(result).includes("value") && result['value'] === true) {
              this.$axios.post(`/${this.systemPath}/remove`, val.param.id).then((resp) => {
                if (resp.data.success){
                  this.$swal({type: 'success', confirmButtonColor: '#4ae387', text: resp.data.msg});
                    this.getFilterPage();
                } else {
                  this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
                }
              })
            }
          });
        }
      },
      pageSelected(val){
        this.pageNum = val;
        this.getFilterPage()
      },
      getFilterPage(){
        let param = this.filter;
        param['pageSize'] = 10;
        param['pageNum'] = this.pageNum;
        this.$axios.post(`/${this.systemPath}/filter`, param).then((resp) => {
          if (resp.data.success){
            this.totalPages = resp.data.data.totalPages;
            this.tableData = resp.data.data.resultList;
          } else {
            this.$swal({type: 'error', confirmButtonColor: '#4ae387', text: resp.data.msg});
          }
        })
      }
    },
    created(){
      if (this.initTable){
        this.getFilterPage();
      }
    }
  }
</script>

<style scoped>
</style>
