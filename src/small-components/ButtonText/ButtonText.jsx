import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({

    text: {
        color: 'white',
        backgroundColor: 'purple',
        border: 0,
        // width:'20rem',
        // height:'2.3rem',
        fontSize:'25px',
        cursor:'pointer',
        marginLeft:56
        
    }

})


const Text = ({ text,styles,click}) => {
    const css = useStyles()
    return <>
        <button className={css.text}  style={{ height: styles[0].height, width: styles[0].width }} onClick={click}>{text}</button>
    

    </>
}
export default Text;
