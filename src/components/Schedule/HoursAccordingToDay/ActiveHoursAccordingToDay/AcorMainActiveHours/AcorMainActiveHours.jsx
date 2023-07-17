import React, { useContext, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { Link, Outlet } from "react-router-dom";
// import ShowHours from "../AcorShowActiveHours/AcorShowActiveHours";
import AcorInsertActiveHour from "../AcorInsertActiveHour/AcorInsertActiveHour";
import '../../../../OpenModalStyle.css'
import AcorActiveHourContext from "../AcorActiveHourContext";
import AcorShowActiveHours from "../AcorShowActiveHours/AcorShowActiveHours";
import { getData } from "../../../../../services/axios";
import HoursAccordingToDayContext from "../../HoursAccordingToDayContext";

const useStyles = createUseStyles({
    insertHour: {
        textDecoration: 'none',
        border: '3px solid black',
        height: '5%'
    },
    table: {
        marginLeft: '15%',
        width: '70%',
        textAlign: 'center',
        direction: 'rtl',
        border: '1px solid black'
    },
    th: {
        width: '32%',
        border: '1px solid black'
    },
    th2: {
        width: '4%',
    }
})

const AcorMainActiveHours = ({ poolName, day }) => {
    const css = useStyles();
    const [acorActiveHourRef, setAcorActiveHourRef] = useState({})
    let { info, setInfo } = useContext(HoursAccordingToDayContext)
    let refModal = useRef()
    let [hoursAccordingToDay, setHoursAccordingToDay] = useState([])
    useEffect(() => {
        async function first() {
            let ans = await getData(`/schedule/getAllActiveHoursByDay?poolName=${info.poolName}&day=${info.day}`)
            console.log('hoursAccordingToDay', ans);
            if (ans.activeHours) {
                setHoursAccordingToDay(ans.activeHours)
            }
        }
        first()
    }, [])

    function openInsertComponent() {
        refModal.current.style.display = 'block'
    }
    return <>
        <AcorActiveHourContext.Provider value={{ acorActiveHourRef, setAcorActiveHourRef }}>
            <table className={css.table}>
                <thead>
                    <tr>
                        <th className={css.th}>שעת התחלה</th>
                        <th className={css.th}>שעת סיום</th>
                        <th className={css.th2}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hoursAccordingToDay.map(h => (
                            <AcorShowActiveHours key={h.startActiveHour} td1={h.startActiveHour} td2={h.endActiveHour} />
                        ))
                    }
                </tbody>
            </table>

            <div className="modal" ref={refModal}>
                <AcorInsertActiveHour />
            </div>
            <button onClick={openInsertComponent}>insert Active Hour</button>
            <Outlet />
        </AcorActiveHourContext.Provider>
    </>
}

export default AcorMainActiveHours;