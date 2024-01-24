import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import Select from "react-select";
import { hebrewWeekDays } from "../../services/dateAndTime";

const useStyles = createUseStyles({

})

const SelectDays = ({ days, onSelect }) => {

    const css = useStyles()

    useEffect(() => {
        // let numDays = days.map(({day})=>day)
        // .reduce( (total, item) => {
        //     total[item] = (total[item] || 0) + 1 ;
        //     return total;
        //   } , [])

        //   console.log({numDays})
    }, []);

    const SelectDay = (val) => {
        onSelect(val)
    }

    const time = (t) => {
        let hour = new Date(t).getHours()
        let min = new Date(t).getMinutes()
        if (min === '0') { min = '00' }
        if (min < 10) { min = '0' + min }
        return hour + ':' + min
    }
    const daysMap = days.map(d => ({
        id: d.id,
        day: hebrewWeekDays[d.day - 1].name,
        startHour: time(d.startHour)
        , endHour: time(d.endHour),
        swimmingPoolId: d.swimmingPoolId
    }))
    // <select name={p.poolName} key={p.poolName}> </select>
    return <>

        {
            days.length > 0 ? <>
                {
                    <Select placeholder="בחר..."
                        options={daysMap.map(d => ({ label: d.day + "     " + d.startHour + "-" + d.endHour, value: d.id }))} onChange={SelectDay}>
                    </Select>
                }
            </> : ""
        }
    </>
}
export default SelectDays;

