import Fuse from 'fuse.js'

const products = {
  namespaced: true,
  state: {
    type: '',
    payload: '',
    fullProducts: [],
    options: {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['nombre']
    }
  },
  getters: {
    filterProducts (state) {
      if (state.type === 'search') {
        return new Fuse(state.fullProducts, state.options).search(state.payload)
      } else if (state.type === 'subcategory') {
        return state.fullProducts.filter(product => product.subcategoria === state.payload)
      } else if (state.type === 'category') {
        return state.fullProducts.filter(product => product.categoria === state.payload)
      }
      return state.fullProducts
    }
  },
  actions: {
    SET_FILTER({ state }, query) {
      const { search, category, subcategory } = query
      if (search && search.length) {
        state.type = 'search'
        state.payload = search
      } else if (subcategory && subcategory.length) {
        state.type = 'subcategory'
        state.payload = subcategory
      } else if (category && category.length) {
        state.type = 'category'
        state.payload = category
      }
    },
    FILTER_BY ({ state }, {type, data}) {
      state.type = type
      state.payload = data
    }
  }
}

export default products
