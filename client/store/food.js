export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getFoodItemList() {
    try {
      const response = await this.$axios.$get("food/item/list");
      return response.foods;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getFoodItemListByCategory(_, categoryId) {
    try {
      const response = await this.$axios.$get(
        `food/item/list?category=${categoryId}`
      );
      return response.foods;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getFoodCategoryList() {
    try {
      const response = await this.$axios.$get("food/category/list");
      return response.categories;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getFoodItemDetails(_, itemId) {
    try {
      const response = await this.$axios.$get(`food/item/${itemId}`);
      return response.foodItem;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
