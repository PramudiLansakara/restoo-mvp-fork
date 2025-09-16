<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-row>
        <v-toolbar-title><h2>Orders</h2></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="primary lighten-1 white--text"
          @click="acceptAllInomingOrders()"
        >
          <v-icon left color="white" size="20px">
            mdi-clipboard-check-outline
          </v-icon>
          {{ $t("Accept All") }}</v-btn
        >
      </v-row>
      <v-dialog v-model="dialogAccept" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Accept Order</span>
          </v-card-title>
          <v-card-text> Confirm Accept Order </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeOrderConfirm()">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="acceptOrderConfirm()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDecline" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Decline Order</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="order.adminNote"
                    label="Admin Note*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeOrderDecline()">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="orderDeclineConfirm()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="orderItems"
      sort-by="placedAt"
      :sort-desc="true"
      class="elevation-1"
    >
      <template v-slot:item.placedAt="{ item }">
        {{ item.placedAt | formatDate }}
      </template>
      <template v-slot:item.total="{ item }">
        Rs.{{ item.total}}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          small
          :color="item.status | getColorByStatus"
          text-color="white"
          >{{ item.status }}</v-chip
        >
      </template>
      <template v-slot:item.changeStatus="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="handleAccept(item)" v-bind="attrs" v-on="on">
              <v-icon color="green"> mdi-clipboard-check-outline </v-icon>
            </v-btn>
          </template>
          <span>Accept</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="handleDecline(item)" v-bind="attrs" v-on="on">
              <v-icon color="red"> mdi-clipboard-remove-outline </v-icon>
            </v-btn>
          </template>
          <span>Decline</span>
        </v-tooltip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="viewOrder(item._id)" icon v-bind="attrs" v-on="on">
              <v-icon color="secondary"> mdi-eye-outline </v-icon>
            </v-btn>
          </template>
          <span>View</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="viewInvoice(item._id)" icon v-bind="attrs" v-on="on">
              <v-icon color="secondary"> mdi-printer </v-icon>
            </v-btn>
          </template>
          <span>View Invoice</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { statusList, filterStatusList } from "~/util/status";
export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      dialogAccept: false,
      dialogDecline: false,
      items: statusList,
      filter: {},
      order: {},
      orderItems: [],
      filterStatusList: filterStatusList,
      headers: [
        {
          text: this.$t("Name"),
          align: "start",
          value: "customer.name",
        },
        { text: this.$t("Date"), value: "placedAt" },
        { text: this.$t("Note"), value: "note" },
        // { text: "Table", value: "table" },
        { text: this.$t("Price"), value: "total" },
        { text: this.$t("Status"), value: "status" },
        {
          text: this.$t("Change Status"),
          value: "changeStatus",
          sortable: false,
        },
        { text: this.$t("Actions"), value: "actions", sortable: false },
      ],
    };
  },
  async asyncData({ store, error }) {
    try {
      const orderItems = await store.dispatch("order/getOrderList", {});
      console.log(orderItems);
      return { orderItems };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    async onChangeStatus(item) {
      console.log(item);
      try {
        await this.$store.dispatch("order/changeStatus", item);
        this.$dialog.message.success(this.$t("Success Message"), {
          position: "top-right",
        });
      } catch (error) {
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
    async onSelectStatus() {
      if (this.filter.status === "all") {
        this.filter = {};
      }
      try {
        const response = await this.$store.dispatch(
          "order/getOrderList",
          this.filter
        );
        this.orderItems = response;
      } catch (error) {
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
    viewOrder(orderId) {
      this.$router.push({
        name: "orders-id",
        params: { id: orderId },
      });
    },
    viewInvoice(orderId) {
      this.$router.push({
        name: "orders-id-invoice",
        params: { id: orderId },
      });
    },
    async handleAccept(item) {
      try {
        console.log(item);
        this.order = item;
        this.dialogAccept = true;
        // await this.$store.dispatch("order/acceptOrder", item);
        // this.$dialog.message.success(this.$t("Success Message"), {
        //   position: "top-right",
        // });
      } catch (error) {
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
    async acceptOrderConfirm() {
      try {
        this.loading = true;
        this.order.status = "accepted";
        console.log(this.order.status);
        await this.$store.dispatch("order/acceptOrder", this.order);
        this.$dialog.message.success(this.$t("Success Message"), {
          position: "top-right",
        });
        this.closeOrderConfirm();
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
    closeOrderConfirm() {
      this.dialogAccept = false;
    },
    async handleDecline(item) {
      try {
        console.log(item);
        this.order = item;
        this.dialogDecline = true;
      } catch (error) {
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
    async orderDeclineConfirm() {
      try {
        this.loading = true;
        this.order.status = "declined";
        console.log(this.order.status);
        await this.$store.dispatch("order/declineOrder", this.order);
        this.$dialog.message.success(this.$t("Success Message"), {
          position: "top-right",
        });
        this.closeOrderDecline();
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
    closeOrderDecline() {
      this.dialogDecline = false;
    },
    async acceptAllInomingOrders() {
      try {
        await this.$store.dispatch("order/acceptAllInomingOrders");
        this.$dialog.message.success(this.$t("Success Message"), {
          position: "top-right",
        });
        await this.$nuxt.refresh();
      } catch (error) {
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
