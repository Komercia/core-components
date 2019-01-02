<template>
  <div class="product_list1">
    <paginate
      name="products"
      :list="products"
      :per="40"
      tag="div"
      class="product_list">
      <div :is="selectedCard" v-for="product in paginated('products')" :key="product.id" :data="product"></div>
    </paginate>
    <paginate-links
      v-if="products.length > 41"
      for="products"
      :show-step-links="true"
      :limit="5">
    </paginate-links>
  </div>
</template>

<script>
export default {
  name: 'KoProductList1',
  data() {
    return {
      paginate: ['products'],
    }
  },
  computed: {
    selectedCard () {
      return this.$store.state.selectedCard
    },
    products() {
      return this.$store.state.productsData;
    },
  },
}
</script>

<style>
  .product_list1{
    width: 100%;
    display: grid;
    grid-template-columns: minmax(auto, 1366px);
    justify-content: center;
    justify-items: center;
    margin: 20px 0;
  }
  .product_list1 .product_list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 50px;
    margin: 0 auto;
    padding: 20px 0;
  }
  .product_list1 .paginate-links.products {
    display: flex;
    margin-top: 30px;
    /*border: 1px solid black;*/
  }
  .product_list1 .paginate-links.products li{
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text_color);
    cursor: pointer;
  }
  /*.paginate-links.products li ~ li{
    border-left: 1px solid black;
  }*/
  .product_list1 .paginate-links.products li.active{
    background-color: var(--button_color);
    color: var(--button_text_color);
  }
  .product_list1 .paginate-links.products li[class$="arrow"] {
    /*background-color: var(--button_color);*/
    color: var(--button_color);
    font-weight: bold;
    font-size: 30px;
    /*border-radius: 50%;*/
  }
  @media (max-width: 560px) {
    .product_list1 .product_list {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      grid-gap: 25px;
    }
  }
  @media (max-width: 420px) {
    .product_list1 .product_list {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      grid-gap: 0px;
    }
  }
</style>
