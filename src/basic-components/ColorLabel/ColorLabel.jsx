import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    label:(props)=>( {
        display:"inline-block",
        textAlign:"center",
        backgroundColor:props.backgroundColor,
        padding:[5, 10], 
        borderRadius:3
    }),
   
})

const ColorLabel = ({text, ...props}) => {
    const css = useStyles(props)
    return <>
    
       <label className={css.label}>{text}</label>
    </>
}

export default ColorLabel