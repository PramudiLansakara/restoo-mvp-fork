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

export default {
  components: { AppBar, Footer, NavDrawer },
  mixins: [initGlobalHooks],
  sockets: {
    connect() {
      console.log("socket connected");
    },
    newTableRequest(val) {
      console.log(val);
      this.$store.dispatch("waiter/addRequest", val);
    },
  },
};
</script>

<style lang="scss">
@import "./assets/styles.scss";
</style>
