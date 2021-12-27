<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Orders</h2></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-col lg="3" md="3" sm="12">
        <h5>Filter status</h5>
        <v-select
          v-model="filter.status"
          class="rounded-sm"
          filled
          dense
          rounded
          label="Select a status"
          :items="filterStatusList"
          @change="onSelectStatus"
        ></v-select>
      </v-col>
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
        {{ item.total + " " }}$
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
        <v-select
          class="rounded-sm mt-2"
          filled
          dense
          rounded
          v-model="item.status"
          :items="items"
          @change="onChangeStatus(item)"
        ></v-select>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="viewOrder(item._id)" icon v-bind="attrs" v-on="on">
              <v-icon color="secondary">
                mdi-eye-outline
              </v-icon>
            </v-btn>
          </template>
          <span>View</span>
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
      items: statusList,
      filter: {},
      orderItems: [],
      filterStatusList: filterStatusList,
      headers: [
        {
          text: "ID",
          align: "start",
          value: "_id"
        },
        { text: "Date", value: "placedAt" },
        { text: "Order Note", value: "note" },
        { text: "Table", value: "table" },
        { text: "Order Price", value: "total" },
        { text: "Order Status", value: "status" },
        { text: "Change Status", value: "changeStatus" },
        { text: "Actions", value: "actions", sortable: false }
      ]
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
      await this.$store
        .dispatch("order/changeStatus", item)
          this.$dialog.message.success(this.$t('Success Message'), {
            position: "top-right"
          });
      }catch (error) {
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
      const response = await this.$store
        .dispatch("order/getOrderList", this.filter)
          this.orderItems = response;
      }catch (error) {
      console.log(error);
      this.$dialog.message.error(error.response.data.message, {
      position: "top-right",
      });        
      }    
    },
     viewOrder(orderId) {
      this.$router.push({
        name: "orders-id",
        params: { id: orderId }
      });
    },
  }
};
</script>

<style lang="scss" scoped></style>
