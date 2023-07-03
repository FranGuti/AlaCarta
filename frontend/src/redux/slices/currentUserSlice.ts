import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../@types/stateTypes";

const initialState = {
    user: null,
} as { user: UserType | null };

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserType | null>) => {
            state.user = action.payload;
        },
    },
});

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
