import React, { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import './ScheduleTable.css'
import { ScheduleTableContext } from "./ScheduleTableContext"
import HourBlock from "./HourBlock"
import ButtonIcon from "../../../basic-components/ButtonIcon/ButtonIcon"
import icons from "../../../services/iconService"
import { checkTimeInBlock } from "../../../services/validations/scheduleValidation"


const DaySchedule = ({ scheduleDay, insertButton, selectSchedule }) => {
    const { scheduleHours } = useContext(ScheduleTableContext)
    const [hourBlocks, setHourBlocks] = useState([])

    useEffect(() => {

        const buildBlocks = scheduleHours.map(sch => {
            console.log({sch})
            const x = scheduleDay.schedules.find(sc => checkTimeInBlock(sc, sch))
            const block = { ...sch }
            if (x) {
                block.schedule = x
            }
            return block
        })
       setHourBlocks(buildBlocks)
    }, [scheduleDay,scheduleHours])


    return <>
        <div >
            <div className="day-header day-title">
                <span>{scheduleDay.day.name}</span>
                <ButtonIcon btnStyle={{ imgwidth: "8px", imgheight: "8px", height: "25px", width: "25px" }} title={"הוסף"} imgName={icons.ADD} func={() => { insertButton(scheduleDay) }} ></ButtonIcon>
            </div>
            {
                hourBlocks.map((block, i) => (
                    <div key={`block${i}`}>
                        <HourBlock data={block} selectSchedule={selectSchedule} />
                    </div>
                ))
            }


        </div>
    </>

}

export default DaySchedule
