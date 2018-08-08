// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import locale from 'element-ui/lib/locale/lang/es'
import '../static/index.css'
import elementUI from 'element-ui';
import VuePaginate from 'vue-paginate';
import ImageCloudinary from 'image-cloudinary';
import VueFuse from 'vue-fuse';
import Components from './index'
import Settings from './settings'
import IconBase from './Icons/IconBase'
import firebase from './utils/connect_firebase'
import KomerciaCropper from 'komercia-cropper'

Vue.prototype.$firebase = firebase;

Vue.component('icon-base', IconBase)
Vue.use(Components)
Vue.use(Settings)
Vue.use(VueFuse)
Vue.use(VuePaginate)
Vue.use(Vuex)
Vue.use(ImageCloudinary)
Vue.use(KomerciaCropper)
Vue.config.productionTip = false;

Vue.use(elementUI, { locale })

Vue.prototype.$urlHttp = 'https://api.komercia.co'
store.state.urlHttp = Vue.prototype.$urlHttp

const getCookie = (cname) => {
  const name = `${cname  }=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return '16agNLhBNkZUbmbco6pnY0RvKh3YvGWbcw11YrVM'
}

const authData = getCookie('authData')
if (authData) {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authData}`,
      'Access-Control-Allow-Origin': '*'
    }
  }
  axios.get('https://api.komercia.co/api/user/data', config).then(response => {
    store.state.userData = response.data.usuario
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
