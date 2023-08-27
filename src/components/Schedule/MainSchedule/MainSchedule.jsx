import React, { useEffect, useReducer, useState } from "react";
import { getData } from "../../../services/axios";

const activeHoursReducer = (state, item) => {
    switch (item.option) {
        case 'add':
            delete item.option;
            state = [...state, item];
            break;
        case 'remove':
            state.splice(state.findIndex(i => i.day === item.day), 1);
            state = [...state];
            console.log("state");
            console.log(state);
            break;
        default:
            break
    }
    return state
}

const MainSchedule = () => {
    const [activeHours, setActiveHours] = useReducer(activeHoursReducer, [])
    useEffect(() => {
        async function start() {
            let poolName = 'ashdod'
            let response = await getData(`/schedule/getAllActiveHours/${poolName}`)
            sortSchedule(response[0].schedule)
        }
        start()
    }, [])

    const sortSchedule = (data) => {
        data.forEach(day => {
            console.log('day', day);
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
        });
    }

    return <>
        <p>hello to schedule</p>
        {/* <Table th={['יום', 'שעת התחלה', 'שעת סיום']} tbody={tbody} style={style} updateFunc={updateFunc} deleteFunc={deleteFunc}></Table> */}
    </>
}

export default MainSchedule;