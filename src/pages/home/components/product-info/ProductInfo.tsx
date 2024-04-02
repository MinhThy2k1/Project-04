import React, { useEffect, useState } from 'react';
import './productinfo.scss'
import { comment } from './comment'
import { useSelector, useDispatch } from 'react-redux';
import { convertToVND, randomId, createBuyAnimation } from '@mieuteacher/meomeojs';
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../../../service/apis'
import { Modal } from 'antd';
import { receiptAction } from '../../../../store/slices/receipt.slice'
import { Store } from '../../../../store';
export default function ProductInfo() {
    const { t } = useTranslation()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let product: any = null
    useEffect(() => {
        // Gắn đoạn mã Facebook SDK vào khi component được render
        const script = document.createElement('script');
        script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0&appId=410661171632971";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.nonce = "eUTq8wM6";
        document.body.appendChild(script);

        return () => {
            // Cleanup bằng cách loại bỏ đoạn mã khi component bị unmount
            document.body.removeChild(script);
        };
    }, []);
    useEffect(() => {
        // Kiểm tra nếu có token (ví dụ: lưu trong local storage) thì set isLoggedIn thành true
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    useEffect(() => {

    }, [])
    const productStore = useSelector((store: Store) => store.productStore)
    let { id } = useParams()
    product = productStore.data?.filter(item => item.id == Number(id))
    console.log('product', product);
    const [mainImage, setMainImage] = useState(product[0]?.pictures[0]?.url);
    const handleThumbnailHover = (thumbnailPath: any) => {
        setMainImage(thumbnailPath);
    };
    const dispatch = useDispatch()
    const { categoryName } = useParams()
    const navigate = useNavigate()
    useEffect(() => {

    }, [categoryName])
    async function handleAddToCart(productId: any, quantity: any) {
        try {
            if (!isLoggedIn) {
                // Hiển thị thông báo yêu cầu đăng nhập
                Modal.warning({
                    title: 'Notification',
                    content: 'Vui lòng đăng nhập để thực hiện mua hàng!'
                });
                return;
            }
            let item = {
                productId,
                quantity
            }
            let result = await api.receipt.addToCart(item);

            // let cartEl = document.querySelector(".fa-bag-shopping");
            // let productEl = e.target.parentNode.parentNode.parentNode.querySelector('img');
            // createBuyAnimation(productEl, cartEl, 50, 50)

            dispatch(receiptAction.setCart(result.data.data))
            Modal.success({
                title: 'Notification',
                content: 'Sản phẩm đã được thêm vào giỏ hàng của bạn!',
                onOk() {
                },
            });
        } catch (err) {
            alert("Có lỗi xảy ra khi thêm vào giỏ hàng")
            console.log('err', err);
        }
    }
    return (
        <div className='product_info_container'>
            <div className='product_info'>
                <div className='product_info_img'>
                    <div className='img_show'>
                        <div className="image-gallery">
                            <div className="main-image">
                                <img src={mainImage} alt="Main Image" />
                            </div>
                            <div className="thumbnail-images">
                                {product[0]?.pictures?.map((item: { url: string | undefined; }) => {
                                    return (
                                        <div className="thumbnail" onMouseEnter={() => handleThumbnailHover(item.url)}>
                                            <img src={item.url} alt="Thumbnail 1" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="dashed">
                        <div className="dashed-line"></div>
                    </div>
                    <div className='img_info'>
                        <ul>
                            {/* <li>- CPU: Apple M2</li>
                            <li>- Màn hình: 15.3" (2880 x 1864) Liquid Retina</li>
                            <li>- RAM: 8GB / 512GB SSD</li>
                            <li>- Hệ điều hành: macOS</li>
                            <li>- Pin: 53 Wh</li> */}
                        </ul>
                    </div>
                </div>
                <div className='info_detail'>
                    <div className='name'>
                        <h4>{product[0]?.name}</h4>
                        <ul className='title-box'>
                            <li><i className="fa-solid fa-shield-halved"></i> {t("productinfo.box")}</li>
                            <li><i className="fa-solid fa-truck-fast"></i> {t("productinfo.ship")}</li>
                            <li><i className="fa-solid fa-credit-card"></i> {t("productinfo.atm")}</li>
                        </ul>

                    </div>
                    <div className="dashed">
                        <div className="dashed-line"></div>
                    </div>

                    <div className='detail'>
                        <h5>{convertToVND(product[0]?.price)}</h5>
                    </div>
                    <div className="dashed">
                        <div className="dashed-line"></div>
                    </div>
                    <div className='checkout'>
                        <div className='voucher'>
                            <p>{t("productinfo.mount")}<a href="https://www.nshop.com.vn/blogs/huong-dan-game/mua-nintendo-switch-ps4-tra-gop">{t("productinfo.here")}</a></p>
                            <img src='https://file.hstatic.net/1000231532/file/tra_gop_qua_the_tin_dung_mpos_b6767cc0c0564fcda70c04562d05beb4_grande.jpg' />
                        </div>

                        {/* <button className='btn'
                            onClick={(e) => {
                                handleAddToCart(product[0]?.id, 1, e)
                            }}>
                            Thêm vào giỏ hàng
                        </button> */}
                        <div className='box-button'>
                            <button onClick={(e) => {
                                handleAddToCart(product[0]?.id, 1)
                            }}>

                                <span></span> Thêm vào giỏ hàng
                            </button>
                            <div className="fb-comments" data-href={"https://developers.facebook.com/docs/plugins/comments#configurator"} data-width={""} data-numposts={5}></div>
                        </div>
                        <div>
                        </div>


                    </div>
                    <div className="dashed">
                        <div className="dashed-line"></div>
                    </div>
                    {/* <div className="BOXKHUYENMAILIENQUAN css-1rggx5t">
                        <div className="css-mz7xyg">Khuyến mãi liên quan</div>
                        <ul>
                            <li>
                                <span>
                                    Giảm thêm đến 200.000đ dành cho Học sinh - sinh viên (không áp dụng với
                                    CPU, Apple và thẻ cào).
                                </span>
                                <a
                                    href="https://phongvu.vn/p/chuong-trinh-khuyen-mai-phong-vu"
                                    target="blank"
                                    className="css-1ty6934"
                                >
                                    Xem chi tiết
                                </a>
                            </li>
                            <li>
                                <span>
                                    Ưu đãi trả góp: Lãi suất chỉ 0.99%, trả trước từ 0% giá trị sản phẩm
                                </span>
                                <a
                                    href="https://phongvu.vn/cong-nghe/cach-mua-hang-tra-gop-tai-phong-vu/"
                                    target="blank"
                                    className="css-1ty6934"
                                >
                                    Xem chi tiết
                                </a>
                            </li>
                            <li>
                                <span>
                                    Nhập mã <strong> QRPV9</strong> <br /> - Giảm{" "}
                                    <span style={{ color: "rgb(237, 33, 1)", fontWeight: 500 }}>
                                        50.000đ{" "}
                                    </span>{" "}
                                    cho đơn từ 2,500,000đ <br /> - Giảm{" "}
                                    <span style={{ color: "rgb(237, 33, 1)", fontWeight: 500 }}>
                                        100.000đ{" "}
                                    </span>{" "}
                                    cho đơn từ 5,000,000đ <br /> - Giảm{" "}
                                    <span style={{ color: "rgb(237, 33, 1)", fontWeight: 500 }}>
                                        350.000đ{" "}
                                    </span>{" "}
                                    cho đơn từ 15,000,000đ
                                    <br /> khi thanh toán qua VNPAY-QR.
                                </span>
                                <a
                                    href="https://phongvu.vn/cong-nghe/uu-dai-vnpay/"
                                    target="blank"
                                    className="css-1ty6934"
                                >
                                    Xem chi tiết
                                </a>
                            </li>
                            <li>
                                <span>
                                    Nhập mã <strong> PVZLP200</strong> giảm thêm đến{" "}
                                    <span style={{ color: "rgb(237, 33, 1)", fontWeight: 500 }}>
                                        200.000đ{" "}
                                    </span>{" "}
                                    khi thanh toán qua ZaloPay
                                </span>
                                <a
                                    href="https://phongvu.vn/cong-nghe/uu-dai-thanh-toan-zalopay/"
                                    target="blank"
                                    className="css-1ty6934"
                                >
                                    Xem chi tiết
                                </a>
                            </li>
                        </ul>
                    </div> */}

                </div>
            </div>
            <div className='info'>
                <div className='company'>
                </div>
                <div className='policy'>
                    <h5>{t("productinfo.policy")}</h5>
                    <img src='https://lh3.googleusercontent.com/uvWBg1q90XtEWvHkWGDbDemjEaANJ_kX3NEfIywURPTMeaSZTORdttpehuFBNKpYiWQ3jHgito4ciCt9pEJIHH1V4IlPYoE=rw'></img><span>{t("productinfo.ship1")}</span><br />
                    <img src='https://lh3.googleusercontent.com/LT3jrA76x0rGqq9TmqrwY09FgyZfy0sjMxbS4PLFwUekIrCA9GlLF6EkiFuKKL711tFBT7f2JaUgKT3--To8zOW4kHxPPHs4=rw'></img><span>{t("productinfo.tick")}</span>
                </div>
                <div className='detail_product_info'>
                    <h5>{t("productinfo.infos")}</h5>
                    <p>{product[0]?.des}</p>

                </div>
            </div>
            <div>

            </div>
        </div>

    )
}
