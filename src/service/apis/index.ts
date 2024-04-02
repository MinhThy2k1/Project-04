import authenApi from './authen'
import productApi from "./product"
import categoryApi from "./category"
import receiptApi from './receipt'
import './axios.instance'
export const api = {
    authen: authenApi,
    product: productApi,
    category: categoryApi,
    receipt: receiptApi,

}