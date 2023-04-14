function TriangleDownIcon(props) {

    return (
        <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick}
            style={{...props.styles, fill: '#404040'}}
            className="hoverable"
        >
            <path d="M8.72798 15.795L3.72798 7.795C3.10356 6.79593 3.82183 5.5 4.99998 5.5L15 5.5C16.1781 5.5 16.8964 6.79593 16.272 7.795L11.272 15.795C10.6845 16.735 9.31549 16.735 8.72798 15.795Z"/>
        </svg>
    );
}

export default TriangleDownIcon;