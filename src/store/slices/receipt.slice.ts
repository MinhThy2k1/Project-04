import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum ReceiptPayMode {
    cash,
    zalo_pay
}

export interface Receipt {
    detail: SetStateAction<null>;
    payMode: string;
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

interface InitialState {
    cart: any | null;
    receipts: Receipt[];
}

const initialState: InitialState = {
    cart: null,
    receipts: []
};

const receiptSlice = createSlice({
    name: "receipt",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<any>) => {
            state.cart = action.payload;
        },
        setReceipts: (state, action: PayloadAction<Receipt[]>) => {
            state.receipts = action.payload;
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            state.cart = {
                ...state.cart,
                detail: state.cart.detail.filter((item: { id: number; }) => item.id !== action.payload)
            };
        },
        updateItem: (state, action: PayloadAction<{ itemId: number; quantity: number }>) => {
            state.cart = {
                ...state.cart,
                detail: state.cart.detail.map((item: { id: number; }) => {
                    if (item.id === action.payload.itemId) {
                        return {
                            ...item,
                            quantity: action.payload.quantity
                        };
                    }
                    return item;
                })
            };
        },
        addReceipt: (state, action: PayloadAction<Receipt>) => {
            state.receipts.unshift(action.payload);
        },
        updateStatus: (state, action) => {
            state.receipts = state.receipts?.map((item) => {
                if (item.id == action.payload.id) {
                    return { ...item, ...action.payload.data };
                }
                return item;
            });
        }
    }
});

export const receiptReducer = receiptSlice.reducer;
export const receiptAction = receiptSlice.actions;
