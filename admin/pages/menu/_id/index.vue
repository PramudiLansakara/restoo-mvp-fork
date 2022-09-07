<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Item Details</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-row class="mb-3">
          <v-col cols="12" md="3">
            <h5 class="mb-3">{{ $t("Item Name") }}</h5>
            {{ item.name }}
          </v-col>
          <v-col cols="12" md="3">
            <h5 class="mb-3">{{ $t("Item Category") }}</h5>
            {{ item.category.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <h5 class="mb-3">{{ $t("Item Description") }}</h5>
            {{ item.description }}
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="item.prices"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>PRICES</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
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
   data() {
    return {
      headers: [
        {
          text: this.$t("Name"),
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: this.$t("Price"), value: "amount" },
        { text: this.$t("Discount"), value: "discountPrice" },
      ],
    };
  },
  async asyncData({ store, error, params }) {
    try {
      const item = await store.dispatch("menu/getFoodItemDetails", params.id);
      return { item };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "menu",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
