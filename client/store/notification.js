export const state = () => ({
    notifications: [],
    count: 0
});

export const getters = {
    getNotifications(state) {
        return state.notifications;
    },
    getNotificationsCount(state) {
        return state.count;
    },
};

export const mutations = {
    PUSH_ITEM(state, item) {
        state.notifications.push(item)
        state.count++ ;
    },
    RESET_NOTIFICATIONS(state) {
        state.count = 0 ;
    }

};

export const actions = {
    addNotification({ commit }, notification) {
        commit("PUSH_ITEM", notification);
    },
    resetNotification({ commit }) {
        commit("RESET_NOTIFICATIONS");
    },

};
