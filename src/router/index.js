import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/landing-page/LandingPage.vue";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import Dashboard from "../pages/dashboard/Dashboard.vue";
import Tickets from "../pages/tickets/Tickets.vue";
import { isAuthed } from "../composables/useAuth"; // equivalent of your utils/auth.js

const routes = [
  { path: "/", name: "landing", component: LandingPage },
  { path: "/auth/login", name: "login", component: Login },
  { path: "/auth/signup", name: "signup", component: Signup },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "tickets",
    component: Tickets,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/new",
    name: "new-ticket",
    component: Tickets,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" }, // catch-all route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard (PrivateRoute equivalent)
router.beforeEach((to) => {
  const authed = isAuthed();
  if (to.meta.requiresAuth && !authed) {
    return { name: "login" };
  }
  if ((to.name === "login" || to.name === "signup") && authed) {
    return { name: "dashboard" };
  }
});

export default router;
