import React, { useState } from "react";
import { createUseStyles } from "react-jss";




const useStyles = createUseStyles({
    value: {
        margin: "5px",
        fontSize: "25px"
    }
    , woman: {
        backgroundColor: "red",
        margin: "5px",
        fontSize: "25px"
    },
    black: {
        backgroundColor: "black",
        margin: "5px",
        fontSize: "25px"
    },
    man: {
        backgroundColor: "rgb(60, 91, 145)",
        margin: "5px",
        fontSize: "25px"

    }
})

const ValueComp = ({ text, color, backgroundColor, fontWeight}) => {
    const css = useStyles()
    return <>
        {
            // text=="נשים"?<td className={css.woman}>{text}</td>: text=="גברים"?<td className={css.man}>{text}</td>:<td className={css.value}>{text}</td>
            <td key={text} style={{ backgroundColor: backgroundColor, color: color, fontWeight: fontWeight}}>{text}</td>
        }
    </>
}


export default ValueComp;