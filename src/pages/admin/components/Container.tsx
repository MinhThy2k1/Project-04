import React from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { productAction } from '../../../store/slices/product.slice';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';

interface MenuItem {
    title: string;
    link: string | null;
    fn: (() => void) | null;
}

interface Menu {
    title: string;
    child: MenuItem[];
}

interface ContainerProps {
    menuState: boolean;
    userStore: {
        data: {
            avatar: string;
        } | null;
    };
}

const Container: React.FC<ContainerProps> = ({ menuState, userStore }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menus: Menu[] = [
        {
            title: 'Product',
            child: [
                {
                    title: "Add",
                    link: null,
                    fn: () => {
                        dispatch(productAction.loadModal());
                    }
                },
                {
                    title: "List",
                    link: "product/list",
                    fn: null
                },
                {
                    title: "Recycle",
                    link: "product/recycle",
                    fn: null
                },

            ]
        },
        {
            title: 'Receipt',
            child: [
                {
                    title: "Paid",
                    link: "receipt/paid",
                    fn: null
                }
            ]
        }

    ];
    return (
        <div className='admin_container'>
            <div className={`${menuState ? "hidden" : ""} menu_bar`}>
                <div className='user'>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <img src={userStore.data?.avatar} alt="User Avatar" />
                            <span>Hi Admin <i className="fa-solid fa-chevron-down"></i></span>
                        </Dropdown.Toggle>
                    </Dropdown>
                </div>
                {menus.map((item) => (
                    <div key={Date.now() * Math.random()} className='menu_item'>
                        <button onClick={(e) => {
                            const targetEl = e.currentTarget.parentNode?.querySelector('.menu_item_sub');
                            if (targetEl?.classList.contains("hidden")) {
                                targetEl.classList.remove("hidden");
                            } else {
                                targetEl?.classList.add("hidden");
                            }
                        }} className='my-button'>
                            <i className="fa-solid fa-box-open"></i> {item.title}
                        </button>
                        <ul className='menu_item_sub'>
                            {item.child?.map((supItem) => (
                                <li onClick={() => {
                                    if (supItem.fn) {
                                        supItem.fn();
                                    } else if (supItem.link) {
                                        navigate(supItem.link);
                                    }
                                }} key={Date.now() * Math.random()}><i className="fa-regular fa-star-half-stroke"></i> {supItem.title}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className='content'>
                <div className='history'>
                    <span>Home</span>
                    <span>Admin</span>
                    <span>Product</span>
                </div>
                <div className='content_body'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Container;
