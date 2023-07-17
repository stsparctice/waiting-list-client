import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    square: {
        width: 80,
        height: 40,
        marginRight:'5px'
    },
    gender:{
        textAlign:'center',
        paddingTop:4,
        color:'white',
        fontSize:'larger',
        margin:0,
    }
})

const SmallSquare = ({backgroundColor,gender}) => {
    const css = useStyles()
    console.log(backgroundColor,gender);
    return <>
        <div className={css.square} style={{backgroundColor:backgroundColor}}>
            <p className={css.gender}>{gender}</p>
        </div>
    </>
}

export default SmallSquare