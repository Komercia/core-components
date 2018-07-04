<template lang="html">
<div  class="searcher" >
  <el-input placeholder="Buscar producto" v-model="search" class="input-with-select" @keydown.enter.prevent="sendSearch">
    <el-button slot="append" icon="el-icon-search"button @click="sendSearch" > </el-button>
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
  methods:{
    sendSearch(){
      this.$emit("searcher",this.search)
    },
  },
}
</script>

<style>
.searcher{
   margin:0;
}

</style>
