import axios from 'axios';
import firebase from '../utils/connect_firebase';
import cities from './modules/cities';
import products from './modules/products';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const firestore = firebase.firestore();
// firestore.settings();

let cart = [];
if (localStorage.getItem('ShoppingCart')) {
  cart = JSON.parse(localStorage.getItem('ShoppingCart'));
  console.log('error: ', cart);
}

export const state = () => ({
  urlHttp: 'https://api2.komercia.co',
  idTienda: 178,
  configHttp: {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer `,
      'Access-Control-Allow-Origin': '*'
    }
  },
  authData: '',
  userData: {
    id: 0
  },
  storeLayoutKey: '',
  storeLayout: {
    pages: [
      {
        name: 'Inicio',
        active: true,
        components: [],
        value: 'home',
        exception: ['products', 'carts']
      },
      {
        name: 'Productos',
        active: true,
        components: [],
        value: 'products',
        exception: ['products', 'carts', 'contacts']
      },
      {
        name: 'Detalle del producto',
        active: true,
        components: [],
        value: 'product_details',
        only: ['products']
      },
      {
        name: 'Carrito',
        active: true,
        components: [],
        value: 'cart',
        only: ['carts']
      },
      {
        name: 'Contacto',
        active: true,
        components: [],
        value: 'contact',
        only: ['contacts']
      }
    ]
  },
  productsCart: cart,
  totalCart: 0,
  selectedCard: 'koProductCard2',
  beforeCombination: [],
  togglePayment: false,
  envios: {
    valores: {
      envio_metodo: 'gratis'
    }
  },
  tienda: {},
  detalleProducto: {},
  banners: [],
  cities: [],
  productsData: [],
  categorias: [],
  subcategorias: [],
  geolocalizacion: [],
  openOrder: false,
  mediospago: {
    epayco: false
  },
  settingData:{},
  politicas: {
    garantia: '',
    datos: ''
  },
  whatsapp: '',
  totalCart: 0,
  sections: null,
  components: null,
});

export const getters = {
  getterValue: state => {
    return state.value;
  }
};

export const mutations = {
  SET_OPENORDER: (state, value) => {
    state.openOrder = value;
  },
  SET_DETALLEPRODUCTO: (state, payload) => {
    state.detalleProducto = payload
  },
  SET_TOKEN: (state, value) => {
    state.configHttp = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${value || process.env.TOKEN}`,
        'Access-Control-Allow-Origin': '*'
      }
    };
  },
  SET_DATA: (state, response) => {
    state.productsData = response.data.data.productos.sort((a, b) => {
      if (a.nombre < b.nombre) return -1;
      if (a.nombre > b.nombre) return 1;
      return 0;
    });
    state.productsData.map(product => {
      if (product.variantes.length) {
        try {
          product.combinaciones = JSON.parse(
            product.variantes[0].combinaciones[0].combinaciones
          );
        } catch (err) {
          console.warn(product.id);
        }
        if (product.combinaciones.length) {
          const arrPrices = product.combinaciones.map(
            combinacion => combinacion.precio
          );
          product.precio = Math.min(...arrPrices);
        }
        product.variantes = product.variantes[0].variantes;
      }
    });
    state.products.fullProducts = state.productsData;
    state.categorias = response.data.data.categorias;
    state.subcategorias = response.data.data.subcategorias;
    state.geolocalizacion = response.data.data.geolocalizacion;
    state.mediospago = response.data.data.medios_pago || {
      epayco: false
    };
    state.politicas = response.data.data.politicas || {
      garantia: '',
      datos: ''
    };
    state.tienda = response.data.data.tienda;
    state.envios = response.data.data.medios_envio;
    state.envios.valores = JSON.parse(response.data.data.medios_envio.valores);
    state.whatsapp = state.tienda.whatsapp;
  },
  GET_USERDATA: state => {
    let headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${state.authData || ''}`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json'
    };
    axios({
      method: 'get',
      url: 'https://api2.komercia.co/api/user',
      headers
    }).then(response => {
      state.userData = response.data.data;
    });
  },
  SET_FAVICON: state => {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = state.storeLayout.setting.faviconURL.url;
    document.getElementsByTagName('head')[0].appendChild(link);
  },
  UPDATE_CONTENTCART: state => {
    state.totalCart = 0;
    localStorage.setItem('ShoppingCart', JSON.stringify(state.productsCart));
    state.productsCart.forEach(product => {
      state.totalCart += product.precio * product.cantidad;
    });
  },
  CALCULATE_TOTALCART: state => {
    state.totalCart = 0;
    state.productsCart.forEach(product => {
      state.totalCart += product.precio * product.cantidad;
    });
  },
  SET_SETTING(state, setting) {
    state.settingData = setting;
  },
  LOGOUT: () => {
    window.location.href = 'https://perfil.komercia.co/logout';
  },
  SELECT_CARD: (state, value) => {
    state.selectedCard = value;
    state.storeLayout.setting.card = value;
  },
  GET_CITIES: state => {
    axios.get(`https://api2.komercia.co/api/ciudades`).then(response => {
      state.cities = response.data.data;
    });
  }
};

export const actions = {
  async GET_DATA({ state, commit }) {
    axios
      .get(`https://templates.komercia.co/api/tienda/${state.idTienda}`)
      .then(response => {
        commit('SET_DATA', response);
      });
  },
  UPDATE_ID_TIENDA({ state, dispatch }, newValue) {
    state.idTienda = newValue;
    dispatch('GET_DATA');
  },
  GET_WHATSAPP({ state }) { },
  GET_SECTIONS({ state }) {
    axios
      .get(
        `https://komercia-2c50b.firebaseio.com/sections.json?auth=NbJcMDHW4Ueg4x67y5hHmxbZF3fhsyneVfQBpSFn`
      )
      .then(response => {
        state.sections = Object.values(response.data);
      });
  },
  GET_COMPONENTS({ state }) {
    firestore
      .collection('components_testing')
      .get()
      .then(querySnapshot => {
        const components = {};
        querySnapshot.forEach(doc => {
          components[doc.id] = { label: '', options: [] };
          components[doc.id].label = doc.id;
          components[doc.id].options = Object.values(doc.data());
        });
        state.components = components;
      });
  },
  CREATE_COMPONENT({ state }, { newComponent, selectedSection }) {
    firestore
      .collection('components_testing')
      .doc(selectedSection)
      .update({ 1: newComponent });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    cities,
    products
  }
});
