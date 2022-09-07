<template>
  <v-container fluid>
    <v-img height="250" :src="event.bannerImg" class="mb-3"></v-img>
    <h2>{{ event.name }}</h2>
    <h5 class="secondary--text mt-2">
      {{ event.description }}
    </h5>
    <v-row justify="space-between" align="center" class="mt-15 mx-1">
      <div>
        <h5 class="secondary--text">{{ $t("Date") }}</h5>
        <h3>{{ event.date | formatDate }}</h3>
      </div>
      <div>
        <h5 class="secondary--text">{{ $t("Time") }}</h5>
        <h3>{{ event.time }}</h3>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const event = await store.dispatch("event/getEventDetails", params.id);
    console.log(event);
    return { event };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
