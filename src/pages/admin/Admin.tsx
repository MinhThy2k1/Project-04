import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userAction } from '../../store/slices/user.slice';
import Navbar from './components/Navbar'
import './admin.scss'
import Container from './components/Container'
import { Store } from '../../store'
export default function Admin() {
    const [menuState, setMenuState] = useState(false);
    const userStore = useSelector((store: Store) => store.userStore);
    interface NavbarProps {
        menuState: boolean;
        setMenuState: Dispatch<SetStateAction<boolean>>;
        userStore: any; // Thêm userStore vào đây nếu cần thiết
    }
    useEffect(() => {
        if (!userStore.data) {
            alert("Permission Denine")
            window.location.href = "/"
            return
        }

        if (userStore.data.role != "admin") {
            alert("Permission Denine")
            window.location.href = "/"
            return
        }
    }, [userStore.data])
    return (
        <>
            {userStore.data?.role == "admin" && (
                <div style={{ color: 'black' }} className='admin_page'>
                    <Navbar menuState={menuState} setMenuState={setMenuState} />
                    <Container menuState={menuState} userStore={userStore} />
                </div>
            )}
        </>
    )
}
