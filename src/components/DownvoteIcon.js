import React from 'react';

const DownvoteIcon = ({ fill, className, height=10, width=10, marginLeft= 3}) => (
    <svg fill={fill} className={className} width={width} height={height} style={{marginLeft: marginLeft}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"/>
    </svg>
);

export default DownvoteIcon;
