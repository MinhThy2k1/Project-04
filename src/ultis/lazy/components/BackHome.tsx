import React, { useEffect } from 'react'
import './backHome.scss'
export default function BackHome() {
    useEffect(() => {
        window.location.href = '/'
    }, [])
    return (
        <div className='page_body'>
            <div className='container'>
                <img src='https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif'></img>
            </div>
        </div>
    )
}
