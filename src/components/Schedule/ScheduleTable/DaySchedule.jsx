import React, {useContext} from "react"
import { createUseStyles } from "react-jss"
import './ScheduleTable.css'
import { ScheduleTableContext } from "./ScheduleTableContext"
import HourBlock from "./HourBlock"

const DaySchedule = ({ scheduleDay }) => {
    const { day, schedules } = scheduleDay
    const { scheduleHours } = useContext(ScheduleTableContext)
    
    return <>
        <div >
            <div className="day-header day-title">
                <span>{day.name}</span>
            </div>
            {
                scheduleHours.map((s, i)=>(
                    <div key={`sc${i}`}>
                        <HourBlock  />
                        </div>
                ))
            }
        </div>
    </>

}

export default DaySchedule
