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
    deliveryCharge:0,
    discount:0,
  },
  total: 0,
  orderId:"",
  deliveryCharge:0,
  minAmount: 0,
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
      total += item.priceDetails.price*item.priceDetails.quantity;
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
      priceDetails: item.priceDetails,
      price: item.price,
      name: item.name,
      itemUrl: item.itemUrl,
      itemNote: item.itemNote,
    });
  },
  REMOVE_ITEM(state, item) {
    state.order.items.splice(state.order.items.indexOf(item), 1);
  },
  EMPTY_CART(state) {
    state.order.items = [];
    state.deliveryCharge = 0;
    state.total = 0;
    state.order.discount= 0;
    state.order.deliveryCharge= 0;
    state.minAmount= 0;
  },
  INCREMENT_QUANTITY(_, { cartItem, foodItem }) {
    cartItem.priceDetails.quantity += foodItem.priceDetails.quantity;
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
    if (item.total) {
      state.order.total = item.total;
    }
    if (item.deliveryCharge) {
      state.order.deliveryCharge = item.deliveryCharge;
    }
    if (item.discount) {
      state.order.discount = item.discount;
    }
  },
  SAVE_DELIVERY_DETAILS(state, deliveryDetails) {
    state.deliveryCharge = deliveryDetails.deliveryCharge;
    state.minAmount = deliveryDetails.minAmount;
  },
  SAVE_ORDER_ID(state, id) {
    state.orderId = id;
    console.log(state.orderId);
  }
};

export const actions = {
  addItemToCart({ commit, state }, foodItem) {
    const cartItem = state.order.items.find(item => item.item === foodItem._id);
    if (!cartItem ) {
      commit("PUSH_ITEM", foodItem);
    } else {
      // const priceDetail = cartItem.priceDetails.find(item => item.id === foodItem.priceDetails.id);
      console.log(foodItem.priceDetails.id);
      console.log("price id");
      console.log(cartItem.priceDetails.id);

      if (cartItem.priceDetails.id === foodItem.priceDetails.id) {
        commit("INCREMENT_QUANTITY", { cartItem , foodItem });
        console.log(state.order.items);
      }else{
        commit("PUSH_ITEM", foodItem);
        console.log(state.order.items);
      }
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
  saveDeliveryDetails({ commit }, deliveryDetails) {
    commit("SAVE_DELIVERY_DETAILS", deliveryDetails);
  },
  async newOrder({ commit, state }) {
    console.log(state.order)
    try {
      // let response={};
      let order ={};
      if(state.orderId){
        const update = {
          orderType: state.order.orderType,
          paymentMethod: state.order.paymentMethod,
          customer:  state.order.customer,
        }
        order = await this.$axios.$put(`order/${state.orderId}`, update );
      }else{
        order = await this.$axios.$post("order/new", state.order);
      }

      commit("review/ADD_ITEMS", state.order.items, { root: true });
      commit("EMPTY_CART");
      // console.log(session.id)
      return order.order._id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  saveOrderId({ commit }, id) {
    commit("SAVE_ORDER_ID", id);
    console.log(id);
  },
  async placedOrderMail(_, orderId) {
    try {
      const order = await this.$axios.$get(`order/${orderId}`);
      const response = await this.$axios.$post("mail/placedOrderMail", order.order);
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
