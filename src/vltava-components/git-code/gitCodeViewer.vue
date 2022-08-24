<template>
  <div class="git-code-viewer">
    <va-card :title="data.newPath"   class="git-file">
      <code-block :data="codeBlock" v-for="codeBlock in data.codeBlockList"></code-block>
    </va-card>
  </div>
</template>

<script>
import VaCard from 'vuestic-ui/src/components/vuestic-components/va-card/VaCard'
import CodeBlock from './codeBlock'

export default {
  name: 'gitCodeViewer',
  components: { CodeBlock, VaCard },
  props: { data: Object },
  data () {
    return {
      // data: this.value,
      theData: this.data,
    }
  },
}
</script>

<style scoped>
  .git-file{
    border: 1px solid lightgrey;
    margin: 10px;
  }
  >>>.va-card__header-title{
    text-transform: none;
  }


</style>
<style>

</style>
