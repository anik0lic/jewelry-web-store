import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    proizvodi: [],
    korpa: [],
    narudzbine: []
  },
  getters: {
    kolicinaProizvoda: state => proizvod => {
      const item = state.korpa.find(i => i.id === proizvod.id)

      if (item) return item.quantity
      else return null
    },
    proizvodiIzKorpe: state => {
      return state.korpa
    },
    ukupnaCena: state => {
      return state.korpa.reduce((a, b) => a + (b.cena * b.quantity), 0)
    },
    ukupnoProizvoda: state => {
      return state.korpa.reduce((a, b) => a + b.quantity, 0)
    }
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
    },
    addUKorpu (state, { proizvod, kolicina }) {
      const item = state.korpa.find(i => i.id === proizvod.id)

      if (item) {
        item.quantity += kolicina
      } else {
        state.korpa.push({ ...proizvod, quantity: kolicina })
      }

      localStorage.setItem('korpa', JSON.stringify(state.korpa))
    },
    removeIzKorpe (state, proizvod) {
      const item = state.korpa.find(i => i.id === proizvod.id)

      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          state.korpa = state.korpa.filter(i => i.id !== proizvod.id)
        }
      }

      localStorage.setItem('korpa', JSON.stringify(state.korpa))
    },
    updateKorpaFromLocalStorage (state) {
      const korpa = localStorage.getItem('korpa')

      if (korpa) {
        state.korpa = JSON.parse(korpa)
      }
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
        if (state.proizvodi[proizvodID - 1]) {
          resolve(state.proizvodi[proizvodID - 1])
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
