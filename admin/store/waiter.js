export const state = () => ({
    requests: [],
    count: 0
});

export const getters = {
    getRequests(state) {
        return state.requests;
    },
    getRequestsCount(state) {
        return state.count;
    },
};

export const mutations = {
    PUSH_ITEM(state, item) {
        state.requests.push(item)
        state.count++ ;
    },
    REMOVE_ITEM(state, item) {
        state.requests.splice(state.requests.indexOf(item), 1)
    },
    RESET_REQUEST_COUNT(state) {
        state.count = 0 ;
    }
};

export const actions = {
    addRequest({ commit }, request) {
        commit("PUSH_ITEM", request);
    },
    removeRequest({ commit }, request) {
        commit("REMOVE_ITEM", request);
    },
    resetRequestCount({ commit }) {
        commit("RESET_REQUEST_COUNT");
    },
};
