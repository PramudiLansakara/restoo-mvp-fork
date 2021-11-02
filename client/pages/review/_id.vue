<template>
  <v-container fluid>
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      class="mb-3"
    ></v-img>
    <h2 class="text-center">{{ ItemDetails.name }}</h2>
    <v-rating
      class="text-center my-4"
      color="warning"
      background-color="secondary"
      empty-icon="$ratingFull"
      half-increments
      hover
      large
    ></v-rating>
    <v-textarea
      class="rounded-sm text-center"
      auto-grow
      filled
      dense
      rounded
    ></v-textarea>
    <center>
      <v-btn
        color="success white--text"
        class="mb-4"
        @click="nextItem(ItemDetails)"
      >
        Rate This
      </v-btn>
    </center>
    <center>
      <v-btn :to="'thank-you'" color="primary--text text--base">
        Skip
      </v-btn>
    </center>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: "redirectIfNotAuth",
  async asyncData({ store, params }) {
    const ItemDetails = await store.dispatch(
      "review/getReviewItemById",
      params.id
    );
    console.log(ItemDetails);
    return { ItemDetails };
  },
  computed: {
    ...mapGetters("review", {
      reviewItems: "getReviewItems"
    })
  },
  methods: {
    nextItem(item) {
      // console.log(this.reviewItems.indexOf(item) + 1);
      // console.log(this.reviewItems[this.reviewItems.indexOf(item) + 1].item);
      if (this.reviewItems.indexOf(item) == this.reviewItems.length - 1) {
        this.$router.push({
          name: "thank-you"
        });
      } else if (this.reviewItems.indexOf(item) < this.reviewItems.length) {
        this.$router.push({
          name: "review-id",
          params: {
            id: this.reviewItems[this.reviewItems.indexOf(item) + 1].item
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
