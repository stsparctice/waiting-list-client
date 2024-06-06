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


const InsertHour = () => {
    const css = useStyles();

    const [startHour, setStartHour] = useState();
    const [endHour, setEndHour] = useState();
    const [gender, setGender] = useState();
    const {info,setInfo}=useContext(HoursAccordingToDayContext)

    const body = { startHour, endHour, gender }

    async function confirm() {
        if (startHour && endHour && gender) {
            //  בדיקות ולידציה
        }
        let ans=await postData('/schedule/addHourByDay',{poolName:info.poolName,day:info.day,startHour:startHour,endHour:endHour,gender:gender})
    }


    return <>
        <div className={css.wrapper}>
            <h1>hello insert-form-hours</h1>
            <div className={css.form}>
                <p>
                    <label>משעה</label>
                    <input type="text" onInput={(e) => setStartHour(e.target.value)}></input>
                </p>
                <p>
                    <label>עד שעה</label>
                    <input type="text" onInput={(e) => setEndHour(e.target.value)}></input>
                </p>
                <p>
                    <label>סוג קבוצה</label>
                    <input type="text" onInput={(e) => setGender(e.target.value)}></input>
                </p>
                <button className={css.confirmButton} onClick={confirm}>אישור</button>
            </div>
        </div>
    </>
}

export default InsertHour;