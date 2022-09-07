export const state = () => ({
  authToken: null,
  user: null,
  headers: null
});

export const getters = {
  getUser(state) {
    return state.user;
  },

  getAuthToken(state) {
    return state.authToken;
  },

  getHeaders(state) {
    return state.headers;
  }
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },

  REMOVE_USER(state) {
    state.user = null;
  },

  SET_AUTH_TOKEN(state, authToken) {
    state.authToken = authToken;
  },

  REMOVE_AUTH_TOKEN(state) {
    state.authToken = null;
  },

  SET_HEADERS(state, header) {
    state.headers = header;
  },

  REMOVE_HEADERS(state) {
    state.headers = null;
  }
};

export const actions = {
  authenticateUser({ commit }, { authToken, user, headers }) {
    commit("SET_AUTH_TOKEN", authToken);
    commit("SET_USER", user);
    commit("SET_HEADERS", headers);
  },

  authenticateUserInMiddleware({ commit }, { authToken, headers }) {
    commit("SET_AUTH_TOKEN", authToken);
    commit("SET_HEADERS", headers);
  },

  async getUserList(_, filter) {
    try {
      // console.log(filter.status);
      let url = "auth/list";
      // if (filter.status) {
      //   console.log(url);
      //   url = url.concat(`&status=${filter.status}`);
      //   console.log(url);
      // }

      const response = await this.$axios.$get(url);
      return response.users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async activateUser(_, user) {
    try {
      const response = await this.$axios.$put(
        `auth/active/${user._id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deactivateUser(_, user) {
    try {
      const response = await this.$axios.$put(
        `auth/deactive/${user._id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
