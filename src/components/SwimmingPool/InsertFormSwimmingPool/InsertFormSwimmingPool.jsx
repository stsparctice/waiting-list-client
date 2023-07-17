import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import '../../OpenModalStyle.css'

const useStyles = createUseStyles({
    wrapper: {
        direction: 'rtl',
        textAlign: 'center',
        paddingBottom: '30px'
    },
    form: {
        width: '50%',
        height: '30%',
        marginRight: '25%',
        border: '3px solid black',
        borderRadius: '20px',
        backgroundColor: 'silver',

    }, confirmButton: {
        cursor: 'default',
        width: '20%',
        height: '20px',
        marginRight: '40%',
        border: '2px solid black',
        backgroundColor: 'red'
    },
    hide: {
        display: 'none'
    }
});

const InsertFormSwimmingPool = ({ name, color, address, confirm, cancel }) => {
    const css = useStyles();
    const [oldName, setOldName] = useState(name)
    const [poolName, setPoolName] = useState();
    const [poolColor, setPoolColor] = useState();
    const [poolAddress, setPoolAddress] = useState();

    const nameRef = useRef()
    const colorRef = useRef()
    const addressRef = useRef()


    useEffect(() => {
        function middle() {
            nameRef.current.setAttribute('value', name)
            colorRef.current.setAttribute('value', color)
            addressRef.current.setAttribute('value', address)
        }
        middle()
    })
    useEffect(() => {
        function start() {
            setOldName(name)
            setPoolColor(color)
            setPoolAddress(address)
        }
        start()
    }, [])


    return <>
        <div className={css.wrapper}>
            <h1>hello insert-form-swimming pool</h1>
            <div className={css.form}>
                <p>
                    <label>שם בריכה: </label>
                    <input type="text" ref={nameRef} onInput={(e) => setPoolName(e.target.value)}></input>
                </p>
                <p>
                    <label>כתובת הבריכה: </label>
                    <input type="text" ref={addressRef} onInput={(e) =>setPoolAddress(e.target.value)}></input>
                </p>
                <p>
                    <label>צבע הבריכה: </label>
                    <input type="color" ref={colorRef} onInput={(e) => setPoolColor(e.target.value)}></input>
                </p>
                <div className={css.confirmButton} onClick={() => confirm(oldName, poolName, poolColor, poolAddress)}>אישור</div>
                <div className={css.confirmButton} onClick={cancel}>ביטול-חזרה</div>
            </div>
        </div>
    </>
}

export default InsertFormSwimmingPool