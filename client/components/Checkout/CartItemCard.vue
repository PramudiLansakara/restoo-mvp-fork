<template>
  <v-col cols="12" md="6" lg="4">
    <v-card class="rounded-lg elevation-0">
      <div class="d-flex flex-no-wrap">
        <v-avatar class="rounded-lg" size="75" tile>
          <v-img
            :src="cartItem.itemUrl"
          ></v-img>
        </v-avatar>
        <v-card-text>
          <v-row class="ml-1" justify="space-between">
            <div><h4>{{ cartItem.name }}</h4>
            <h5 class="secondary--text ml-1">{{ cartItem.priceDetails.name }}</h5></div>
            <v-btn icon @click="removeItem(cartItem._id)">
              <v-icon color="danger">mdi-delete-outline</v-icon>
            </v-btn>
          </v-row>
          <v-row justify="space-between" align="center" class="">
            <v-col cols="6" class="">
            <h5>{{ cartItem.priceDetails.price }}€
            <span class="secondary--text ml-1">  x{{ cartItem.priceDetails.quantity }}</span></h5>
            </v-col>
            <v-col align="right">
            <h5>{{ cartItem.priceDetails.price*cartItem.priceDetails.quantity}}€</h5>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      item: {
        _id: ""
      }
    };
  },
  methods: {
    removeItem(_id) {
      this.item._id = _id;
      this.$store.dispatch("cart/removeItemFromCart", this.item);
    }
  }
};
</script>

<style lang="scss" scoped></style>
