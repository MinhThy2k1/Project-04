import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import './cart.scss'
import { useSelector, useDispatch } from 'react-redux';
import { convertToVND, randomId } from '@mieuteacher/meomeojs';
import { Modal, QRCode } from 'antd';
import { api } from '../../../../service/apis'
import { receiptAction } from '../../../../store/slices/receipt.slice';
import { Store } from '../../../../store';
import { userAction } from '../../../../store/slices/user.slice';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { findreceiptAction } from '../../../../store/slices/findreceipt.slice';
export default function Cart() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [qrData, setQrData] = useState<any>(null);
    const receiptStore = useSelector((store: Store) => store.receiptStore)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userStore = useSelector((store: Store) => store.userStore)
    let location = userStore.data?.address
    useEffect(() => {
        console.log("receiptStore.receipts", userStore.data);
    }, [receiptStore.receipts])
    console.log("dia chi", userStore.data?.address);

    async function handleDelete(itemId: any) {
        try {
            Modal.confirm({
                title: "Confirm",
                content: "Bạn có chắc muốn xóa sản phẩm?",
                onOk: async () => {
                    await api.receipt.delete(itemId);
                    dispatch(receiptAction.deleteItem(itemId));
                }
            })
        } catch (err) {

        }
    }

    let changeTimeout: any = null;
    async function handleChangeQuantity(itemId: any, e: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(changeTimeout)
        changeTimeout = setTimeout(async () => {
            try {
                let quantity = +(e.target as any).value;
                await api.receipt.update({
                    itemId,
                    quantity
                })
                dispatch(receiptAction.updateItem({
                    itemId,
                    quantity
                }));
            } catch (err) {
                console.log("loi so luong ", err);

            }
        }, 1000)
    }
    async function cash(payMode = "cash", zaloData: { paid: boolean; paidAt: string } | null = null) {
        try {
            let data = {
                total: receiptStore.cart?.detail?.reduce((total: number, cur: { quantity: number; product: { price: number; }; }) => {
                    return total += cur.quantity * cur.product.price
                }, 0) || 0,
                payMode
            }
            if (zaloData) {
                data = {
                    ...data,
                    // ...zaloData
                }
            }
            let result = await api.receipt.pay(receiptStore.cart?.id, data)
            console.log('result', result);
            return result.data.data
        } catch (err) {
            console.log(err);

            return false
        }
    }


    async function zalo() {
        try {
            let result = await api.receipt.zaloReceipt({
                receiptId: receiptStore.cart?.id,
                userName: userStore.data?.email,
                total: receiptStore.cart?.detail?.reduce((total: any, cur: any) => {
                    return total += cur.quantity * cur.product.price
                }, 0) || 0
            })
            setQrData(result.data)
            let zaloPayTimeout: any = null;
            let zaloPayInterVal = setInterval(async () => {
                let resultCheck = await api.receipt.zaloCheck(result.data.orderId);
                if (resultCheck.data.status) {
                    clearInterval(zaloPayInterVal)
                    clearTimeout(zaloPayTimeout)
                    setQrData(null)

                    let receiptNew = await cash("zalo_pay", {
                        paid: true,
                        paidAt: String(Date.now())
                    })

                    dispatch(receiptAction.setCart(null))
                    dispatch(receiptAction.addReceipt(receiptNew))
                    navigate("/receipts")
                }
            }, 500)

            zaloPayTimeout = setTimeout(() => {
                setQrData(null)
                clearInterval(zaloPayInterVal)
            }, 2 * 60 * 1000)
        } catch (err) {
            return false
        }
    }

    async function handlePay(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (location) {
            alert("nhập địa chỉ");
            setIsModalVisible(true);
            return;
        } else {
            Modal.confirm({
                title: 'Thanh toán',
                content: 'Xác nhận đặt hàng',
                okText: 'Thanh toán',
                cancelText: 'Hủy',
                onOk: async () => {
                    let payMode = (e.target as any).payMode.value;

                    let result = null;

                    if (payMode == "cash") {
                        result = await cash()
                    }

                    if (payMode == "zalo_pay") {
                        result = await zalo()
                        return
                    }
                    dispatch(receiptAction.setCart(null))
                    dispatch(receiptAction.addReceipt(result))
                    dispatch(findreceiptAction.addfindReceipt(result))
                    console.log('receiptStore', receiptStore);
                    console.log('result', result);


                    // window.location.href = '/receipts'
                },

                onCancel: () => { return }
            })
        }

        // if (!window.confirm("Thanh toan Ok")) return

    }
    async function locationOk(item: any, address: string) {
        try {
            let result = await api.authen.updateaddress(item.userId, { address: address });
            if (result.status == 200) {
                dispatch(userAction.updateaddress({ id: item.userId, data: { address: address } }));
                alert("Đã cập nhật");
            }
        } catch (err) {
            console.error("err", err);
            alert("Có lỗi xảy ra khi cập nhật địa chỉ.");
        }
        setIsModalVisible(false);
    }
    async function locationcancel() {
        setIsModalVisible(false);
    }
    return (
        <>
            <div className='cart_page'>
                <h3>{t("cart.info")}</h3>
                <div className='cart_page_container'>
                    <div className='table_container'>
                        <div className="totalCart">
                            {receiptStore.cart?.detail.reduce((total: any, cur: any) => total + cur.quantity, 0) > 0
                                ? `${t('cart.have')} ${receiptStore.cart?.detail.reduce((total: any, cur: { quantity: any; }) => total + cur.quantity, 0) || 0} ${t('cart.products')}.`
                                : `${t('cart.empty')}.`
                            }
                        </div>
                        <Table striped bordered hover className="table align-middle">
                            <thead>
                                <tr>
                                    {/* <th >STT</th>
                        <th >Hình ảnh</th>
                        <th >Tên sản phẩm</th> */}
                                    <th colSpan={3}>{t("cart.infopr")}</th>
                                    <th>{t("cart.price")}</th>
                                    <th>{t("cart.amount")}</th>
                                    <th>{t("cart.total")}</th>
                                    <th>{t("cart.chose")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    receiptStore.cart?.detail?.map((item: any, index: any) => (
                                        <tr key={randomId()}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img src={item.product.avatar} style={{ width: 50, height: 50, borderRadius: "50%" }} />
                                            </td>
                                            <td>{item.product.name}</td>
                                            <td>{convertToVND(item.product.price)}</td>
                                            <td>
                                                <input onChange={(e) => {
                                                    handleChangeQuantity(item.id, e)
                                                }} style={{ width: 60, textAlign: "center" }} type="number" min={1} defaultValue={item.quantity} />
                                            </td>
                                            <td>{convertToVND(item.product.price * item.quantity)}</td>
                                            <td>
                                                <button onClick={() => {
                                                    handleDelete(item.id)
                                                }} className='btn btn-danger'><i className="fa-regular fa-trash-can"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td>{receiptStore.cart?.detail.length + 1}</td>
                                    <td style={{ fontWeight: "bold" }}>{t("cart.tb")}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{convertToVND(receiptStore.cart?.detail?.reduce((total: number, cur: { quantity: number; product: { price: number; }; }) => {
                                        return total += cur.quantity * cur.product.price
                                    }, 0) || 0)}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                        <div onClick={() => {
                            window.location.href = "/"
                        }} >
                            <button className='button-back' >{t("cart.tt")}</button>

                        </div>
                    </div>
                    <div className='checkout_container'>
                        <div className='voucher'>

                        </div>
                        <div className='checkout'>
                            <h6>{t("cart.receipt")}</h6>
                            <div className='current_total'>
                                <div>{t("cart.totals")}</div>
                                <p> {convertToVND(receiptStore.cart?.detail?.reduce((total: number, cur: { quantity: number; product: { price: number; }; }) => {
                                    return total += cur.quantity * cur.product.price
                                }, 0) || 0)}</p>
                            </div>
                            <div className='current_total'>
                                <p>{t("cart.shiptotal")}</p>
                                <span>{convertToVND(receiptStore.cart?.detail?.reduce((total: number, cur: { quantity: number; product: { price: number; }; }) => {
                                    return total += cur.quantity * cur.product.price
                                }, 0) || 0)}</span>
                            </div>
                            <form onSubmit={(e) => {
                                handlePay(e)
                            }}
                                style={{
                                    display: 'flex',
                                    flexDirection: "column",
                                    alignItems: "flex-end"
                                }}
                            >
                                <div className='pay_method'>
                                    <p>{t("cart.pt")}</p>
                                    <select style={{ width: "100px", marginBottom: "10px" }} name='payMode'>
                                        <option value="cash" defaultChecked>CASH</option>
                                        <option value="zalo_pay">ZALO PAY</option>
                                    </select>
                                </div>
                                <button style={{ width: "130px" }} className='my-button' type='submit'>{t("cart.cd")}</button>
                            </form>
                        </div>
                    </div>
                    {
                        qrData && (
                            Modal.success({
                                title: "Mã QR Code đã được tạo, vui lòng dùng ứng dụng Zalo Pay để quét và tiến hành thanh toán:",
                                onOk: () => { window.location.href = "/cart" },
                                content:
                                    <QRCode
                                        value={qrData.qrCodeUrl}
                                        icon="https://play-lh.googleusercontent.com/NfFBz1Rxk0nQ7RsOk0kXbi1AEp1ZJ3rzJHbwRlmheZEDPPHh7dscqyxyX-ehxTl7tw"
                                    />
                            })
                        )
                    }

                </div>
                <div className="advertising">
                    <div className="advertising_content">
                        <div className="left">
                            <img src="https://theme.hstatic.net/1000231532/1001093179/14/collection_banner.jpg?v=6756" />
                        </div>
                        <div className="right">
                            <img src="https://lh3.googleusercontent.com/wtK6e3X2ZJusRAxbet522U7ZImj__ZGOgpURxGF_TLUtc4WBxjjKVbGJ-Ng4-NBIMOK2i9L4fadChVJ36qBs40GmKoaiAXEi=w616-rw" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Nhập địa chỉ"
                visible={isModalVisible}
                onCancel={locationcancel}
            >
                <input
                    type="text"
                    name='address'
                    value={location}
                    placeholder="Nhập địa chỉ"
                />
                <button onClick={locationOk}>OK</button>
            </Modal>
        </>
    )
}
