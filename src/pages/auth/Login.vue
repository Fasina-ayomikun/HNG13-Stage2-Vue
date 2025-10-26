<template>
  <section>
    <Header />

    <div class="auth-wrap">
      <form
        class="auth-card"
        @submit.prevent="onSubmit"
        novalidate
        aria-labelledby="login-title"
      >
        <h1 id="login-title" class="auth-title">Login</h1>

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
              autocomplete="current-password"
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

        <div class="auth-actions">
          <button class="btn btn-primary" type="submit" aria-label="Sign in">
            Sign In
          </button>
          <router-link
            class="btn btn-ghost"
            to="/auth/signup"
            aria-label="Create a new account"
          >
            Create account
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

const form = ref({ email: "", password: "" });
const errors = ref({});
const toast = ref("");
const showPassword = ref(false);

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

onMounted(() => {
  if (isAuthed()) router.replace("/dashboard");
});

function validate() {
  const e = {};
  if (!form.value.email.trim()) e.email = "Email is required.";
  else if (!emailRe.test(form.value.email))
    e.email = "Enter a valid email (name@example.com).";

  if (!form.value.password.trim()) e.password = "Password is required.";

  errors.value = e;
  return Object.keys(e).length === 0;
}

function onSubmit() {
  if (!validate()) {
    toast.value = "Invalid credentials. Please check the errors.";
    setTimeout(() => (toast.value = ""), 2200);
    return;
  }
  login(form.value.email);
  router.replace("/dashboard");
}
</script>
