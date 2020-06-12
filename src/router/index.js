import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/catalogo',
    name: 'catalogo',
    component: () => import('../views/Catalogo.vue')
  },
  {
    path: '/cotizacion/:id',
    name: 'cotizacion',
    component: () => import('../views/Cotizacion.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
