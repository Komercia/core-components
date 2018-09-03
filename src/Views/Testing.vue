<template>
  <div class="testing">
    <Menu/>
    <!-- <ko-slider2/> -->
    <!-- <ko-slider3/> -->
    <!-- <grid2/> -->
    <!-- <contact2/> -->
    <product2/>
    <!-- <product-list3/> -->
    <!-- <newsletter1/> -->
    <footer3/>
  </div>
</template>

<script>
import Menu from '../components/headers/header4'
import koSlider2 from '../components/sliders/slider2'
import koSlider3 from '../components/sliders/slider3'
import Product1 from '../components/products/product1'
import Product2 from '../components/products/product2'
import ProductList3 from '../components/product_lists/product_list3'
import Grid2 from '../components/grids/grid2'
import Contact2 from '../components/contacts/contact2'
import Newsletter1 from '../components/newsletters/newsletter1'
import Footer3 from '../components/footers/footer3'
export default {
  components: {
    Menu,
    Grid2,
    koSlider2,
    koSlider3,
    ProductList3,
    Product1,
    Product2,
    Newsletter1,
    Contact2,
    Footer3
  }
}
</script>

<style>
.testing {
  width: 100%;
}
</style>
