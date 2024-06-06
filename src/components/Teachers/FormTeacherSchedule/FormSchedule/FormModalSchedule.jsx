import React, { useState, useEffect, useCallback, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { selectById } from '../../../../store/teachers'
import { stateStatus } from "../../../../store/storeStatus"
import { getAllGenders } from "../../../../store/genders"
import icons from "../../../../services/iconService"

import TextButton from "../../../../basic-components/TextButton/TextButton"
import ButtonIcon from "../../../../basic-components/ButtonIcon/ButtonIcon"
import '../../../../styles/Form.css'
import '../../../../styles/Modal.css'
import { getData, postData } from "../../../../services/axios"
import SelectDays from "../../../SelectDays/SelectDays"
import SelectStartHour from "../../../SelectHours/SelectStartHour"
import SelectEndHour from "../../../SelectHours/SelectEndHour"
import Select from "react-select"



const FormModalSchedule = ({ id, confirm, insert, cancel }) => {
    const dispatch = useDispatch()
    const teacher = useSelector(state => state.Teachers.teacher)
    const teacherStatus = useSelector(state => state.Teachers.status)
    const [genders, setGenders] = useState([])
    const [pools, setPools] = useState([])
    const [days, setDays] = useState([])
    const [selectedPool, setSelectedPool] = useState()
    const [selectedGender, setSelectedGender] = useState()
    const [selectedDays, setSelectedDays] = useState()
    const [selectedStartHour, setSelectedStartHour] = useState()
    const [selectedEndHour, setSelectedEndHour] = useState()

    const daysRef = useRef()

    useEffect(() => {
        async function getTeachersData(id) {
            const levels = await getData(`/teachers/teacherlevels/${id}`)
            const pools = await getData(`/teachers/teacherpools/${id}`)
            const genders = await getData(`/teachers/teachergenders/${id}`)
            setPools(pools.map(({ poolId }) => poolId))
            setGenders(genders)
        }
        if (teacherStatus === stateStatus.EMPTY && id > 0) {
            dispatch(selectById(id))
            getTeachersData(id)
        }
    }, [dispatch, teacherStatus, id]);

    const confirmForm = async () => {
        // const response = await getData(`teacher_schedule/findTeacherScheduleToSpecificTeacher/${teacher.teacherName}`)
        // (response, 'rerererere');
        // no work
        // if(res.data.length>0)
        if (insert) {
            const data = {
                TeacherPoolGenderId: selectedGender.id,
                startHour: selectedStartHour,
                endHour: selectedEndHour,
                PooldayScheduleId: selectedDays.id
            }
            const res = await postData('teacher_schedule/insertTeacherSchedule', data)
        }
        else {
            const data = {
                TeacherPoolGenderId: selectedGender.id,
                startHour: selectedStartHour,
                endHour: selectedEndHour,
                PooldayScheduleId: selectedDays.id
            }
            const res = await postData('teacher_schedule/updateTeacherSchedule', data)
        }
        confirm()
    }

    // const getTeachersData = async (id) => {
    //     const levels = await getData(`/teachers/teacherlevels/${id}`)
    //     const pools = await getData(`/teachers/teacherpools/${id}`)
    //     const genders = await getData(`/teachers/teachergenders/${id}`)
    // }

    useEffect(() => {
        async function getTeachersData(id) {
            const levels = await getData(`/teachers/teacherlevels/${id}`)
            const pools = await getData(`/teachers/teacherpools/${id}`)
            const genders = await getData(`/teachers/teachergenders/${id}`)
            setPools(pools.map(({ poolId }) => poolId))
            setGenders(genders)
        }
        if (id !== 0) {
            dispatch(selectById(id))
            getTeachersData(id)
        }
    }, [dispatch, id])

    const selectGender = (value) => {
        const gender = genders.find(g => g.id === value.value)
        setSelectedGender(gender)
        getDays(gender.id)
    }

    const selectPool = async (value) => {
        const pool = pools.find(p => p.id === value.value)
        setSelectedPool(pool)
    }

    const selectDay = (value) => {
        const day = days.find(d => d.id === value.value)
        setSelectedDays(day)
    }

    const selectStartHour = (value) => {
        setSelectedStartHour(new Date(value.value))
    }

    const selectEndHour = (value) => {
        setSelectedEndHour(new Date(value.value))
    }

    const getDays = async (genId) => {
        const data = { condition: { swimmingPoolId: selectedPool.id, genderId: genId } }
        const res = await postData('schedules/findGenderDaysByPools', data)
        if (res.data.length === 0) {
            daysRef.current.innerHTML = "לא נמצאו ימים מתאימים"
        }
        else {
            res.data.sort((a, b) => a.day - b.day)
            setDays(res.data)
            // setSelectedDays()
        }
    }

    return <>

        <div className="modal" >
            <div className="form-wrapper container">
                <div className="lefticon">
                    <ButtonIcon title="סגור" func={() => cancel()} imgName={icons.CLOSE} btnStyle={{ imgwidth: "20px", imgheight: "20px", height: "40px", width: "40px" }}></ButtonIcon>
                </div>
                <h2>
                    {insert ? <span>הוספת מערכת</span> : <span>עדכון מערכת</span>}
                    <span> עבור {teacher.teacherName}</span>
                </h2>


                <div className="form">
                    <div >
                        {pools.length > 0 ?
                            <>
                                <div className="input-group" >
                                    <label>בריכה</label>
                                    <Select placeholder="בחר..." options={pools.map(p => ({ label: p.name, value: p.id }))} onChange={selectPool}></Select>
                                </div>
                            </>
                            : <p>עדכן בריכה למטפל {teacher.teacherName}</p>}
                    </div>
                    {selectedPool ?
                        genders.length > 0 ? <>
                            <div className="input-group" >
                                <label>קבוצה</label>
                                <Select placeholder="בחר..." options={genders.map(g => ({ label: g.genderId.name, value: g.id }))} onChange={selectGender}></Select>
                            </div></> : <p>עדכן קבוצה למטפל {teacher.teacherName}</p>
                        : <></>
                    }
                    {days.length > 0 ?
                        <div className="input-group">
                            <label>יום</label>
                            <SelectDays days={days} onSelect={selectDay}></SelectDays>
                        </div>
                        : <p ref={daysRef}></p>
                    }
                    {
                        selectedDays ? <>
                            <SelectStartHour day={selectedDays} onSelect={selectStartHour}></SelectStartHour>
                        </> : ""
                    }
                    {
                        selectedStartHour ? <>
                                <SelectEndHour day={selectedDays} startHour={selectedStartHour} onSelect={selectEndHour}></SelectEndHour>
                        </> : ""
                    }
                    <div className="button-row">
                        <TextButton text="אישור" bgColor="purple" func={confirmForm}></TextButton>
                        <TextButton text="ביטול" bgColor="purple" click={cancel}></TextButton>
                    </div>
                </div>
            </div>
        </div>
    </>


}

export default FormModalSchedule

