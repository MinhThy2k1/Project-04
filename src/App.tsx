import { useEffect } from "react";
import RouteSetup from "./routes/RouteIndex"
import { api } from "./service/apis";
import { userAction } from "./store/slices/user.slice";
import { useDispatch } from 'react-redux'
import { productAction } from "./store/slices/product.slice";
import { receiptAction } from "./store/slices/receipt.slice";
import { categoryAction } from "./store/slices/category.slice";
import { findreceiptAction } from "./store/slices/findreceipt.slice";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) { // Kiểm tra xem token có tồn tại không
      api.authen.decodeToken(token)
        .then(res => {
          if (res.status == 200) {
            dispatch(userAction.setData(res.data.data));
          } else {
            localStorage.removeItem("token")
            dispatch(userAction.setData(null));
          }
        })
        .catch(err => {
          console.log('err', err);
          dispatch(userAction.setData(null));
          localStorage.removeItem('token');
        });
    } else {
      dispatch(userAction.setData(null)); // Không có token, set user data thành null
    }
  }, []);
  useEffect(() => {
    // if (!localStorage.getItem("token")) return
    try {
      api.product.findMany()
        .then(async (res) => {
          dispatch(productAction.setData(res.data.data))
          console.log(res.data.data)
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])
  useEffect(() => {
    try {
      api.receipt.findAll()
        .then(async (res) => {
          dispatch(findreceiptAction.setData(res.data.data.data))
          console.log("res", res)
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])
  useEffect(() => {
    // if (!localStorage.getItem("token")) return
    try {
      api.category.findMany()
        .then(async (res) => {
          dispatch(categoryAction.setData(res.data.data))
          console.log(res.data.data)
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('token')) return
    try {
      api.receipt.findMany()
        .then(res => {
          let cart = null;
          let receipt = [];
          for (let i in res.data.data) {
            if (res.data.data[i].status == "shopping") {
              cart = res.data.data[i]
            } else {
              receipt.push(res.data.data[i])
            }
          }
          dispatch(receiptAction.setCart(cart))
          dispatch(receiptAction.setReceipts(receipt))
        })
        .catch(err => {
          console.log(err);

        })
    } catch (err) { }
  }, [])
  useEffect(() => {
    try {
      api.authen.findAll()
        .then(async (res) => {
          dispatch(userAction.setData(res.data.data.data))
          console.log("res", res)
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <>
      <RouteSetup />
    </>
  )
}


