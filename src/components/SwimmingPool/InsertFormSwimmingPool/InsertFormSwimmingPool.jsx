import React, { useCallback, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import '../../../styles/Form.css'
import '../../../styles/Modal.css'

import FormButton from '../../../basic-components/FormButton/FormButton'

const useStyles = createUseStyles({
    wrapper: {
        direction: 'rtl',
        textAlign: 'center',
        paddingBottom: '30px'
    },

    inputrow: {
        width: '45%',
        display: 'flex',
        justifyContent: "space-between"
    },

    hide: {
        display: 'none'
    },

});

const InsertFormSwimmingPool = ({  name, color, address, confirm, cancel }) => {
    const css = useStyles();

    const [oldName, setOldName] = useState(name)
    const [poolName, setPoolName] = useState();
    const [poolColor, setPoolColor] = useState();
    const [poolAddress, setPoolAddress] = useState();


    const nameRef = useRef()
    const colorRef = useRef()
    const addressRef = useRef()

    const confirmForm = useCallback(() => {
        console.log({ oldName, poolName, poolColor, poolAddress })
        confirm(oldName, poolName, poolColor, poolAddress)
    }, [confirm, oldName, poolName, poolColor, poolAddress])

    useEffect(() => {
        nameRef.current.setAttribute('value', name)
        let mycolor=color?color:'#FFFFFF'
        colorRef.current.setAttribute('value', mycolor)
        addressRef.current.setAttribute('value', address)
    })
    useEffect(() => {
        setOldName(name)
        setPoolColor(color)
        setPoolAddress(address)
    }, [])


    return <>
        <div className="modal" >
            <div className="form-wrapper container">
                <h2>בריכה חדשה</h2>
                <div className="form">
                    <p className="input-row">
                        <label className={css.label}>שם בריכה: </label>
                        <input type="text" ref={nameRef} onInput={(e) => setPoolName(e.target.value)}></input>
                    </p>
                    <p className="input-row">
                        <label className={css.label}>כתובת הבריכה: </label>
                        <input type="text" ref={addressRef} onInput={(e) => setPoolAddress(e.target.value)}></input>
                    </p>
                    <p className="input-row">
                        <label className={css.label}>צבע הבריכה: </label>
                        <input type="color" ref={colorRef} onInput={(e) => setPoolColor(e.target.value)}></input>
                    </p>
                    <div className="button-row">
                        <FormButton text="אישור" func={confirmForm}></FormButton>
                        <FormButton text="ביטול" func={cancel}></FormButton>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default InsertFormSwimmingPool