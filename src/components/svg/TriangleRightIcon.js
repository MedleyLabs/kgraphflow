function TriangleRightIcon(props) {

    return (
        <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick}
            style={{...props.styles, fill: '#404040'}}
            className="hoverable"
        >
            <path d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z"/>
        </svg>
    );
}

export default TriangleRightIcon;
