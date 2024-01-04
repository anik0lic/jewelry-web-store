import Vue from 'vue'
import VueRouter from 'vue-router'
import Pocetna from '../views/Pocetna.vue'
import Proizvodi from '../views/Proizvodi.vue'
import Proizvod from '../views/Proizvod.vue'
import Korpa from '../views/Korpa.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna
  },
  {
    path: '/proizvodi',
    name: 'Proizvodi',
    component: Proizvodi
  },
  {
    path: '/proizvod/:id',
    name: 'Proizvod',
    component: Proizvod
  },
  {
    path: '/korpa',
    name: 'Korpa',
    component: Korpa
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
