export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {

  async getCityList() {
    try {
      const response = await this.$axios.$get("city/list");
      return response.cities;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async addCity(_, item) {
    try {
      const response = await this.$axios.$post("city/", item);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async editCity(_, item) {
    try {
      const response = await this.$axios.$put(`city/${item._id}`, item);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getCityDetails(_, itemId) {
    try {
      const response = await this.$axios.$get(`city/${itemId}`);
      return response.city;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async deleteCity(_, itemId) {
    try {
      const response = await this.$axios.$delete(`city/${itemId}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
