import React from "react";
import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/Close.png"
import SmallTable from "../SmallTable/SmallTable";

const useStyles = createUseStyles({
    none: {
        display: 'none'
    },
    block: {
        display: 'block'
    },
    point: {
        cursor: 'pointer'
    },
    div: {

    },
    goto: {
        // name="map-marker",
        // size="25"
    }
})

const ButtonClick = ({obj}) => {
    const css = useStyles()
    const nav = useNavigate()

    const changes = (event) => {
        event.target.classList.add(css.none)
        event.target.classList.remove(css.block)
        event.target.parentNode.children[1].classList.add(css.block)
        event.target.parentNode.children[1].classList.remove(css.none)
        event.target.parentNode.children[2].classList.add(css.block)
        event.target.parentNode.children[2].classList.remove(css.none)
    }

    const back = (event) => {
        event.target.parentNode.children[0].classList.add(css.block)
        event.target.parentNode.children[0].classList.remove(css.none)
        event.target.classList.remove(css.block)
        event.target.classList.add(css.none)
        event.target.parentNode.children[2].classList.remove(css.block)
        event.target.parentNode.children[2].classList.add(css.none)
    }

    const point = (event) => {
        event.target.classList.add(css.point)
    }

    return <>
        {/* <button onClick={changes} onMouseOver={point}>פרטים</button> */}
        <button
            className={css.goto}
            onClick={(e) => {
                e.stopPropagation();
                nav(`/datamanager/teachers/list/details`, { state:  obj.details } );
            }}
            onMouseOver={point}>{'פרטים'}
            {/* <FontAwesome name="map-marker" size="25" /> */}
        </button>
        <Outlet></Outlet>
        <img src={Close} alt="" onClick={back} onMouseOver={point} className={css.none}></img>
    </>
}

export default ButtonClick
