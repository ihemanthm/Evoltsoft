import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { isAuthenticated } from '@/utils/auth';

// Lazy load components for better performance
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Dashboard = () => import('@/views/Dashboard.vue');
const ChargerList = () => import('@/views/ChargerList.vue');
const MapView = () => import('@/views/MapView.vue');
const Profile = () => import('@/views/Profile.vue');

const routes = [
  { 
    path: '/', 
    name: 'Home',
    redirect: '/dashboard',
    meta: { requiresAuth: true }
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  { 
    path: '/register', 
    name: 'Register',
    component: Register,
    meta: { guest: true }
  },
  { 
    path: '/chargers', 
    name: 'Chargers',
    component: ChargerList,
    meta: { requiresAuth: true }
  },
  { 
    path: '/map', 
    name: 'Map',
    component: MapView,
    meta: { requiresAuth: true }
  },
  { 
    path: '/profile', 
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' };
  }
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isAuthenticated;
  
  // If the route requires authentication and user is not logged in
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ 
      name: 'Login',
      query: { redirect: to.fullPath } // Save the current path for redirecting after login
    });
  } 
  // If the route is guest-only and user is logged in
  else if (to.matched.some(record => record.meta.guest) && isLoggedIn) {
    next({ name: 'Dashboard' }); // Redirect to home or dashboard
  } 
  // Otherwise, proceed
  else {
    next();
  }
});

export default router;
