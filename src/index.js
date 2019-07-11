import Vue from 'vue';
import koHeader4 from './components/headers/header4';
import koSlider1 from './components/sliders/slider1/v1';
import koSeparator1 from './components/separators/separator1';
import koNewsletter from './components/newsletters/newsletter1';
import koFooter3 from './components/footers/footer3';
import koOrder1 from './components/_order/order1';

const Components = {
  koHeader4,
  koSlider1,
  koSeparator1,
  koNewsletter,
  koFooter3,
  koOrder1
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});
export default Components;

// import Chat from './components/chat/chat';
// import Whatsapp from './components/chat/whatsapp.vue';
// import Preloader from './components/preloaders/preloader1';
// import Header1 from './components/headers/header1';
// import Header2 from './components/headers/header2';
// import Header3 from './components/headers/header3';
// import Header4 from './components/headers/header4';
// import Header4v1 from './components/headers/header4/v1';
// import HeaderThomas from './components/headers/headerThomas';
// import Header6 from './components/headers/header6';
// import Cart1 from './components/carts/cart1';
// import Product1 from './components/products/product1';
// import Product2 from './components/products/product2';
// import Contact1 from './components/contacts/contact1';
// import Contact2 from './components/contacts/contact2';
// import Content1 from './components/contents/content1';
// import Content2 from './components/contents/content2/v1';
// import Video1 from './components/videos/video1';
// import Slider3 from './components/sliders/slider3';
// import Slider1 from './components/sliders/slider1/v1';
// import Slider4 from './components/sliders/slider4/v1';
// import Slider11 from './components/sliders/slider1/v2';
// import Slider1v3 from './components/sliders/slider1/v3';
// import Slider5v1 from './components/sliders/slider5/v1';
// import Separator from './components/separators/separator1';
// import Separator1V1 from './components/separators/separator1/v1';
// import Grid1 from './components/grids/grid1';
// import Grid2 from './components/grids/grid2';
// import ProductList1 from './components/product_lists/product_list1';
// import ProductList2 from './components/product_lists/product_list2';
// import ProductList3 from './components/product_lists/product_list3';
// import ProductCard1 from './components/_productCard/product_card1';
// import ProductCard2 from './components/_productCard/product_card2';
// import Newsletter from './components/newsletters/newsletter1';
// import Footer1 from './components/footers/footer1';
// import Footer2 from './components/footers/footer2';
// import Footer3 from './components/footers/footer3';
// import Order1 from './components/_order/order1';
// import setting from './settings';

// const components = [
//   ...setting,
//   Chat,
//   Whatsapp,
//   Preloader,
//   Header1,
//   Header2,
//   Header3,
//   Header4,
//   Header4v1,
//   Header6,
//   HeaderThomas,
//   Cart1,
//   Product1,
//   Product2,
//   Contact1,
//   Contact2,
//   Content1,
//   Content2,
//   Slider1,
//   Slider3,
//   Slider4,
//   Slider5v1,
//   Slider11,
//   Slider1v3,
//   Separator,
//   Separator1V1,
//   Grid1,
//   Grid2,
//   ProductList1,
//   ProductList2,
//   ProductList3,
//   ProductCard1,
//   ProductCard2,
//   Newsletter,
//   Footer1,
//   Footer2,
//   Footer3,
//   Order1,
//   Video1
// ];

// const modules = {};
// modules.install = Vue => {
//   for (let i = 0, size = components.length; i < size; i += 1) {
//     Vue.component(components[i].name, components[i]);
//   }
// };
// export default modules;
