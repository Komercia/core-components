  <template>
  <div id="app">
    <!-- <koChat /> -->
    <!-- <cart1 /> -->
    <!-- <koContact1 /> -->
    <!-- <koFooter1 /> -->
    <!-- <koFooter2 /> -->
    <!-- <koGrid1 /> -->
    <!-- <koHeader1 /> -->
    <!-- <koHeader2 /> -->
    <!-- <koHeader3 /> -->
    <!-- <koNewsletter1 /> -->
    <!-- <ProductList1 /> -->
    <ProductList2/>
    <!-- <koProduct1 /> -->
    <!-- <koSeparator1 /> -->
    <!-- <koSlider1 /> -->
    <!-- <Slider11 /> -->
    <!-- <koSlider2/> -->
    <!-- <koContent2/> -->
  </div>
</template>

<script>
import koContent2 from './components/content/content2';
import koChat from './components/chat/chat';
import koOrder1 from './components/_order/order1';

import cart1 from './components/carts/cart1.vue';

import koContact1 from './components/contacts/contact1';


import koFooter1 from './components/footers/footer1';
import koFooter2 from './components/footers/footer2';

import koGrid1 from './components/grids/grid1';

import koHeader1 from './components/headers/header1';
import koHeader2 from './components/headers/header2';
import koHeader3 from './components/headers/header3';

import koNewsletter1 from './components/newsletters/newsletter1';

import ProductList1 from './components/product_lists/product_list1';
import ProductList2 from './components/product_lists/product_list2';

import koProduct1 from './components/products/product1';

import koSeparator1 from './components/separators/separator1';

import koSlider1 from './components/sliders/slider1';
import Slider11 from './components/sliders/slider1-1';
import koSlider2 from './components/sliders/slider2';

export default {
  name: 'app',
  components: {
    koChat,
    koOrder1,
    cart1,
    koContact1,
    koFooter1,
    koFooter2,
    koGrid1,
    koHeader1,
    koHeader2,
    koHeader3,
    koNewsletter1,
    ProductList1,
    ProductList2,
    koProduct1,
    koSeparator1,
    koSlider1,
    Slider11,
    koSlider2,
    koContent2,

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
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@import './assets/css/main.css';

*{
  font-family: 'Open Sans', sans-serif;
}

:root {
  --main_color: #F200FF;
  --text_color: #292B32;
  --button_color: #F200FF;
  --button_text_color: #FFF;
  --background_color: #FFF;
}
#app{
  background-color: var(--background_color);
}
</style>
