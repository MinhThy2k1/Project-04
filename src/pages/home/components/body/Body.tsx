import React from 'react'
import './body.scss'
import { useTranslation } from "react-i18next";
import Product from '../product/Product'
import { useSelector, useDispatch } from 'react-redux'
import { productAction } from '../../../../store/slices/product.slice';
import { Store } from '../../../../store';

export default function Body() {

    const { t } = useTranslation();
    const productStore = useSelector((store: Store) => store.productStore);
    return (
        <div>
            <div className="body_container">
                <div className="body_content">
                    <h3>{t("body.product")}</h3>
                </div>
                <div>
                    <Product productStore={productStore}></Product>
                </div>
            </div>

        </div>
    )
}
