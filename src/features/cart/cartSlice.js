import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }) {
      state.cart.push(payload);
    },
    deleteItem(state, { payload }) {
      state.cart = state.cart.filter((item) => item.pizzaId !== payload);
    },

    increaseItemQuantity(state, { payload }) {
      const item = state.cart.find((item) => item.pizzaId === payload);
      item.quantity++;

      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, { payload }) {
      const item = state.cart.find((item) => item.pizzaId === payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, { payload });
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (store) => store.cart.cart;

export const getQuantityOfPizza = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getPrizeOfPizza = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// export const getCurrentQuantityById = function (id) {
//   return function store(store) {
//     return store.cart.cart.find((item) => item.pizzaId === id)
//       ? store.cart.cart.find((item) => item.pizzaId === id).quantity
//       : 0;
//   };
// };
