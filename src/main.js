// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import locale from 'element-ui/lib/locale/lang/es';
import '../static/index.css';
import elementUI from 'element-ui';
import VuePaginate from 'vue-paginate';
import ImageCloudinary from 'image-cloudinary';
import VueFuse from 'vue-fuse';
import Components from './index';
import Settings from './settings';
import IconBase from './Icons/IconBase';
import firebase from './utils/connect_firebase';
import KomerciaCropper from 'komercia-cropper';
import SocialSharing from 'vue-social-sharing';
import Meta from 'vue-meta';
import VueCarousel from 'vue-carousel';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

Vue.prototype.$firebase = firebase;

Vue.component('icon-base', IconBase);
Vue.use(Components);
Vue.use(Settings);
Vue.use(VueFuse);
Vue.use(VuePaginate);
Vue.use(Vuex);
Vue.use(ImageCloudinary);
Vue.use(KomerciaCropper);
Vue.config.productionTip = false;

Vue.use(SocialSharing);
Vue.use(Meta);

Vue.use(elementUI, { locale });
Vue.use(VueAwesomeSwiper);

Vue.use(VueCarousel);

Vue.prototype.$urlHttp = 'https://api2.komercia.co';
store.state.urlHttp = Vue.prototype.$urlHttp;

const getCookie = cname => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
  // return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2YTYxY2M3Mjc1Y2M4YTA3N2I0MjNhODgwZDA4Y2RiZjkyODZjZGRiM2FmZTRkOWIzYWNiMTM3NmFmMGQ5YzIxNTYzNmYwNjRiYzYyZTkxIn0.eyJhdWQiOiIxIiwianRpIjoiYjZhNjFjYzcyNzVjYzhhMDc3YjQyM2E4ODBkMDhjZGJmOTI4NmNkZGIzYWZlNGQ5YjNhY2IxMzc2YWYwZDljMjE1NjM2ZjA2NGJjNjJlOTEiLCJpYXQiOjE1NDUzNDU1OTUsIm5iZiI6MTU0NTM0NTU5NSwiZXhwIjoxNTc2ODgxNTk1LCJzdWIiOiI2OTciLCJzY29wZXMiOltdfQ.OGnyWiqPpXoWHZ-aA7BftaOeNu9TKsSxcXJgqTe6UgNHSoEMDKRo5HZsgVpOeKHfZf1do13WW5OZQ-jkzXA4dI1y1sOVZXEOD3TZNZb3Fx_4IUS67g6OXI6ycOzJiK3_ki2aGsarPERq7LB8fB6DB95vD8WLWO8rwpWlk7aRqsFmGW6nt39nZ3HdsRL1vNwcz1e63tH9qKtaDEyyyLI7PHGZGXsW1QKSWHvOoOo44Y6rLaT2PX5p04TKmyLL-7obyTSfScw705TJZ21hCLLFZE3AmDoUJixVyGfrCbJIbWWPcTxnoynqtTlh2yBOriTUCavfGog93rT0rguwZPsKgxZcMyDSlMSeRckkLGHsyloja_YjDB3WP98ekHRBHeO-DMxfzo6f8TPdAYiMYQ7oEqDBbJBWoBtnp9zRL3WCD3TVeg7ilyIEiklmGQYu42YukLb_GJSYHHOuageCLBLQs3wnMdy_Hq_kbptVVL0ll6ON8aI_u8cicj_Ra57bgi3bqzOsdI4WDkKVeOatPOAmAC2AwVoBveQoHRtObwoVUfYq2DWkY0TzoWCfPcrhw26MKemJ3yW0i3Jn_hFdCqWXM_qkQQvsMflOugu6P2YkWALHS3VqZXY-qNR16Qsb8u7Rq4GJEVNVtgPLxGJhHnHoX9F5zUYCZELuK85vkZz05s0';
};

const authData = getCookie('authData');
const config = {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${authData}`,
    'Access-Control-Allow-Origin': '*'
  }
};
store.state.configHttp = config
Vue.prototype.$configHttp = config;
if (authData) {
  axios.get('https://api2.komercia.co/api/user', config).then(response => {
    store.state.userData = response.data.data;
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
