import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { stateStatus } from "../../../store/storeStatus";
import { getAllTeachers, selectById } from "../../../store/teachers";
import { useNavigate } from "react-router-dom";
import { cellElementOptions } from "../../../basic-components/DynamicTable/Td/Td";
import icons from "../../../services/iconService";
import Table from "../../../basic-components/DynamicTable/Table/Table"
import DeleteForm from "../../DeleteForm/DeleteForm";
import FormTeacher from "../FormTeacher/FormTeacher";
import FormModalSchedule from "../FormTeacherSchedule/FormSchedule/FormModalSchedule";
import { getData } from "../../../services/axios";

const tableConfig = {
    headers: [{ key: 'teacherName', header: 'שם המורה' }, { key: 'phone', header: 'טלפון' }, { key: 'email', header: 'מייל' }, { key: 'address', header: 'כתובת' }],
    hideKeys: ['id', 'addedDate', 'userName', 'disabled', 'disabledDate', 'disableUser', 'disableReason'],
    convertKeys: [],
    keyElements: []
}

const MainTeacher = () => {
    const dispatch = useDispatch()
    const teachers = useSelector(state => state.Teachers.teachers)
    const teacherStatus = useSelector(state => state.Teachers.status)
    const [rowButtons, setRowButtons] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState({})
    const [deletePool, setDeletePool] = useState(undefined)
    const [insert, setInsert] = useState(false)
    const [inserSchedule, setInsertSchedule] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showScheduleModal, setShowScheduleModal] = useState(false)

    useEffect(() => {
        if (teacherStatus === stateStatus.EMPTY)
            dispatch(getAllTeachers())
    }, [dispatch, teacherStatus]);

    useEffect(() => {
        const btns = [
            { icon: icons.SCHEDULE, func: schedule, title: 'מערכת' },
            { icon: icons.EDIT, func: update, title: 'עדכון' },
            { icon: icons.DELETE, func: remove, title: 'מחק' },
        ]
        setRowButtons(btns)
    }, [])

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

    const update = async (data) => {
     
        setShowModal(true)
        setInsert(false)
        setSelectedTeacher(data.id)
    }

    const schedule = (data) => {
        setShowScheduleModal(true)
        setSelectedTeacher(data.id)
    }

    const remove = () => {
    }


    const confirm = () => {
        closeModal()
    }

    const confirmSchedule = () => {
        closeScheduleModal()
    }

    const openModal = () => {
        setInsert(true)
        setShowModal(true)
        setSelectedTeacher(0)
    }

    const closeModal = () => {
        setShowModal(false)
        setShowDeleteModal(false)
    }
    const openScheduleModal = () => {
        // setInsertSchedule(true)
        setShowScheduleModal(true)
        // setSelectedTeacher(0)
    }

    const closeScheduleModal = () => {
        setShowScheduleModal(false)
    }

    return <>
        {showModal ?
            <FormTeacher id={selectedTeacher} insert={insert} confirm={confirm} cancel={closeModal}></FormTeacher> : <></>}
        {showDeleteModal ?
            <DeleteForm obj={deletePool} confirm={confirm} cancel={closeModal}></DeleteForm> : <></>
        }
        {showScheduleModal ?
            <FormModalSchedule id={selectedTeacher} insert={inserSchedule} confirm={confirmSchedule} cancel={closeScheduleModal}></FormModalSchedule> : ""
        }
        <button onClick={openModal}>:מטפל חדש</button>
        <Table config={tableConfig} data={teachers} rowbuttons={rowButtons}></Table>
    </>

}

export default MainTeacher
