import React, { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { addTeacher, selectById, updateTeacher } from '../../../store/teachers'
import { stateStatus } from "../../../store/storeStatus"
import { getAllPools } from "../../../store/swimmingPools"
import { getAllGenders } from "../../../store/genders"
import { getAllLevels } from "../../../store/levels";
import icons from "../../../services/iconService"

import CheckBoxList from "../../../basic-components/CheckboxList/CheckBoxList"
import { listType } from "../../../basic-components/CheckboxList/ListContext"
import StandartInput from "../../../basic-components/StandartInput/StandartInput"
import TextButton from "../../../basic-components/TextButton/TextButton"
import ButtonIcon from "../../../basic-components/ButtonIcon/ButtonIcon"
import '../../../styles/Form.css'
import '../../../styles/Modal.css'
import { getData } from "../../../services/axios"

const getTeachersGenders = () => [{ id: 1, text: 'מטפל', color: 'rgb(85,21,255)' }, { id: 2, text: 'מטפלת', color: 'rgb(255,87,132)' }]

const FormTeacher = ({ id, confirm, insert, cancel }) => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const teacher = useSelector(state => state.Teachers.teacher)
    const genders = useSelector(state => state.Genders.genders)
    const genderStatus = useSelector(state => state.Genders.status)
    const pools = useSelector(state => state.SwimmingPools.pools)
    const poolsStatus = useSelector(state => state.SwimmingPools.status)
    const levels = useSelector(state => state.Levels.levels)
    const levelStatus = useSelector(state => state.Levels.status)
    const [val, setVal] = useState({ teacherName: "", email: "", phone: "", annotation: "", city: "", address: "", gender: 0 })
    const [teacherGendersList, setTeschersGenderList] = useState(getTeachersGenders())
    const [poolList, setPoolList] = useState([])
    const [genderList, setGenderList] = useState([])
    const [levelsList, selLevelsList] = useState([])
    const [selectedLevels, setSelectedLevels] = useState([])
    const [selectedGenders, setSelectedGenders] = useState([])
    const [selectedPools, setSelectedPools] = useState([])

    useEffect(() => {
        if (levelStatus === stateStatus.EMPTY)
            dispatch(getAllLevels())
    }, [dispatch, levelStatus]);

    const confirmForm = () => {
        if (insert) {

            const data = {
                ...val,
                teachersLevels: selectedLevels.map(({ item }) => ({ levelId: item.id })),
                teachersGenders: selectedGenders.map(({ item }) => ({ genderId: item.id })),
                teachersPools: selectedPools.map(({ item }) => ({ poolId: item.id }))
            }
            dispatch(addTeacher(data))
        }
        else {
            const data = {
                ...teacher,
                ...val,
                teachersLevels: selectedLevels.map(({ item }) => ({ levelId: item.id })),
                teachersGenders: selectedGenders.map(({ item }) => ({ genderId: item.id })),
                teachersPools: selectedPools.map(({ item }) => ({ poolId: item.id }))
            }
            dispatch(updateTeacher(data))
        }
        confirm()
    }

    useEffect(() => {

        if (id !== 0) {
            dispatch(selectById(id))
            // getTeachersData(id)
        }
    }, [dispatch, id])

    useEffect(() => {
        if (poolsStatus === stateStatus.EMPTY)
            dispatch(getAllPools())
        if (genderStatus === stateStatus.EMPTY)
            dispatch(getAllGenders())
    }, [poolsStatus, genderStatus, dispatch])

    useEffect(() => {
        async function getTeachersData(id) {
            let teacherpools = await getData(`/teachers/teacherpools/${id}`)
            teacherpools = teacherpools.map(({ poolId }) => poolId)
            setPoolList(pools.map(({ id, name, color }) => ({ id, text: name, color, checked: teacherpools.find(tp => tp.id === id) ? true : false })))
        }
        if (id > 0) {
            getTeachersData(id)
        }
        else
            setPoolList(pools.map(({ id, name, color }) => ({ id, text: name, color, checked: false })))
    }, [pools, id])

    useEffect(() => {
        async function getTeachersData(id) {
            let teacherLevels = await getData(`/teachers/teacherlevels/${id}`)
            teacherLevels = teacherLevels.map(({ levelId }) => levelId)
            selLevelsList(levels.map(({ id, name, color }) => ({ id, text: name, color, checked: teacherLevels.find(tl => tl.id === id) ? true : false })))
        }
        if (id > 0) {
            getTeachersData(id)
        }
        else
            selLevelsList(levels.map(({ id, name, color }) => ({ id, text: name, color, checked: false })))
    }, [levels, id])

    useEffect(() => {
        async function getTeachersData(id, fullList) {
            let teacherGenders = await getData(`/teachers/teachergenders/${id}`)
            teacherGenders = teacherGenders.map(({ genderId }) => genderId)
            fullList = fullList.map((item) => ({ ...item, checked: teacherGenders.find(tg => tg.id === item.id) ? true : false }))
            setGenderList(fullList)
        }
        const option1 = genders.filter(({ teacherGender }) => teacherGender === 1).map(({ id, name, color, teacherGender }) => ({ id, text: name, color, option: 1, teacherGender, type: listType.MULTIPLE }))
        const option2 = genders.filter(({ teacherGender }) => teacherGender === 2).map(({ id, name, color, teacherGender }) => ({ id, text: name, color, option: 2, teacherGender, type: listType.MULTIPLE }))
        let fullList = [...option1, ...option2]
        fullList = fullList.map(item => ({ ...item, checked: false, disabled: true }))
        if (id > 0) {
            getTeachersData(id, fullList)
        }
        else {
            setGenderList(fullList)
        }
    }, [genders, id])

    useEffect(() => {
        if (id !== 0) {
            const teachersGenders = getTeachersGenders().map(tg => tg.id === teacher.gender ? ({ ...tg, checked: true }) : ({ ...tg }))
            setTeschersGenderList(teachersGenders)
            setVal({ ...teacher })
        }
        else {
            setTeschersGenderList(getTeachersGenders())
        }
    }, [id, teacher])


    const setValue = (event, arg) => {
        let temp = {}
        temp[arg] = event.target.value
        setVal(prev => ({ ...prev, ...temp }))
    };

    const selectTeachersGender = (gender) => {
        const selectedGender = gender[0].item.id
        genderList.forEach(item => {
            if (item.teacherGender === selectedGender) {
                item.disabled = false
            }
            else {
                item.checked = false
                item.disabled = true
            }
        })
        setGenderList([...genderList])
        setVal(prev => ({ ...prev, gender: gender[0].item.id }))
    }

    const selectLevel = (level) => {
        setSelectedLevels(level)
    }
    const selectGender = (selectedGenders) => {
        setSelectedGenders(selectedGenders)
    }
    const selectPool = (pools) => {
        setSelectedPools(pools)
    }

    return <>

        <div className="modal" >
            <div className="form-wrapper container">
                <div className="lefticon">
                    <ButtonIcon title="סגור" func={() => cancel()} imgName={icons.CLOSE} btnStyle={{ imgwidth: "20px", imgheight: "20px", height: "40px", width: "40px" }}></ButtonIcon>
                </div>
                <h2>
                    {insert ? <span>מטפל חדש</span> : <span>עדכון מטפל</span>}
                </h2>


                <div className="form">
                    <StandartInput text="שם המטפל" type="text" value={val.teacherName} set={(event) => setValue(event, 'teacherName')}></StandartInput>
                    <StandartInput text="טלפון" type="text" value={val.phone} set={(event) => setValue(event, 'phone')}></StandartInput>
                    <StandartInput text="אימייל" type="email" value={val.email} set={(event) => setValue(event, 'email')}></StandartInput>
                    <StandartInput text="כתובת" type="text" value={val.address} set={(event) => setValue(event, 'address')}></StandartInput>
                    <StandartInput text="עיר" type="text" value={val.city} set={(event) => setValue(event, 'city')}></StandartInput>
                    <StandartInput text="הערה" type="text" value={val.annotation} set={(event) => setValue(event, 'annotation')}></StandartInput>
                    <CheckBoxList type={listType.SINGLE} list={teacherGendersList} set={selectTeachersGender}></CheckBoxList>
                    <CheckBoxList header={'רמת טיפול'} type={listType.MULTIPLE} list={levelsList} set={selectLevel}></CheckBoxList>
                    <CheckBoxList header={'קבוצות'} type={listType.HYBRID} list={genderList} set={selectGender}></CheckBoxList>
                    <CheckBoxList header={'בריכות'} type={listType.MULTIPLE} list={poolList} set={selectPool}></CheckBoxList>
                    <div className="button-row">
                        <TextButton text="אישור" bgColor="purple" func={confirmForm}></TextButton>
                        <TextButton text="ביטול" bgColor="purple" click={cancel}></TextButton>
                    </div>
                </div>
            </div>
        </div>
    </>


}

export default FormTeacher

