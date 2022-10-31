<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t("Payment") }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>{{ $t("Your Information") }} ℹ️</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="6"
                  class="mt-5"
                  style="padding-bottom: 0px"
                >
                  <v-text-field
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    :disabled="disableEditing"
                    :rules="rules.nameRules"
                    v-model="paymentDetails.name"
                    :label="$t('Name')"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="6"
                  style="padding-top: 0px; padding-bottom: 0px"
                >
                  <v-text-field
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    :disabled="disableEditing"
                    :rules="rules.phoneNumberRules"
                    v-model="paymentDetails.phoneNumber"
                    :label="$t('Phone Number')"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="6"
                  style="padding-top: 0px; padding-bottom: 0px"
                >
                  <v-text-field
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    :disabled="disableEditing"
                    :rules="rules.emailRules"
                    v-model="paymentDetails.email"
                    :label="$t('E-mail')"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="6"
                  style="padding-top: 0px; padding-bottom: 0px"
                >
                  <v-text-field
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    :disabled="disableEditing"
                    :rules="rules.nameRules"
                    v-model="paymentDetails.address"
                    :label="$t('Address')"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="6"
                  style="padding-top: 0px; padding-bottom: 0px"
                >
                  <v-select
                    :label="$t('City')"
                    :items="cities"
                    :disabled="disableEditing"
                    v-model="cityId"
                    item-text="city"
                    item-value="_id"
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    required
                    @change="onChangeCity(cityId)"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center">
              <p>
                {{ $t("Have an Account")
                }}<nuxt-link
                  :to="{ name: 'login', query: { redirect: '/payment' } }"
                  style="text-decoration: none"
                >
                  Login</nuxt-link
                >
              </p>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>{{ $t("Order For") }} 🍟</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <v-card-text>
            <v-radio-group v-model="paymentDetails.orderType">
              <v-radio value="delivery" color="primary lighten-1">
                <template v-slot:label>
                  <div>
                    <h5>{{ $t("Delivery") }}</h5>
                  </div>
                </template>
              </v-radio>
              <v-radio value="takeaway" color="primary lighten-1">
                <template v-slot:label>
                  <div>
                    <h5>{{ $t("Dining") }}</h5>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-if="
        !(
          this.totalPrice >= this.minAmount ||
          this.paymentDetails.orderType === 'takeaway'
        )
      "
    >
      <v-row justify="space-between" align="center" class="mt-1 mx-3">
        <h6 class="red--text mb-1">
          {{ $t("Minimum Order Total") }} {{ this.minAmount | toCurrency }} {{ $t("For Delivery") }}
        </h6>
      </v-row>
    </v-row>
    <v-row v-if="this.paymentDetails.orderType === 'delivery'">
      <v-row justify="space-between" align="center" class="mt-2 mx-3">
        <h4>{{ $t("Delivery Charge") }}</h4>
        <h4>{{ deliveryCharge | toCurrency }}</h4>
      </v-row>
    </v-row>
    <v-row v-if="this.paymentDetails.orderType === 'takeaway'">
      <v-row justify="space-between" align="center" class="mt-2 mx-3">
        <h4>{{ $t("Discount") }} 10%</h4>
      </v-row>
    </v-row>
    <v-row>
      <v-row justify="space-between" align="center" class="my-2 mx-3">
        <h4>{{ $t("Total") }}</h4>
        <h4>{{ totalPrice | toCurrency }}</h4>
      </v-row>
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
        >
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="white"
          ></v-progress-circular>
          <h3 v-else class="white--text">{{ $t("Checkout") }}</h3>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import payments from "@/util/payments";
import { mapGetters, mapState } from "vuex";

export default {
  // middleware: "redirectIfNotAuth",
  data() {
    return {
      orderTotal: "",
      cityId: "",
      deliveryCharge: this.$store.state.cart.deliveryCharge,
      minAmount: this.$store.state.cart.minAmount,
      paymentDetails: {
        orderType: null,
        name: this.$store.state.auth.user.name,
        email: this.$store.state.auth.user.email,
        address: this.$store.state.auth.user.address,
        phoneNumber: this.$store.state.auth.user.phoneNumber,
        city: this.$store.state.auth.user.city,
        total: this.totalPrice,
        deliveryCharge: this.$store.state.cart.order.deliveryCharge,
        discount: this.$store.state.cart.order.discount,
      },
      valid: true,
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
        phoneNumberRules: [
          (v) => !!v || "Phone Number is required",
          (v) =>
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
              v
            ) || "Phone Number must be valid",
        ],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
      },
      payments: payments,
      loading: false,
    };
  },
  async asyncData({ store, error }) {
    try {
      const cities = await store.dispatch("payment/getCityList");
      if (store.state.auth.user.city) {
        const city = cities.find(
          (city) => city._id === store.state.auth.user.city
        );
        if (city) {
          const deliveryDetailsObj = {
            deliveryCharge: city.deliveryCharge,
            minAmount: city.minAmount,
          };
          store.dispatch("cart/saveDeliveryDetails", deliveryDetailsObj);
        }
      }
      console.log(cities);
      return { cities };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  computed: {
    totalPrice() {
      if (this.paymentDetails.orderType === "takeaway") {
        this.paymentDetails.deliveryCharge = 0;
        this.paymentDetails.discount = 10;
        return this.total - this.total * 0.1;
      } else if (this.paymentDetails.orderType === "delivery") {
        this.paymentDetails.discount = 0;
        this.paymentDetails.deliveryCharge = this.deliveryCharge;
        return this.total + this.paymentDetails.deliveryCharge;
      } else {
        return this.total;
      }
    },
    isDisabled() {
      if (
        this.paymentDetails.orderType &&
        this.paymentDetails.name &&
        this.paymentDetails.email &&
        this.paymentDetails.phoneNumber &&
        (this.totalPrice >= this.minAmount ||
          this.paymentDetails.orderType === "takeaway")
      ) {
        return false;
      } else {
        return true;
      }
    },
    disableEditing() {
      if (
        this.user.name &&
        this.user.email &&
        this.user.phoneNumber &&
        this.user.address &&
        this.deliveryCharge
      ) {
        return true;
      } else {
        return false;
      }
    },
    ...mapGetters("payment", {
      sessionId: "getSessionId",
    }),
    ...mapGetters("cart", {
      orderId: "getOrderId",
      total: "getTotal",
    }),
    ...mapState("auth", {
      user: "user",
    }),
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },
  methods: {
    async checkout() {
      const validate = this.$refs.form.validate();
      if (validate) {
        let orderId = "";
        this.loading = true;
        // console.log(this.paymentDetails);
        this.$store.dispatch("cart/updateCartItem", this.paymentDetails);
        try {
          orderId = await this.$store.dispatch("cart/newOrder");
          this.$dialog.message.success(this.$t("Order Placed"), {
            position: "top-right",
          });
          this.$socket.client.emit("new-order", this.paymentDetails);
          // await this.$store.dispatch("cart/placedOrderMail");
          this.$router.push({
            name: "thank-you",
            query: { id: orderId, status: "success" },
          });
          // this.$store.dispatch("cart/placedOrderMail");
          // this.$store.dispatch("cart/placedOrderMail", this.paymentDetails);

          // if (this.paymentDetails.paymentMethod == "card") {
          //   console.log(this.sessionId);
          //   this.$refs.checkoutRef.redirectToCheckout();
          // } else {
          //   try {
          //     await this.$store.dispatch("payment/newPayment");
          //     this.$dialog.message.success("Successfully paid!", {
          //       position: "top-right",
          //     });

          //   } catch (error) {
          //     this.loading = false;
          //     console.log(error);
          //     this.$dialog.message.error(error.response.data.message, {
          //       position: "top-right",
          //     });
          //   }
          // }
        } catch (error) {
          this.loading = false;
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
          });
        }
      }
    },
    async onChangeCity(cityId) {
      console.log(cityId);
      try {
        const city = await this.$store.dispatch(
          "payment/getCityDetails",
          cityId
        );
        this.deliveryCharge = city.deliveryCharge;
        this.minAmount = city.minAmount;
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
