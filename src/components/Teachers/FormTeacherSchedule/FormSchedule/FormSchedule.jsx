import React, { useReducer, useEffect, useCallback } from "react"
import { server } from "./../../../../services/axios"
import TimetableForDay from './TimetableForDay'
import { checkHours, removalIndexsAndCheckEmptyOption } from "./../../../../services/validations/scheduleValidation"

const addDay = (state, day) => {
    state = [...state, { ...day.obj, poolName: day.poolName }]
    return state
}

const addHour = (state, action) => {
    let index = state.findIndex(item => item.day === action.day)
    if (index !== -1) {
        let indexInHours = state[index].hours.findIndex(item => item.index === action.schedule.index)
        if (indexInHours === -1)
            state[index].hours = [...state[index].hours, action.schedule]
        else
            state[index].hours[indexInHours] = action.schedule
    }
    else {
        state = [...state, {
            day: action.day, hours: [action.schedule]
        }]
    }

    return state
}

const FormSchedule = ({ obj }) => {
    console.log(obj,"===============================");
    const [hours, setHours] = useReducer(addHour, [

    ])
    const [allSchedule, setAllSchedule] = useReducer(addDay, []);
    useEffect(() => {
        const findInMongo = async () => {
            let ans = await Promise.all(obj.poolName.map(pn =>
                server.get(`/schedule/getAllHours/${pn}`)
            ))
            for (let i = 0; i < ans.length; i++) {
                if (ans[i].data !== undefined) {
                    for (let j = 0; j < ans[i].data[0].schedule.length; j++)
                        setAllSchedule({ obj: ans[i].data[0].schedule[j], poolName: obj.poolName[i] });
                }
            }

        }
        if (obj)
            findInMongo()
    }, [obj])




    const getHoursOfDay = (allHours, day) => {
        let flag = false;
        allHours.map(item => {
            if (item.day === day) {
                flag = item;
            }
        })
        return (flag ? flag : null)

    }



    const save = useCallback(async (hour, day) => {
        setHours({ schedule: hour, day: day })
    }, [])

    const saveSchedule = async () => {

        if (!await checkHours(hours)) {
            console.log("xxxxxxxxxxxxxxx");
        }
        removalIndexsAndCheckEmptyOption(hours)

        let ans;
        if (obj.update) {
            ans = await server.post('/teacher_schedule/updateTeacherSchedule', { name: obj.name, update: { schedule: hours } })
            return;
        }
        ans = await server.post('/teacher_schedule/insertTeacherSchedule', { name: obj.name, schedule: hours })

    }



    if (allSchedule.length > 0) {
        return <>
            {
                allSchedule.map((day, index) => {
                    if (obj.update) {
                        const hour = getHoursOfDay(obj.update, day.day);
                        if (hour)
                            return <TimetableForDay func={save} obj={{ day: day, index: index, gender: obj.gender, update: hour }} key={index} ></TimetableForDay>;
                    }
                    return <TimetableForDay func={save} obj={{ day: day, index: index, gender: obj.gender }} key={index}></TimetableForDay>;
                })
            }
            <button onClick={saveSchedule}>שמירה</button>
        </>
    }

}

export default FormSchedule;



