import React from "react";
import Select from "react-select";
import { hebrewWeekDays } from "../../services/dateAndTime";

const SelectDays = ({ days, onSelect }) => {

    const SelectDay = (val) => {
        onSelect(val)
    }

    const daysMap = days.map(d => ({
        id: d.id,
        day: hebrewWeekDays[d.day - 1].name
        // ,startHour: time(d.startHour)
        // , endHour: time(d.endHour),
        // swimmingPoolId: d.swimmingPoolId
    }))

    return <>
        {
            days.length > 0 ? <>
                {
                    <Select placeholder="בחר..."
                        options={daysMap.map(d => ({ label: d.day, value: d.id }))} onChange={SelectDay}>
                    </Select>
                }
            </> : ""
        }
    </>
}
export default SelectDays;

