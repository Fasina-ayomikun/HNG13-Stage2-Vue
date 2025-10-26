<template>
  <section class="lp-social-proof container" aria-label="Trusted by companies">
    <div class="logos" role="list">
      <img :src="logo1" alt="Acme Corp" role="listitem" />
      <img :src="logo2" alt="Northwind" role="listitem" />
      <img :src="logo3" alt="Northwind" role="listitem" />
      <img :src="logo4" alt="Northwind" role="listitem" />
    </div>
  </section>
</template>

<script setup>
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
</script>

<style scoped></style>
