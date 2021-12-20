<template>
  <v-container fluid>
    <v-img height="250" :src="special.bannerImg" class="mb-3"></v-img>
    <h2>{{ special.name }}</h2>
    <h5 class="secondary--text mt-2">
      {{ special.description }}
    </h5>
  </v-container>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const special = await store.dispatch("specials/getSpecialDetails", params.id);
    console.log(special);
    return { special };
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
