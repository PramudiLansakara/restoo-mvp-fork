export const state = () => ({
    requests: []
});

export const getters = {
    getRequests(state) {
        return state.requests;
    },
    getRequestsCount(state) {
        return state.requests.length;
    },
};

export const mutations = {
    PUSH_ITEM(state, item) {
        state.requests.push(item)
    },
    REMOVE_ITEM(state, item) {
        state.requests.splice(state.requests.indexOf(item), 1)
    },
};

export const actions = {
    addRequest({ commit }, request) {
        commit("PUSH_ITEM", request);
    },
    removeRequest({ commit }, request) {
        commit("REMOVE_ITEM", request);
    },
};
