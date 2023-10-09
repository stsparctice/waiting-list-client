import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { stateStatus } from "../../../store/storeStatus";
import { getAllTeachers } from "../../../store/teachers";
import { useNavigate } from "react-router-dom";
import Table from "../../../basic-components/DynamicTable/Table/Table"
import { cellElementOptions } from "../../../basic-components/DynamicTable/Td/Td";
import DeleteForm from "../../DeleteForm/DeleteForm";
import FormTeacher from "../FormTeacher/FormTeacher";
const tableConfig = {
    headers: [{ key: 'name', header: 'שם המורה' }, { key: 'address', header: 'כתובת' }, { key: 'color', header: 'צבע' }],
    hideKeys: ['id', 'addedDate', 'userName', 'disabled', 'disabledDate', 'disableUser', 'disableReason'],
    convertKeys: [],
    keyElements: [{ key: 'color', element: cellElementOptions.colorLabel }]
}

const MainTeacher = () => {
    const dispatch = useDispatch()
    const teachers = useSelector(state => state.Teachers.teachers)
    const teacherStatus = useSelector(state => state.Teachers.status)
    const [selectedPool, setSelectedPool] = useState({})
    const [deletePool, setDeletePool] = useState(undefined)
    const [insert, setInsert] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    useEffect(() => {
        if (teacherStatus === stateStatus.EMPTY)
            dispatch(getAllTeachers())
    }, [dispatch, teacherStatus]);
    
    useEffect(() => {
        let days
        let pool
        let dayInWeek = []
        // const findInMongo = async () => {
        //     let ans = await server.get('/teachers/findTeacher')
        //     ans.data = await Promise.all(ans.data.map(async teacher => (
        //         dayInWeek = [],
        //         days = (await server.get(`/teacher_schedule/findTeacherScheduleToSpecificTeacher/${teacher.name}`)),
        //         days.data[0] ?
        //             days.data[0].schedule.map(async (day) => (
        //                 console.log("day", day),
        //                 await day.hours.map(async (hour) => (
        //                     pool = await server.post('/schedule/getHour', {
        //                         poolName: hour.swimmingPool, day: day.day, startHour: hour.start, project:
        //                             { "schedule": { $elemMatch: { "hours": { $elemMatch: { "startHour": hour.start } } } } }
        //                     }),
        //                     pool.data[0] ?
        //                         pool.data[0].schedule[0].hours.map(async (g) => (
        //                             g.startHour == hour.start ?
        //                                 dayInWeek.push({ "day": day.day, "group": g.gender, "pool": hour.swimmingPool }) :
        //                                 ""
        //                         )) :
        //                         ""
        //                 ))
        //             )) :
        //             "",
        //         dayInWeek ?
        //             {
        //                 "שם מטפל": { type: 'readonly', visible: true, value: teacher.name, fontWeight: "bold", over: true },
        //                 "טלפון": { type: 'readonly', visible: true, value: teacher.phone },
        //                 "מייל": { type: 'readonly', visible: true, value: teacher.email },
        //                 "ימי עבודה": { type: 'readonly', visible: true, value: "<ButtonClick obj={{ name: teacher.name, details: dayInWeek }}></ButtonClick>" },
        //                 "הערה": { type: 'readonly', visible: true, value: teacher.message }
        //             }
        //             :
        //             ""
        //     )))
        //     setTable(ans.data)
        // }
        // findInMongo()
    }, [])

    const update = ()=>{
        console.log('update')
    }

    const remove = ()=>{
        console.log('insert')
    }

    const addTeacher = () => {
        console.log("מטפל חדש!!!!!");
        // navigate('/datamanager/teachers/oneTeacher', {})
    }

    const confirm = () => {
        closeModal()
    }


    const openModal = () => {
        setInsert(true)
        setShowModal(true)
        setSelectedPool(0)
    }

    const closeModal = () => {
        setShowModal(false)
        setShowDeleteModal(false)
    }


    return <>
       {showModal ?
            <FormTeacher id={selectedPool} insert={insert} confirm={confirm} cancel={closeModal}></FormTeacher> : <></>}
        {showDeleteModal ?
            <DeleteForm obj={deletePool} confirm={confirm} cancel={closeModal}></DeleteForm> : <></>
        }
        <Table config={tableConfig} data={teachers} updateFunc={update} deleteFunc={remove}></Table>
        <button onClick={openModal}>:מטפל חדש</button>
    </>

}

export default MainTeacher
