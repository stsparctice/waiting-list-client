import React, { useState, useEffect, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { stateStatus } from "../../../store/storeStatus"
import { getAllGenders } from "../../../store/genders"
import { createUseStyles } from "react-jss"
import './ScheduleTable.css'
import DaySchedule from "./DaySchedule"
import { ScheduleTableContext } from "./ScheduleTableContext"
import { getTimesList } from "../../../services/dateAndTime"




const useStyles = createUseStyles({
    table: {
        display: 'flex',

    },
    tableDay: {
        flexBasis: '0',
        flexGrow: '1'
    }
})

const reduceSchedule = (state, item) => {

}


const WeekSchedule = ({ insertEvent, editEvent }) => {
    const css = useStyles()
    const dispatch = useDispatch()
    const poolSchedules = useSelector(state => state.Schedule.allSchedules)
    const genders = useSelector(state => state.Genders.genders)
    const genderStatus = useSelector(state => state.Genders.status)
    const { scheduleHours, setScheduleHours } = useContext(ScheduleTableContext)
    const [weekSchedule, setWeekSchedule] = useState([])

    const openInsertModal = (clone) => {
        insertEvent(clone)
    }

    const openEdittModal = ({day, value}) => {
        const selectedSchedule = day.schedules.find(({id})=>value.id===id)
        editEvent({ day, selectedSchedule})
    }
    useEffect(() => {
        if (genderStatus === stateStatus.EMPTY) {
            dispatch(getAllGenders())
        }
    }, [genderStatus, dispatch])



    useEffect(() => {

        setScheduleHours(getTimesList())
    }, [setScheduleHours])

    useEffect(() => {
        const tempSchedule = JSON.parse(JSON.stringify(poolSchedules))
        for (let day of tempSchedule) {
            if (day.schedules.length > 0) {
                for (let sc of day.schedules) {
                    sc.startHour = new Date(sc.startHour)
                    sc.endHour = new Date(sc.endHour)
                    sc.backgroundColor=undefined;
                    
                    const gender = genders.find(g => g.id === sc.genderId.id)
                    if (gender)
                        sc.backgroundColor = gender.color
                }
            }
        }
        setWeekSchedule(tempSchedule)
    }, [poolSchedules, genders])


    return <>
    {
    }
        <div>
            <div className={css.table} >

                <div style={{ width: 70 }}>
                    <div className="day-header"></div>
                    {
                        scheduleHours.map((hour, index) => (
                            <div key={`hour${index}`} className="hour-block table-block">
                                <span>{hour.getHours().toString().padStart(2, '0')}:{hour.getMinutes().toString().padStart(2, '0')}</span>
                            </div>
                        ))
                    }
                </div>

                {
                    weekSchedule.map(day => (
                        <div className={css.tableDay} key={day.day.number}>
                            <DaySchedule scheduleDay={day} insertButton={openInsertModal} selectSchedule={(value)=>

                                openEdittModal({day, value})}/>
                        </div>
                    ))
                }
            </div>


        </div >
    </>
}

export default WeekSchedule
