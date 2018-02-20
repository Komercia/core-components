<template>
    <div class="grid">
      <div v-for="product in products" :key="product.id"  class="grid-item">
        <ko-product-card :data="product" />
      </div>
    </div>
</template>
<script>
import KoProductCard from '../_productCard/product-card';

export default {
  name: "koGrid1",
  components: {KoProductCard},
  data() {
    return {

    };
  },
  computed: {
    products() {
      return this.$store.state.productos.slice(0,6);
    },
  },
};
</script>

<style>

</style>
