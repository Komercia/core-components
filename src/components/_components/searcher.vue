<template>
  <div  class="searcher">
    <el-input placeholder="Buscar producto" v-model="search" class="input-with-select" @keydown.enter.prevent="sendSearch">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name:'koSearcher',
  data() {
    return {
      search:'',
    }
  },
  watch:{
    search(value) {
      if (value.length) {
        this.$store.dispatch('products/FILTER_BY', {type:'search', data: value})
      } else {
        this.$store.dispatch('products/FILTER_BY', {type:'all', data: ''})
      }
      // this.$emit("searcher", value)
    },
  },
}
</script>

<style>
.searcher {
  padding: 5px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

</style>
