import React, { useState } from "react";
import Carousel from 'better-react-carousel';
import { convertToVND, randomId, createBuyAnimation } from '@mieuteacher/meomeojs';
import "./product.scss"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
interface ProductProps {
    productStore: {
        data: {
            id: number;
            name: string;
            avatar: string;
            price: number;
            hide?: boolean;
            categoryId: number;
        }[];
    };
}
const Product: React.FC<ProductProps> = ({ productStore }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    console.log(productStore.data);
    return (
        <>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://file.hstatic.net/1000231532/collection/mua_may_game_nintendo_switch_hcm_nshop_dbb5012b1454458e946f4bcccf515c2c.jpg" />
                    </div>
                    <div className="right">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVrnDYCFsxfa_w8__w_NGtCBgPxma1CuonQ&usqp=CAU" alt="" />
                    </div>
                </div>
            </div>
            <div className='containers'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h5>Nintendo Switch</h5>
                            <h5>{t("product.more")} </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {

                                    if (!i.hide) {
                                        if (i.categoryId == 1) {
                                            return (<Carousel.Item>
                                                <div className="container_item">
                                                    <div className="img_container">
                                                        <img width="100%" src={i.avatar} />
                                                    </div>
                                                    <div className="content_container">
                                                        <p>Nitendo</p>
                                                        <h6>{i.name}</h6>
                                                        <h5>{convertToVND(i.price)}</h5>
                                                        <button
                                                            onClick={() => {
                                                                navigate(`/product-info/${i.id}`)
                                                                // window.location.href = `/product-info/${i.id}`

                                                            }}
                                                            className="my-button">{t("product.see")}
                                                        </button>

                                                    </div>



                                                </div>
                                            </Carousel.Item>)
                                        }
                                    }

                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://file.hstatic.net/1000231532/collection/mua_game_ps5_hcm_nshop_786540ef36654273a844e30244a21dd5.jpg" />
                    </div>
                    <div className="right">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVrnDYCFsxfa_w8__w_NGtCBgPxma1CuonQ&usqp=CAU" alt="" />
                    </div>
                </div>
            </div>
            <div className='containers'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h5>Playstation</h5>
                            <h5>{t("product.more")} </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {
                                    if (!i.hide) {
                                        if (i.categoryId == 2) {
                                            return (<Carousel.Item>
                                                <div className="container_item">
                                                    <div className="img_container">
                                                        <img width="100%" src={i.avatar} />
                                                    </div>
                                                    <div className="content_container">
                                                        <p>Playstation</p>
                                                        <h6>{i.name}</h6>
                                                        <h5>{convertToVND(i.price)}</h5>
                                                        <button
                                                            onClick={() => {
                                                                navigate(`product-info/${i.id}`)
                                                            }}
                                                            className="my-button">
                                                            {t("product.see")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Carousel.Item>)
                                        }
                                    }

                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://file.hstatic.net/1000231532/collection/thumb_cata_8bitdo_e664405fd1bb4a60b8758230c18fdff5.jpg" />
                    </div>
                    <div className="right">
                        <img src="https://lh3.googleusercontent.com/PPOZdVzA5tRaqoq2pIMOMJ3RBY8wLfYqqgqCK_LEcN7xrOeZ2bzD6TXgmuDYBhqTfbSeoxuGRkUhOmqrv5XIgkFkR2MYtnsLfQ=w616-rw" alt="" />
                    </div>
                </div>
            </div>
            <div className='containers'>

                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h5>Gaming</h5>
                            <h5>{t("product.more")} </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>

                                {productStore.data?.map(i => {
                                    if (!i.hide) {
                                        if (i.categoryId == 3) {
                                            return (<Carousel.Item>
                                                <div className="container_item">
                                                    <div className="img_container">
                                                        <img width="100%" src={i.avatar} />
                                                    </div>
                                                    <div className="content_container">
                                                        <p>Gaming</p>
                                                        <h6>{i.name}</h6>
                                                        <h5>{convertToVND(i.price)}</h5>
                                                        <button className="my-button"
                                                            onClick={() => {
                                                                navigate(`/product-info/${i.id}`)
                                                            }}>
                                                            {t("product.see")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Carousel.Item>)
                                        }
                                    }

                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://file.hstatic.net/1000231532/collection/gundam_sd_chinh_hang_edc3bf8ddc114e6888caaf954d29ac79.jpg" />
                    </div>
                    <div className="right">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVrnDYCFsxfa_w8__w_NGtCBgPxma1CuonQ&usqp=CAU" alt="" />
                    </div>
                </div>
            </div>
            <div className='containers'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h5>Gundam</h5>
                            <h5>{t("product.more")} </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {
                                    if (!i.hide) {
                                        if (i.categoryId == 4) {
                                            return (<Carousel.Item>
                                                <div className="container_item">
                                                    <div className="img_container">
                                                        <img width="100%" src={i.avatar} />
                                                    </div>
                                                    <div className="content_container">
                                                        <p>Gundam</p>
                                                        <h6>{i.name}</h6>
                                                        <h5>{convertToVND(i.price)}</h5>
                                                        <button className="my-button"
                                                            onClick={() => {
                                                                navigate(`/product-info/${i.id}`)
                                                            }}>
                                                            {t("product.see")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Carousel.Item>)
                                        }
                                    }

                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://file.hstatic.net/1000231532/collection/gau_bong_pokemon_pikachu_chinh_hang_gia_re_hcm_aee1b6d7bfa2459ba9fe0c45cda89742.jpg" />
                    </div>
                    <div className="right">
                        <img src="https://lh3.googleusercontent.com/PPOZdVzA5tRaqoq2pIMOMJ3RBY8wLfYqqgqCK_LEcN7xrOeZ2bzD6TXgmuDYBhqTfbSeoxuGRkUhOmqrv5XIgkFkR2MYtnsLfQ=w616-rw" alt="" />
                    </div>
                </div>
            </div>
            <div className='containers'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h5>Pokemon</h5>
                            <h5>{t("product.more")} </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {
                                    if (!i.hide) {
                                        if (i.categoryId == 5) {
                                            return (<Carousel.Item>
                                                <div className="container_item">
                                                    <div className="img_container">
                                                        <img width="100%" src={i.avatar} />
                                                    </div>
                                                    <div className="content_container">
                                                        <p>Pokemon</p>
                                                        <h6>{i.name}</h6>
                                                        <h5>{convertToVND(i.price)}</h5>
                                                        <button className="my-button"
                                                            onClick={() => {
                                                                navigate(`/product-info/${i.id}`)
                                                            }}>
                                                            {t("product.see")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Carousel.Item>)
                                        }
                                    }

                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Product;
