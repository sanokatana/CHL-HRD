import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global navigation guard to check authentication status
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If the route requires authentication
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      // If not authenticated, redirect to login
      next('/login');
    } else {
      // Verify token validity
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Proceed to the next route if token is valid
        next();
      } catch (error) {
        // If token is invalid, redirect to login
        console.error('Token validation failed:', error);
        next('/login');
      }
    }
  } else if (to.path === '/dashboard') {
    // If accessing the dashboard route directly
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      // If not authenticated, redirect to login
      next('/login');
    } else {
      // Proceed to the dashboard route
      next();
    }
  } else if (to.path === '/login') {
    // If trying to access the login page
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      // If already logged in, redirect to dashboard
      next('/dashboard');
    } else {
      // Proceed to the login page
      next();
    }
  } else {
    // If the route doesn't require authentication, proceed
    next();
  }
})

export default function (app) {
  app.use(router)
}

export { router }
