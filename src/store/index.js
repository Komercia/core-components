import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let cart = [];
if (localStorage.getItem('ShoppingCart')) {
  cart = JSON.parse(localStorage.getItem('ShoppingCart'));
}

export default new Vuex.Store({
  state: {
    urlHttp: '',
    openOrder: false,
    envios: {},
    tienda: {},
    userData: {
      id: 270,
      email: 'pumar-10@hotmail.com',
      foto: 'user.jpg',
      nombre: 'Alejandro Fierro'
    },
    banners: [],
    productos: [],
    productsData: [],
    menuComponent: false,
    productsCart: cart,
    categorias: [],
    subcategorias: [],
    geolocalizacion: null,
    mediospago: {
      epayco: false,
    },
    politicas: {
      garantia: '',
      datos: '',
    },
    totalCart: 0,
  },
  mutations: {
    GET_DATA (state) {
      axios.get(`${state.urlHttp}/api/front/tienda/431`).then(response => {
        state.banners = response.data.data.banners;
        state.productos = response.data.data.productos;
        state.productsData = response.data.data.productos;
        state.categorias = response.data.data.categorias;
        state.subcategorias = response.data.data.subcategorias;
        state.geolocalizacion = response.data.data.geolocalizacion;
        state.mediospago = response.data.data.medios_pago || {
          epayco: false,
        };
        state.politicas = response.data.data.politicas || {
          garantia: '',
          datos: '',
        };
        state.tienda = response.data.data.tienda;
        state.envios = response.data.data.medios_envio;
        state.envios.valores = JSON.parse(
          response.data.data.medios_envio.valores
        );
      });
    },
    UPDATE_CONTENTCART(state) {
      state.totalCart = 0;
      localStorage.setItem('ShoppingCart', JSON.stringify(state.productsCart));
      for (const product of state.productsCart) {
        state.totalCart += (product.precio * product.cantidad);
      }
    },
    REMOVE_PRODUCTSPURCHASED(state, id) {
      if (document.getElementById(id)) {
        document.getElementById(id).classList.remove('bought');
      }
    },
    CALCULATE_TOTALCART(state) {
      state.totalCart = 0;
      for (const product of state.productsCart) {
        state.totalCart += (product.precio * product.cantidad);
      }
    },
  },
});
