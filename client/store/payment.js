export const state = () => ({
  sessionId:"",
  payment: {
    status: "",
    orderId: "",
    paymentMethod: ""
  }
});

export const getters = {
  getSessionId(state) {
    return state.sessionId;
  }
};

export const mutations = {
  SAVE_SESSION(state, id) {
    state.sessionId = id;
    // console.log(state.sessionId)
  },
  ADD_PAYMENT(state, payment) {
    state.payment = payment;
  }
};

export const actions = {
  async getSessionId(_, orderId) {
    try {
      console.log(orderId);
      const response = await this.$axios.$get(`payment/${orderId}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async newPayment({ commit, state }) {
    try {
      // console.log(state.payment);
      const response = await this.$axios.$post("payment/", state.payment);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  
  async getCityList() {
    try {
      const response = await this.$axios.$get("city/list");
      return response.cities;
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
  
};
