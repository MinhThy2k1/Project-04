import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './category.scss'
import { Col, Row, Card } from 'antd';
const { Meta } = Card;
import { useSelector, useDispatch } from 'react-redux';
import { convertToVND, randomId, createBuyAnimation } from '@mieuteacher/meomeojs';
import { receiptAction } from '../../../../store/slices/receipt.slice'
export default function Category() {
    const dispatch = useDispatch()
    const { categoryName } = useParams()
    const navigate = useNavigate()
    const productStore = useSelector(store => store.productStore)
    console.log(productStore.data[0].category.title);
    useEffect(() => {

    }, [categoryName])
    return (
        <div className='category_page'>
            <div className='tool_box'>
                <img src='https://file.hstatic.net/1000231532/file/nshop_co_so_moi_quan_1_321f65cb30cf4fb5973e4b526285f0fd.jpg'></img>
            </div>
            <div className='title'>
                <div>
                    <p>{categoryName}!!</p>
                </div>
            </div>
            <div className='product_list'>
                <Row gutter={16}>
                    {
                        productStore.data?.map(product => {
                            if (!product.hide) {
                                if (product?.category?.title == categoryName) {
                                    return (
                                        <Col key={randomId()} className="gutter-row" xs={24} sm={12} md={8} lg={6}>
                                            <Card
                                                className='productCart'
                                                hoverable
                                                style={{
                                                    width: "250px",
                                                    minHeight: "200px",
                                                    marginBottom: "10px"
                                                }}
                                                cover={<img alt="example" src={product.avatar} />}
                                            >
                                                <p>{categoryName}</p>
                                                <Meta title={product.name} description={convertToVND(product.price)} />
                                                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                                    <button onClick={(e) => {
                                                        navigate(`/product-info/${product.id}`)

                                                    }} className='my-button'>Buy</button>
                                                </div>
                                            </Card>

                                        </Col>)

                                }
                            }


                        })
                    }
                </Row>
            </div>
        </div>
    )
}
