<template>
  <v-app>
    <AppBar />
    <!-- <NavDrawer /> -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import Footer from "../components/Footer.vue";
import NavDrawer from "../components/NavDrawer.vue";
import initGlobalHooks from "~/mixins/global-hooks.js";
const notificationSound = require("@/assets/sounds/notification.mp3").default;

export default {
  data() {
    return {
      notificationSound,
    };
  },
  components: { AppBar, Footer, NavDrawer },
  mixins: [initGlobalHooks],
  
};
</script>

<style lang="scss">
@import "./assets/styles.scss";
</style>
