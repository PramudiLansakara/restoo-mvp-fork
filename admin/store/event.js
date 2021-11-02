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
  async addEvent(_, event) {
    try {
      const response = await this.$axios.$post("events/new", event);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async editEvent(_, item) {
    try {
      const response = await this.$axios.$put(
        `events/${item._id}`,
        item
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getEventDetails(_, itemId) {
    try {
      console.log("sss");
      const response = await this.$axios.$get(`events/${itemId}`);
      return response.event;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async deleteEvent(_, itemId) {
    try {
      const response = await this.$axios.$delete(`events/${itemId}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async uploadEventBanner(_, image) {
    try {
      console.log(image);
      let config = {
        headers: {
          'Content-Type': undefined,
        }
      }
      const response = await this.$axios.$post("events/upload", image, config);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
