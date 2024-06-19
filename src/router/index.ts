import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { usuarioStore } from '../stores/usuarioStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/balanco',
      name: 'balanco',
      component: () => import('../views/BalancoView.vue')
    },
    {
      path: '/anotacao',
      name: 'anotacao',
      component: () => import('../views/AnotacaoView.vue')
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: () => import('../views/UsuarioView.vue'),
      beforeEnter: (to, from) => {
        const store = usuarioStore();

        if(store.token) {
          return true;
        }
        return false;
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
