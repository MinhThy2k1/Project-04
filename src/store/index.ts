import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user.slice";
import { receiptReducer } from "./slices/receipt.slice";
import { productReducer } from "./slices/product.slice";
import { categoryReducer } from "./slices/category.slice";
import { findreceiptReducer } from "./slices/findreceipt.slice"

const RootReducer = combineReducers({
    userStore: userReducer,
    receiptStore: receiptReducer,
    productStore: productReducer,
    categoryStore: categoryReducer,
    findreceiptStore: findreceiptReducer,

})

export type Store = ReturnType<typeof RootReducer>;

export const store = configureStore({
    reducer: RootReducer
})