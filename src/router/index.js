import { createRouter, createWebHistory } from 'vue-router'
import Anasayfa from "../views/Anasayfa";

const routes = [
  {
    path: '/',
    name: 'Anasayfa',
    component: Anasayfa
  },
  {
    path: '/listelerim',
    name: 'Listelerim',
    component: () => import(/* webpackChunkName: "about" */ '../views/Listelerim')
  },
  {
    path: '/liste/:id',
    name: 'ListeDetay',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListeDetay')
  },
  {
    path: '/detay/:type/:id',
    name: 'FilmDetay',
    component: () => import(/* webpackChunkName: "about" */ '../views/FilmDetay')
  },
  {
    path: '/favorilerim',
    name: 'Favorilerim',
    component: () => import(/* webpackChunkName: "about" */ '../views/Favorilerim')
  },
  {
    path: '/giris-yap',
    name: 'GirisYap',
    component: () => import(/* webpackChunkName: "about" */ '../views/GirisYap')
  },
  {
    path: '/kayit-ol',
    name: 'KayitOl',
    component: () => import(/* webpackChunkName: "about" */ '../views/KayitOl')
  },
  {
    path: '/cikis',
    name: 'Cikis',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cikis')
  },
  {
    path: '/takip',
    name: 'Takip',
    component: () => import(/* webpackChunkName: "about" */ '../views/Takip')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
