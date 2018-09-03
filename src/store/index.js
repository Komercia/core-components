import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import axios from 'axios'
import firebase from '../utils/connect_firebase'

const firestore = firebase.firestore()
const settings = { /* your settings... */ timestampsInSnapshots: true }
firestore.settings(settings)

Vue.use(Vuex)

let cart = []
if (localStorage.getItem('ShoppingCart')) {
  cart = JSON.parse(localStorage.getItem('ShoppingCart'))
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
    idTienda: 404,
    tienda: {
      telefono: ''
    },
    userData: {
      id: 0,
      email: '',
      foto: '',
      nombre: ''
    },
    banners: [],
    selectedCard: 'koProductCard2',
    productsData: [
      {
        id: 0,
        placeholder: true,
        foto_cloudinary:
          'https://cdn.shopify.com/s/files/1/0207/8508/products/Magnolia_Tees_Edit_4_of_17_1024x1024.jpg?v=1504703736',
        nombre: 'Nombre del producto',
        precio: '14999',
        slug: '',
        categoria: 'Camisetas'
      },
      {
        id: 1,
        placeholder: true,
        foto_cloudinary:
          'https://cdn.shopify.com/s/files/1/0207/8508/products/Magnolia_Tees_Edit_4_of_17_1024x1024.jpg?v=1504703736',
        nombre: 'Nombre del producto',
        precio: '14999',
        slug: '',
        categoria: 'Camisetas'
      },
      {
        id: 2,
        placeholder: true,
        foto_cloudinary:
          'https://cdn.shopify.com/s/files/1/0207/8508/products/Magnolia_Tees_Edit_4_of_17_1024x1024.jpg?v=1504703736',
        nombre: 'Nombre del producto',
        precio: '14999',
        slug: '',
        categoria: 'Camisetas'
      },
      {
        id: 3,
        placeholder: true,
        foto_cloudinary:
          'https://cdn.shopify.com/s/files/1/0207/8508/products/Magnolia_Tees_Edit_4_of_17_1024x1024.jpg?v=1504703736',
        nombre: 'Nombre del producto',
        precio: '14999',
        slug: '',
        categoria: 'Camisetas'
      },
      {
        id: 4,
        placeholder: true,
        foto_cloudinary:
          'https://cdn.shopify.com/s/files/1/0207/8508/products/Magnolia_Tees_Edit_4_of_17_1024x1024.jpg?v=1504703736',
        nombre: 'Nombre del producto',
        precio: '14999',
        slug: '',
        categoria: 'Camisetas'
      },
      {
        id: 5,
        placeholder: true,
        foto_cloudinary:
          'https://cdn.shopify.com/s/files/1/0207/8508/products/Magnolia_Tees_Edit_4_of_17_1024x1024.jpg?v=1504703736',
        nombre: 'Nombre del producto',
        precio: '14999',
        slug: '',
        categoria: 'Blusas'
      },
      {
        id: 6,
        placeholder: true,
        foto_cloudinary:
          'https://cdn.shopify.com/s/files/1/0207/8508/products/Magnolia_Tees_Edit_4_of_17_1024x1024.jpg?v=1504703736',
        nombre: 'Nombre del producto',
        precio: '14999',
        slug: '',
        categoria: 'Blusas'
      },
      {
        id: 7,
        placeholder: true,
        foto_cloudinary:
          'https://cdn.shopify.com/s/files/1/0207/8508/products/Magnolia_Tees_Edit_4_of_17_1024x1024.jpg?v=1504703736',
        nombre: 'Nombre del producto',
        precio: '14999',
        slug: '',
        categoria: 'Blusas'
      }
    ],
    menuComponent: false,
    productsCart: cart,
    categorias: [
      {
        id: 0,
        nombre_categoria_producto: 'Camisetas'
      },
      {
        id: 1,
        nombre_categoria_producto: 'Blusas'
      },
      {
        id: 2,
        nombre_categoria_producto: 'Polos'
      },
      {
        id: 3,
        nombre_categoria_producto: 'Jeans'
      },
      {
        id: 4,
        nombre_categoria_producto: 'Faldas'
      },
      {
        id: 5,
        nombre_categoria_producto: 'Camisas'
      }
    ],
    subcategorias: [],
    geolocalizacion: [],
    togglePayment: false,
    beforeCombination: [],
    settingData: null,
    mediospago: {
      epayco: false
    },
    politicas: {
      garantia: '',
      datos: ''
    },
    totalCart: 0,
    sections: null,
    components: null
  },
  mutations: {
    GET_DATA(state) {
      axios
        .get(`https://templates.komercia.co/api/tienda/${state.idTienda}`)
        .then(response => {
          state.banners = response.data.data.banners
          if (response.data.data.productos.length) {
            state.productsData = response.data.data.productos.sort((a, b) => {
              if (a.nombre < b.nombre) return -1
              if (a.nombre > b.nombre) return 1
              return 0
            })
            state.productsData.map(p => {
              const product = p
              if (product.variantes.length) {
                product.combinaciones = JSON.parse(
                  product.variantes[0].combinaciones[0].combinaciones
                )
                if (product.combinaciones.length) {
                  const arrPrices = product.combinaciones.map(
                    combinacion => combinacion.precio
                  )
                  product.precio = Math.min(...arrPrices)
                }
                product.variantes = product.variantes[0].variantes
              }
              return product
            })
            state.products.fullProducts = state.productsData
          }
          if (response.data.data.categorias.length) {
            state.categorias = response.data.data.categorias
          }
          state.subcategorias = response.data.data.subcategorias
          state.geolocalizacion = response.data.data.geolocalizacion
          state.mediospago = response.data.data.medios_pago || {
            epayco: false
          }
          state.politicas = response.data.data.politicas || {
            garantia: '',
            datos: ''
          }
          state.tienda = response.data.data.tienda
          state.envios = response.data.data.medios_envio
          state.envios.valores = JSON.parse(
            response.data.data.medios_envio.valores
          )
        })
    },
    UPDATE_CONTENTCART(state) {
      state.totalCart = 0
      localStorage.setItem('ShoppingCart', JSON.stringify(state.productsCart))
      for (const product of state.productsCart) {
        state.totalCart += product.precio * product.cantidad
      }
    },
    REMOVE_PRODUCTSPURCHASED(state, id) {
      if (document.getElementById(id)) {
        document.getElementById(id).classList.remove('bought')
      }
    },
    CALCULATE_TOTALCART(state) {
      state.totalCart = 0
      for (const product of state.productsCart) {
        state.totalCart += product.precio * product.cantidad
      }
    },
    SET_SETTING(state, setting) {
      state.settingData = setting
    }
  },
  actions: {
    UPDATE_ID_TIENDA({ state, commit }, newValue) {
      state.idTienda = newValue
      commit('GET_DATA')
    },
    GET_SECTIONS({ state }) {
      axios
        .get(
          `https://komercia-2c50b.firebaseio.com/sections.json?auth=NbJcMDHW4Ueg4x67y5hHmxbZF3fhsyneVfQBpSFn`
        )
        .then(response => {
          state.sections = Object.values(response.data)
        })
    },
    GET_COMPONENTS({ state }) {
      firestore
        .collection('components_testing')
        .get()
        .then(querySnapshot => {
          const components = {}
          querySnapshot.forEach(doc => {
            components[doc.id] = { label: '', options: [] }
            components[doc.id].label = doc.id
            components[doc.id].options = Object.values(doc.data())
          })
          state.components = components
        })
    },
    CREATE_COMPONENT({ state }, { newComponent, selectedSection }) {
      firestore
        .collection('components_testing')
        .doc(selectedSection)
        .update({ 1: newComponent })
    }
  },
  modules: {
    products
  }
})
