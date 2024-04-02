import React from 'react';
import { Carousel } from 'antd';
import './carousel.scss';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};


export default function Carousels() {
    return (
        <div>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>
                        <img src="https://theme.hstatic.net/1000231532/1001093179/14/slideshow_5.jpg?v=6756" alt="" />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src="https://theme.hstatic.net/1000231532/1001093179/14/slideshow_6.jpg?v=6756" alt="" />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>
                        <img src="https://theme.hstatic.net/1000231532/1001093179/14/slideshow_3.jpg?v=6756" alt="" />
                    </h3>
                </div>
            </Carousel>
        </div>
    )
}
