import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    urlHttp: '',
    envios: {},
    tienda: {},
    banners: [],
    productos: [],
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
    styleData: {
      backgroundMain: { backgroundColor: 'red'},
      backgroundSecondary: { backgroundColor: 'blue'},
      colorMain: { color: 'black'},
      colorSecondary: { color: 'white'}
    }
  },
  mutations: {
    GET_DATA (state) {
      axios.get(`${state.urlHttp}/api/front/tienda/349`).then(response => {
        state.banners = response.data.data.banners;
        state.productos = response.data.data.productos;
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
  },
});
