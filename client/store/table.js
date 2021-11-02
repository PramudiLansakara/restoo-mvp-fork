export const state = () => ({

    table: {
        tableNumber: 0,
        status: "deactive",
    },
});

export const getters = {
    getTable(state) {
        console.log(state.table)
        return state.table;
    }
};

export const mutations = {
    TABLE(state, table) {
        state.table = table
    },

};

export const actions = {
    tableDetails({ commit }, table) {
        commit("TABLE", table);
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
};
