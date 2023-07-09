import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantType } from "../../@types/stateTypes";
import { Product } from "../../@types/product";

const initialState = {
    restaurant: null,
    product: null,
} as {
    restaurant: RestaurantType | null
    product: Product | null
};

export const currentRestaurantSlice = createSlice({
    name: "currentRestaurant",
    initialState,
    reducers: {
        setCurrentRestaurant: (state, action: PayloadAction<RestaurantType | null>) => {
            state.restaurant = action.payload;
        },
        setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
            state.product = action.payload;
        },
    },
});

export const { setCurrentRestaurant, setCurrentProduct } = currentRestaurantSlice.actions;
export default currentRestaurantSlice.reducer;
