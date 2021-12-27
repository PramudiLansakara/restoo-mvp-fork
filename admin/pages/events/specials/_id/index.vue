<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Special Details</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <h5 class="mb-3">Special Name</h5>
            {{ special.name }}
          </v-col>
          <v-col cols="12" md="4">
            <h5 class="mb-3">Special Desription</h5>
            {{ special.description }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="form-btn ma-5">
          <v-btn color="black--text" @click="cancel">{{ $t("Cancel") }}</v-btn>
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
      const special = await store.dispatch(
        "specials/getSpecialsDetails",
        params.id
      );
      return { special };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "events-specials",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
