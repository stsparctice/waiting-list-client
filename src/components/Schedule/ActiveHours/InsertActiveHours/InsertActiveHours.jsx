import React, { useState, useContext } from 'react'
import { createUseStyles } from "react-jss";
import ActiveHoursContext from '../../../../contexts/ActiveHours';
import ActiveHoursRef from '../../../../contexts/ActiveHoursRef';
import { postData } from '../../../../services/axios';
import '../../../OpenModalStyle.css'

const useStyles = createUseStyles({
    body: {
        direction: 'rtl',
        border: 'solid 2px black',
        margin: '5px',
        width: '25%',
        textAlign: 'center'
    }
})

const InsertActiveHours = () => {
    const css = useStyles();
    const { setActiveHours } = useContext(ActiveHoursContext)
    const [day, setDay] = useState('')
    const [startActiveHour, setStartActiveHour] = useState('')
    const [endActiveHour, setEndActiveHour] = useState('')
    const {activeHoursRef, setActiveHoursRef} = useContext(ActiveHoursRef)

    const save = async () => {
        const item = {poolName:'ashdod', day: day, startActiveHour: startActiveHour, endActiveHour: endActiveHour }
        console.log({item});
        const response = await postData('/schedule/addActiveHour',item)
        item.option = 'add'
        setActiveHours(item)
        setTimeout(() => {
            activeHoursRef.refModal.current.style.display = 'none'
            activeHoursRef.refMainComponent.current.style.backgroundColor = 'white';
        }, 1500);
    }
    function close() {
        activeHoursRef.refModal.current.style.display = 'none'
        activeHoursRef.refMainComponent.current.style.backgroundColor = 'white';
    }
    return <>
        <div className={css.body}>
        <span onClick={close} className="close" title="close">&times;</span>
            <p>
                <label>יום</label>
                <input type="text" onChange={(e) => setDay(e.target.value)}></input>
            </p>
            <p>
                <label>שעת התחלה</label>
                <input type="text" onChange={(e) => setStartActiveHour(e.target.value)}></input>
            </p>
            <p>
                <label>שעת סיום</label>
                <input type="text" onChange={(e) => setEndActiveHour(e.target.value)}></input>
            </p>
            <button onClick={save}>אישור</button>

        </div>
    </>



}

export default InsertActiveHours