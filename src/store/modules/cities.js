import axios from 'axios';
export const state = () => ({
  cities: []
});

export const getters = {};

export const mutations = {
  updateValue: (state, payload) => {
    state.value = payload;
  },
  SET_CITIES: (state, payload) => {
    state.cities = payload;
  }
};

export const actions = {
  GET_CITIES({ commit }) {
    axios.get(`https://api2.komercia.co/api/ciudades`).then(response => {
      commit('SET_CITIES', response.data.data);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
