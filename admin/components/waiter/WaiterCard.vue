<template>
  <v-col cols="12" md="6" lg="4">
    <v-card class="rounded-xl" elevation="10">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h5"
            >{{ $t("Table") }} {{ request.tableId }}
            {{ $t("Call For") }}</v-card-title
          >
          <v-card-subtitle class="mt-3"
            ><v-row align="center">
              <v-avatar class="mx-2" size="50" tile>
                <!-- <v-img :src="item.src"></v-img> -->
                <img src="~/assets/images/chef.png" />
              </v-avatar>
              <h1>{{ $t(request.requestType) }}</h1>
            </v-row></v-card-subtitle
          >

          <v-card-actions>
            <v-btn
              class="ml-2 mt-5"
              color="green lighten-1 white--text"
              @click="accept"
            >
              {{ $t("Accept") }}
            </v-btn>
            <v-btn
              class="ml-2 mt-5"
              color="red lighten-1 white--text"
              @click="decline"
            >
              {{ $t("Reject") }}
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },
  methods: {
    accept() {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit(
        "admin-response",
        "Accepted",
        this.request.userId
      );
      this.$store.dispatch("waiter/removeRequest", this.request);
    },
    decline() {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit(
        "admin-response",
        "Declined",
        this.request.userId
      );
      this.$store.dispatch("waiter/removeRequest", this.request);
    },
  },
};
</script>

<style lang="scss" scoped></style>
