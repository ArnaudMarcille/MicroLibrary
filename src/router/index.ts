import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CategoryView from '@/views/CategoryView.vue';
import BookDetailView from '@/views/BookDetailView.vue';
import SearchBooks from '@/views/SearchBooks.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Category/:category',
      name: 'category',
      component: CategoryView,
      props: true
    },
    {
      path: '/Book/:id',
      name: 'book',
      component: BookDetailView,
      props: true
    }
    ,
    {
      path: '/Search',
      name: 'search',
      component: SearchBooks,
    }
  ]
})

export default router
