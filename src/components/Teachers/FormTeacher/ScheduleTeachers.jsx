import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { addTeacher, findDays, selectById, updateTeacher } from '../../../store/teachers'
import { stateStatus } from "../../../store/storeStatus"
import icons from "../../../services/iconService"
import StandartInput from "../../../basic-components/StandartInput/StandartInput"
import TextButton from "../../../basic-components/TextButton/TextButton"
import ButtonIcon from "../../../basic-components/ButtonIcon/ButtonIcon"
import '../../../styles/Form.css'
import '../../../styles/Modal.css'
import { server } from "../../../services/axios"
import Select from "react-select";



const ScheduleTeachers = ({ id, confirm, insert, cancel }) => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const teacher = useSelector(state => state.Teachers.teacher)
    const [val, setVal] = useState({ teacherName: "", email: "", phone: "", annotation: "", city: "", address: "" })
    const [week, setweek] = useState(['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'])
    const [day, setDay] = ('')
    const [selectDays, setSelectDays] = ('')
    const days = useSelector(state => state.Teachers.setSchdule)
    const daysStatus = useSelector(state => state.Teachers.status)
    // getDaysFromData()
    const confirmForm = () => {
        if (insert) {

            const data = {
                ...val,
            }
            dispatch(addTeacher(data))
        }
        else {
            const data = {
                ...teacher,
                ...val,
            }
            console.log({ data })
            dispatch(updateTeacher(data))
        }
        confirm()
    }

    useEffect(() => {

        if (id !== 0) {
            dispatch(selectById(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        // getDaysFromData()
        console.log({ teacher })
        if (id !== 0) {
            setVal({ ...teacher })
        }
        else {
            console.log('new')
        }

    }, [id, teacher])


    const setValue = (event, arg) => {
        let temp = {}
        temp[arg] = event.target.value
        setVal(prev => ({ ...prev, ...temp }))
    };


    useEffect(() => {
        console.log('hello');
        if (teacher) {
            dispatch(findDays({ id: teacher.id }))
            getDaysFromData()
        }
    }, [dispatch, teacher])

    const getDaysFromData = async () => {
        console.log('i am here');
        // const ans = await server.post(`/teachers/findGendersAndDaysByTeachers/`, { id: teacher.id })
        console.log({ days });
        // let dayWeek = days.data.map(d => d.day)
        // console.log(dayWeek,'dayWeek');
        // dayWeek.map((d, i) => days[i] = { id: d, name: week[d - 1] })
        // setDay(dayWeek)
        // console.log(day,'dayyyyyyyyyyyyyy');
    }

    return <>

        <div className="modal" >
            <div className="form-wrapper container">
                <div className="lefticon">
                    <ButtonIcon title="סגור" func={() => cancel()} imgName={icons.CLOSE} btnStyle={{ imgwidth: "20px", imgheight: "20px", height: "40px", width: "40px" }}></ButtonIcon>
                </div>

                <div className="form">
                    <h4>{val.teacherName}</h4>
                    {/* {getDaysFromData()} */}
                    {console.log({ day })}
                    {/* <Select placeholder="בחר..." options={day.map(p => ({ label: p.name, value: p.id }))} onChange={selectDays}></Select> */}
                    <div className="button-row">
                        <TextButton text="אישור" bgColor="purple" func={confirmForm}></TextButton>
                        <TextButton text="ביטול" bgColor="purple" click={cancel}></TextButton>
                    </div>
                </div>
            </div>
        </div>
    </>


}

export default ScheduleTeachers

