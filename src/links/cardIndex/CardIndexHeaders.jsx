import React from "react";
import { createUseStyles } from "react-jss";
import { NavLink } from "react-router-dom";
import triangle from '../../assets/triangle.png'

const useStyles = createUseStyles({
    link: {
        color: 'black',
        cursor: 'pointer',
        backgroundColor: 'lightblue',
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexBasis: 0,
        fontWeight: 'bold',
        textAlign: 'center',
        '& img': {
            position: 'absolute',
            top: 75
        }
    },
    nav: {
        paddingTop:30,
        width: '100%',
        height: '100%',
        textDecoration: 'none',
    }
})

const CardIndexHeaders = ({ obj, selected,flag }) => {
    const css = useStyles()
    return <>
        <div className={css.link}>
            <NavLink to={obj.link} className={css.nav} style={{}}
                onClick={() => { selected(obj) }}>{obj.text}</NavLink>
                {flag?<img src={triangle} alt="triangle" ></img>:''}
        </div>
    </>
}

export default CardIndexHeaders;