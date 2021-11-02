const Cookie = process.client ? require("js-cookie") : undefined;

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async loginUser({ dispatch }, user) {
    try {
      const response = await this.$axios.$post("auth/login", user, {
        headers: { "No-Token": true }
      });
      dispatch(
        "auth/authenticateUser",
        {
          authToken: response.token,
          user: response.user,
          headers: response.token
        },
        { root: true }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async registerUser(_, user) {
    try {
      const response = await this.$axios.$post("auth/register", user);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  logoutUser({ commit }) {
    Cookie.remove("authToken");
    Cookie.remove("authUser");
    commit("auth/REMOVE_AUTH_TOKEN", null, { root: true });
    commit("auth/REMOVE_USER", null, { root: true });
    commit("auth/REMOVE_HEADERS", null, { root: true });
    this.$router.push({ name: "login" });
  }
};
