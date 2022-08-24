<template>
  <div class="code-block">
    <div class="code-line" v-for="line in data.lineList">
      <code-line  :data="line"></code-line>
    </div>
  </div>
</template>

<script>
import CodeLine from './codeLine'

export default {
  name: 'codeBlock',
  components: { CodeLine },
  props: { data: Object },
}
</script>

<style scoped>
 .code-line{height: 24px; font-size: 13px}
</style>
