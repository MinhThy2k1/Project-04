import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    category: any;
    id: number;
    name: string;
    price: number;
    des: string;
    sellStatus: boolean;
    destroy: boolean;
    avatar: string;
    categoryId: number;
    hide: boolean;
}


interface InitState {
    data: Product[] | null;
    addModal: boolean;
}


let initialState: InitState = {
    data: null,
    addModal: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Product[]>) => {
            state.data = action.payload;
        },
        loadModal: (state) => {
            state.addModal = !state.addModal;
        },
        addData: (state, action: PayloadAction<Product>) => {
            state.data?.push(action.payload);
        },
        updateHide: (state, action) => {
            state.data = state.data?.map((item) => {
                if (item.id == action.payload.id) {
                    return { ...item, ...action.payload.data };
                }
                return item;
            });
        }
    },
});

export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;
