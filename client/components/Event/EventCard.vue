<template>
  <v-card class="rounded-xl" @click="viewEventDetails(event._id)">
    <v-img
      height="250"
      :src="event.bannerImg"
      class="mb-3 white--text"
      gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)"
    >
      <v-card-title>{{ event.name }}</v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewEventDetails(itemId) {
      this.$router.push({
        name: "events-id",
        params: { id: itemId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>