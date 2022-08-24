<template>
    <va-button small :color="autoColor"  @click="changeStatus" v-bind:icon-right="showIcon">{{getText}}</va-button>
</template>

<script>
    import store from "@/store"
  export default {
    name: "RedisStatusTemplate",
    props: {
      value: Number,
      data: Object
    },
    computed: {
      getText(){
        if (typeof this.data.connect !== "undefined" && this.data.connect === 0){
          return '异常'
        } else {
          return store.getters.getTaskStatusEnum(this.value)
        }
      },
      autoColor() {
        if (typeof this.data.connect !== "undefined" && this.data.connect === 0){
          return 'danger'
        }
        switch (this.value) {
          case 0:
            return 'gray'
          case 1:
            return 'info'
          case 2:
            return 'success'
          case 3:
            return 'warning'
          case 4:
            return 'danger'
          case 5:
            return 'danger'
        }
      },
      showIcon(){
        return [1,2,3].includes(this.value)? "fa fa-cog": "";
      }
    },
    methods:{
      changeStatus(){
        this.$emit('changeStatus', this.data)
      }
    }

  }
</script>

<style scoped>

</style>