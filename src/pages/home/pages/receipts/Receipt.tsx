import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Modal, Button } from 'react-bootstrap';
import { randomId } from '@mieuteacher/meomeojs';
import { convertToVND, createBuyAnimation } from '@mieuteacher/meomeojs';
import { useTranslation } from "react-i18next";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './receipt.scss'

import { Store } from '../../../../store';
export default function Receipt() {
    const { t } = useTranslation();
    const [display, setDisplay] = useState(false)
    const [currentRecreipt, setCurrentRecreipt] = useState(null)
    const receiptStore = useSelector((store: Store) => store.receiptStore)
    useEffect(
        () => {
            console.log('receiptStore.receipts', receiptStore.receipts);
        }
        , [receiptStore.receipts])

    return (
        <div className='receipt_page'>
            <div className='title'>
                <h1>HÓA ĐƠN</h1>
            </div>
            <MDBTable striped bordered hover align='middle'  >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>{t("receipt.stt")}</th>
                        <th scope='col'>{t("receipt.ms")}</th>
                        <th scope='col'>{t("receipt.total")}</th>
                        <th scope='col'>{t("receipt.pt")}</th>
                        <th scope='col'>{t("receipt.tt")}</th>
                        <th scope='col'>{t("receipt.st")}</th>
                        <th scope='col'>{t("receipt.time")}</th>
                        <th scope='col'>{t("receipt.dt")}</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        receiptStore.receipts?.map((receipt, index) => (
                            <tr key={randomId()}>
                                <td>{index + 1}</td>
                                <td>#NshopG-{receipt.id}</td>
                                <td>{convertToVND(receipt.total)}</td>
                                <td>{receipt.payMode == 'cash' ? `${t('receipt.shiper')}` : `${t('receipt.shiperzl')}`}</td>
                                <td>
                                    <MDBBadge color={receipt.paid == true ? 'success' : 'danger'} pill>
                                        {receipt.paid == true ? `${t('receipt.cddt')}` : `${t('receipt.cdtt')}`}
                                    </MDBBadge>

                                </td>
                                <td> <MDBBadge color={receipt.status == "shipping" ? 'secondary' : 'warning'} pill>
                                    {receipt.status == "done" ? `pending` : `đang vận chuyển`}
                                </MDBBadge>
                                </td>
                                {/* <td>{receipt.paidAt ? new Date(receipt.paidAt).toLocaleString() : new Date(Date.now()).toLocaleString()}</td> */}
                                <td>{receipt.paidAt ? receipt.paidAt : "đợi cập nhật"}</td>
                                <td>
                                    <button className='btn btn-primary'
                                        onClick={() => {
                                            setDisplay(true);
                                            setCurrentRecreipt(receipt.detail)
                                            console.log('currentRecreipt', currentRecreipt);
                                        }}
                                    >{t("receipt.xt")}</button>
                                </td>
                            </tr>
                        ))
                    }
                </MDBTableBody>
            </MDBTable >
            <Modal
                show={display}
                onHide={() => setDisplay(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin hóa đơn của bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='item_container_title'>
                        <p>Hình ảnh</p>
                        <p>Tên sản phẩm</p>
                        <p>Giá tiền</p>
                        <p>Số lượng</p>
                    </div>
                    {
                        currentRecreipt?.map(item => {

                            return (
                                <div className='item_container'>
                                    <img src={item?.product.avatar} />
                                    <p>{item.product.name}</p>
                                    <p>{convertToVND(item.product.price)}</p>
                                    <p>{item.quantity}</p>
                                </div>
                            )

                        }
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setDisplay(false)}>OK</Button>
                </Modal.Footer>
            </Modal>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://file.hstatic.net/1000231532/file/bannerarticle_dba64d678f6c42a3b89e40f077f1c48f.jpg" />
                    </div>
                    <div className="right">
                        <img src="https://file.hstatic.net/1000231532/collection/figure_bandai_nshop_banner_9dacd8ea98e644ab9e2e46b1a3ad2c72.jpeg" alt="" />
                    </div>
                </div>
            </div>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://theme.hstatic.net/1000231532/1001093179/14/collection_banner.jpg?v=6755" />
                    </div>
                    <div className="right">
                        <img src="https://lh3.googleusercontent.com/wtK6e3X2ZJusRAxbet522U7ZImj__ZGOgpURxGF_TLUtc4WBxjjKVbGJ-Ng4-NBIMOK2i9L4fadChVJ36qBs40GmKoaiAXEi=w616-rw" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
