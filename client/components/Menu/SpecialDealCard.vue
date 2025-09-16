<template>
  <v-col cols="12" align="center">
    <v-card
      class="mx-auto rounded-xl"
      max-width="374"
      @click="viewFoodItemDetails(menuItem._id)"
    >
      <v-img height="250" :src="menuItem.itemUrl"></v-img>

      <v-card-title>{{ menuItem.name }}</v-card-title>
     
      <v-card-text>
        <v-row>
           <h5 class="secondary--text ml-3 mb-3">{{ menuItem.category.name }}</h5>
        </v-row>
        <v-row justify="space-between" align="center" class="my-5 mx-1">
          <h3 class="danger--text">Rs.{{ menuItem.discountPrice }}</h3>
          <h3 class="text-decoration-line-through secondary--text pl-2">
            Rs.{{ menuItem.price }}
          </h3>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewFoodItemDetails(itemId) {
      this.$router.push({
        name: "menu-id",
        params: { id: itemId },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
