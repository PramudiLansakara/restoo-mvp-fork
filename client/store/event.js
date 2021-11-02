export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getEventList() {
    try {
      const response = await this.$axios.$get("events/list");
      return response.events;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getEventDetails(_, itemId) {
    try {
      const response = await this.$axios.$get(`events/${itemId}`);
      return response.event;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
