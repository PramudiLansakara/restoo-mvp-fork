<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Event Details</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <h5 class="mb-3">Event Name</h5>
            {{ event.name }}
          </v-col>
          <v-col cols="12" md="4">
            <h5 class="mb-3">Event Desription</h5>
            {{ event.description }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <h5 class="mb-3">Event Date</h5>
            {{ event.date }}
          </v-col>
           <v-col cols="12" md="4">
            <h5 class="mb-3">Event Time</h5>
            {{ event.time }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="form-btn ma-5">
          <v-btn color="black--text" @click="cancel">{{$t("Cancel")}}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: "redirectIfNotAuth",
  async asyncData({ store, error, params }) {
    try {
      const event = await store.dispatch("menu/getEventDetails", params.id);
      return { event };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "events",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
