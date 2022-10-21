<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t("Our Events") }}</h2>
      </v-col>
    </v-row>
    <v-row class="my-2 mx-1 white--text" justify="center"  v-for="event of events" :key="event._id" >
       <v-card  
 class="rounded-xl" @click="viewEventDetails(event._id)">
    <v-img
      height="210px"
      width="600px"
      :src="event.bannerImg"
      class="m-2 white--text"
      gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)"
    >
      <v-card-title>{{ event.name }}</v-card-title>
    </v-img>
  </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ store }) {
    const events = await store.dispatch("event/getEventList");

    return { events };
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

<style lang="scss" scoped></style>
