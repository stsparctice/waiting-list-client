import React, { useContext, useEffect, useRef, useState } from "react";
import '../../styles/Form.css'
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({

    label: {
        float: "left"
    }

})
const StandartInput = ({ text, type, value, set }) => {
    const css = useStyles()
    return <>
        <p className="input-row">
            <label className={css.label}>{text}: </label>
            <input type={type} value={value} onInput={set}></input>
        </p>

    </>
}
export default StandartInput;