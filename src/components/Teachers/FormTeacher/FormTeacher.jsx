import React, { useState, useEffect, useCallback } from "react"
import { server } from "../../../services/axios"
import Checkbox from "../../../small-components/Checkbox/Checkbox"
import StandartInput from "../../../small-components/StandartInput/StandartInput"
import Text from "../../../small-components/ButtonText/ButtonText"
import { useNavigate } from "react-router-dom"

const FormTeacher = ({ obj, type }) => {
    const nav = useNavigate()
    const [sqlVal, setSqlVal] = useState([])
    const [style, setStyle] = useState([{ height: 18, width: 120 }])
    const [val, setVal] = useState({ name: "", email: "", phone: "", annotation: "", city: "", street: "", zip: "" })
    const [poolArr, SetPoolArr] = useState([])
    const [genderArr, SetGenderArr] = useState([])
    const [levelArr, setLevelArr] = useState([{ text: "גבוהה", color: "rgb(255, 0, 0)" }
        , { text: "בינונית", color: "rgb(255, 165, 0)" }
        , { text: "נמוכה", color: "rgb(103, 165, 11)" }])

    useEffect(() => {
        const level = async (arr) => {
            if (arr) {
                arr.forEach(e => {
                    let level = levelArr.find(f => (f.text == e))
                    if (level)
                        level.checked = true
                    setLevelArr([...levelArr])
                });
            }
        }
        const gender = async (arr) => {
            if (arr) {
                arr.forEach(e => {
                    let genders = genderArr.find(f => (f.text == e))
                    if (genders)
                        genders.checked = true
                });
            }
            SetGenderArr([...genderArr])
        }
        const pool = async (arr) => {
            if (arr) {
                arr.forEach(e => {
                    let pool = poolArr.find(f => (f.text == e))
                    if (pool)
                        pool.checked = true

                });
            }
            SetPoolArr([...poolArr])
        }
        const setValue = async (obj) => {

            setVal({ name: obj.name, email: obj.email, phone: obj.phone, annotation: obj.annotation, city: obj.address.city, street: obj.address.street, zip: obj.address.zip })


        }

        const getDataFromSerevr = async () => {
            await Promise.all([findGender, findPool].map(func => func()))
        }

        const findGender = async () => {
            const res = await server.post('/gender/find', { project: { _id: 0, name: 1, genderColor: 1 } })
            let genders = res.data.map(m => ({ color: m.genderColor, checked: false, text: m.name, isradio: false }))
            let g = genders.find(f => (f.text == "גברים"))
            if (g)
                g.isradio = true
            SetGenderArr([...genders])
            if (type == "update") {
                if (obj.name) {
                    gender(obj.genders)
                }
            }
        }
        const findPool = async () => {
            const ans = await server.post('/pool/find', { project: { _id: 0, poolName: 1, poolColor: 1 } })
            const pools = ans.data.map(m => ({ color: m.poolColor, checked: false, text: m.poolName }))
            SetPoolArr([...pools])
            if (type == "update") {
                if (obj.name) {
                    pool(obj.pools)
                }
            }
        }

        getDataFromSerevr()
        if (type == "update") {
            if (obj.name) {
                level(obj.levels)
                setValue(obj)
            }

        }
    }, [obj])


    const send = useCallback(async () => {
        //valid 
        if (type == "insert") {
            const res = await server.post('/teachers/insertTeacher', await sendVal())
            console.log(res.data);
            if (res.data) {
                console.log("נכנס בהצלחה");
            }
        }
        else {

            let values = await sendVal()
            obj.genders.forEach(e => {
                console.log(e, "revghjkl");
                let temp = values.genders.filter(f => (f == e))
                console.log(temp, "temp");
                if (temp.length == 0)
                    setSqlVal([...sqlVal, e])
            });
            const res = await server.post('/datamanager/teachers/updateTeacher', { name: obj.name, update: values })
            if (res.data) {
                console.log("update!!");
            }

        }
    }, [val]);

    const toDdelete = useCallback(async () => {
        if (type == "update") {
            const ans = await server.post('/datamanager/teachers/deleteTeacher', { name: obj.name })
            console.log(ans.data);
        }
    }, [val]);

    const schedule = useCallback(async () => {

        nav('/datamanager/teachers/sendToTeacherSchedule', { state: { name: obj.name } })




    }, [val]);


    const setValue = useCallback(async (event) => {
        let temp = {}
        temp[event.target.id] = event.target.value
        setVal({ ...val, ...temp })

    }, [val]);

    const sendVal = (async () => {
        return { levels: levelArr.filter(f => (f.checked == true)).map(m => (m = m.text)), pools: poolArr.filter(f => (f.checked == true)).map(m => (m = m.text)), genders: genderArr.filter(f => (f.checked == true)).map(m => (m = m.text)), name: val.name, address: { city: val.city, street: val.street, zip: val.zip }, email: val.email, annotation: val.annotation, phone: val.phone }
    });


    return <>
        {
            type == "update" && obj.name && genderArr && poolArr || type == "insert" && genderArr.length > 0 && poolArr.length > 0 ?
                <>

                    <Checkbox title="רמת טיפול" type="checkbox" arr={levelArr} ></Checkbox>

                    <Checkbox title="ברכות" type="checkbox" arr={poolArr}></Checkbox>

                    <Checkbox title="קבוצות טיפול" type="radioBox" arr={genderArr}></Checkbox>

                </>
                : ""
        }

        <StandartInput text="שם המטפל " styles={style} type="name" value={val.name} set={setValue}></StandartInput>

        <StandartInput text="אימייל" styles={style} type="email" value={val.email} set={setValue}></StandartInput>

        <StandartInput text="הערה" styles={style} type="annotation" value={val.annotation} set={setValue}></StandartInput>

        <StandartInput text="טלפון" styles={style} type="phone" value={val.phone} set={setValue}></StandartInput>

        <StandartInput text="עיר" styles={style} type="city" value={val.city} set={setValue}></StandartInput>

        <StandartInput text="רחוב" styles={style} type="street" value={val.street} set={setValue}></StandartInput>

        <StandartInput text="מיקוד" styles={style} type="zip" value={val.zip} set={setValue}></StandartInput>

        <Text text="שמירה" styles={[{ height: 30, width: 120 }]} click={send}></Text>

        <Text text="מחיקה" styles={[{ height: 30, width: 120 }]} click={toDdelete}></Text>

        <Text text="שעות עבודה" styles={[{ height: 30, width: 120 }]} click={schedule}></Text>
        <hr />
    </>

}

export default FormTeacher

