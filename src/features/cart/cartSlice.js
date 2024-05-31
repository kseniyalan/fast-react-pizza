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
    },
    clearCart(state) {
      state.cart = [];
    },
  }
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;

// Selectors
export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, currentItem) => sum + currentItem.quantity, 0);
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, currentItem) => sum + currentItem.totalPrice, 0);

export default cartSlice.reducer;