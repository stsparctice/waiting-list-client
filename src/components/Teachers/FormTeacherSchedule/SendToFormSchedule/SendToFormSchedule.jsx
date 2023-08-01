
import React, { useReducer, useEffect, useState } from "react"
import { server } from "./../../../../services/axios"

import FormSchedule from "../FormSchedule/FormSchedule"
import { useLocation } from "react-router-dom"
const SendToFormSchedule = () => {
    const { name } = useLocation().state
    const toschedule = (state, ans) => {
        if (ans.length !== 0)
            state = ans[0].schedule
        else
            state = "insert"
        return state
    }
    const [schedule, setSchedule] = useReducer(toschedule, [])
    const [teacher, setTeacher] = useState({})

    useEffect(() => {
        const findSchedule = async () => {
            const ans = await server.get(`/teacher_schedule/findTeacherScheduleToSpecificTeacher/${name}`)
            setSchedule(ans.data)
        }
        const findTeacher = async () => {
            const ans = await server.get(`/teachers/findTeacher?name=${name}`)
            setTeacher(ans.data[0])
        }
        findSchedule()
        findTeacher()
    }, [])

    return <>
        {
            (schedule.length !== 0 && schedule !== "insert" && teacher !== undefined)
                ?
                <FormSchedule obj={{ poolName: teacher.pools, gender: teacher.genders, name: teacher.name, update: schedule }}></FormSchedule> :
                (schedule === "insert" && teacher !== undefined)
                    ?
                    <FormSchedule obj={{ poolName: teacher.pools, gender: teacher.genders, name: teacher.name }}></FormSchedule> : <></>
        }


    </>
}

export default SendToFormSchedule









