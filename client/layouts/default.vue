<template>
  <v-app app>
    <AppBar />
    <v-main class="ma-0 pa-0">
      <nuxt />
      <FAB v-if="tableStatus" />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import FAB from "../components/Buttons/FAB.vue";
import Footer from "../components/Footer.vue";
import initGlobalHooks from "~/mixins/global-hooks.js";
import { mapState } from "vuex";

export default {
  components: { AppBar, Footer, FAB },
  mixins: [initGlobalHooks],
  computed: mapState({
    tableStatus(state) {
      if (state.table.table.status === "active") {
        return true;
      } else {
        return false;
      }
    },
  }),
};
</script>

<style lang="scss">
@import "./assets/styles.scss";
</style>
