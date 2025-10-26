<template>
  <div class="modal-backdrop" @click="emit('close')" role="presentation">
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-form-title"
      @click.stop
    >
      <header class="modal-head">
        <h2 id="ticket-form-title">
          {{ isEdit ? "Edit Ticket" : "Create Ticket" }}
        </h2>
        <button class="modal-close" aria-label="Close" @click="emit('close')">
          ×
        </button>
      </header>

      <form class="modal-body" @submit.prevent="handleSubmit" novalidate>
        <div class="field">
          <label for="title"> Title <span class="req">*</span> </label>
          <input
            id="title"
            v-model="values.title"
            :aria-describedby="errors.title ? 'err-title' : undefined"
            required
          />
          <p v-if="errors.title" id="err-title" class="error">
            {{ errors.title }}
          </p>
        </div>

        <div class="field">
          <label for="status"> Status <span class="req">*</span> </label>
          <select
            id="status"
            v-model="values.status"
            :aria-describedby="errors.status ? 'err-status' : undefined"
            required
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <p v-if="errors.status" id="err-status" class="error">
            {{ errors.status }}
          </p>
        </div>

        <div class="field">
          <label for="description">Description</label>
          <textarea
            id="description"
            rows="4"
            v-model="values.description"
            :aria-describedby="
              errors.description ? 'err-description' : undefined
            "
            placeholder="Optional details to help resolve the ticket…"
          />
          <p v-if="errors.description" id="err-description" class="error">
            {{ errors.description }}
          </p>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" @click="emit('close')">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEdit ? "Save Changes" : "Create Ticket" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";

const STATUS = ["open", "in_progress", "closed"];

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["close", "submit"]);

const isEdit = computed(() => Boolean(props.initial && props.initial.id));

const values = reactive({
  id: props.initial?.id ?? null,
  title: props.initial?.title ?? "",
  status: props.initial?.status ?? "open",
  description: props.initial?.description ?? "",
  priority: props.initial?.priority ?? "medium",
});

const errors = reactive({});

function clearErrors() {
  for (const key of Object.keys(errors)) delete errors[key];
}

function validate() {
  const e = {};
  if (!values.title.trim()) e.title = "Title is required.";
  if (!STATUS.includes(values.status))
    e.status = 'Status must be "open", "in_progress", or "closed".';
  if (values.description && values.description.length > 1000)
    e.description = "Description is too long (max 1000 chars).";
  return e;
}

function handleSubmit() {
  const e = validate();
  clearErrors();
  Object.assign(errors, e);
  if (Object.keys(e).length) return;
  // Emit a shallow copy so parent doesn't accidentally mutate our reactive object
  emit("submit", { ...values }, isEdit.value);
}
</script>

<style scoped>
/* Optional: reuse your existing CSS classes (.modal-backdrop, .modal, etc.) */
</style>
