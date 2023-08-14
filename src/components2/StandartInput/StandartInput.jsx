import React, { useContext, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    p: {
        margin: 5,
    },
    label: {
        fontSize: 22,
        fontFamily: 'Calibri',
    },
    div: {
        direction: "rtl"
    },
})
const StandartInput = ({ text, styles }) => {
    const css = useStyles()
    return <>
        <div className={css.div}>
            <p className={css.p}>
                <label className={css.label}>:{text}</label>
            </p>
            <input type="text" className={css.input} style={{ height: styles[0].height, width: styles[0].width }} />
        </div>
    </>
}
export default StandartInput;