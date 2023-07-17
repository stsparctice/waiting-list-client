import { useReducer, useEffect } from "react";
import "./../../../../styles/Timetable.css";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
    timeTable: {
        flexWrap: 'wrap',
        display: 'flex',
        borderBottom: '1px solid rgb(12, 87, 131)',
        direction:'rtl',
    },
    select: {
        marginTop:'27px',
        marginRight:'6px',
        height: '20px',
        width: '58px',
    }

})

const Timetable = ({ obj, func }) => {
    const initDay = {
        startHour: "",
        endHour: "",
        poolName: obj.timeTable.poolName,
        gender: obj.timeTable.gender,
        index: obj.index

    }

    const setState = (state, action) => {
        if (action.type === "start")
            state.startHour = action.value
        else
            state.endHour = action.value
      
        return (state)
    }

    useEffect(() => {
        createOptions()
    }, [])
    const css = useStyle()
    const [schedule, setDay] = useReducer(setState, initDay);

    function add15Minutes(time) {
        if (time.minutes === "45") {
            time.minutes = "00"
            time.hour = time.hour < 9 ? `0${(parseInt(time.hour) + 1)}` : `${(parseInt(time.hour) + 1)}`
        }
        else
            time.minutes = `${parseInt(time.minutes) + 15}`
        return time;
    }

    const createOptions = async function () {
        let time = {}, startOption, endOption;
        time.hour = (obj.timeTable.startHour.slice(0, 2));
        time.minutes = (obj.timeTable.startHour.slice(3));
        let optionStart = document.createElement('option');
        optionStart.innerHTML = "";
        document.getElementById(`startHour${obj.index}`).appendChild(optionStart)
        let optionEnd = document.createElement('option');
        optionEnd.innerHTML = "";
        document.getElementById(`endHour${obj.index}`).appendChild(optionEnd)
        while (obj.timeTable.endHour > (time.hour) + ":" + (time.minutes)) {
            startOption = document.createElement('option');
            startOption.innerHTML = (time.hour) + ":" + (time.minutes);
            if (obj.update && (time.hour) + ":" + (time.minutes) === (obj.update.startHour)) {
                setDay({ type: "start", value: (time.hour) + ":" + (time.minutes) })
                startOption.setAttribute('selected', true)
            }
            document.getElementById(`startHour${obj.index}`).appendChild(startOption)
            add15Minutes(time);
            endOption = document.createElement('option');
            endOption.innerHTML = (time.hour) + ":" + (time.minutes);
            if (obj.update && (time.hour) + ":" + (time.minutes) === (obj.update.endHour)) {
                endOption.setAttribute('selected', true)
                setDay({ type: "end", value: (time.hour) + ":" + (time.minutes) })
            }
            document.getElementById(`endHour${obj.index}`).appendChild(endOption)
        }
    }




    return <>

        <div className={css.timeTable}>
            <h5> בריכת {obj.timeTable.poolName} :</h5>
            <h5></h5>
            <h5>יום {obj.timeTable.day} :   </h5>

            <h5 htmlFor="start">מ: </h5>
            <select className={css.select} id={`startHour${obj.index}`} onChange={(ev) => setDay({ type: "start", value: ev.target.value })}>
            </select>
            <br />
            <h5 htmlFor="end">:עד</h5>
            <select className={css.select} id={`endHour${obj.index}`} onChange={(ev) => setDay({ type: "end", value: ev.target.value })}>
            </select>
        </div>

        <hr color="green" />
    </>

}
export default Timetable;