<template>
  <div class="db-wrap">
    <Header
      :actions="[
        {
          action_name: 'Go to Tickets',
          action_url: '/tickets',
          color: 'primary',
        },
        { action_name: 'Logout', onClick: onLogout, color: 'danger' },
      ]"
    />

    <main class="db-main">
      <section class="container">
        <h2 id="summary-title" class="heading">Ticket summary</h2>
        <p class="desc">Overview of your ticket statuses at a glance.</p>

        <section class="db-grid" aria-labelledby="summary-title">
          <article class="card" role="region" aria-label="Total tickets">
            <p class="db-label">Total tickets</p>
            <p class="db-value">{{ counts.total }}</p>
          </article>

          <article
            class="card db-card--open"
            role="region"
            aria-label="Open tickets"
          >
            <p class="db-label">Open</p>
            <p class="db-value">{{ counts.open }}</p>
          </article>

          <article
            class="card db-card--progress"
            role="region"
            aria-label="In progress tickets"
          >
            <p class="db-label">In Progress</p>
            <p class="db-value">{{ counts.in_progress }}</p>
          </article>

          <article
            class="card db-card--closed"
            role="region"
            aria-label="Closed tickets"
          >
            <p class="db-label">Closed</p>
            <p class="db-value">{{ counts.closed }}</p>
          </article>
        </section>

        <section class="db-quick" aria-labelledby="quick-actions">
          <h2 id="quick-actions" class="heading">Quick Actions</h2>
          <div class="quick-grid">
            <button
              class="quick-btn create-btn"
              @click="router.push('/tickets/new')"
            >
              Create Ticket
            </button>
            <button
              class="quick-btn view-all-btn"
              @click="router.push('/tickets')"
            >
              View All Tickets
            </button>
            <button
              class="quick-btn view-open-btn"
              @click="router.push('/tickets?filter=open')"
            >
              View Open
            </button>
            <button
              class="quick-btn view-closed-btn"
              @click="router.push('/tickets?filter=closed')"
            >
              View Closed
            </button>
          </div>
        </section>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import "./dashboard.css";

import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";

import { logout } from "../../composables/useAuth";
import { getTickets, statusCounts } from "../../composables/useTickets";

const router = useRouter();

const counts = ref({
  total: 0,
  open: 0,
  in_progress: 0,
  closed: 0,
});

onMounted(() => {
  const tickets = getTickets();
  counts.value = statusCounts(tickets);
});

function onLogout() {
  logout();
  router.replace("/auth/login");
}
</script>
