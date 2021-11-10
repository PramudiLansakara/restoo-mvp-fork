export const state = () => ({
  sessionId:""
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
  }
};
