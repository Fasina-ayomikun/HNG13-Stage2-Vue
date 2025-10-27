<template>
  <div class="tk-wrap">
    <Header
      :actions="[
        { action_name: 'Dashboard', action_url: '/dashboard', color: 'ghost' },
        { action_name: 'Create Ticket', onClick: openCreate, color: 'primary' },
      ]"
    />

    <main class="tk-main">
      <section class="container">
        <!-- Filters -->
        <section class="tk-controls" aria-label="Ticket filters">
          <div class="control-row">
            <div
              class="chip-group"
              role="tablist"
              aria-label="Filter by status"
            >
              <FilterChip
                :label="`All (${counts.total})`"
                :active="filter === 'all'"
                @click="() => (filter = 'all')"
              />
              <FilterChip
                :label="`Open (${counts.open})`"
                :active="filter === 'open'"
                @click="() => (filter = 'open')"
              />
              <FilterChip
                :label="`In Progress (${counts.in_progress})`"
                :active="filter === 'in_progress'"
                @click="() => (filter = 'in_progress')"
              />
              <FilterChip
                :label="`Closed (${counts.closed})`"
                :active="filter === 'closed'"
                @click="() => (filter = 'closed')"
              />
            </div>

            <div class="search-wrap">
              <input
                type="search"
                placeholder="Search by title…"
                :value="query"
                @input="(e) => (query = e.target.value)"
                aria-label="Search tickets by title"
              />
            </div>
          </div>
        </section>

        <!-- List -->
        <section class="tk-list" aria-labelledby="list-title">
          <div v-if="filtered.length === 0" class="empty">
            <p>No tickets found.</p>
            <button class="btn btn-primary" @click="openCreate">
              Create your first ticket
            </button>
          </div>

          <ul v-else class="cards" role="list">
            <li
              v-for="t in filtered"
              :key="t.id"
              class="card tk-card"
              role="listitem"
            >
              <div class="card-head">
                <span class="badge" :class="badgeClass(t.status)">
                  {{ labelStatus(t.status) }}
                </span>
                <span class="meta">{{ fmtDate(t.updatedAt) }}</span>
              </div>

              <h3 class="card-title">{{ t.title }}</h3>
              <p v-if="t.description" class="card-desc">{{ t.description }}</p>

              <div class="card-actions">
                <button class="btn btn-ghost" @click="() => openEdit(t)">
                  Edit
                </button>
                <button class="btn btn-danger" @click="() => onDelete(t.id)">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </main>

    <TicketFormModal
      v-if="showForm"
      :initial="editing"
      @close="closeForm"
      @submit="onSubmitForm"
    />

    <div v-if="toast" class="toast" role="status" aria-live="polite">
      {{ toast }}
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  statusCounts,
} from "../../composables/useTickets";

import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import FilterChip from "../../components/FilterChip.vue";
import TicketFormModal from "../../components/TicketFormModal.vue";

const router = useRouter();
const route = useRoute();

const items = ref([]);
const query = ref(
  typeof route.query.query === "string"
    ? route.query.query
    : typeof route.query.q === "string"
    ? route.query.q
    : ""
);
const filter = ref(
  typeof route.query.filter === "string" ? route.query.filter : "all"
);
const editing = ref(null);
const showForm = ref(false);
const toast = ref("");

onMounted(() => {
  items.value = getTickets();
});

const counts = computed(() => statusCounts(items.value));

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return items.value.filter((t) => {
    const okStatus = filter.value === "all" ? true : t.status === filter.value;
    const okQuery = !q ? true : t.title.toLowerCase().includes(q);
    return okStatus && okQuery;
  });
});

watch([filter, query], ([f, q]) => {
  const next = {};
  if (f !== "all") next.filter = f;
  if (q.trim()) next.q = q.trim();
  router.replace({ query: next });
});

const isCreateTicket = computed(() => route.path.endsWith("/new"));
watch(
  () => isCreateTicket.value,
  (yes) => {
    if (yes) openCreate();
  },
  { immediate: true }
);

function openCreate() {
  editing.value = null;
  showForm.value = true;
}
function openEdit(t) {
  editing.value = t;
  showForm.value = true;
}
function closeForm() {
  showForm.value = false;
  editing.value = null;
  if (route.path !== "/tickets") router.replace("/tickets");
}
function onDelete(id) {
  const yes = window.confirm("Delete this ticket? This cannot be undone.");
  if (!yes) return;
  const ok = deleteTicket(id);
  if (ok) {
    items.value = getTickets();
    ding("Ticket deleted.");
  } else {
    ding("Failed to delete ticket.");
  }
}
function onSubmitForm(values, isEdit) {
  try {
    if (isEdit) {
      updateTicket(values.id, values);
      ding("Ticket updated.");
    } else {
      createTicket(values);
      ding("Ticket created.");
    }
    items.value = getTickets();
    closeForm();
  } catch {
    ding("Failed to save ticket. Please retry.");
  }
}
function ding(msg) {
  toast.value = msg;
  setTimeout(() => (toast.value = ""), 2000);
}

function labelStatus(s) {
  if (s === "in_progress") return "In Progress";
  return s[0].toUpperCase() + s.slice(1);
}
function badgeClass(s) {
  if (s === "open") return "badge--open";
  if (s === "in_progress") return "badge--progress";
  return "badge--closed";
}
function fmtDate(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return "";
  }
}
</script>

<!-- Reuse your existing CSS -->
<style src="./tickets.css"></style>
