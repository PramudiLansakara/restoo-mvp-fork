export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getReservationsList() {
    try {
      const response = await this.$axios.$get("reservations/list");
      return response.reservations;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getReservationDetails(_, itemId) {
    try {
      const response = await this.$axios.$get(`reservations/${itemId}`);
      return response.reservation;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async newReservation(_, reservation) {
    try {
      // console.log(order);
      const response = await this.$axios.$post("reservations/new", reservation);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async changeReservationStatus(_, item) {
    try {
      const response = await this.$axios.$put(
        `reservations/${item._id}/status`,
        item
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async editReservation(_, item) {
    try {
      const response = await this.$axios.$put(
        `reservations/${item._id}/update`,
        item
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
