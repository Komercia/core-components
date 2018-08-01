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
    envios: {
      valores: {
        envio_metodo: 'gratis'
      }
    },
    tienda: {},
    userData: {
      id: 0,
      email: 'pumar-10@hotmail.com',
      foto: 'user.jpeg',
      nombre: 'Alejandro Fierro'
    },
    banners: [],
    productos: [],
    productsData: [
      {
        placeholder: true,
        foto: 'placeholder1.svg',
        nombre: 'Nombre del producto',
        precio: '14999',
      },
      {
        placeholder: true,
        foto: 'placeholder2.svg',
        nombre: 'Nombre del producto',
        precio: '14999',
      },
      {
        placeholder: true,
        foto: 'placeholder3.svg',
        nombre: 'Nombre del producto',
        precio: '14999',
      },
      {
        placeholder: true,
        foto: 'placeholder4.svg',
        nombre: 'Nombre del producto',
        precio: '14999',
      },
    ],
    menuComponent: false,
    productsCart: cart,
    categorias: [],
    subcategorias: [],
    geolocalizacion: [],
    togglePayment: false,
    beforeCombination: [],
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
      axios.get(`https://templates.komercia.co/api/tienda/240`).then(response => {
        state.banners = response.data.data.banners;
        if(response.data.data.productos.length){
          state.productos = response.data.data.productos.sort((a, b) => a.nombre > b.nombre);
          state.productsData = response.data.data.productos.sort((a, b) => {
            if(a.nombre < b.nombre) return -1;
            if(a.nombre > b.nombre) return 1;
            return 0;
          });
          state.productsData.map((product) => {
          if (product.variantes.length) {
            product.combinaciones = JSON.parse(product.variantes[0].combinaciones[0].combinaciones)
            if (product.combinaciones.length) {
              const arrPrices = product.combinaciones.map(combinacion => combinacion.precio)
              product.precio = Math.min(...arrPrices)
            }
            product.variantes = product.variantes[0].variantes
          }
        })
        }
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
