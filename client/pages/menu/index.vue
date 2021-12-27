<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>{{ $t("Our Specials") }} 🔥</h3>
      </v-col>
    </v-row>
    <v-row>
      <MenuItemCard
        :menuItem="menuItem"
        v-for="menuItem of topDeals"
        :key="menuItem._id"
      />
    </v-row>
    <v-row justify="center">
      <v-btn
        :to="'menu/top-deals'"
        rounded
        large
        class="mt-5"
        outlined
        color="primary lighten-1"
      >
        <h4 class="primary--text text--lighten-1">View More</h4>
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>{{ $t("Our Menu") }} 🥗</h3>
      </v-col>
    </v-row>
    <v-row>
      <MenuItemCard
        :menuItem="menuItem"
        v-for="menuItem of menu"
        :key="menuItem._id"
      />
    </v-row>
    <v-row justify="center">
      <v-btn
        :to="'menu/all'"
        rounded
        large
        class="mt-5"
        outlined
        color="primary lighten-1"
      >
        <h4 class="primary--text text--lighten-1">View More</h4>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import MenuItemCard from "../../components/Menu/MenuItemCard.vue";
export default {
  components: { MenuItemCard },
  computed: {
    topDeals() {
      return this.menuItems.filter((item) => item.todaySpecial);
    },
    menu() {
      return this.menuItems.filter((item) => !item.todaySpecial);
    },
  },

  async asyncData({ store }) {
    const menuItems = await store.dispatch("food/getFoodItemList");
    console.log(menuItems);
    return { menuItems };
  },
};
</script>

<style lang="scss" scoped></style>
