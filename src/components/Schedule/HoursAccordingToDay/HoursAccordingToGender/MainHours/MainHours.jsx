import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { Link, Outlet, useParams } from "react-router-dom";
import ShowHours from "../ShowHours/ShowHours";
import { hoursAccordingToGender } from '../../../../../services/db'
import { getData } from "../../../../../services/axios";
import InsertHour from "../InsertHour/InsertHour";

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
    th2:{
        width: '4%',
    }
})

const MainHours = ({ poolName, day }) => {
    const css = useStyles();
    let [hours,setHours]=useState([])
    let refModal = useRef()

    useEffect(() => {
      
    async function start(){
        let ans = await getData(`/schedule/getAllHoursByDay?poolName=${poolName}&day=${day}`)
        console.log('hours',ans);
        if (ans.hours) {
            setHours(ans.hours)
        }
    }
    start()
    }, [])
    function openInsertComponent() {
        refModal.current.style.display = 'block'
    }
    return <>

        <Outlet />
        <table className={css.table}>
            <thead>
                <tr>
                    <th className={css.th}>משעה</th>
                    <th className={css.th}>עד שעה</th>
                    <th className={css.th}>סוג קבוצה</th>
                    <th className={css.th2}></th>
                </tr>
            </thead>
            <tbody>
                {
                    hours.map(h => (
                        <ShowHours key={h.startHour} td1={h.startHour} td2={h.endHour} td3={h.gender}/>
                    ))
                }
            </tbody>
        </table>
        <button onClick={openInsertComponent}>insert Hour</button>
        <div className="modal" ref={refModal}>
                <InsertHour />
            </div>
    </>
}

export default MainHours;