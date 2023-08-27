import React from "react";
import { createUseStyles } from "react-jss";
import { NavLink } from "react-router-dom";

const useStyles = createUseStyles({
    link: {
        color: 'black',
        cursor: 'pointer',
        width: 200,
        height: 33,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize:'1.3rem',
        textAlign: 'center',
        marginRight: 15,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        textDecoration: 'none',
        '&.active':{
            height:'50px'
        }
    }
})

const CardIndex = ({ obj, selected }) => {
    const css = useStyles()
    return <>
        <NavLink key={obj.text} to={obj.link} style={{ backgroundColor: obj.color }} className={css.link} onClick={() => {
            selected(obj)
        }}>{obj.text}</NavLink>
    </>
}

export default CardIndex;