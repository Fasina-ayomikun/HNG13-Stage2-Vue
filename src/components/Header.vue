<template>
  <header class="header">
    <div class="container">
      <!-- Mobile overlay + sidebar -->
      <aside
        v-if="menuOpen"
        class="sidebar-backdrop"
        role="presentation"
        @click="menuOpen = false"
      >
        <nav
          class="sidebar"
          role="navigation"
          aria-label="Mobile menu"
          @click.stop
        >
          <button
            class="close-btn"
            aria-label="Close menu"
            @click="menuOpen = false"
          >
            ×
          </button>
          <ul>
            <li>
              <button
                @click="
                  router.push('/dashboard');
                  menuOpen = false;
                "
              >
                Dashboard
              </button>
            </li>

            <li>
              <button
                @click="
                  router.push('/tickets');
                  menuOpen = false;
                "
              >
                Tickets
              </button>
            </li>

            <!-- Show only when on /tickets* -->
            <li v-if="isTickets">
              <button
                @click="
                  router.push('/tickets/new');
                  menuOpen = false;
                "
                aria-label="Create Ticket"
              >
                Create Ticket
              </button>
            </li>

            <li>
              <button
                @click="
                  onLogout();
                  menuOpen = false;
                "
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main nav -->
      <nav class="nav" aria-label="Main navigation">
        <RouterLink class="brand" :to="brandUrl" aria-label=" DeeTickets Home">
          {{ brand }}
        </RouterLink>

        <div v-if="actions && actions.length" class="actions">
          <template v-for="(action, idx) in actions" :key="idx">
            <!-- Link action (has URL) -->
            <RouterLink
              v-if="action.action_url"
              :to="action.action_url"
              :aria-label="action.action_name"
              :class="btnClass(action.color)"
              @click="action.onClick && action.onClick()"
            >
              {{ action.action_name }}
            </RouterLink>

            <!-- Button-only action (no URL) -->
            <button
              v-else
              type="button"
              :aria-label="action.action_name"
              :class="btnClass(action.color)"
              @click="action.onClick && action.onClick()"
            >
              {{ action.action_name }}
            </button>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="menu-toggle"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="String(menuOpen)"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { logout } from "../composables/useAuth.js";

// Props
const props = defineProps({
  brand: { type: String, default: "DeeTickets" },
  brand_url: { type: String, default: "/" },
  actions: {
    type: Array,
    default: () => [
      {
        action_name: "Login",
        action_url: "/auth/login",
        color: "ghost",
        onClick: () => {},
      },
      {
        action_name: "Get started",
        action_url: "/auth/signup",
        color: "primary",
        onClick: () => {},
      },
    ],
  },
});

// Local state & router
const menuOpen = ref(false);
const router = useRouter();
const route = useRoute();

// Derived
const brandUrl = props.brand_url;
const isTickets = computed(() => route.path.startsWith("/tickets"));

// Methods
function onLogout() {
  logout();
  router.replace("/auth/login");
}

function btnClass(color) {
  if (color === "primary") return "btn btn-primary";
  if (color === "ghost") return "btn btn-ghost";
  if (color === "danger") return "btn btn-danger";
  return "btn";
}
</script>

<style scoped>
/* Optional: reuse your existing styles for .header, .nav, .brand, .actions, .btn, .btn-primary, .btn-ghost, .btn-danger, .menu-toggle, .menu-bar, .sidebar, .sidebar-backdrop, .close-btn, etc. */
</style>
