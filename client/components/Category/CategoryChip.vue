<template>
  <v-chip @click="getCategoryId(category._id)" large color="grey lighten-4">
    <v-icon left size="20px">
      mdi-food
    </v-icon>
    <h5>{{ category.name }}</h5>
  </v-chip>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCategoryId(categoryId) {
      this.$emit("getCategoryId", categoryId);
    }
  }
};
</script>

<style lang="scss" scoped></style>
