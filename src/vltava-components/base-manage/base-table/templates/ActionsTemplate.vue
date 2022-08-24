<template>
    <div id="actions-template">
        <va-button flat small color="gray" icon="fa fa-pencil" @click="edit"></va-button>
        <va-button flat small color="gray" icon="fa fa-trash" @click="remove"></va-button>
    </div>
</template>

<script>
  export default {
    name: "ActionsTemplate",
    props: {data: Object},
    methods: {
      edit() {
        this.$emit('edit', {param: this.data})
      },
      remove() {
        this.$emit('remove', {param: this.data})
      }
    }
  }

</script>

<style scoped>

</style>