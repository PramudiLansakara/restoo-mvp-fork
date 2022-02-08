export const state = () => ({
  items: [],
  order: {
    items: [],
    note: "",
    orderType: "",
    paymentMethod: "",
    customer:{    
      name: "",
      email: "",
      phoneNumber:"",
    },
  },
  total: 0,
  orderId:""
});

export const getters = {
  getCartItems(state) {
    return state.order.items;
  },
  getCartItemCount(state) {
    return state.order.items.length;
  },
  getTotal(state) {
    let total = 0;
    state.order.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  },
  getOrderId(state) {
    return state.orderId;
  }
};

export const mutations = {
  PUSH_ITEM(state, item) {
    state.order.items.push({
      item: item._id,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      itemUrl: item.itemUrl
    });
  },
  REMOVE_ITEM(state, item) {
    state.order.items.splice(state.order.items.indexOf(item), 1);
  },
  EMPTY_CART(state) {
    state.order.items = [];
  },
  INCREMENT_QUANTITY(_, { cartItem, foodItem }) {
    cartItem.quantity += foodItem.quantity;
  },
  UPDATE_ITEM(state, item) {
    if (item.note) {
      state.order.note = item.note;
    }
    if (item.orderType) {
      state.order.orderType = item.orderType;
    }
    if (item.paymentMethod) {
      state.order.paymentMethod = item.paymentMethod;
    }
    if (item.name) {
      state.order.customer.name = item.name;
    }
    if (item.email) {
      state.order.customer.email = item.email;
    }
    if (item.phoneNumber) {
      state.order.customer.phoneNumber = item.phoneNumber;
    }
  },
  SAVE_ORDER_ID(state, id) {
    state.orderId = id;
    console.log(state.orderId);
  }
};

export const actions = {
  addItemToCart({ commit, state }, foodItem) {
    const cartItem = state.order.items.find(item => item.item === foodItem._id);
    if (!cartItem) {
      commit("PUSH_ITEM", foodItem);
      console.log(state.order.items);
    } else {
      commit("INCREMENT_QUANTITY", { cartItem, foodItem });
      console.log(state.order.items);
    }
  },
  removeItemFromCart({ commit, state }, foodItem) {
    const cartItem = state.order.items.find(item => item.item === foodItem._id);
    commit("REMOVE_ITEM", cartItem);
  },
  async getCartItems({ _, state }) {
    try {
      const response = await this.$axios.$get("food/item/list");
      return state.order.items.map(cartItem => {
        const food = response.foods.find(food => food._id === cartItem.item);
        return {
          name: food.name,
          price: cartItem.price,
          quantity: cartItem.quantity,
          itemUrl : food.itemUrl,
        };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateCartItem({ commit }, cartItem) {
    commit("UPDATE_ITEM", cartItem);
  },
  async newOrder({ commit, state }) {
    console.log(state.order)
    try {
      let response={};
      if(state.orderId){
        const update = {
          orderType: state.order.orderType, 
          paymentMethod: state.order.paymentMethod,
          customer:  state.order.customer,
        }
        response = await this.$axios.$put(`order/${state.orderId}`, update );
      }else{
        response = await this.$axios.$post("order/new", state.order);
        console.log(response);
      }
      
      if(state.order.paymentMethod == 'card'){
      const session = await this.$axios.$get(`payment/session/${response.order._id}`);
        commit("payment/SAVE_SESSION", session.id, { root: true });
      }else{
        const payment = {status: 'paid', orderId: response.order._id, paymentMethod: state.order.paymentMethod}
        commit("payment/ADD_PAYMENT", payment, { root: true });
      }
      commit("review/ADD_ITEMS", state.order.items, { root: true });
      commit("EMPTY_CART");
      // console.log(session.id)
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  saveOrderId({ commit }, id) {
    commit("SAVE_ORDER_ID", id);
    console.log(id);
  }
};
