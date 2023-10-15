import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    btn: {
        padding: [8, 20],
        margin: 10,
        backgroundColor: 'black',
        color: 'white',
        letterSpacing: 1.03,
        borderRadius: 5,
        border: 'none',
        transitionDuration: '0.3s',
        transitionProperty: 'all',
        transitionTimingFunction: 'linear',
        '&:hover': {
            cursor: 'pointer',
            borderRadius: 20,

        }
    }
})

const TextButton = ({ text, bgColor, func }) => {
    const css = useStyles()
    return <>

        <input type="button" className={css.btn} value={text} onClick={func} style={{ backgroundColor: bgColor }} />
    </>
}
export default TextButton;