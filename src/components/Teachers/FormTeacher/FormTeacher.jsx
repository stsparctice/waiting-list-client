import React, { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addTeacher, selectById, updateTeacher } from '../../../store/teachers'
import Checkbox from "../../../small-components/Checkbox/Checkbox"
import StandartInput from "../../../basic-components/StandartInput/StandartInput"
import TextButton from "../../../basic-components/TextButton/TextButton"
import ButtonIcon from "../../../basic-components/ButtonIcon/ButtonIcon"
import { useNavigate } from "react-router-dom"
import { levels } from "../../../services/data"
import '../../../styles/Form.css'
import '../../../styles/Modal.css'
import icons from "../../../services/iconService"


const FormTeacher = ({ id, confirm, insert, cancel }) => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const teacher = useSelector(state => state.Teachers.teacher)
    const [val, setVal] = useState({ name: "", email: "", phone: "", annotation: "", city: "", street: "", zip: "" })

    const confirmForm = () => {

        console.log({ val })
        if (insert) {
            const data = {
               val
            }
            dispatch(addTeacher(data))
        }
        else {
            const data = {
                ...teacher,
               ...val
            }
            dispatch(updateTeacher(data))
        }
        confirm()
    }

    // useEffect(() => {
    //     const level = async (arr) => {
    //         if (arr) {
    //             arr.forEach(e => {
    //                 let level = level.find(f => (f.text == e))
    //                 if (level)
    //                     level.checked = true
    //                 setLevelArr([...levelArr])
    //             });
    //         }
    //     }
    //     const gender = async (arr) => {
    //         if (arr) {
    //             arr.forEach(e => {
    //                 let genders = genderArr.find(f => (f.text == e))
    //                 if (genders)
    //                     genders.checked = true
    //             });
    //         }
    //         SetGenderArr([...genderArr])
    //     }
    //     const pool = async (arr) => {
    //         if (arr) {
    //             arr.forEach(e => {
    //                 let pool = poolArr.find(f => (f.text == e))
    //                 if (pool)
    //                     pool.checked = true

    //             });
    //         }
    //         SetPoolArr([...poolArr])
    //     }
    //     const setValue = async (obj) => {

    //         setVal({ name: obj.name, email: obj.email, phone: obj.phone, annotation: obj.annotation, city: obj.address.city, street: obj.address.street, zip: obj.address.zip })


    //     }

    //     const getDataFromSerevr = async () => {
    //         await Promise.all([findGender, findPool].map(func => func()))
    //     }

    //     const findGender = async () => {
    //         const res = await server.post('/gender/find', { project: { _id: 0, name: 1, genderColor: 1 } })
    //         let genders = res.data.map(m => ({ color: m.genderColor, checked: false, text: m.name, isradio: false }))
    //         let g = genders.find(f => (f.text == "גברים"))
    //         if (g)
    //             g.isradio = true
    //         SetGenderArr([...genders])
    //         if (type == "update") {
    //             if (obj.name) {
    //                 gender(obj.genders)
    //             }
    //         }
    //     }
    //     const findPool = async () => {
    //         const ans = await server.post('/pool/find', { project: { _id: 0, poolName: 1, poolColor: 1 } })
    //         const pools = ans.data.map(m => ({ color: m.poolColor, checked: false, text: m.poolName }))
    //         SetPoolArr([...pools])
    //         if (type == "update") {
    //             if (obj.name) {
    //                 pool(obj.pools)
    //             }
    //         }
    //     }

    //     getDataFromSerevr()
    //     if (type == "update") {
    //         if (obj.name) {
    //             level(obj.levels)
    //             setValue(obj)
    //         }

    //     }
    // }, [obj])


   
    // const toDdelete = useCallback(async () => {
    //     if (type == "update") {
    //         const ans = await server.post('/datamanager/teachers/deleteTeacher', { name: obj.name })
    //         console.log(ans.data);
    //     }
    // }, [val]);

    // const schedule = useCallback(async () => {

    //     nav('/datamanager/teachers/sendToTeacherSchedule', { state: { name: obj.name } })




    // }, [val]);



    const setValue = (event, arg) => {
        console.log(event.target.value)
        let temp = {}
        temp[arg] = event.target.value
        console.log({temp})
        setVal(prev => ({ ...prev, ...temp }))

    };

    // const sendVal = () => {
    //     return { levels: levels.filter(f => (f.checked === true)).map(m => (m = m.text)), pools: poolArr.filter(f => (f.checked == true)).map(m => (m = m.text)), genders: genderArr.filter(f => (f.checked == true)).map(m => (m = m.text)), name: val.name, address: { city: val.city, street: val.street, zip: val.zip }, email: val.email, annotation: val.annotation, phone: val.phone }
    // };


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
                    <StandartInput text="שם המטפל"   type="text" value={val.name} set={(event)=>setValue(event, 'name')}></StandartInput>
                    <StandartInput text="טלפון"  type="text" value={val.phone} set={(event)=>setValue(event, 'phone')}></StandartInput>
                    <StandartInput text="אימייל"  type="email" value={val.email} set={(event)=>setValue(event, 'email')}></StandartInput>
                    <StandartInput text="כתובת"  type="text" value={val.street} set={(event)=>setValue(event, 'street')}></StandartInput>
                    <StandartInput text="עיר"  type="text" value={val.city} set={(event)=>setValue(event, 'city')}></StandartInput>
                    <StandartInput text="מיקוד"  type="text" value={val.zip} set={(event)=>setValue(event, 'zip')}></StandartInput>
                    <StandartInput text="הערה"  type="text" value={val.annotation} set={(event)=>setValue(event, 'annotation')}></StandartInput>

                    <div className="button-row">
                        <TextButton text="אישור"   bgColor="purple" click={confirmForm}></TextButton>

                        <TextButton text="ביטול"   bgColor="purple" click={cancel}></TextButton>

                        {/* <TextButton text="שעות עבודה" styles={[{ height: 30, width: 120 }]} bgColor="purple"  ></TextButton> */}
                    </div>
                </div>
            </div>
        </div>
    </>


}

export default FormTeacher

