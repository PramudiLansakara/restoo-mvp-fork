<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t("Our Specials") }} 🔥</h2>
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
    <v-row>
      
      <SpecialDealCard
        :menuItem="menuItem"
        v-if="menuItem.todaySpecial"
        v-for="menuItem of menuItems"
        :key="menuItem._id"
      />
    </v-row>
  </v-container>
</template>

<script>
import CategoryChip from "../../components/Category/CategoryChip.vue";
import MenuItemCard from "../../components/Menu/MenuItemCard.vue";
import SpecialDealCard from '../../components/Menu/SpecialDealCard.vue';

export default {
  components: { MenuItemCard, CategoryChip, SpecialDealCard },
  async asyncData({ store }) {
    const categories = await store.dispatch("food/getFoodCategoryList");
    const menuItems = await store.dispatch("food/getFoodItemList");

    console.log(categories);
    return { categories, menuItems };
  },
  methods: {
    async getFoodItemListByCategory(categoryId) {
      this.menuItems = await this.$store.dispatch(
        "food/getFoodItemListByCategory",
        categoryId
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
