<template>
  <div class="lp-wrapper">
    <Header />

    <main id="main-content">
      <!-- HERO   centered content -->
      <section class="lp-hero" aria-labelledby="hero-heading">
        <div class="container hero-inner">
          <div class="hero-content">
            <h1 id="hero-heading" class="hero-title">
              Manage Tickets Effortlessly
            </h1>
            <p class="hero-sub">
              Create, track, and resolve tickets with a clean, real-time
              workflow. Keep teams aligned and customers informed, all in one
              place.
            </p>

            <div class="hero-cta">
              <router-link
                class="btn btn-primary"
                to="/auth/signup"
                aria-label="Get started now"
              >
                Get Started
              </router-link>
              <router-link
                class="btn btn-outline"
                to="/auth/login"
                aria-label="Log in to your account"
              >
                Login
              </router-link>
            </div>
          </div>

          <div class="hero-illustration" aria-hidden="true">
            <img :src="heroImg" alt="Picture of Tickets" loading="lazy" />
          </div>

          <div class="hero-visual" aria-hidden="true">
            <div class="decor-circle decor-circle--lg"></div>
            <div class="decor-circle decor-circle--sm"></div>
          </div>
        </div>

        <!-- Decorative wave at the bottom of hero -->
        <svg
          class="hero-wave"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          role="img"
          aria-label="Decorative wave"
        >
          <title>Wave decorative background</title>
          <path
            d="M0,40 C240,140 480,0 720,40 C960,80 1200,20 1440,80 L1440 150 L0 150 Z"
            fill="#3a0ca314"
          />
        </svg>
      </section>

      <!-- SOCIAL PROOF -->
      <SocialProof />

      <!-- FEATURES -->
      <KeyFeatures />

      <!-- STATS STRIP -->
      <section class="lp-stats" aria-label="Key performance stats">
        <div class="container stats-grid">
          <div class="stat" aria-label="Tickets closed">
            <p class="stat-value">3k+</p>
            <p class="stat-label">Tickets Closed</p>
          </div>
          <div class="stat" aria-label="Uptime">
            <p class="stat-value">99.9%</p>
            <p class="stat-label">Uptime</p>
          </div>
          <div class="stat" aria-label="UI latency">
            <p class="stat-value">&lt;100ms</p>
            <p class="stat-label">UI Latency</p>
          </div>
        </div>
      </section>

      <!-- SECONDARY FEATURES -->
      <SecondaryFeatures />

      <!-- HOW IT WORKS -->
      <section id="how" class="lp-how container" aria-labelledby="how-title">
        <h2 id="how-title" class="heading">How it works</h2>
        <p class="desc">
          Getting started with DeeTickets is as easy as 1-2-3. Create your first
          ticket and experience seamless management from start to finish.
        </p>
        <ol class="how-grid">
          <li class="how-step" aria-label="Step 1: Create">
            <span class="step-badge" aria-hidden="true">1</span>
            <h3 class="how-title">Create</h3>
            <p class="how-desc">
              Open a ticket with a clear title, status, and details.
            </p>
          </li>
          <li class="how-step" aria-label="Step 2: Assign">
            <span class="step-badge" aria-hidden="true">2</span>
            <h3 class="how-title">Assign</h3>
            <p class="how-desc">
              Set owners and priorities to move work forward.
            </p>
          </li>
          <li class="how-step" aria-label="Step 3: Resolve">
            <span class="step-badge" aria-hidden="true">3</span>
            <h3 class="how-title">Resolve</h3>
            <p class="how-desc">
              Close with context and notify stakeholders automatically.
            </p>
          </li>
        </ol>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import "./LandingPage.css";
import heroImg from "../../assets/hero-img.png";

import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import SocialProof from "../../components/SocialProof.vue";
import KeyFeatures from "../../components/KeyFeatures.vue";
import SecondaryFeatures from "../../components/SecondaryFeatures.vue";
</script>
