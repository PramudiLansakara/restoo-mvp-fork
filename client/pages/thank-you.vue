<template>
  <v-container fluid class="mt-10">
    <div v-if="status == 'success'">
      <v-row>
        <v-col cols="12">
          <center>
            <h2>Thank You 😍</h2>
          </center>
        </v-col>
      </v-row>
      <v-row justify="center">
        <img src="../assets/images/waitress.svg" height="300" />
      </v-row>
      <h6 class="mt-8 text-center">
        {{ $t("Thank You Note") }} 😍
      </h6>
      <v-row>
        <v-col class="mt-5" cols="12">
          <v-btn
            @click="clickButton"
            large
            rounded
            block
            depressed
            color="primary lighten-1"
            class="py-7"
          >
            <h3 class="white--text">{{ $t("Home") }}</h3>
          </v-btn>
          <v-btn
            @click="viewInvoice"
            large
            rounded
            block
            depressed
            color="primary lighten-1"
            class="py-7 mt-4"
          >
            <h3 class="white--text">{{ $t("View Invoice") }}</h3>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="status == 'failed'">
      <v-row justify="center">
        <img src="../assets/images/paymenterror.svg" class="mt-5" height="300" />
      </v-row>
      <h4 class="mt-8 text-center">Payment failed !</h4>
      <v-row>
        <v-col class="mt-5" cols="12">
          <v-btn
            @click="viewInvoice"
            large
            rounded
            block
            depressed
            color="primary lighten-1"
            class="py-7"
          >
            <h3 class="white--text">Back To Checkout</h3>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  // middleware: "redirectIfNotAuth"
  data() {
    return {
      status: "",
      orderId:"",
    };
  },
  async fetch() {
    try {
      this.status = this.$route.query.status;
      this.orderId = this.$route.query.id;
      if (this.status == "failed") {
        this.$store.dispatch("cart/saveOrderId", this.$route.query.id);
      }else{
      await this.$store.dispatch("cart/placedOrderMail", this.orderId)
      this.$dialog.message.success(this.$t('Order Request email sent'), {
            position: "top-right"
          });
      }
    } catch (err) {
      console.log(err);
      // return this.$nuxt.context.redirect("/home");
    }
  },
  methods: {
    clickButton() {
      if (this.status == "failed") {
        this.$router.push({ name: "payment" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    viewInvoice() {
      this.$router.push({ 
      name: "invoice" ,
      query: { id: this.orderId },
      });
    },
  },
};
</script>

<style lang="scss"></style>
