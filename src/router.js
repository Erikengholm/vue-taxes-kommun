import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './app.auth.guard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    {
      path: '',
      redirect: '/dashboard'
    }, {
      path: '/dashboard',
      component: () => import('./views/dashboard/dashboard.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/dashboard/invoice',
          component: () => import('./views/invoice/invoice.vue')
        }
      ]
    }, {
      path: '/sign-in',
      component: () => import('./views/sign-in/sign-in.vue')
    },
    {
      path: '/test',
      component: () => import('./views/Test/test.vue')
    },
    {
      path: '/OCR',
      component: () => import('./views/OCR/OCR.vue')
    }, {
      path: '/token-verify',
      component: () => import('./views/token-verify/token-verify.vue')
    }, {
      path: '/forgot-password',
      component: () =>  import ('./views/forgot-password/forgot-password.vue')
    }, {
      path: '/resend-token',
      component: () =>  import ('./views/email-verify/email-verify.vue')
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthGuard.isAuthenticated();
  const isRouteRequiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (isRouteRequiresAuth) {
    if (isAuthenticated) {
      next();
    } else {
      next('/sign-in');
    }
  } else if (isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
