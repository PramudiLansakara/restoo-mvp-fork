<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  components: { Footer }
};
</script>

<style lang="scss">
@import "./assets/styles.scss";
</style>
