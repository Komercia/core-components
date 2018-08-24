<template>
  <div class="related">
    productos relacionados
  </div>
</template>

<script>
export default {
  computed: {
    productsData() {
      return this.$store.state.productsData
    }
  }
}
</script>

<style scoped>
</style>
