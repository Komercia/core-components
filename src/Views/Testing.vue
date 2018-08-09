<template>
  <div class="testing">
    <Menu/>
    <!-- <ko-slider3/> -->
    <!-- <grid2/> -->
    <product-list3/>
    <footer3/>
  </div>
</template>

<script>
import Menu from '../components/headers/header4'
import koSlider3 from '../components/sliders/slider3'
import Grid2 from '../components/grids/grid-categories'
import ProductList3 from '../components/product_lists/product_list3'
import Footer3 from '../components/footers/footer3'
export default {
  components: { Menu, Grid2, koSlider3, ProductList3, Footer3 }
}
</script>

<style>
.testing {
  width: 100%;
}
</style>
