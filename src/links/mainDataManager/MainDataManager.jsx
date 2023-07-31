import React, { useEffect, useState, useCallback } from "react";
import CardIndex from "../cardIndex/CardIndex";
import { createUseStyles } from "react-jss";
import { Outlet, useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
    border: {
        marginTop: 1,
        marginRight: 10,
        width: 1900,
        height: 850,
        borderStyle: 'solid',
        borderWidth: 5,
        position: "absolute",
    },
    out: {
        marginTop: 45,
        display: 'flex',
        direction: 'rtl',
        alignItems: 'end',
        padding: '100'
    }
})

const MainDataManager = ({ arr } = []) => {
    const css = useStyles()
    const nav = useNavigate()
    const [currentLink, setCurrentLink] = useState(arr[0])

    const selected = useCallback((obj) => {
        setCurrentLink(obj)
    }, [],)

    useEffect(() => {
        function start() {
            nav(`${arr[0].link}`)
        }
        start()
    }, [])

    return <>
        <div className={css.out} >
            {arr.map(a => (<CardIndex obj={a} key={a.link} selected={selected}></CardIndex>))}
        </div>
        <div className={css.border} style={{ borderColor: currentLink.color }}>
            <Outlet></Outlet>
        </div>
    </>
}

export default MainDataManager;