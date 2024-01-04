import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    proizvodi: [],
    narudzbine: []
  },
  getters: {
  },
  mutations: {
    setProizvodi (state, proizvodi) {
      state.proizvodi = proizvodi
    },
    addProizvod (state, proizvod) {
      state.proizvodi[proizvod.id] = proizvod
    },
    setNarudzbine (state, narudzbine) {
      state.narudzbine = narudzbine
    },
    addNarudzbina (state, narudzbina) {
      state.narudzbine.push(narudzbina)
    }
  },
  actions: {
    async fetchProizvodi ({ commit }) {
      fetch('http://localhost:9000/proizvod')
        .then(res => res.json())
        .then(data => commit('setProizvodi', data))
    },
    async getProizvod ({ commit, state }, proizvodID) {
      return new Promise((resolve, reject) => {
        if (state.proizvodi[proizvodID]) {
          resolve(state.proizvodi[proizvodID])
        } else {
          fetch(`http://localhost:9000/proizvod/${proizvodID}`)
            .then(res => res.json())
            .then(data => {
              commit('addProizvod', data)
              resolve(data)
            })
        }
      })
    },
    async fetchNarudzbine ({ commit }) {
      fetch('http://localhost:9000/narudzbina')
        .then(res => res.json())
        .then(data => commit('setNarudzbine', data))
    }
  },
  modules: {
  }
})
