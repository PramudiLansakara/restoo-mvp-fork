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
  async addCategory(_, item) {
    try {
      const response = await this.$axios.$post("food/category", item);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async editCategory(_, item) {
    try {
      const response = await this.$axios.$put(`food/category/${item._id}`, item);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getCategoryDetails(_, itemId) {
    try {
      const response = await this.$axios.$get(`food/category/${itemId}`);
      return response.category;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async deleteCategory(_, itemId) {
    try {
      const response = await this.$axios.$delete(`food/category/${itemId}`);
      return response;
    } catch (error) {
      console.error(error);
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
  },
  async addMenuItem(_, item) {
    try {
      const response = await this.$axios.$post("food/item", item);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async editMenuItem(_, item) {
    try {
      const response = await this.$axios.$put(`food/item/${item._id}`, item);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deleteMenuItem(_, itemId) {
    try {
      const response = await this.$axios.$delete(`food/item/${itemId}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async todaySpecial(_, item) {
    try {
      const response = await this.$axios.$put(
        `food/item/todayspecial/${item.id}/${item.todaySpecial}`
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
