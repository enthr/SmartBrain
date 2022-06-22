import React from 'react';
import Tilt from 'react-parallax-tilt';

import './Logo.css';
import Brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0' style={{ width: '150px' }}>
            <Tilt scale={1.1} className='parallax-effect br2 shadow-2 logo'>
                <div
                    style={{
                        height: '150px',
                        padding: '20px'
                    }}
                >
                    <img src={Brain} alt='Brain Image' />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
