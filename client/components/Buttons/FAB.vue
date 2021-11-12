<template>
  <div>
    <v-dialog v-model="dialogWaiter" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 justify-center"
          ><h4>{{ $t(action) }}</h4>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmModel" :loading="loading">{{
            $t("Yes")
          }}</v-btn>
          <v-btn color="danger" text @click="closeModel">{{ $t("No") }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-speed-dial v-model="fab" fixed bottom right fab large>
      <template v-slot:activator>
        <v-btn v-model="fab" color="black" fab large>
          <v-icon color="white" v-if="fab"> mdi-close </v-icon>
          <img v-else height="35" src="~/assets/images/waiter.svg" />
        </v-btn>
      </template>
      <v-list-item
        class="pa-0"
        v-for="button of fabList"
        v-bind:key="button.title"
      >
        <v-card class="pa-2">
          <v-list-item-title
            ><h5>{{ $t(button.title) }}</h5></v-list-item-title
          >
        </v-card>
        <v-btn fab :color="button.color" @click="callWaiter(button)">
          <img height="60" :src="require('~/assets/images/' + button.icon)" />
        </v-btn>
      </v-list-item>
    </v-speed-dial>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialogWaiter: false,
      loading: false,
      fab: false,
      action: "",
      message:"",
      fabList: [
        {
          title: "Order",
          color: "indigo darken-4",
          icon: "order.svg",
          message: "Order Confirm",
        },
        {
          title: "Pay",
          color: "success",
          icon: "pay.svg",
          message: "Order Confirm",
        },
        {
          title: "Change Coal",
          color: "danger",
          icon: "coal.svg",
          message: "Coal Confirm",
        },
      ],
    };
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },
  methods: {
    closeModel() {
      this.dialogWaiter = false;
    },
    openModel() {
      this.dialogWaiter = true;
    },
    confirmModel() {
      // this.$socket.client is `socket.io-client` instance
      // this.$store.dispatch('table/TableNumber',this.$route.query.table)
      this.$socket.client.emit(
        "table-scan",
        this.TableNoLocalState,
        this.message
      );
      this.dialogWaiter = false;
    },
    callWaiter(val) {
      console.log(val);
      this.action = val.message;
      this.message=val.title;
      this.dialogWaiter = true;
    },
  },
  computed: mapState({
    TableNoLocalState(state) {
      return state.table.table.tableNumber;
    },
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

<style lang="scss" scoped></style>
