<template>
  <v-container fluid>
    <v-img :height="imgHight" :src="ItemDetails.itemUrl" @click="onImageClick()" class="mb-3"></v-img>
    <h2>{{ ItemDetails.name }}</h2>
    <h5 class="danger--text mt-2">
      {{ ItemDetails.category.name }}
    </h5>
    <h5 class="secondary--text mt-2">
      {{ ItemDetails.description }}
    </h5>
    <v-row justify="space-between" align="center" class="mt-7 mx-3">
      <div>
        <v-row>
          <div>
            <v-icon color="warning">mdi-star</v-icon>
          </div>
          <h5 class="pl-1">5.0</h5>
        </v-row>
      </div>
      <div>
        <v-row>
          <h3 class="success--text" style="font-weight: normal">AVAILABLE</h3>
        </v-row>
      </div>
    </v-row>
    <v-row justify="space-between" align="center" class="mt-15 mx-3">
      <div>
        <v-row align="end">
          <div v-if="ItemDetails.todaySpecial">
            <h3>{{ ItemDetails.discountPrice }}€</h3>
          </div>
          <div v-else>
            <h3>{{ ItemDetails.price }}€</h3>
          </div>

          <h5 class="text-decoration-line-through secondary--text pl-3">
            <div v-if="ItemDetails.todaySpecial">{{ ItemDetails.price }}€</div>
          </h5>
        </v-row>
      </div>
      <div>
        <v-row align="center">
          <v-btn fab small class="mx-2" @click="decreaseQuantity">
            <v-icon color="primary darken-1" large>mdi-minus</v-icon>
          </v-btn>
          <h3 class="mx-3">
            {{ cartItem.quantity }}
          </h3>
          <v-btn fab small class="mx-2" @click="increaseQuantity">
            <v-icon color="primary lighten-1" large>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </div>
    </v-row>
    <v-btn
      @click="addToCart"
      large
      rounded
      block
      depressed
      color="primary lighten-1"
      class="py-7 mt-16"
    >
      <v-icon left color="white" size="25px"> mdi-food </v-icon>
      <h3 class="white--text">Add to plate</h3>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cartItem: {
        _id: "",
        quantity: 1,
        price: "",
        name: "",
        itemUrl:"",
      },
      imgHight:"250",
    };
  },
  async asyncData({ store, params }) {
    const ItemDetails = await store.dispatch(
      "food/getFoodItemDetails",
      params.id
    );
    console.log(ItemDetails);
    return { ItemDetails };
  },
  methods: {
    increaseQuantity() {
      this.cartItem.quantity++;
    },
    decreaseQuantity() {
      if (this.cartItem.quantity > 1) {
        this.cartItem.quantity--;
      }
    },
    addToCart() {
      // this.cartItem._id = this.ItemDetails._id;
      // this.cartItem.price = this.ItemDetails.price;
      this.cartItem = {
        _id: this.ItemDetails._id,
        quantity: this.cartItem.quantity,
        price: this.ItemDetails.todaySpecial
          ? this.ItemDetails.discountPrice
          : this.ItemDetails.price,
        name: this.ItemDetails.name,
        itemUrl: this.ItemDetails.itemUrl,
      };
      this.$store.dispatch("cart/addItemToCart", this.cartItem);
      this.$router.go(-1);
    },
    onImageClick(){
      if(this.imgHight === "250" ){
        this.imgHight= "100%";
      }else{
        this.imgHight= "250";
      }
        
    },
  },
};
</script>

<style lang="scss" scoped></style>
