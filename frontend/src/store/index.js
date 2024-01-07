import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    proizvodi: [],
    korpa: [],
    token: '',
    user_id: null
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
    },
    user: state => {
      return state.user_id
    }
  },
  mutations: {
    setProizvodi (state, proizvodi) {
      state.proizvodi = proizvodi
    },
    addProizvod (state, proizvod) {
      state.proizvodi[proizvod.id] = proizvod
    },
    addUKorpu (state, { proizvod, kolicina }) {
      const item = state.korpa.find(i => i.id === proizvod.id)

      if (item) {
        item.quantity += kolicina
      } else {
        state.korpa.push({ ...proizvod, quantity: kolicina })
      }
      console.log(state.korpa)
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
    },
    setToken (state, token) {
      state.token = token
      localStorage.token = token
    },
    removeToken (state) {
      state.token = ''
      localStorage.token = ''
    },
    setUser (state, id) {
      state.user_id = id
    },
    removeUser (state) {
      state.user_id = null
    }
  },
  actions: {
    async fetchProizvodi ({ commit }) {
      fetch('http://localhost:9000/proizvod', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => commit('setProizvodi', data))
    },
    async getProizvod ({ commit, state }, proizvodID) {
      return new Promise((resolve, reject) => {
        if (state.proizvodi[proizvodID - 1]) {
          resolve(state.proizvodi[proizvodID - 1])
        } else {
          fetch(`http://localhost:9000/proizvod/${proizvodID}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              commit('addProizvod', data)
              resolve(data)
            })
        }
      })
    },
    async sendNarudzbina ({ commit }, narduzbina) {
      fetch('http://localhost:9000/narudzbina', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(narduzbina)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
    },
    async register ({ commit }, obj) {
      console.log(JSON.stringify(obj))
      const response = await fetch('http://127.0.0.1:9001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })

      const json = await response.json()
      commit('setToken', json.token)
      commit('setUser', json.id)
    },
    async login ({ commit }, obj) {
      const response = await fetch('http://127.0.0.1:9001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })
      const json = await response.json()
      console.log(json)
      if (json.token) {
        commit('setToken', json.token)
        commit('setUser', json.id)
      } else {
        alert('Login failed')
      }
    }
  },
  modules: {
  }
})
