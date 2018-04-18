<template>
  <div id="app">
    <cart-1 />
    <product-list-1 />
  </div>
</template>

<script>
import koChat from './components/chat/chat';
import ProductList1 from './components/product_lists/product_list1';
import koContact1 from './components/contacts/contact1';
import koOrder from './components/_order/order1';
import koHeader1 from './components/headers/header1';
import koHeader2 from './components/headers/header2';
import koHeader3 from './components/headers/header3';
import koSlider1 from './components/sliders/slider1';
import koSlider2 from './components/sliders/slider2';
import koSeparator1 from './components/separators/separator1';
import koGrid1 from './components/grids/grid1';
import koNewsletter1 from './components/newsletters/newsletter1';
import koFooter1 from './components/footers/footer1';
import koProduct1 from './components/products/product1';
import cart1 from './components/carts/cart1.vue';

export default {
  name: 'app',
  components: {
    koContact1,
    ProductList1,
    koChat,
    koOrder,
    koHeader1,
    koHeader2,
    koHeader3,
    koSlider1,
    koSlider2,
    koSeparator1,
    koGrid1,
    koNewsletter1,
    koFooter1,
    koProduct1,
    cart1
  },
  created() {
    this.$store.commit('GET_DATA')
  },
  data() {
    return {
      settingBanner: {
        banners: [
          {
            position: 'center',
          },
          {
            position: 'center',
          }
        ]
      }
    }
  }
};
</script>

<style>
@import './assets/css/main.css';
:root {
  --main_color: #00acc1;
  --text_color: #383838;
  --button_color: #00acc1;
  --button_text_color: #FFF;
  --background_color: #FFF;
}
#app{
  background-color: var(--background_color);
}
</style>
