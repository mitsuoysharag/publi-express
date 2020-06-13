import Vue from 'vue'
import store from '../store'
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

router.beforeEach((to, from, next) => {
  let to_name = to.name
  let usuario = store.state.usuario

  if (to_name !== 'inicio' && usuario == null)
    router.push({ name: "inicio" });
  else
    next()
})

export default router
