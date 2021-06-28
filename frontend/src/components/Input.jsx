import React from 'react';

function Input(props) {
    return (
        <input className=".inputBox" type={props.type} placeholder={props.placeholder} />
    );
}

export default Input;