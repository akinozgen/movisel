import { createRouter, createWebHistory } from 'vue-router'
import Anasayfa from "@/views/Anasayfa.vue";

const routes = [
  {
    path: '/',
    name: 'Anasayfa',
    component: Anasayfa
  },
  {
    path: '/listelerim',
    name: 'Listelerim',
    component: () => import('@/views/Listelerim.vue')
  },
  {
    path: '/liste/:id',
    name: 'ListeDetay',
    component: () => import('@/views/ListeDetay.vue')
  },
  {
    path: '/detay/:type/:id',
    name: 'FilmDetay',
    component: () => import('@/views/FilmDetay.vue')
  },
  {
    path: '/favorilerim',
    name: 'Favorilerim',
    component: () => import('@/views/Favorilerim.vue')
  },
  {
    path: '/giris-yap',
    name: 'GirisYap',
    component: () => import('@/views/GirisYap.vue')
  },
  {
    path: '/kayit-ol',
    name: 'KayitOl',
    component: () => import('@/views/KayitOl.vue')
  },
  {
    path: '/cikis',
    name: 'Cikis',
    component: () => import('@/views/Cikis.vue')
  },
  {
    path: '/takip',
    name: 'Takip',
    component: () => import('@/views/Takip.vue')
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router
