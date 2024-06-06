import React, { useEffect, useContext, useState } from "react";
import "./../../../../styles/Timetable.css";
import { createUseStyles } from "react-jss";
// import ScheduleTeacherContext from "./../../../../contexts/ScheduleTeacherContext"

const useStyle = createUseStyles({
    timeTable: {
        flexWrap: 'wrap',
        display: 'flex',
        borderBottom: '1px solid rgb(12, 87, 131)',
        direction: 'rtl',
    },
    select: {
        marginTop: '27px',
        height: '20px',
        width: '58px',
    }

})


const Timetable = ({ obj }) => {
    let time = {};
    // const { data, setData } = useContext(ScheduleTeacherContext)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        createOptions()
    }, [checked])

    const css = useStyle()

    const select = (event) => {
        setChecked(true)
    }

    function add15Minutes(time) {
        if (time.minutes === "45") {
            time.minutes = "00"
            time.hour = time.hour < 9 ? `0${(parseInt(time.hour) + 1)}` : `${(parseInt(time.hour) + 1)}`
        }
        else
            time.minutes = `${parseInt(time.minutes) + 15}`
        return time;
    }

    const setEndOptions = async function (value, time) {
        let endOption, hour;
        document.getElementById(`endHour${obj.index}`).innerHTML = ""
        let optionEnd = document.createElement('option');
        optionEnd.innerHTML = "";
        document.getElementById(`endHour${obj.index}`).appendChild(optionEnd)
        if (value.type)
            hour = value.value;
        else
            hour = value;
        time.hour = (hour.slice(0, 2));
        time.minutes = (hour.slice(3));
        while (obj.timeTable.endHour > (time.hour) + ":" + (time.minutes)) {
            add15Minutes(time);
            endOption = document.createElement('option');
            endOption.innerHTML = (time.hour) + ":" + (time.minutes);
            if (value.type && value.select === (time.hour) + ":" + (time.minutes))
                endOption.setAttribute('selected', true)
            // setData({
            //     value: (time.hour) + ":" + (time.minutes),
            //     day: obj.timeTable.day,
            //     type: "end",
            //     state: {
            //         startHour: "",
            //         endHour: (time.hour) + ":" + (time.minutes),
            //         poolName: obj.timeTable.poolName,
            //         gender: obj.timeTable.gender,
            //         index: obj.index
            //     }
            // })
            document.getElementById(`endHour${obj.index}`).appendChild(endOption)
        }

    }

    const createOptions = async function () {
        if (checked || obj.update) {
            let startOption;
            time.hour = (obj.timeTable.startHour.slice(0, 2));
            time.minutes = (obj.timeTable.startHour.slice(3));
            let optionStart = document.createElement('option');
            optionStart.innerHTML = "";
            document.getElementById(`startHour${obj.index}`).appendChild(optionStart)
            while (obj.timeTable.endHour > (time.hour) + ":" + (time.minutes)) {
                startOption = document.createElement('option');
                startOption.innerHTML = (time.hour) + ":" + (time.minutes);
                if (obj.update && (time.hour) + ":" + (time.minutes) === (obj.update.startHour)) {
                    // setData({
                    //     value: (time.hour) + ":" + (time.minutes),
                    //     day: obj.timeTable.day,
                    //     type: "start",
                    //     state: {
                    //         startHour: (time.hour) + ":" + (time.minutes),
                    //         endHour: "",
                    //         poolName: obj.timeTable.poolName,
                    //         gender: obj.timeTable.gender,
                    //         index: obj.index
                    //     }
                    // })
                    startOption.setAttribute('selected', true)
                    document.getElementById(`checkbox${obj.index}`).setAttribute('checked', true)
                }
                document.getElementById(`startHour${obj.index}`).appendChild(startOption)
                add15Minutes(time);
                if (obj.update && (time.hour) + ":" + (time.minutes) === (obj.update.endHour)) {
                    setEndOptions({ type: "exist", select: obj.update.endHour, value: obj.timeTable.startHour, }, time)
                }
            }
        }
    }

    return <>
        <div className={css.timeTable}>
            <input type="checkbox" name="" id={`checkbox${obj.index}`} onChange={(ev) => select({ value: ev.target })} />
            <h5> בריכת {obj.timeTable.poolName} :</h5>
            <h5>יום {obj.timeTable.day} :   </h5>

            <h5 htmlFor="start">מ: </h5>
            {/* <select className={css.select} id={`startHour${obj.index}`} onChange={(ev) => setData({
                value: ev.target.value,
                day: obj.timeTable.day,
                type: "start",
                state: {
                    startHour: ev.target.value,
                    endHour: "",
                    poolName: obj.timeTable.poolName,
                    gender: obj.timeTable.gender,
                    index: obj.index
                }
            }, setEndOptions(ev.target.value, time))}> */}
            {/* </select> */}
            <br />
            <h5 htmlFor="end">:עד</h5>
            {/* <select className={css.select} id={`endHour${obj.index}`} onChange={(ev) => setData({
                value: ev.target.value,
                day: obj.timeTable.day,
                type: "end",
                state: {
                    startHour: "",
                    endHour: ev.target.value,
                    poolName: obj.timeTable.poolName,
                    gender: obj.timeTable.gender,
                    index: obj.index
                }
            })}> */}

            {/* </select> */}
        </div>

        <hr color="green" />
    </>

}
export default Timetable;