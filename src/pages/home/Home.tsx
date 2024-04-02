import React from 'react'
import Header from './components/header/Header'
import Body from './components/body/Body'
import Footer from './components/footer/Footer';
import Carousels from './components/header/Carousel';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { productAction } from '../../store/slices/product.slice';
import Category from '../../pages/home/pages/categories';
import { Store } from '../../store';

export default function Home() {
    const productStore = useSelector((store: Store) => store.productStore)
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    return (
        <div>


            <div className='home_page'>
                <div className='header_page'>
                    <Header />
                </div>
                <div className='body_page'>
                    {isHomePage && <Body />}
                    {/* {isHomePage && <Category />} */}
                    <Outlet />
                </div>
                <div className='Footer_page'>
                    <Footer />
                </div>
            </div>

        </div>
    )
}
