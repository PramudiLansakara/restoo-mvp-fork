<template>
  <v-container fluid>
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
  </v-container>
</template>

<script>
export default {
  // middleware: "redirectIfNotAuth"
  data() {
    return {};
  },
  methods: {
    clickButton() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss"></style>
