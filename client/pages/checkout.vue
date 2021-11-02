<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Checkout 🥣</h3>
      </v-col>
    </v-row>
    <v-row>
      <CartItemCard
        :cartItem="cartItem"
        v-for="cartItem of cartItems"
        :key="cartItem._id"
      />
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row>
      <v-col cols="12" md="3">
        <h5 class="mb-3">Comments</h5>
        <v-text-field
          v-model="orderDetails.note"
          class="rounded-sm"
          filled
          dense
          rounded
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-row justify="space-between" align="center" class=" mx-3">
        <h5 class="secondary--text">Subtotal</h5>
        <h5 class="secondary--text">{{ total }}$</h5>
      </v-row>
    </v-row>
    <v-row>
      <v-row justify="space-between" align="center" class="mt-2 mx-3">
        <h5 class="secondary--text">Discount</h5>
        <h5 class="secondary--text">0$</h5>
      </v-row>
    </v-row>
    <v-row>
      <v-row justify="space-between" align="center" class="mt-5 mx-3">
        <h4>Total</h4>
        <h4>{{ total }}$</h4>
      </v-row>
    </v-row>
    <v-row>
      <v-col class="mt-5" cols="12">
        <v-btn
          large
          rounded
          block
          depressed
          color="primary lighten-1"
          class="py-7"
          :loading="loading"
          @click="confirm"
          :disabled="isCartEmpty"
        >
          <h3 class="white--text">Confirm</h3>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CartItemCard from "../components/Checkout/CartItemCard.vue";
import { mapGetters } from "vuex";

export default {
  // middleware: "redirectIfNotAuth",
  components: { CartItemCard },
  data() {
    return {
      orderDetails: {
        note: ""
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters("cart", {
      total: "getTotal"
    }),
    ...mapGetters("cart", {
      cartItems: "getCartItems"
    }),
    isCartEmpty() {
      if (this.cartItems.length != 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    confirm() {
      this.$store.dispatch("cart/updateCartItem", this.orderDetails);
      this.$router.push({ name: "payment" });
    }
  }
};
</script>

<style lang="scss" scoped></style>
