import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({

    text: {
        color: 'white',
        backgroundColor: 'purple',
        border: 0,
        width:'10rem',
        height:'2rem',
        fontSize:'25px'
    }

})

const Radio = ({ text }) => {
    const css = useStyles()
    return <>
   
        <input type="radio" />
        <label>{text}</label>
   
    
        {/* <button className={css.text}>{text}</button> */}
    </>
}
export default Radio;
