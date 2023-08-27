import React, { useReducer, useEffect, useCallback } from "react"
import { server } from "./../../../../services/axios"
import { useNavigate } from "react-router-dom"
import TimetableForDay from './TimetableForDay'
// import ScheduleTeacherContext, { setstate } from "../../../../contexts/ScheduleTeacherContext"
import Text from "../../../../small-components/ButtonText/ButtonText"

const addDay = (state, day) => {
    state = [...state, { ...day.obj, poolName: day.poolName }]
    return state
}


const FormSchedule = ({ obj }) => {
    const nav = useNavigate()
    // const [data, setData] = useReducer(setstate, [])
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

    // const closeSchedule = useCallback(async () => {
    //     nav('/datamanager/teachers/oneTeacher', { state: { name: obj.name } })
    // }, [data])



    // const saveSchedule = useCallback(async () => {
    //     // data.map(day => {
    //     //     day.hours.map((hour, index) => {
    //     //         day.hours[index] = { startHour: hour.startHour, endHour: hour.endHour, poolName: hour.poolName, gender: hour.gender }
    //     //     })
    //     // })
    //     let ans;
    //     if (obj.update !== undefined) {
    //         ans = await server.post('/teacher_schedule/updateTeacherSchedule', { name: obj.name, update: { schedule: data } })
    //         return;
    //     }
    //     else {
    //         ans = await server.post('/teacher_schedule/insertTeacherSchedule', { name: obj.name, schedule: data })
    //     }

    // }, [data])



    if (allSchedule.length > 0) {
        return <>
            {/* <ScheduleTeacherContext.Provider value={{ data, setData }}> */}
                {
                    allSchedule.map((day, index) => {
                        if (obj.update) {
                            const hour = getHoursOfDay(obj.update, day.day);
                            if (hour)
                                return <TimetableForDay obj={{ day: day, index: index, gender: obj.gender, update: hour }} key={index} ></TimetableForDay>;
                        }
                        return <TimetableForDay obj={{ day: day, index: index, gender: obj.gender }} key={index}></TimetableForDay>;
                    })
                }
                {/* <Text text="שמירה" styles={[{ height: 30, width: 120 }]} click={saveSchedule}></Text> */}
                {/* <Text text="סגור" styles={[{ height: 30, width: 120 }]} click={closeSchedule}></Text> */}

            {/* </ScheduleTeacherContext.Provider > */}
        </>
    }

}

export default FormSchedule;



