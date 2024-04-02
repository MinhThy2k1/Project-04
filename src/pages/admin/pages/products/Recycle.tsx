import React from 'react'
import { Table } from 'react-bootstrap';
import { randomId, convertToVND } from '@mieuteacher/meomeojs';
import { api } from '../../../../service/apis'
import { useSelector, useDispatch } from 'react-redux';
import ProductCreateForm from './components/ProductCreateForm';
import { Modal } from 'antd';
import { productAction } from '../../../../store/slices/product.slice';
import { Store } from '../../../../store'
export default function Recycle() {
    const dispatch = useDispatch()
    const productStore = useSelector((store: Store) => store.productStore);

    const handleBack = async (item: any) => {
        try {
            Modal.confirm({
                title: "Confirm",
                content: "Bạn có chắc muốn hiện sản phẩm?",
                onOk: async () => {
                    await api.product.updateback(item.id, { hide: false });
                    dispatch(productAction.updateHide({ id: item.id, data: { hide: false } }));
                }
            })
            console.log("co xuong day ko");
            // Giả sử có API cập nhật trạng thái
            // Sau khi cập nhật, dispatch action để cập nhật store Redux
        } catch (err) {
            console.log('Lỗi khi cập nhật trạng thái ', err);
        }
    };
    return (
        <div>
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>

                            <th>Avatar</th>

                            <th>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productStore.data?.map((item: any, index: any) => {
                                if (item.hide == true) {
                                    return (
                                        <tr key={randomId()}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.category.title}</td>
                                            <td>{convertToVND(item.price)}</td>

                                            <td>
                                                <img src={item.avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                            </td>

                                            <td>
                                                <button onClick={() => {
                                                    console.log(item);
                                                    handleBack(item)
                                                    console.log("vao");
                                                }} className='btn btn-danger'>Back</button>
                                            </td>
                                        </tr>
                                    )
                                }

                            })
                        }
                    </tbody>
                </Table>
            </>
        </div>

    )

}
