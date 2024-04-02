import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { randomId, convertToVND } from '@mieuteacher/meomeojs';
import { api } from '../../../../service/apis'
import { useSelector, useDispatch } from 'react-redux';
import ProductCreateForm from './components/ProductCreateForm';
import { Modal } from 'antd';
import { productAction } from '../../../../store/slices/product.slice';
import { Store } from '../../../../store';

export default function List() {
    const dispatch = useDispatch()
    const productStore = useSelector((store: Store) => store.productStore);
    // async function handleUpdate(itemId) {
    //     try {
    //         Modal.confirm({
    //             title: "Confirm",
    //             content: "Bạn có chắc muốn ẩn sản phẩm?",
    //             onOk: async () => {
    //                 let result = await api.product.delete(itemId);
    //                 console.log("ket qua", result);
    //                 dispatch(productAction.deleteItem(itemId));
    //             }
    //         })
    //     } catch (err) {
    //         console.log("err", err);
    //     }
    // }
    const handleHide = async (item: any) => {
        try {
            Modal.confirm({
                title: "Confirm",
                content: "Bạn có chắc muốn ẩn sản phẩm?",
                onOk: async () => {
                    await api.product.update(item.id, { hide: true });
                    dispatch(productAction.updateHide({ id: item.id, data: { hide: true } }));
                }
            })
            console.log(api.product.update(item.id, { hide: true }));

            console.log("co xuong day ko1");
            console.log();

            // Giả sử có API cập nhật trạng thái
            // Sau khi cập nhật, dispatch action để cập nhật store Redux
        } catch (err: any) {
            console.log('Lỗi khi cập nhật trạng thái ', err);
        }
    };

    return (
        <>
            {
                productStore.addModal && <ProductCreateForm dispatch={dispatch} />
            }
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
                        productStore.data?.map((item, index) => {
                            if (item.hide == false) {
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
                                                handleHide(item)
                                                console.log("vao");
                                            }} className='btn btn-danger'>Hide</button>
                                        </td>
                                    </tr>
                                )
                            }

                        })
                    }
                </tbody>
            </Table>
        </>
    )
}