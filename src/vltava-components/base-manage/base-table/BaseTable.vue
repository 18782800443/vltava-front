<template>
    <div id="base-table">
        <va-card>
            <va-data-table :fields="fields" :data="data" :per-page="perPage" :api-mode="apiMode" :total-pages="totalPages" @page-selected="pageSelected">
                <template slot="redisStateSlot" slot-scope="props">
                    <redis-status-template v-model="props.rowData.taskStatus" :data="props.rowData" v-on="$listeners"></redis-status-template>
                </template>
                <template slot="actionsSlot" slot-scope="props">
                    <actions-template :data="props.rowData"  v-on="$listeners"></actions-template>
                </template>
            </va-data-table>
        </va-card>
    </div>
</template>

<script>
  import VaDataTable from "vuestic-ui/src/components/vuestic-components/va-data-table/VaDataTable";
  import VaCard from "vuestic-ui/src/components/vuestic-components/va-card/VaCard";
  import RedisStatusTemplate from "./templates/RedisStatusTemplate";
  import ActionsTemplate from "./templates/ActionsTemplate";

  export default {
    name: "BaseTable",
    components: {ActionsTemplate, RedisStatusTemplate, VaCard, VaDataTable},
    props: {
      fields: {type: Array, required: true},
      data: {
        type: Array,
        required: true,
      },
      perPage: {
        type: Number,
        default: 10,
      },
      totalPages:{
        type: Number,
        required: true,
      }
    },
    data(){
      return{
        apiMode: true,
      }
    },
    methods:{
      pageSelected(val){
        this.$emit('pageSelected',val);
      }
    }
  }
</script>

<style scoped>

</style>