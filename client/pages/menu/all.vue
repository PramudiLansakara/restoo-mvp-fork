<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t("Our Menu") }}</h2>
      </v-col>
    </v-row>
    <v-row cols="12" justify="center">
      <v-chip-group active-class="blue-grey lighten-4">
        <CategoryChip
          @getCategoryId="getFoodItemListByCategory($event)"
          :category="category"
          v-for="category of categories"
          :key="category._id"
        />
      </v-chip-group>
    </v-row>
    <v-row class="mb-7">
      <MenuItemCard
        :menuItem="menuItem"
        v-for="menuItem of menuItems"
        :key="menuItem._id"
      />
    </v-row>
  </v-container>
</template>

<script>
import MenuItemCard from "../../components/Menu/MenuItemCard.vue";
export default {
  components: { MenuItemCard },
  async asyncData({ store }) {
    const categories = await store.dispatch("food/getFoodCategoryList");
    // const menuItems = await store.dispatch("food/getFoodItemList");
    const menuItems = await store.dispatch(
      "food/getFoodItemListByCategory",
      categories[0]._id
    );
    return { categories, menuItems };
  },
  methods: {
    async getFoodItemListByCategory(categoryId) {
      console.log(categoryId);
      this.menuItems = await this.$store.dispatch(
        "food/getFoodItemListByCategory",
        categoryId
      );
      console.log(this.menuItems);
    },
  },
};
</script>

<style lang="scss" scoped></style>
