<template>
  <v-card class="rounded-xl" @click="viewSpecialDetails(special._id)">
    <v-img
      height="250"
      :src="special.bannerImg"
      class="mb-3 white--text"
      gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)"
    >
      <v-card-title>{{ special.name }}</v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    special: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewSpecialDetails(itemId) {
      this.$router.push({
        name: "specials-id",
        params: { id: itemId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>