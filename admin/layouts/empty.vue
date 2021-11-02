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
import initGlobalHooks from "~/mixins/global-hooks.js";

export default {
  components: { Footer },
  mixins: [initGlobalHooks],
};
</script>

<style lang="scss">
@import "./assets/styles.scss";
</style>
