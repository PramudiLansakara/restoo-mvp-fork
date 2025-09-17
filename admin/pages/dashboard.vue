<template>
  <v-row>
    <WaiterCard
      :request="request"
      v-for="request of requests"
      :key="request.userId"
    />
  </v-row>
  <!-- <v-container fluid>
    <v-row align="center" justify="center" style="height: 90vh">
      <div class="layout column align-center">
              <img height="500" src="../assets/images/logo.jpg" alt="Clean Globe" />

            </div>
    </v-row>
  </v-container> -->
</template>

<script>
import WaiterCard from "../components/waiter/WaiterCard.vue";
import { mapGetters } from "vuex";

export default {
  components: { WaiterCard },
  middleware: "redirectIfNotAuth",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("waiter", {
      requests: "getRequests",
    }),
  },
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

<style lang="scss" scoped></style>
