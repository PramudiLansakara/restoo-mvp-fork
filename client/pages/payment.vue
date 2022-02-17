<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>Payment</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>Your information ℹ️</h3>
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
                    label="Name"
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
                    label="Phone Number"
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
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            </v-card-text>
            <v-card-actions>
            <v-row justify="center">
              <p>
                Already have an account?<nuxt-link
                  :to='{name:"login", query: { redirect: "/payment" }}'
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
        <stripe-checkout ref="checkoutRef" :pk="pk" :session-id="sessionId" />
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

        <!-- <button @click="check">Checkout</button> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import payments from "@/util/payments";
import { mapGetters } from "vuex";

export default {
  // middleware: "redirectIfNotAuth",
  data() {
    this.pk = process.env.STRIPE_PK;
    return {
      paymentDetails: {
        orderType: null,
        paymentMethod: null,
        name: this.$store.state.auth.user.name,
        email: this.$store.state.auth.user.email,
        phoneNumber: this.$store.state.auth.user.phoneNumber,
      },
      valid: true,
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
        phoneNumberRules:[
          (v) => !!v || "Phone Number is required",
          (v) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) || "Phone Number must be valid",
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
  //   async asyncData({ store, error, params }) {
  //   try {
  //     if(store.state.auth.user){
  //     this.name = this.$store.state.auth.user.name
  //     console.log(this.name)
  //   }
  //   } catch (err) {
  //     console.log(err);
  //     return error({ statusCode: 404 });
  //   }
  // },
  // async fetch() {
  //   if(this.$store.state.auth.user != null){
  //   this.disableEditing = true;
  //   }
  // },
  computed: {
    isDisabled() {
      if (this.paymentDetails.orderType && this.paymentDetails.paymentMethod) {
        return false;
      } else {
        return true;
      }
    },
    disableEditing() {
      if (this.$store.state.auth.user.name && this.$store.state.auth.user.email && this.$store.state.auth.user.phoneNumber) {
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
    }),
  },
  methods: {
    async checkout() {
        const validate = this.$refs.form.validate();
        if (validate) {
        this.loading = true;
        console.log(this.paymentDetails);
        this.$store.dispatch("cart/updateCartItem", this.paymentDetails);
        try {
          await this.$store.dispatch("cart/newOrder");
          if (this.paymentDetails.paymentMethod == "card") {
            console.log(this.sessionId);
            this.$refs.checkoutRef.redirectToCheckout();
          } else {
            try {
              await this.$store.dispatch("payment/newPayment");
              this.$dialog.message.success("Successfully paid!", {
                position: "top-right",
              });
              this.$router.push({
                name: "thank-you",
                query: { status: "success" },
              });
            } catch (error) {
              this.loading = false;
              console.log(error);
              this.$dialog.message.error(error.response.data.message, {
                position: "top-right",
              });
            }
          }
        } catch (error) {
          this.loading = false;
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
          });
        }
        }
    }
  },
};
</script>

<style lang="scss" scoped></style>
