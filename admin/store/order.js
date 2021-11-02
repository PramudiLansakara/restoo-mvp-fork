export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getOrderList(_, filter) {
    try {
      // console.log(filter.status);
      let url = "order/list?limit=100&sort=desc";
      if (filter.status) {
        console.log(url);
        url = url.concat(`&status=${filter.status}`);
        console.log(url);
      }

      const response = await this.$axios.$get(url);
      return response.orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async changeStatus(_, item) {
    try {
      const status = {
        status: item.status
      };
      const response = await this.$axios.$put(
        `order/${item._id}/status`,
        status
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getOrderDetails(_, orderId) {
    try {
      const response = await this.$axios.$get(`order/${orderId}`);
      return response.order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
