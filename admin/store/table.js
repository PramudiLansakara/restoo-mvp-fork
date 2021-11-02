export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
    async getTableList() {
        try {
            const response = await this.$axios.$get("table/list");
            return response.tables;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async addTable(_, table) {
        try {
            const response = await this.$axios.$post("table/", table);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async updateTable(_, item) {
        try {
            const response = await this.$axios.$put(
                `table/update/${item._id}`,
                item
            );
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async updateAllStatus(_, item) {
        try {
            const response = await this.$axios.$put(
                "table/alltablestatus",
                item
            );
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getTableDetails(_, itemId) {
        try {
            const response = await this.$axios.$get(`table/${itemId}`);
            return response.oneTable;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async deleteTable(_, itemId) {
        try {
            const response = await this.$axios.$delete(`table/${itemId}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    //   async uploadEventBanner(_, image) {
    //     try {
    //       console.log(image);
    //       let config = {
    //         headers: {
    //           'Content-Type': undefined,
    //         }
    //       }
    //       const response = await this.$axios.$post("events/upload", image, config);
    //       return response;
    //     } catch (error) {
    //       console.log(error);
    //       throw error;
    //     }
    //   },
};
