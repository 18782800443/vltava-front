<template>
  <div class="d-inline-flex">
    <div class="xs1 d-inline-flex">
      <div class="line-number old-line" v-bind:style="autoColor(data, bTrue)">{{showLine(false)}}</div>
      <div class="line-number" v-bind:style="autoColor(data, bTrue)">{{showLine(true)}}</div>
    </div>
    <div class="xs11 code" v-bind:style="autoColor(data, bFalse)" >{{showCode()}}</div>
  </div>
</template>

<script>
export default {
  name: 'codeLine',
  props: { data: Object },
  data () {
    return {
      bTrue: true,
      bFalse: false,
    }
  },
  methods: {
    showLine (isNew) {
      if (this.data.locate) {
        return '...'
      } else {
        return isNew ? typeof this.data === 'undefined' ? '' : this.data.newLineNum : typeof this.data === 'undefined' ? '' : this.data.oldLineNum
      }
    },
    showCode () {
      if (this.data.newAdd) {
        return '+ ' + this.data.code.replace(/\s/g, ' ')
      } else if (this.data.newDelete) {
        return '- ' + this.data.code.replace(/\s/g, ' ')
      } else if (this.data.origin) {
        return '  ' + this.data.code.replace(/\s/g, ' ')
      } else if (this.data.locate) {
        return this.data.code.replace(/\s/g, ' ')
      }
    },
    autoColor (val, numberArea) {
      if (val.origin) {
        return 'background-color:' + (numberArea ? 'rgba(0,0,0,0.05)' : 'white')
      }
      if (val.newAdd) {
        return 'background-color: #DBFFDB'
      }
      if (val.newDelete) {
        return 'background-color: #FFD3D3'
      }
      if (val.locate) {
        return 'background-color: rgba(0,0,0,0.05); color:lightgrey'
      }
    },
  },

}
</script>

<style scoped>
  .line-number {
    width: 2rem;
    height: 24px;
    text-align: right;
    padding-right: 2px;
    color: #a8a8a8;
    font-weight: 200;
    font-size: 13px;
    line-height: 24px;
  }

  .old-line {
    border-right: 1px solid lightgrey;
  }

  .code {
    padding-left: 5px;
    white-space: pre;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
    font-size: 13px;
    font-weight: 400;
    line-height: 24px;
  }
</style>
