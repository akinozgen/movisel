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
    path: '/film-detay/:id',
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
