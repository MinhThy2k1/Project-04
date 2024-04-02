import { createSlice } from "@reduxjs/toolkit";

export interface categories {
    id: number;
    title: string;
    status: boolean;
}
interface InitState {
    data: categories[] | null;
    addModal: boolean;
}

let initialState: InitState = {
    data: null,

    addModal: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const categoryReducer = categorySlice.reducer;
export const categoryAction = categorySlice.actions;