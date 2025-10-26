<template>
  <section>
    <Header />

    <div class="auth-wrap">
      <form
        class="auth-card"
        @submit.prevent="onSubmit"
        novalidate
        aria-labelledby="signup-title"
      >
        <h1 id="signup-title" class="auth-title">Create your account</h1>

        <!-- Email -->
        <div class="auth-field">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            v-model="form.email"
            :aria-describedby="errors.email ? 'email-err' : undefined"
          />
          <p v-if="errors.email" id="email-err" class="error">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div class="auth-field">
          <label for="password">Password</label>
          <div class="password-wrap">
            <input
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              required
              v-model="form.password"
              :aria-describedby="errors.password ? 'password-err' : undefined"
            />
            <button
              type="button"
              class="toggle-pass"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </button>
          </div>
          <p v-if="errors.password" id="password-err" class="error">
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="auth-field">
          <label for="confirm">Confirm Password</label>
          <div class="password-wrap">
            <input
              id="confirm"
              name="confirm"
              :type="showConfirm ? 'text' : 'password'"
              autocomplete="new-password"
              required
              v-model="form.confirm"
              :aria-describedby="errors.confirm ? 'confirm-err' : undefined"
            />
            <button
              type="button"
              class="toggle-pass"
              :aria-label="
                showConfirm ? 'Hide confirm password' : 'Show confirm password'
              "
              :aria-pressed="showConfirm"
              @click="showConfirm = !showConfirm"
            >
              {{ showConfirm ? "Hide" : "Show" }}
            </button>
          </div>
          <p v-if="errors.confirm" id="confirm-err" class="error">
            {{ errors.confirm }}
          </p>
        </div>

        <div class="auth-actions">
          <button
            class="btn btn-primary"
            type="submit"
            aria-label="Create account"
          >
            Sign Up
          </button>
          <router-link
            class="btn btn-ghost"
            to="/auth/login"
            aria-label="Back to login"
          >
            Back to Login
          </router-link>
        </div>
      </form>

      <div v-if="toast" class="toast" role="status" aria-live="polite">
        {{ toast }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import "./auth.css";

import Header from "../../components/Header.vue";
import { login, isAuthed } from "../../composables/useAuth";

const router = useRouter();

const form = ref({ email: "", password: "", confirm: "" });
const errors = ref({});
const toast = ref("");

const showPassword = ref(false);
const showConfirm = ref(false);

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

onMounted(() => {
  if (isAuthed()) router.replace("/dashboard");
});

function validate() {
  const e = {};
  if (!form.value.email.trim()) e.email = "Email is required.";
  else if (!emailRe.test(form.value.email))
    e.email = "Enter a valid email (name@example.com).";

  if (!form.value.password) e.password = "Password is required.";
  else if (form.value.password.length < 6)
    e.password = "Use at least 6 characters.";

  if (!form.value.confirm) e.confirm = "Please confirm your password.";
  else if (form.value.confirm !== form.value.password)
    e.confirm = "Passwords do not match.";

  errors.value = e;
  return Object.keys(e).length === 0;
}

function onSubmit() {
  if (!validate()) {
    toast.value = "Please fix the errors before continuing.";
    setTimeout(() => (toast.value = ""), 2200);
    return;
  }
  login(form.value.email);
  router.replace("/dashboard");
}
</script>
