import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import GuestLayout from '@/views/layouts/GuestLayout.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';
import NotFound from '@/views/NotFound.vue';
import TermsOfService from '@/components/TermsOfService.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';
import Chat from '@/views/Chat.vue';
import Profile from '@/views/Profile.vue';

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
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsOfService,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyPolicy,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
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
