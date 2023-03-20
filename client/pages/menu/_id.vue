<template>
  <v-container fluid>
    <div align="center">
      <v-img
        :height="imgHight"
        width="350"
        :src="ItemDetails.itemUrl"
        @click="onImageClick()"
        class="mb-3 mt-10 rounded"
      ></v-img>
    </div>
    <h2 class="mt-10">{{ ItemDetails.name }}</h2>
    <h5 class="danger--text mt-2">
      {{ ItemDetails.category.name }}
    </h5>
      <span v-html="ItemDetails.description"></span>
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

      <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text>
            <v-list>
              <v-list-item v-for="price in ItemDetails.prices" :key="price._id">
                <v-list-item-content class="ml-4">

                  <v-list-item-title v-if="ItemDetails.todaySpecial">
                    <h5>{{ price.name }}</h5> {{ price.discountPrice }} €</v-list-item-title>

                    <v-list-item-title v-else>
                    <h5>{{ price.name }}</h5> {{ price.amount }} €</v-list-item-title>

                </v-list-item-content>
                <v-list-item-action>
                  <v-radio-group v-model="itemPrice">
                    <v-radio :value="price" color="primary lighten-1">
                    </v-radio>
                  </v-radio-group>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

        <!-- <v-row align="end">
          <div v-if="ItemDetails.todaySpecial">
            <h5
              v-for="price of ItemDetails.prices"
              :key="price.name"
              class="danger--text"
            >
              {{ price.name }} {{ price.discountPrice }}
            </h5>
          </div>
          <div v-else>
            <h5
              v-for="price of ItemDetails.prices"
              :key="price.name"
              class="danger--text"
            >
              {{ price.name }} {{ price.amount }}
            </h5>
          </div>

          <h5 class="text-decoration-line-through secondary--text pl-3">
            <div v-if="ItemDetails.todaySpecial">{{ ItemDetails.price }}€</div>
          </h5>
        </v-row> -->
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
    <v-row>
      <v-col cols="12" md="3">
        <h5 class="my-2">{{ $t("Comments") }}</h5>
        <v-text-field
          v-model="cartItem.itemNote"
          class="rounded-sm"
          filled
          dense
          rounded
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn
      @click="addToCart"
      large
      rounded
      block
      depressed
      :disabled="isDisabled"
      color="primary lighten-1"
      class="py-7 mt-16"
    >
      <v-icon left color="white" size="25px"> mdi-food </v-icon>
      <h3 class="white--text">{{ $t("Add To Plate") }}</h3>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // itemPrice:"",
      price:"",
      itemPrice:{
          _id:"",
          name:"",
          amount:"",
          discountPrice:"",
        },
      cartItem: {
        _id: "",
        quantity: 1,
        price: "",
        name: "",
        itemUrl: "",
        itemNote:"",
      },
      imgHight: "250",
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
  computed: {
  isDisabled() {
      if (
        this.itemPrice._id
      ) {
        console.log(this.itemPrice)
        return false;
      } else {
        console.log(this.itemPrice)
        return true;
      }
    },
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
      if(this.ItemDetails.todaySpecial){
        this.price = this.itemPrice.discountPrice;
      }else{
        this.price = this.itemPrice.amount;
      }
      this.cartItem = {
        _id: this.ItemDetails._id,
        quantity: this.cartItem.quantity,
        priceDetails:{
          id:this.itemPrice._id,
          name:this.itemPrice.name,
          price:this.price,
          quantity:this.cartItem.quantity,
        },
        // price: this.itemPrice,
        name: this.ItemDetails.name,
        itemNote: this.cartItem.itemNote,
        itemUrl: this.ItemDetails.itemUrl,
      };
      console.log(this.cartItem);
      this.$store.dispatch("cart/addItemToCart", this.cartItem);
      this.$router.go(-1);
    },
    onImageClick() {
      if (this.imgHight === "250") {
        this.imgHight = "100%";
      } else {
        this.imgHight = "250";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
