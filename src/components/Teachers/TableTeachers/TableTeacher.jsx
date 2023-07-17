import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../../services/axios";
import Table from "../../../components2/Table/Table"
import ButtonClick from "../../../small-components/ButtonClick/ButtonClick";
import { Outlet } from "react-router-dom";

const TableTeacher = () => {
    console.log("in tableTeacher");
    const [table, setTable] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let days
        let pool
        let dayInWeek = []
        const findInMongo = async () => {
            let ans = await server.get('/teachers/findTeacher')
            ans.data = await Promise.all(ans.data.map(async teacher => (
                dayInWeek = [],
                days = (await server.get(`/teacher_schedule/findTeacherScheduleToSpecificTeacher/${teacher.name}`)),
                days.data[0] ?
                    days.data[0].schedule.map(async (day) => (
                        console.log("day", day),
                        await day.hours.map(async (hour) => (
                            pool = await server.post('/schedule/getHour', {
                                poolName: hour.swimmingPool, day: day.day, startHour: hour.start, project:
                                    { "schedule": { $elemMatch: { "hours": { $elemMatch: { "startHour": hour.start } } } } }
                            }),
                            pool.data[0] ?
                                pool.data[0].schedule[0].hours.map(async (g) => (
                                    // console.log(g),
                                    // console.log("hour",hour),
                                    g.startHour == hour.start ?
                                        // dayInWeek.forEach(d => {
                                        //     d == { "day": day.day, "group": g.gender, "pool": hour.swimmingPool } ?
                                        //     false:
                                        // }),
                                        // console.log(day):
                                        dayInWeek.push({ "day": day.day, "group": g.gender, "pool": hour.swimmingPool }) :
                                        ""
                                )) :
                                ""
                        ))
                    )) :
                    "",
                dayInWeek ?
                    {
                        "שם מטפל": { type: 'readonly', visible: true, value: teacher.name, fontWeight: "bold", over: true },
                        "טלפון": { type: 'readonly', visible: true, value: teacher.phone },
                        "מייל": { type: 'readonly', visible: true, value: teacher.email },
                        "ימי עבודה": { type: 'readonly', visible: true, value: "<ButtonClick obj={{ name: teacher.name, details: dayInWeek }}></ButtonClick>" },
                        "הערה": { type: 'readonly', visible: true, value: teacher.message }
                    }
                    :
                    ""
            )))
            setTable(ans.data)
        }
        findInMongo()
    }, [])

    const addTeacher = () => {
        console.log("מטפל חדש!!!!!");
        navigate('/datamanager/teachers/oneTeacher', {})
    }


    return <>
        {
            table.length > 0 ?
                <Table Allobj={table}></Table>
                : ""
        }
        <Outlet></Outlet>
        <button onClick={addTeacher}>:מטפל חדש</button>
    </>

}

export default TableTeacher
