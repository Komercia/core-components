import Vue from 'vue';
import Router from 'vue-router';

const Products = () => import('@/Views/Products');
const Home = () => import('@/Views/Home');
const Product = () => import('@/Views/Product');
const Order = () => import('@/Views/Order');

Vue.use(Router);

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/productos',
      name: 'Products',
      component: Products,
    },
    {
      path: '/productos/:slug',
      name: 'Product',
      component: Product,
    },
    {
      path: '/pedido',
      name: 'Order',
      component: Order,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
