<template>
  <div id="app" class="app">
   <app-layout></app-layout>
  </div>
</template>

<script>
import AppLayout from "../vltava-components/admin/AppLayout";
import store from "@/store";
export default {
  name: 'app',
  components: {AppLayout},
}
</script>

<style lang="scss">
@import "../sass/main.scss";

body {
  height: 100%;

  #app {
    height: 100%;
  }
}
</style>

