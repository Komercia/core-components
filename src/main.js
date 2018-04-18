// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import elementUI from 'element-ui';
import firebase from 'firebase';
import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate)
Vue.config.productionTip = false;

Vue.use(elementUI);

Vue.prototype.$urlHttp = 'https://api.komercia.co';
store.state.urlHttp = Vue.prototype.$urlHttp;

const config = {
  apiKey: 'AIzaSyCCQZKHS6vcparUI-0pLJDWJmU8YKzVszY',
  authDomain: 'komercia-2c50b.firebaseapp.com',
  databaseURL: 'https://komercia-2c50b.firebaseio.com',
  projectId: 'komercia-2c50b',
  storageBucket: 'komercia-2c50b.appspot.com',
  messagingSenderId: '1098181302565'
}
firebase.initializeApp(config)
window.firebase = firebase;

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
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const authData = getCookie('authData');
if (authData) {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authData}`,
      'Access-Control-Allow-Origin': '*',
    },
  };
  axios.get('https://api.komercia.co/api/user/data', config).then((response) => {
    store.state.userData = response.data.usuario;
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
