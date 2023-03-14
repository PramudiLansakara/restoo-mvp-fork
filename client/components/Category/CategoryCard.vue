<template>
       <v-card
 class="rounded-xl mx-2 my-2" @click="getCategoryId">
    <v-img
      height="150"
      width="150"
      :src="category.categoryUrl"
      class="m-2 white--text"
      gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)"
    >
      <v-card-title align="center">{{ category.name }}</v-card-title>
    </v-img>
  </v-card>
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
