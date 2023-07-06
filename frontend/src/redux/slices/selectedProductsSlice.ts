import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedProducts } from "../../components/menu/Menu";

interface SelectedProductsState {
  selectedProducts: SelectedProducts;
}

const initialState: SelectedProductsState = {
  selectedProducts: {},
};

const selectedProductsSlice = createSlice({
  name: "selectedProducts",
  initialState,
  reducers: {
    addToSelectedProducts: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      state.selectedProducts[productId] = (state.selectedProducts[productId] || 0) + 1;
    },
    subtractFromSelectedProducts: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      if (state.selectedProducts[productId] === 1) {
        delete state.selectedProducts[productId];
      } else if (state.selectedProducts[productId] > 1) {
        state.selectedProducts[productId] -= 1;
      }
    },
    deleteSelectedProduct: (state, action: PayloadAction<{ productId: string }>) => {
        const { productId } = action.payload;
        delete state.selectedProducts[productId];
    },
  },
});

export const { addToSelectedProducts, subtractFromSelectedProducts, deleteSelectedProduct } =
  selectedProductsSlice.actions;
export default selectedProductsSlice.reducer;