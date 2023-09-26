import React, { useState, useEffect, useContext } from "react"
import { createUseStyles } from "react-jss"
import './ScheduleTable.css'
import DaySchedule from "./DaySchedule"
import { ScheduleTableContext } from "./ScheduleTableContext"
import { defaultHours, addMinutes } from "../../../services/dateAndTime"

const useStyles = createUseStyles({
    table: {
        display: 'flex',

    },
    tableDay: {
        flexBasis: '0',
        flexGrow: '1'
    }
})

const WeekSchedule = ({ schedule }) => {
    const css = useStyles()
     const {scheduleHours, setScheduleHours}= useContext(ScheduleTableContext)



    useEffect(() => {
            let h = []
            let startHour = defaultHours.start
            while (startHour.getTime() < defaultHours.end) {
                h.push(startHour)
                startHour = addMinutes(startHour, 30)
            }
            setScheduleHours(h)
    }, [schedule])
    return <>
        <div className={css.table}>
            <div  style={{width:70}}>
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
                schedule.map(day => (
                    <div className={css.tableDay} key={day.day.number}>
                        <DaySchedule scheduleDay={day} />
                    </div>
                ))
            }
        </div >
    </>
}

export default WeekSchedule
