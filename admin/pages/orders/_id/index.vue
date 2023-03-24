<template>
  <v-container style="padding: 0px 0px;" fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Order Details</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <h5 class="mb-3">Customer</h5>
            {{ order.customer.name }}
          </v-col>
          <v-col cols="12" md="3">
            <h5 class="mb-3">Order Type</h5>
            {{ order.orderType }}
          </v-col>
          <v-col cols="12" md="2">
            <h5 class="mb-3">Order Status</h5>
            <v-chip
              :color="order.status | getColorByStatus"
              text-color="white"
              >{{ order.status }}</v-chip
            >
          </v-col>
        </v-row>
        <v-row v-if="order.note">
          <v-col cols="12" md="3">
            <h5 class="mb-3">Order Notes</h5>
            {{ order.note }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Item ID</th>
                    <th class="text-left">Item Name</th>
                    <th class="text-center">Size</th>
                    <th class="text-center">Price</th> 
                    <th class="text-center">Quantity</th>
                    <th class="text-center">Item Note</th> 
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.items" :key="item._id">
                    <td>{{ item.item._id }}</td>
                    <td>{{ item.name }}</td>
                    <td class="text-center">{{ item.priceDetails.name }}</td>
                    <td class="text-center">{{ item.priceDetails.price }} $</td>
                    <td class="text-center">{{ item.priceDetails.quantity }}</td>
                    <td class="text-center">{{ item.itemNote }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        
      </v-card-text>
      <v-divider class="py-3"></v-divider>
        <v-row class="ml-5">
            <h5 v-if="order.discount" class="mb-3"><strong>Discount: </strong><span class="success--text"> {{ order.discount }}</span></h5>
            <h5 v-if="order.deliveryCharge" class="mb-3"><strong>Delivery Charge: </strong><span class="success--text"> {{ order.deliveryCharge | toCurrency }}</span></h5>
        </v-row>
        <v-row class="ml-5">
          <h4 class="mb-0"><strong>Total Price: </strong><span class="success--text"> {{ order.total |toCurrency}}</span></h4>
        </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="form-btn ma-5">
          <v-btn color="black--text" @click="cancel">{{ $t("Cancel") }}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { statusList } from "~/util/status";

export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      items: statusList,
    };
  },
  async asyncData({ store, error, params }) {
    try {
      const order = await store.dispatch("order/getOrderDetails", params.id);
      console.log(order);
      return { order };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "orders",
      });
    },
    async onChangeStatus(item) {
      console.log(item);
      try { 
      await this.$store
        .dispatch("order/changeStatus", item)
          this.$dialog.message.success(this.$t("Success Message"), {
            position: "top-right",
          });
      }catch (error) {
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
