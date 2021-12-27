export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getSpecialsList() {
    try {
      const response = await this.$axios.$get("specials/list");
      return response.specialsList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async addSpecials(_, specials) {
    try {
      const response = await this.$axios.$post("specials/new", specials);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async editSpecials(_, item) {
    try {
      const response = await this.$axios.$put(
        `specials/${item._id}`,
        item
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getSpecialsDetails(_, itemId) {
    try {
      console.log(itemId);
      const response = await this.$axios.$get(`specials/${itemId}`);
      console.log(response.response);
      return response.response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async deleteSpecials(_, itemId) {
    try {
      const response = await this.$axios.$delete(`specials/${itemId}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
