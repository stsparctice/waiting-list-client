import React, { useEffect, useState } from "react";
import Select from "react-select";


const SelectStartHour = ({ day, onSelect }) => {
    const [hours, setHours] = useState([])
    useEffect(() => {
        const startHours = []
        let hour = new Date(day.startHour)
        while (new Date(hour).getTime() < new Date(day.endHour).getTime()) {
            startHours.push(hour)
            hour = new Date(hour.setMinutes(new Date(hour).getMinutes() + 30))
        }
        setHours(startHours)
    }, []);

    const SelectHour = (val) => {
        onSelect(val)
    }

    const time = (t) => {
        let hour = new Date(t).getHours()
        let min = new Date(t).getMinutes()
        if (min === '0') { min = '00' }
        if (min < 10) { min = '0' + min }
        return hour + ':' + min
    }
    return <>
        {
            hours.length > 0 ? <>
                <div className="input-group">
                    <label>שעת התחלה</label>
                    <Select placeholder="בחר..."
                        options={hours.map(h => ({ label: time(h), value: h }))} onChange={SelectHour}>
                    </Select>
                </div>
            </> : ""
        }
    </>
}
export default SelectStartHour;

