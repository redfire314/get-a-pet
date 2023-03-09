import style from "./BtnSubmit.module.css";

function BtnSubmit(props) {
    return (
        <button className={style.btn} type="submit" onClick={props.onClick}>
            {props.text}
        </button>
    );
}

export default BtnSubmit;
