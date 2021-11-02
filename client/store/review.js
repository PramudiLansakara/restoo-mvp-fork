export const state = () => ({
  review: {
    items: []
  }
});

export const getters = {
  getReviewItems(state) {
    return state.review.items;
  }
};

export const mutations = {
  ADD_ITEMS(state, items) {
    state.review.items = items;
  }
};

export const actions = {
  getReviewItemById({ _, state }, id) {
    const reviewItem = state.review.items.find(item => item.item === id);
    return reviewItem;
  }
};
