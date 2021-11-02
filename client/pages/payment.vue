<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>Payment</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>Order for 🍟</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text>
            <v-radio-group v-model="paymentDetails.orderType">
              <v-radio value="dining" color="primary lighten-1">
                <template v-slot:label>
                  <div>
                    <h5>Dining</h5>
                  </div>
                </template>
              </v-radio>
              <v-radio value="takeaway" color="primary lighten-1">
                <template v-slot:label>
                  <div>
                    <h5>Takeaway</h5>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>Payment Method 💵</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text>
            <v-list>
              <v-list-item v-for="payment in payments" :key="payment.value">
                <img
                  :alt="`${payment.title} avatar`"
                  :src="require('../assets/images/' + payment.image)"
                />
                <v-list-item-content class="ml-4">
                  <v-list-item-title
                    ><h5>{{ payment.title }}</h5></v-list-item-title
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <v-radio-group v-model="paymentDetails.paymentMethod">
                    <v-radio :value="payment.value" color="primary lighten-1">
                    </v-radio>
                  </v-radio-group>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          large
          rounded
          block
          depressed
          color="primary lighten-1"
          class="py-7"
          @click="checkout"
          :disabled="isDisabled"
          :loading="loading"
        >
          <h3 class="white--text">Checkout</h3>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import payments from "@/util/payments";

export default {
  // middleware: "redirectIfNotAuth",
  data() {
    return {
      paymentDetails: {
        orderType: null,
        paymentMethod: null
      },
      payments: payments,
      loading: false
    };
  },
  computed: {
    isDisabled() {
      if (this.paymentDetails.orderType && this.paymentDetails.paymentMethod) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    checkout() {
      if (this.$store.state.auth.authToken) {
        this.loading = true;
        this.$store.dispatch("cart/updateCartItem", this.paymentDetails);
        this.$store
          .dispatch("cart/newOrder")
          .then(() => {
            this.$dialog.message.success("Successfully ordered!", {
              position: "top-right"
            });
            this.$router.push({ name: "review" });
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
            this.$dialog.message.error(error.response.data.message, {
              position: "top-right"
            });
          });
      } else {
        this.$router.push({ name: "login", query: { redirect: "/payment" } });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
