<template lang="html">
<div  class="searcher" >
  <el-input placeholder="Buscar producto" v-model="search" class="input-with-select" @keydown.enter.prevent="Sendsearch">
    <el-button slot="append" icon="el-icon-search"button @click="Sendsearch" > </el-button>
  </el-input>
</div>
</template>

<script>
export default {
  name:'koSearcher',
  data() {
    return {
      input: '',
      search:'',
    }
  },
  methods:{
    Sendsearch(){
      this.$emit("searcher",this.search)
    },

  },
  computed:{
    products() {
      return this.$store.state.productsData;
    },
  }
}
</script>

<style>
.searcher{
   margin:0;
}

</style>
