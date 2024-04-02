import React, { useState } from 'react';
import Carousels from './Carousel';
import './header.scss';
import { api } from '../../../../service/apis';
import Search from './search';
import { logout } from '../../../../service/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { userAction } from '../../../../store/slices/user.slice';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import MultiLanguage from "../multiLang/MultiLang";
import { loginWithGoogle, reauthenticate } from '../../../../service/firebase';
import { Store } from '../../../../store';

export default function Header() {
    const { t } = useTranslation();
    console.log("test", t);

    const [modalVisible, setModalVisible] = useState(false);
    const [signupModalVisible, setSignupModalVisible] = useState(false);
    const dispatch = useDispatch();
    const receiptStore = useSelector((store: Store) => store.receiptStore);
    const userStore = useSelector((store: Store) => store.userStore);
    const navigate = useNavigate();

    const openSignupModal = () => {
        setSignupModalVisible(true);
    };

    const closeSignupModal = () => {
        setSignupModalVisible(false);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            let data = {
                loginInfo: (e.target as any).username.value,
                password: (e.target as any).password.value,
            };
            let result = await api.authen.login(data);
            localStorage.setItem('token', result.data.token);
            Modal.success({
                title: 'Notification',
                content: result.data.message,
                onOk: () => {

                    window.location.href = '/';
                },
            });
        } catch (err: any) {
            Modal.error({
                title: 'Error',
                content: err.response.data.message,
            });
        }
    }
    console.log("day la info:", userStore.data);


    async function handleLoginWithSosial(result: any, name: any) {
        try {
            let data = {
                googleToken: result?.user?.accessToken,
                user: {
                    email: result.user.email,
                    avatar: result.user.photoURL,
                    userName: String(Math.ceil(Date.now() * Math.random())),
                    password: String(Math.ceil(Date.now() * Math.random())),
                },
            };
            let resultApi = await api.authen.loginWithGoogle(data);
            localStorage.setItem('token', resultApi.data.token);
            Modal.success({
                title: 'Notification',
                content: `Đăng nhập với ${name} thành công!`,
                onOk: () => {
                    window.location.href = '/';
                },
            });
        } catch (err: any) {
            Modal.error({
                title: 'Error',
                content: err.response ? err.response.data.message : 'Loi khong xac dinh',
            });
        }
    }

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if (!emailRegex.test(e.currentTarget.email.value)) {
            Modal.error({
                title: 'Error',
                content: 'Định dạng email không chính xác!',
            });
            return;
        }
        if (e.currentTarget.password.value.length < 3) {
            Modal.error({
                title: 'Error',
                content: 'Mật khẩu phải có ít nhất 3 kí tự!',
            });
            return;
        }
        try {
            let newUser = {
                userName: e.currentTarget.username.value,
                password: e.currentTarget.password.value,
                email: e.currentTarget.email.value,
            };
            let result = await api.authen.create(newUser);
            Modal.success({
                title: 'Notification',
                content: result.data.message,
                onOk: () => {
                    openModal();
                    closeSignupModal();
                },
            });
        } catch (err: any) {
            Modal.error({
                title: 'Error',
                content: err?.response?.data?.message,
            });
        }
    }

    return (
        <div className="header-container">

            <div className="header-box">
                <div className="header-1">
                    <img className="logo-web" src="https://theme.hstatic.net/1000231532/1001093179/14/logo_nshop.png?v=6746" alt="" />
                    <div className="Home">

                        <button onClick={() => { window.location.href = "/" }} className="button-home">
                            <img src="https://file.hstatic.net/1000231532/file/house-white_11447153e7ef491ea99882e17c6e2aea.png" alt="" />
                            {t("navbar.home")}
                        </button>
                        <button className="button-itemnew">
                            <img className="img-itemnew" src="https://file.hstatic.net/1000231532/file/archive-white_4fc034009bfb48f888f46fff4399ca1f.png" alt="" />
                            {t("navbar.news")}
                        </button>

                    </div>
                </div>

                <div className="header-2">
                    <div className="item-menu-list">
                        <nav>
                            {
                                [
                                    {
                                        title: "Nintendo Switch",
                                        // icon: "game-controller-outline",
                                        children: [
                                            {
                                                title: "Máy nintendo",
                                            },
                                            {
                                                title: "Game nintendo"
                                            },
                                            {
                                                title: "Phụ kiện nintendo"
                                            },
                                            {
                                                title: "Game switch nintendo"
                                            },
                                            {
                                                title: "Game cũ"
                                            }
                                        ]
                                    },
                                    {
                                        title: "Playstation",
                                        // icon: "logo-playstation",
                                        children: [
                                            {
                                                title: "Máy game Ps5",
                                            },
                                            {
                                                title: "Mua game Ps5"
                                            },
                                            {
                                                title: "Máy game Ps4"
                                            },
                                            {
                                                title: "Phụ kiện Ps5"
                                            },
                                            {
                                                title: "Phụ kiện Ps4"
                                            }
                                        ]
                                    },
                                    {
                                        title: "Gaming Lifestyle",
                                        // icon: "logo-gitlab",
                                        children: [
                                            {
                                                title: "Inne Gamming"
                                            },
                                            {
                                                title: "8Bitdo Gamming"
                                            },
                                            {
                                                title: "Dobe Gamming"
                                            },
                                            {
                                                title: "Phụ kiện Gamming"
                                            },
                                            {
                                                title: "Pc gear Gamming"
                                            }
                                        ]
                                    },
                                    {
                                        title: "Gundam",
                                        // icon: "logo-reddit",
                                        children: [
                                            {
                                                title: "Gundam SD"
                                            },
                                            {
                                                title: "Gundam HG"
                                            },
                                            {
                                                title: "Gundam RG"
                                            },
                                            {
                                                title: "Gundam MG"
                                            }
                                        ]
                                    },
                                    {
                                        title: "Pokemon",
                                        // icon: "logo-tux",
                                        children: [
                                            {
                                                title: "Thú bông Pokemon"
                                            },
                                            {
                                                title: "Mô hình Pokemon"
                                            },
                                            {
                                                title: "Pokemon Keeppley"
                                            },
                                            {
                                                title: "Pokemon đặc biệt"
                                            },
                                            {
                                                title: "Thẻ bài Pokemon"
                                            }
                                        ]
                                    }
                                ].map(item => (
                                    <div
                                        onClick={() => {
                                            navigate(`/category/${item.title}`)
                                            console.log(111);
                                        }}
                                        className={`item ${item.children && "sup"}`} key={Date.now() * Math.random()}>
                                        <i className="fa-solid fa-gamepad"></i>
                                        <span>{item.title}</span>
                                        {/* {
                                            item.children && (
                                                <div className='sup_menu'>
                                                    {
                                                        item.children.map(supItem => (
                                                            <div onClick={() => {
                                                                navigate(`/category/${supItem.title}`)
                                                                return
                                                            }}
                                                                key={Date.now() * Math.random()} className='sup_menu_item'>
                                                                {supItem.title}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        } */}
                                    </div>
                                ))
                            }
                        </nav>

                        {/* <div className="box">
                            <div class="drop-down">
                                <h4 className="item-menu">
                                    <img src="https://theme.hstatic.net/1000231532/1001093179/14/icon_nav_1.png?v=6746" alt="" />
                                    <span>Nintendo Switch</span>
                                </h4>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">Máy Nintendo Switch</a></li>
                                    <li><a className="dropdown-item" href="#">Game Nintendo Switch</a></li>
                                    <li><a className="dropdown-item" href="#">Game Switch cũ</a></li>
                                    <li><a className="dropdown-item" href="#">Phụ kiện Switch OLED</a></li>
                                    <li><a className="dropdown-item" href="#">Máy game cũ giá rẻ</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="box">
                            <div className="drop-down">
                                <h4 className="item-menu">
                                    <img src="	https://theme.hstatic.net/1000231532/1001093179/14/icon_nav_2.png?v=6746" alt="" />
                                    <span>Playstation</span>
                                </h4>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">Máy game PS5</a></li>
                                    <li><a className="dropdown-item" href="#">Mua game PS5</a></li>
                                    <li><a className="dropdown-item" href="#">Game PS4</a></li>
                                    <li><a className="dropdown-item" href="#">Phụ kiện PS4 & PS5</a></li>
                                    <li><a className="dropdown-item" href="#">Tìm hiểu PS5</a></li>

                                </ul>
                            </div>
                        </div>

                        <div className="box">
                            <div className="drop-down">
                                <h4 className="item-menu">
                                    <img src="	https://theme.hstatic.net/1000231532/1001093179/14/icon_nav_3.png?v=6746" alt="" />
                                    <span>Gaming</span>
                                </h4>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">Dobe Gaming Gear</a></li>
                                    <li><a className="dropdown-item" href="#">Phụ kiện Xbox Series</a></li>
                                    <li><a className="dropdown-item" href="#">PC Gaming Gear</a></li>
                                    <li><a className="dropdown-item" href="#">8BitDo Gaming Gear</a></li>
                                    <li><a className="dropdown-item" href="#">IINE Gaming Gear</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="box">
                            <div className="drop-down">
                                <h4 className="item-menu">
                                    <img src="	https://theme.hstatic.net/1000231532/1001093179/14/icon_nav_4.png?v=6746" alt="" />
                                    <span>Gundam</span>
                                </h4>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">Gundam SD</a></li>
                                    <li><a className="dropdown-item" href="#">Gundam HG</a></li>
                                    <li><a className="dropdown-item" href="#">Gundam RG</a></li>
                                    <li><a className="dropdown-item" href="#">Gundam MG</a></li>
                                    <li><a className="dropdown-item" href="#">Gundam PG</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="box">
                            <div className="drop-down">
                                <h4 className="item-menu">
                                    <img src="	https://theme.hstatic.net/1000231532/1001093179/14/icon_nav_5.png?v=6746" alt="" />
                                    <span>Pokemon</span>
                                </h4>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">Thú Bông Pokemon</a></li>
                                    <li><a className="dropdown-item" href="#">Mô hình Pokémon</a></li>
                                    <li><a className="dropdown-item" href="#">Pokemon Keeppley</a></li>
                                    <li><a className="dropdown-item" href="#">Pokémon đặc biệt</a></li>
                                    <li><a className="dropdown-item" href="#">Thé bài Pokémon</a></li>
                                </ul>
                            </div>
                        </div> */}

                    </div>



                </div>
            </div>
            <div className="btn-search">

                <Search></Search>
            </div>
            <div>
                <div className="icon-box">
                    {
                        userStore.data ? (

                            <Dropdown>
                                <Dropdown.Toggle className="btn-dropdown">
                                    <div className='user_box'>
                                        <span>Hi {isNaN(Number(userStore.data.userName)) ? userStore.data.userName : userStore.data.email.split('@')[0]}!</span>
                                        <img className="user-avartar" src={userStore.data.avatar} />
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown>
                                        {userStore.data.role == 'admin' && (
                                            <Dropdown.Item onClick={() => {
                                                window.location.href = "/admin/product/list";
                                            }}>{t("navbar.admin")}</Dropdown.Item>
                                        )}
                                    </Dropdown>

                                    <Dropdown.Item onClick={() => {
                                        navigate("/receipts")
                                    }}>{t("navbar.receipts")}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        Modal.confirm({
                                            title: "Xác nhận",
                                            content: "Bạn chắc chắn muốn đăng xuất!",
                                            onOk: async () => {
                                                await logout()
                                                localStorage.removeItem("token")
                                                window.location.reload()
                                                dispatch(userAction.setData(null))

                                            }

                                        })

                                    }}><i className="fa-solid fa-arrow-right-from-bracket"></i></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <div onClick={() => { openModal() }} className="icon-user">
                                <i className="fa-regular fa-user"></i>
                            </div>
                        )
                    }
                    <div className='cart_box'>
                        <i className="fa-solid fa-cart-shopping"
                            onClick={() => {
                                navigate("/cart")
                            }}
                        ></i>
                        <span>
                            {
                                receiptStore.cart?.detail?.reduce((total: any, cur: any) => {
                                    return total + cur.quantity
                                }, 0) || 0
                            }
                        </span>
                    </div>
                    <div className="lang">
                        <MultiLanguage />
                    </div>
                </div>

            </div>
            <div className="carousel">
                <Carousels></Carousels>
            </div>
            <hr />
            {
                modalVisible && (
                    <div className="modal" id="myModal" role="dialog">
                        <div className="modal-dialog">
                            {/* Modal content */}
                            <div className="modal-content">
                                <div className="modal-header" style={{ padding: '35px 50px' }}>
                                    <button type="button" className="close" onClick={closeModal}>
                                        &times;
                                    </button>
                                    <h4>

                                        <span className="glyphicon glyphicon-lock"></span> Login

                                    </h4>

                                </div>
                                <div className="modal-body" style={{ padding: '40px 50px' }}>
                                    <form onSubmit={(e) => {
                                        handleLogin(e)
                                    }} role="form">
                                        <div className='loginGG'>
                                            <a style={{ cursor: "pointer" }} onClick={async () => {
                                                let result = await loginWithGoogle();
                                                reauthenticate();
                                                console.log(result);
                                                handleLoginWithSosial(result, "Google")
                                            }} className="social">
                                                <i className="fab fa-google-plus-g" />
                                            </a>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="username">
                                                <span className="glyphicon glyphicon-user"></span> Username
                                            </label>
                                            <input type="text" className="form-control" id="username" name="username" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="psw">
                                                <span className="glyphicon glyphicon-eye-open"></span> Password
                                            </label>
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" />
                                        </div>
                                        {/* <div className="checkbox">
                                            <label>
                                                <input type="checkbox" value="" checked />
                                                Remember me
                                            </label>
                                        </div> */}
                                        <button type="submit" className="btn btn-success btn-block">
                                            <span className="glyphicon glyphicon-off"></span> Login
                                        </button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-default pull-left" onClick={closeModal}>
                                        <span className="glyphicon glyphicon-remove"></span> Cancel
                                    </button>
                                    <p>
                                        Not a member? <a href="#" onClick={() => {
                                            closeModal();
                                            openSignupModal();
                                        }}>Sign Up</a>
                                    </p>
                                    <p>
                                        Forgot <a href="#">Password?</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Modal */}
            {
                signupModalVisible && (
                    <div className="modal" id="myModal" role="dialog">
                        <div className="modal-dialog">
                            {/* Modal content */}
                            <div className="modal-content">
                                <div className="modal-header" style={{ padding: '35px 50px' }}>
                                    <button type="button" className="close" onClick={closeSignupModal}>
                                        &times;
                                    </button>
                                    <h4>
                                        <span className="glyphicon glyphicon-lock"></span> Sign Up
                                    </h4>
                                </div>
                                <div className="modal-body" style={{ padding: '40px 50px' }}>
                                    <form onSubmit={(e) => { handleRegister(e) }} role="form">
                                        <div className="form-group">
                                            <label htmlFor="username">
                                                <span className="glyphicon glyphicon-user"></span> Username
                                            </label>
                                            <input type="text" className="form-control" id="username" name="username" placeholder="Enter user or email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">
                                                <span className="glyphicon glyphicon-user"></span> Email
                                            </label>
                                            <input type="text" className="form-control" id="email" name="email" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">
                                                <span className="glyphicon glyphicon-eye-open"></span> Password
                                            </label>
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" />
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" value="" checked />
                                                Remember me
                                            </label>
                                        </div>
                                        <button onClick={() => {
                                            // openModal();
                                            // closeSignupModal();
                                        }} type="submit" className="btn btn-success btn-block">
                                            <span className="glyphicon glyphicon-off"></span> Sign Up
                                        </button>

                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-default pull-left" onClick={closeSignupModal}>
                                        <span className="glyphicon glyphicon-remove"></span> Cancel
                                    </button>
                                    <p>
                                        Have Account member? <a onClick={() => {
                                            openModal();
                                            closeSignupModal();
                                        }} href="#" > Login Up</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >

    )
}


{/* Modal */ }

//
