import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from '../ultis'
export default function RouteIndex() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={lazy.lazyFn(() => import("../pages/home/Home"))()}>
                    <Route path="category/:categoryName" element={lazy.lazyFn(() => import("../pages/home/pages/categories/Category.tsx"))()}></Route>
                    <Route path="cart" element={lazy.lazyFn(() => import("../pages/home/pages/cart/Cart.tsx"))()}></Route>
                    <Route path="receipts" element={lazy.lazyFn(() => import("../pages/home/pages/receipts/Receipt.tsx"))()}></Route>
                    <Route path="product-info/:id" element={lazy.lazyFn(() => import("../pages/home/components/product-info/ProductInfo.tsx"))()}></Route>
                </Route>
                <Route path="/admin" element={lazy.lazyFn(() => import("../pages/admin/Admin.tsx"), localStorage.getItem('token') != null)()}>
                    <Route path="product/list" element={lazy.lazyFn(() => import("../pages/admin/pages/products/List.tsx"))()}></Route>
                    <Route path="product/Recycle" element={lazy.lazyFn(() => import("../pages/admin/pages/products/Recycle.tsx"))
                        ()}></Route>
                    <Route path="Receipt/Paid" element={lazy.lazyFn(() => import("../pages/admin/pages/receipt/paid.tsx"))
                        ()}></Route>


                </Route>


            </Routes>
        </BrowserRouter>
    )
}
