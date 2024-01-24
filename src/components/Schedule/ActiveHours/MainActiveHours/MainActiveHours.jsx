import React, { useEffect, useContext, useState, useRef } from "react";
import { getData } from "../../../../services/axios";
import { createUseStyles } from "react-jss";
import ShowActiveHours from "../ShowActiveHours/ShowActiveHours";
import InsertActiveHours from "../InsertActiveHours/InsertActiveHours";
import ActiveHoursContext from "../../../../contexts/ActiveHours";
import { Link, Outlet } from "react-router-dom";
import ActiveHoursRef from "../../../../contexts/ActiveHoursRef"
// import AddActiveHours from "../AddActiveHours/AddActiveHours";
import '../../../OpenModalStyle.css'

const useStyles = createUseStyles({

    table: {
        userSelect: 'none',
        marginLeft: '15%',
        width: '70%',
        textAlign: 'center',
        direction: 'rtl',
        border: '1px solid black'
    },

    caption: {
        borderTop: '1px solid black',
        borderRight: '1px solid black',
        borderLeft: '1px solid black',


    },
    th: {
        width: '20%',
        border: '1px solid black'
    },
    th2: {
        width: '1%'
    },
    // th3: {
    //     width: '54%',
    //     border: '1px solid black'
    // }
})
const MainActiveHours = () => {
    const css = useStyles();
    const refModal = useRef()
    const refMainComponent = useRef()
    const [activeHoursRef, setActiveHoursRef] = useState({})
    const { activeHours, setActiveHours } = useContext(ActiveHoursContext)
    useEffect(() => {
        const allcards = async () => {
            refModal.current.style.display = 'none'
            let poolName='ashdod'
            //בבקשה זו צריך להשלח שם הבריכה
            let response = await getData(`/schedule/getAllActiveHours/${poolName}`)
            response = response[0].schedule
            console.log(response);
            for (let day of response) {
                if (day.activeHours) {
                    let minHour = day.activeHours[0].startActiveHour
                    let maxHour = day.activeHours[0].endActiveHour
                    if (day.activeHours.length > 0) {
                        for (let hours of day.activeHours) {
                            if (hours.startActiveHour < minHour)
                                minHour = hours.startActiveHour
                            if (hours.endActiveHour > maxHour)
                                maxHour = hours.endActiveHour
                        }
                    }
                    setActiveHours({ day: day.day, startActiveHour: minHour, endActiveHour: maxHour, option: 'add' })
                }
            }
        }
        allcards()
    }, []);
    function openComponent() {
        setActiveHoursRef({
            refModal: refModal,
            refMainComponent: refMainComponent
        })
        refModal.current.style.display = 'block'
        refMainComponent.current.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    }
    return <>
        <ActiveHoursRef.Provider value={{ activeHoursRef, setActiveHoursRef }}>
            {/* <AddActiveHours /> */}
            {/* {items.length > 0 ? <p>{items.length}</p> : <p>no items</p>} */}
            <div className="mainComponent" ref={refMainComponent}>
                <table className={css.table}>
                    <caption className={css.caption}>מערכת פעילות</caption>
                    <thead>
                        <tr>
                            <th className={css.th}>
                                יום
                            </th>
                            <th className={css.th}>
                                שעת התחלה
                            </th>
                            <th className={css.th}>
                                שעת סיום
                            </th>
                            <th className={css.th2}></th>
                            <th className={css.th2}></th>
                        </tr>
                    </thead>
                    <tbody>{
                        activeHours.map(item => (<ShowActiveHours key={item.day}
                            poolName={'ashdod'}
                            day={item.day}
                            startActiveHour={item.startActiveHour}
                            endActiveHour={item.endActiveHour}
                        />))}


                    </tbody>
                </table>
                <button onClick={openComponent}>הוספת שעות פעילות</button>
                <Outlet />
                {/* <h3>שימו לב יתכנו הפסקות בשעות הפעילות</h3> */}
                <Link to={'/'}>back</Link>
            </div>
            <div className="modal" ref={refModal}>
                <InsertActiveHours />
            </div>
        </ActiveHoursRef.Provider>

    </>




}
export default MainActiveHours;