import React, { useCallback, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Outlet, useNavigate } from "react-router-dom";
import CardIndexHeaders from "../cardIndex/CardIndexHeaders";

const useStyles = createUseStyles({
    headers: {
        display: 'flex',
        direction: 'rtl',
        justifyContent: 'space-around'
    }
})
const Headers = ({ arr } = []) => {
    const css = useStyles()
    const nav = useNavigate()
    const [currentLink, setCurrentLink] = useState(arr[0])

    useEffect(() => {
        nav(`${arr[0].link}`)
    }, [])

    const selected = useCallback((obj) => {
        setCurrentLink(obj)
    }, [],)

    return <>
        <div className={css.headers} >
            {arr.map(a => (<CardIndexHeaders obj={a} key={a.link} flag={a.text === currentLink.text ? true : false} selected={selected}></CardIndexHeaders>))}
        </div>
        <div>
            <Outlet></Outlet>
        </div>
    </>
}

export default Headers;