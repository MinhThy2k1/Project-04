import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import { Modal, Select, message } from 'antd';
import { randomId, convertToVND } from '@mieuteacher/meomeojs';
import { api } from '../../../../service/apis'
import { useSelector, useDispatch } from 'react-redux';
import ProductCreateForm from '../products/components/ProductCreateForm';
import { productAction } from '../../../../store/slices/product.slice';
import { Store } from '../../../../store';
import { MDBBadge } from 'mdb-react-ui-kit';
import { receiptAction } from '../../../../store/slices/receipt.slice';



export default function List() {
    const [selectedUserId, setSelectedUserId] = useState(1); // Lưu trữ userId được chọn
    const dispatch = useDispatch()
    const [display, setDisplay] = useState(false)
    const [currentRecreipt, setCurrentRecreipt] = useState(null)
    const receiptStore = useSelector((store: Store) => store.receiptStore)
    const findreceiptStore = useSelector((store: Store) => store.findreceiptStore)
    const userStore = useSelector((store: Store) => store.userStore)
    const paid = findreceiptStore.data?.find(receipt => receipt?.paid);
    const { Option } = Select; // Lấy Component Option từ Select của antd
    useEffect(
        () => {
            console.log('findreceiptstore', findreceiptStore.data);
            console.log('userstore.data', userStore.data);
            console.log(receiptStore.receipts);

        }
        , [findreceiptStore.data])
    const handlestatus = async (item: any) => {
        try {
            Modal.confirm({
                title: "Confirm",
                content: "đã thanh toán chưa?",
                onOk: async () => {
                    await api.receipt.updatestatus(item.id, { paid: true });
                    dispatch(receiptAction.updateStatus({ id: item.id, data: { paid: true } }));
                    window.location.reload()
                }
            })
            console.log(api.product.update(item.id, { paid: true }));

            console.log("co xuong day ko1");
            console.log();

            // Giả sử có API cập nhật trạng thái
            // Sau khi cập nhật, dispatch action để cập nhật store Redux
        } catch (err: any) {
            console.log('Lỗi khi cập nhật trạng thái ', err);
        }
    };

    const handledone = async (item: any) => {
        try {
            if (!paid) {
                alert("chỉ nên xác nhận khi đơn hàng đã được thanh toán")
            } else {
                Modal.confirm({
                    title: "Confirm",
                    content: "đã xong hết.",
                    onOk: async () => {
                        console.log("onOk function is called");
                        await api.receipt.donestatus(item.id, { doneAt: "done" });
                        dispatch(receiptAction.updateStatus({ id: item.id, data: { doneAt: "done" } }));
                        window.location.reload()
                    }
                })
            }

            // console.log(api.receipt.update(item.id, { doneAt: "done" }));

            console.log("co xuong day ko1");
            console.log();

            // Giả sử có API cập nhật trạng thái
            // Sau khi cập nhật, dispatch action để cập nhật store Redux
        } catch (err: any) {
            console.log('Lỗi khi cập nhật trạng thái ', err);
            console.log("err", err);

        }
    };
    return (
        <>
            <Select defaultValue={1} style={{ width: 120 }} onChange={(value) => setSelectedUserId(value)}> // Dropdown để chọn userId
                <Option value={1}>1</Option> // Option cho userId 1
                <Option value={2}>2</Option> // Option cho userId 2
            </Select>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>C/O</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Price</th>
                        <th>PayMode</th>
                        <th>Status</th>
                        <th>order status</th>
                        <th>Active Spending</th>
                        <th>Tool</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        findreceiptStore.data && Array.isArray(findreceiptStore.data) && findreceiptStore.data?.map((receipt, index) => {
                            if (receipt.userId === selectedUserId) { // Chỉ hiển thị khi userId trùng với selectedUserId
                                return (
                                    <tr key={randomId()}>
                                        <td>{index + 1}</td>
                                        <td>#NshopG-{receipt.id}</td>
                                        <td>{receipt.user.userName}</td>
                                        <td>{receipt.user.email}</td>
                                        <td>{convertToVND(receipt.total)}</td>
                                        <td>{receipt.payMode == 'cash' ? 'Thanh toán khi nhận hàng' : 'Zalo Pay'}</td>
                                        <td>
                                            <MDBBadge color={receipt.paid == true ? 'success' : 'danger'} pill>
                                                {receipt.paid == true ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                            </MDBBadge>

                                        </td>
                                        <td>
                                            <MDBBadge color={receipt.doneAt == "done" ? 'success' : 'danger'} pill>
                                                {receipt.doneAt == "done" ? 'đã giao' : 'đang vận chuyển'}
                                            </MDBBadge>
                                        </td>
                                        <td>{receipt.paidAt ? receipt.paidAt : "đợi cập nhật"}</td>
                                        <td>
                                            <button className='btn btn-primary button-show'
                                                onClick={() => {
                                                    setDisplay(true);
                                                    setCurrentRecreipt(receipt.detail)
                                                    console.log('currentRecreipt', currentRecreipt);
                                                }}
                                            >Show more!</button>
                                            <button onClick={() => {
                                                handlestatus(receipt)
                                            }} className='btn btn-success' disabled={receipt.paid == true}>Aceept Status</button>
                                            <button onClick={() => {
                                                handledone(receipt)
                                            }} className='btn btn-success button-done' disabled={receipt.doneAt == "done"}>Done Order</button>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null; // Không render nếu userId không phù hợp
                            }
                        })
                    }
                </tbody>
            </Table>
            {/* <Modal
                show={display}
                onHide={() => setDisplay(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin hóa đơn của {"id"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='item_container_title'>
                        <p>Hình ảnh</p>
                        <p>Tên sản phẩm</p>
                        <p>Giá tiền</p>
                        <p>Số lượng</p>
                    </div>
                    {currentRecreipt?.map((item, index) => (
                        <div className='item_container' key={index}>
                            <img src={item.product.avatar} alt="product-avatar" />
                            <p>{item.product.name}</p>
                            <p>{convertToVND(item.product.price)}</p>
                            <p>{item.quantity}</p>
                        </div>
                    ))}
                    địa chỉ:
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setDisplay(false)}>OK</Button>
                </Modal.Footer>
            </Modal> */}
            <Modal
                visible={display} // Sử dụng prop visible thay vì show
                onCancel={() => setDisplay(false)} // Sử dụng onCancel thay vì onHide
                footer={[ // Sử dụng prop footer để tạo footer
                    <Button key="ok" typeof="primary" onClick={() => setDisplay(false)}>
                        OK
                    </Button>
                ]}
            >
                <div className='item_container_title'>
                    <p>Hình ảnh</p>
                    <p>Tên sản phẩm</p>
                    <p>Giá tiền</p>
                    <p>Số lượng</p>
                </div>
                {currentRecreipt?.map((item: any, index: any) => (
                    <div className='item_container' key={index}>
                        <img src={item.product.avatar} alt="product-avatar" />
                        <p>{item.product.name}</p>
                        <p>{convertToVND(item.product.price)}</p>
                        <p>{item.quantity}</p>
                    </div>
                ))}
                địa chỉ:
            </Modal>
        </>
    )
}

