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

const InsertForm = ({ confirm, cancel }) => {
    const css = useStyles();

    const [name, setName] = useState();
    const [sex, setSex] = useState();
    const [mmaxAge, setmmaxAge] = useState();
    const [fmaxAge, setfmaxAge] = useState();
    const [genderColor, setGenderColor] = useState();

    const disMaxAgeMale = useRef();
    const disMaxAgeFemale = useRef();

    const female = () => {
        disMaxAgeFemale.current.classList.remove(css.hide)
    }
    const noFemale = () => {
        setfmaxAge('')
        disMaxAgeFemale.current.classList.add(css.hide)
    }
    function male() {
        disMaxAgeMale.current.classList.remove(css.hide);
    }
    function noMale() {
        setmmaxAge('')
        disMaxAgeMale.current.classList.add(css.hide);
    }
    return <>
        <div className={css.wrapper}>
            <h1>hello insert-form</h1>
            <div className={css.form}>
                <p>
                    <label>שם קבוצה: </label>
                    <input type="text" onInput={(e) => setName(e.target.value)}></input>
                </p>
                <p>
                    <label>צבע הקבוצה</label>
                    <input type="color" onInput={(e) => setGenderColor(e.target.value)}></input>
                </p>
                <p>
                    <label>מין: </label>
                    <input type="checkbox" name="gender" id="male" onInput={(e) => {
                        setSex(e.target.id);
                        (e.target.checked) ? male() : noMale()
                    }}></input>
                    <span>זכר</span>
                    <input type="checkbox" name="gender" id="female" onInput={(e) => {
                        setSex(e.target.id);
                        (e.target.checked) ? female() : noFemale()
                    }}></input>
                    <span>נקבה</span>
                </p>
                <p className={css.hide} ref={disMaxAgeMale}>
                    <label>גיל מקסימלי בנים: </label>
                    <input type="number" min={0} max={120} onInput={(e) => setmmaxAge(e.target.value)}></input>
                </p>
                <p className={css.hide} ref={disMaxAgeFemale}>
                    <label>גיל מקסימלי בנות: </label>
                    <input type="number" min={0} max={120} onInput={(e) => setfmaxAge(e.target.value)}></input>
                </p>
                <button className={css.confirmButton} onClick={() => confirm(name, sex, mmaxAge, fmaxAge, genderColor)}>אישור</button>
                <button className={css.confirmButton} onClick={() => cancel()}>ביטול</button>
            </div>
        </div>
    </>
}

export default InsertForm