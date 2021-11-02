<template>
  <v-row>
    <WaiterCard
      :request="request"
      v-for="request of requests"
      :key="request.userId"
    />
  </v-row>
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
  // sockets: {
  //   connect() {
  //     console.log("socket connected");
  //   },
  //   newTableRequest(val) {
  //     console.log(val);
  //     this.$store.dispatch("waiter/addRequest", val);
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>
