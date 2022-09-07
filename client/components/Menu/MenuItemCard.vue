<template>
  <v-col cols="12" md="6" lg="4">
    <v-card
      @click="viewFoodItemDetails(menuItem._id)"
      class="rounded-lg"
      elevation="10"
    >
      <div class="d-flex flex-no-wrap">
        
        <v-card-text>
          <h4 class="ml-1">{{ menuItem.name }}</h4>
          <h5 class="secondary--text ml-1">{{ menuItem.category.name }}</h5>
          <v-row justify="space-between" align="center" class="mt-2 mx-3">
            <div>
              <v-row>
                <div v-if="menuItem.todaySpecial">
                  <div v-for="price of menuItem.prices" :key="price.name">
                    <v-row class="mt-2 ml-1">
                      <h5>{{ price.name }}</h5>
                       <h5 class="secondary--text text-decoration-line-through ml-1">
                        {{ price.amount }}€
                      </h5>
                      <h5 class="danger--text ml-2">
                        {{ price.discountPrice }}€
                      </h5>
                    </v-row>
                  </div>
                </div>
                <div v-else>
                  <div v-for="price of menuItem.prices" :key="price.name">
                    <v-row class="mt-2 ml-1">
                      <h5>{{ price.name }}</h5>
                      <h5 class="danger--text ml-2">{{ price.amount }}€</h5>
                    </v-row>
                  </div>
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
         <!-- <v-card-text>
          <v-row justify="space-between" align="center" class="mx-1 my-1">
            <div>
              <v-row>
                <v-col>
                  <h3 class="ml-1">{{ menuItem.name }}</h3>
                  <h5 class="secondary--text ml-1">
                    {{ menuItem.category.name }}
                  </h5>
                   <div v-if="menuItem.todaySpecial">
                  <div v-for="price of menuItem.prices" :key="price.name">
                    <v-row class="mt-2 ml-1 ">
                      <h4>{{ price.name }}</h4>
                       <h4 class="secondary--text text-decoration-line-through ml-1">
                        {{ price.amount }}€
                      </h4>
                      <h4 class="danger--text ml-2">
                        {{ price.discountPrice }}€
                      </h4>
                    </v-row>
                  </div>
                </div>
                <div v-else>
                  <div v-for="price of menuItem.prices" :key="price.name">
                    <v-row class="mt-1 ml-1">
                      <h4>{{ price.name }}</h4>
                      <h4 class="danger--text ml-2">{{ price.amount }}€</h4>
                    </v-row>
                  </div>
                </div>
                </v-col>
              </v-row>
            </div>
            <div><Comment this>
              <v-row>
                <v-col>
                  <h5
                    v-for="price of menuItem.prices"
                    :key="price.name"
                    class="danger--text"
                  >
                  {{ price.name }}  Rs.{{ price.amount }}
                  </h5>
                </v-col>
              </v-row>
            </div>
          </v-row>
          <h5 class="secondary--text mt-2"><Comment this>
                  {{ menuItem.category.name }}
                </h5>
        </v-card-text> -->
        <v-avatar class="rounded-lg" size="150" tile>
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
  watch: {
    menuItem: {
      deep: true,
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
