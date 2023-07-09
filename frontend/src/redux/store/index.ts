import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../slices/currentUserSlice";
import selectedProductsReducer from "../slices/selectedProductsSlice";
import currentRestaurantReducer from "../slices/currentRestaurantSlice";

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        selectedProducts: selectedProductsReducer,
        currentRestaurant: currentRestaurantReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
