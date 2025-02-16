import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import GuestLayout from '@/views/layouts/GuestLayout.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    component: App,
  },
  {
    path: '/auth',
    component: GuestLayout,
    children: [
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
