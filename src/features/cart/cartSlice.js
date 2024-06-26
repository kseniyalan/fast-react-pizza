import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = new pizza item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  }
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;

// Selectors
export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, currentItem) => sum + currentItem.quantity, 0);
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, currentItem) => sum + currentItem.totalPrice, 0);
export const getCurrentQuantityById = pizzaId => state => state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity || 0;

export default cartSlice.reducer;