<template>
  <v-container fluid>
    <div v-if="status == 'success'" >
    <v-row >
      <v-col cols="12">
        <center>
          <h2>Thank You 😍</h2>
        </center>
      </v-col>
    </v-row>
    <v-row justify="center">
      <img src="../assets/images/waitress.svg" height="300" />
    </v-row>
    <h4 class="mt-8 text-center">
      Thank you for enjoy our meal. See you again 😍
    </h4>
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
          <h3 class="white--text">Go To Home</h3>
        </v-btn>
      </v-col>
    </v-row>
  </div>
      <div v-if="status == 'failed'" >
          <!-- <v-row >
      <v-col cols="12">
        <center>
          <h2>Thank You 😍</h2>
        </center>
      </v-col>
    </v-row> -->
    <v-row justify="center">
      <img src="../assets/images/waitress.svg" height="300" />
    </v-row>
    <h4 class="mt-8 text-center">
      Payment failed !
    </h4>
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
      status:''
    };
  },
  async fetch() {
    try {
      console.log(this.$route.query.id);
      console.log(this.$route.query.status);
      this.status= this.$route.query.status;
      if(this.status=='failed'){
        this.$store.dispatch("cart/saveOrderId", this.$route.query.id);
      }
    } catch (err) {
      console.log(err);
      // return this.$nuxt.context.redirect("/home");
    }
  },
  methods: {
    clickButton() {
      if(this.status=='failed'){
      this.$router.push({ name: "payment" });
      }
      else{
      this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style lang="scss"></style>
