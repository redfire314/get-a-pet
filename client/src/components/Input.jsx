import { useState, useEffect } from "react";

import style from "./Input.module.css";

function Input(props) {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (props.value) setValue(props.value);
    }, [props.value]);

    const handleOnChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={style.input}>
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} name={props.name} id={props.name} onChange={handleOnChange} value={value} required />
        </div>
    );
}

export default Input;
