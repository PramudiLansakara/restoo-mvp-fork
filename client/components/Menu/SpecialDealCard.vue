<template>
  <v-col cols="12" md="6" lg="4">
    <v-card
      @click="viewFoodItemDetails(menuItem._id)"
      class="rounded-xl"
      elevation="10"
    >
      <div class="d-flex flex-no-wrap">
        <v-card-text>
          <h3>{{ menuItem.name }}</h3>
          <h5 class="secondary--text mt-2">{{ menuItem.category.name }}</h5>
          <v-row justify="space-between" align="center" class="mt-8 mx-3">
            <div>
              <v-row>
                <div v-if="menuItem.todaySpecial">
                  <h5 class="danger--text">{{ menuItem.discountPrice }}€</h5>
                </div>
                <div v-else>
                  <h5 class="danger--text">{{ menuItem.price }}€</h5>
                </div>
              </v-row>
            </div>
            <div>
              <v-row>
                <div>
                  <v-icon color="warning">mdi-star</v-icon>
                </div>
                <h5 class="pl-1">5.0</h5>
              </v-row>
            </div>
          </v-row>
        </v-card-text>
        <v-avatar class="rounded-xl" size="125" tile>
          <v-img :src="menuItem.itemUrl"></v-img>
        </v-avatar>
      </div>
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
