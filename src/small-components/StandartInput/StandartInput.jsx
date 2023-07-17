import React from "react";
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

    input:{
        borderRadius:4,
        padding:'4px 4px',
        fontFamily:'Tahoma'

    }
    
})


const StandartInput = ({ text, styles, type, value = "",set }) => {
    const css = useStyles()
    return <>
        <div className={css.div}>
            <p className={css.p}>
                <label className={css.label}>{text}:</label>
           
            <input type="text" value={value} id={type} className={css.input} style={{ height: styles[0].height, width: styles[0].width }} onInput={set} />
            </p>
        </div>
    </>
}
export default StandartInput;