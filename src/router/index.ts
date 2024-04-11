import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import OnOneDevice from '@/pages/OnOneDevice.vue';
import Online from '@/pages/Online.vue';
import Room from '@/pages/Room.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/on-one-device',
    component: OnOneDevice
  },
  {
    path: '/online',
    component: Online
  },
  {
    path: '/room/:id',
    component: Room
  },
  {
    path: '/room/',
    component: Room
  },
  {
    path: '/:catchAll(.*)',
    component: HomePage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
