export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async newReservation(_, reservation) {
    try {
      // console.log(order);
      const response = await this.$axios.$post("reservations/new", reservation);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
