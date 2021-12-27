<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <center>
          <h2>Thank You 😍</h2>
        </center>
      </v-col>
    </v-row>
    <v-row justify="center" style="height: 90vh">
      <v-col class="justify-center align-center" cols="12" md="6">
        <v-card class="gradient" elevation="0" rounded="xl">
          <v-card-text>
            <div class="layout column align-center">
              <img src="../../assets/images/chef.svg" />
              <center>
                <h4 class="mt-4 white--text">
                  Thank you for enjoy our meal. Do you like to rate our meals?
                </h4>
              </center>
              <img src="../../assets/images/rating.svg" height="100" />
            </div>
            <center>
              <v-btn color="success white--text" class="mb-4" @click="review">
                Yes, Sure!
              </v-btn>
            </center>
            <center>
              <v-btn color="primary--text text--base"> No, Thanks! </v-btn>
            </center>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("review", {
      reviewItems: "getReviewItems",
    }),
  },
  methods: {
    review() {
      this.$router.push({
        name: "review-id",
        params: { id: this.reviewItems[0].item },
      });
    },
  },
};
</script>

<style lang="scss">
.gradient {
  background: linear-gradient(to top, #d45bff, #2f4cdd);
}
</style>
