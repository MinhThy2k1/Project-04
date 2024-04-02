
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum ReceiptPayMode {
    cash,
    zalo_pay
}

export interface Receipt {
    payMode: string;
    user: any;
    detail(detail: any): unknown;
    id: number;
    total: number;
    createAt: string;
    updateAt: string;
    paymode: ReceiptPayMode;
    paid: boolean;
    paidAt: string;
    userId: number;
    pending: string;
    acceptAt: string;
    shippingAt: string;
    doneAt: string;
    status: string;
}

interface InitState {
    data: Receipt[] | null
}

const initialState: InitState = {
    data: null,
};

const findreceiptSlice = createSlice({
    name: "findreceipt",
    initialState,
    reducers: {

        setData: (state, action) => {
            state.data = action.payload;
        },
        addfindReceipt: (state, action: PayloadAction<Receipt>) => {
            state.data?.unshift(action.payload);
        },
    }
});

export const findreceiptReducer = findreceiptSlice.reducer;
export const findreceiptAction = findreceiptSlice.actions;
