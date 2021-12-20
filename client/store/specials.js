export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getSpecialsList() {
    try {
      const response = await this.$axios.$get("specials/list");
      console.log(response.specialsList)
      return response.specialsList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getSpecialDetails(_, itemId) {
    try {
      const response = await this.$axios.$get(`specials/${itemId}`);
      return response.response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
