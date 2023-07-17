import React, { useContext, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../../../services/axios";
import HoursAccordingToDayContext from "../../HoursAccordingToDayContext";

const useStyles = createUseStyles({
    wrapper: {
        direction: 'rtl',
        textAlign: 'center',
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
})


const AcorInsertActiveHour = () => {
    const css = useStyles();
    const nav = useNavigate();

    const [startActiveHour, setStartActiveHour] = useState();
    const [endActiveHour, setEndActiveHour] = useState();
    // const [gender, setGender] = useState();
    const { info, setInfo } = useContext(HoursAccordingToDayContext)

    const body = { startActiveHour, endActiveHour }

    async function confirm() {
        console.log(body);
        if (startActiveHour && endActiveHour) {
            //  בדיקות ולידציה
        }
        let ans = await postData('/schedule/addActiveHourByDay',{poolName:info.poolName,day:info.day,startActiveHour:startActiveHour,endActiveHour:endActiveHour})
        console.log(`activeHour to ${info.day}: `,ans);
    }


    return <>
        <div className={css.wrapper}>
            <h1>hello insert-form-hours</h1>
            <div className={css.form}>
                <p>
                    <label>משעה</label>
                    <input type="text" onInput={(e) => setStartActiveHour(e.target.value)}></input>
                </p>
                <p>
                    <label>עד שעה</label>
                    <input type="text" onInput={(e) => setEndActiveHour(e.target.value)}></input>
                </p>
                <button className={css.confirmButton} onClick={confirm}>אישור</button>
            </div>
        </div>
    </>
}

export default AcorInsertActiveHour;