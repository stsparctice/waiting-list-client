import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedPool, getAllSchedules } from '../../../../store/schedule'
import { addTeacher, selectById, updateTeacher } from '../../../../store/teachers'
import { stateStatus } from "../../../../store/storeStatus"
import { getAllPools } from "../../../../store/swimmingPools"
import { getAllGenders } from "../../../../store/genders"
import { getAllLevels } from "../../../../store/levels";
import icons from "../../../../services/iconService"

import CheckBoxList from "../../../../basic-components/CheckboxList/CheckBoxList"
import { listType } from "../../../../basic-components/CheckboxList/ListContext"
import StandartInput from "../../../../basic-components/StandartInput/StandartInput"
import TextButton from "../../../../basic-components/TextButton/TextButton"
import ButtonIcon from "../../../../basic-components/ButtonIcon/ButtonIcon"
import '../../../../styles/Form.css'
import '../../../../styles/Modal.css'
import { getData, postData, server } from "../../../../services/axios"
import SelectSwimmingPool from "../../../SelectSwimmingPool/SelectSwimmingPool"
import SelectGender from "../../../SelectGender/SelectGender"
import SelectDays from "../../../SelectDays/SelectDays"



const FormModalSchedule = ({ id, confirm, insert, cancel }) => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const teacher = useSelector(state => state.Teachers.teacher)
    const teacherStatus = useSelector(state => state.Teachers.status)
    const genders = useSelector(state => state.Genders.genders)
    const genderStatus = useSelector(state => state.Genders.status)
    const pools = useSelector(state => state.SwimmingPools.pools)
    const poolsStatus = useSelector(state => state.SwimmingPools.status)
    const [val, setVal] = useState({ teacherName: "", email: "", phone: "", annotation: "", city: "", address: "" })
    const [genderList, setGenderList] = useState([])
    const [selectedGender, setSelectedGender] = useState()
    const [selectedPools, setSelectedPools] = useState([])
    const selectedPool = useSelector(state => state.Schedule.selectedPool)
    const [days, setDays] = useState([])
    const [selectedDays, setSelectedDays] = useState()
    const [poolFlag, setPoolFlag] = useState(false)

    useEffect(() => {
        async function getTeachersData(id) {
            const levels = await getData(`/teachers/teacherlevels/${id}`)
            const pools = await getData(`/teachers/teacherpools/${id}`)
            const genders = await getData(`/teachers/teachergenders/${id}`)
            console.log({ levels, pools, genders });
        }
        if (teacherStatus === stateStatus.EMPTY && id>0){
            dispatch(selectById(id))
            getTeachersData(id)
        }
    }, [dispatch, teacherStatus, id]);

    const confirmForm = async () => {
        if (insert) {
            const data = {
                id, name: teacher.name,
                TeacherPoolGenderId: selectedGender.id,
                startHour: selectedDays.startHour,
                endHour: selectedDays.endHour,
                PooldayScheduleId: selectedDays.id
            }
            const res = await postData('teacher_schedule/insertTeacherSchedule', data)
            console.log({ res });
        }
        else {
            const data = {
                id, name: teacher.name,
                TeacherPoolGenderId: selectedGender.map(({ item }) => ({ genderId: item.id })),
                startHour: selectedDays.map(({ item }) => ({ startHour: item.startHour })),
                endHour: selectedDays.map(({ item }) => ({ endHour: item.endHour })),
                PooldayScheduleId: selectedDays.map((item) => ({ PooldayScheduleId: item.id }))
            }
            console.log({ data })
            const res = await postData('teacher_schedule/updateTeacherSchedule', data)
            console.log({ res });
        }
        confirm()
    }

    // const getTeachersData = async (id) => {
    //     const levels = await getData(`/teachers/teacherlevels/${id}`)
    //     const pools = await getData(`/teachers/teacherpools/${id}`)
    //     const genders = await getData(`/teachers/teachergenders/${id}`)
    //     console.log({ levels, pools, genders });
    // }

    useEffect(() => {
        async function getTeachersData(id) {
            const levels = await getData(`/teachers/teacherlevels/${id}`)
            const pools = await getData(`/teachers/teacherpools/${id}`)
            const genders = await getData(`/teachers/teachergenders/${id}`)
            console.log({ levels, pools, genders });
        }
        console.log({id});
        if (id !== 0) {
            dispatch(selectById(id))
            getTeachersData(id)
        }
    }, [dispatch, id])

    useEffect(() => {
        if (poolsStatus === stateStatus.EMPTY)
            dispatch(getAllPools())
        if (genderStatus === stateStatus.EMPTY)
            dispatch(getAllGenders())
    }, [poolsStatus, genderStatus, dispatch])

    useEffect(() => {
        console.log({ genders })
        const option1 = genders.filter(({ teacherGender }) => teacherGender === 1).map(({ id, name, color }) => ({ id, text: name, color, option: 1, type: listType.MULTIPLE }))
        const option2 = genders.filter(({ teacherGender }) => teacherGender === 2).map(({ id, name, color }) => ({ id, text: name, color, option: 2, type: listType.MULTIPLE }))
        console.log({ option1, option2 })
        setGenderList([...option1, ...option2])
    }, [genders])

    useEffect(() => {
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

    const selectGender = (value) => {
        const gender = genders.find(g => g.id === value.value)
        setSelectedGender(gender)
        getDays(gender.id)
    }

    const selectPool = (value) => {
        setPoolFlag(true)
        const pool = pools.find(p => p.id === value.value)
        dispatch(setSelectedPool(pool))
        // dispatch(getAllSchedules(pool.id))
    }

    const selectDay = (value) => {
        const day = days.find(d => d.id === value.value)
        setSelectedDays(day)
    }

    const getDays = async (genId) => {
        const condition = { swimmingPoolId: selectPool.id, genderId: genId }
        const res = await postData('schedules/findGenderDaysByPools', condition)
        res.data.sort((a, b) => a.day - b.day)
        setDays(res.data)
        // setSelectedDays()
        console.log(res.data, 'res');
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
                        <div className="input-group" >
                            <label>בריכה</label>
                            <SelectSwimmingPool onSelect={selectPool} />
                        </div>
                    </div>
                    {poolFlag ?
                        // selectedPool.id ?
                        <div className="input-group" >
                            <label>קבוצה</label>
                            <SelectGender onSelect={selectGender} />
                        </div>
                        : <></>
                    }
                    {days.length > 0 ?
                        <div className="input-group">
                            <label>יום</label>
                            <SelectDays days={days} onSelect={selectDay}></SelectDays>
                        </div>
                        : (console.log({ days }))
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

