import React, { useEffect, useReducer, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import Table from "../../../components2/Table/Table";
import { server } from "../../../services/axios";

const useStyles = createUseStyles({
    read: {
        direction: 'rtl'
    },
    filter: {

        listStyleType: "none",
        display: 'flex',
        justifyContent: ""
    }
})

const Read = () => {

    const getAll = async () => {
        const response = await server.get(`/patient/getAllWaitingPatient/${len}/${indexWating}`)
        setIndexWating(indexWating + len)
        if (response.data.length === 0) {
            ansref.current.innerHTML = "לא נמצאו  נתונים קיימים במערכת"
        }
        else {
            setAns([])
            await prepareToTable(response.data)
            console.log(ans);
        }
    }

    useEffect(() => {
        const getDataFromSerevr = async () => {
            await Promise.all([getAll].map(func => func()))
        }

        getDataFromSerevr()
        document.querySelector('#all').checked = true
    }, [])

    const css = useStyles()
    // const [name, setName] = useState('');
    // const [featureName, setFeatureName] = useState('');
    const [indexWating, setIndexWating] = useState(1)
    const [indexOrder, setIndexOrder] = useState(1)
    const [indexEmbeded, setIndexEmbeded] = useState(1)
    const [indexDeleted, setIndexDeleted] = useState(1)
    const [len, setLen] = useState(100)

    const [ans, setAns] = useState([])
    const [urgentLen, setUrgentLen] = useState()

    const ansref = useRef()
    const numberWaitingRef = useRef()

    const sendToMongo = async (featureName, name) => {
        console.log(name, featureName);
        ansref.current.innerHTML = ""
        // if (name === '' || featureName === '') {
        //     ansref.current.innerHTML = "אחד מן הפרטים חסר";
        //     return
        // }
        let response = await server.get(`/patient/findPatientesByFeature/${featureName}/${name}`)
        console.log(response);
        if (response.data.length === 0) {
            ansref.current.innerHTML = "לא נמצאו  נתונים קיימים במערכת"
        }
        else {
            setAns([])
            prepareToTable(response.data)
            console.log(response.data);
            console.log(ans, 'ans');
        }
    }

    const getAllOrderByPreference = async () => {
        const response = await server.get(`/patient/getAllWaitingPatientOrderedByPreference/${len}/${indexOrder}`)
        setIndexOrder(indexOrder + len)
        if (response.data.length === 0) {
            ansref.current.innerHTML = "לא נמצאו  נתונים קיימים במערכת"
        }
        else {
            setAns([])
            prepareToTable(response.data)
            // console.log(response.data);
        }
    }

    const getAllEmbeded = async () => {
        const response = await server.get(`/patient/getAllDeletedOrEmbededPatient/embeded/${len}/${indexEmbeded}`)
        setIndexEmbeded(indexEmbeded + len)
        if (response.data.length === 0) {
            ansref.current.innerHTML = "לא נמצאו  נתונים קיימים במערכת"
        }
        else {
            setAns([])
            prepareToTable(response.data)
            // console.log(response.data);
        }
    }

    const getAllDeleted = async () => {
        const response = await server.get(`/patient/getAllDeletedOrEmbededPatient/deleted/${len}/${indexDeleted}`)
        setIndexDeleted(indexDeleted + len)
        if (response.data.length === 0) {
            ansref.current.innerHTML = "לא נמצאו  נתונים קיימים במערכת"
        }
        else {
            setAns([])
            prepareToTable(response.data)
            // console.log(response.data);
        }
    }

    const prepareToTable = (arr) => {
        setAns([])
        if (arr.length > 0) {
            const a = arr.map(p => (
                {
                    "קבוצה": { type: 'gender', visible: true, value: p.selectedGenders },
                    "שם": { type: 'readonly', visible: true, value: p.name },
                    "תעודת זהות": { type: 'readonly', visible: true, value: p.id, fontWeight: "bold" },
                    "": { type: "icon", nameIcon: "exclamationMark", value: "", visible: true },
                    "רמת דחיפות": { type: 'readonly', visible: true, value: p.treatmentPreference },
                    "רמת טיפול": { type: 'readonly', visible: true, value: p.treatmentLevel },
                    "אבחון": { type: 'icon', visible: true, value: p.evaluated, nameIcon: 'vi' },
                    // "": { type: 'readonly', visible: true, value: p.treatmentPreference },
                    // "": { type: 'readonly', visible: true, value: p.treatmentPreference },
                }
            ))
            console.log(a, 'arr');
            setAns(a)
            let index = arr.findIndex(p => p.treatmentPreference !== "גבוהה")
            setUrgentLen(index < 0 ? arr.length : index)
            console.log(ans,'anssss');
        }
    }

    const filterData = async (ev) => {
        if (ev.target.id === 'all') {
            await getAll()
        }
        else {
            await sendToMongo(ev.target.parentNode.id, ev.target.id)
        }
    }

    return <>
        <div className={css.read}>
            {/* <h1>read</h1> */}
            {/* <p>
                <button onClick={getAll}>כל הממתינים</button>
            </p> */}
            {/* <p>
                <button onClick={getAllOrderByPreference}>כל הממתינים ממוינים לפי רמת דחיפות</button>
            </p>
            <p>
                <button onClick={getAllEmbeded}>כל הלקוחות המשובצים</button>
            </p>
            <p>
                <button onClick={getAllDeleted}>כל הלקוחות המחוקים</button>
            </p> */}
            <div className={css.filter} >
                <label>סנן לפי: </label>
                <div id="allPatients">
                    <input name="all" id="all" value={'הכל'} type="checkbox" onClick={filterData} />
                    <label >הכל</label>
                </div>
                <div id="selectedGenders">
                    <input name="men" id="גברים" value={'גברים'} type="checkbox" onClick={filterData} />
                    <label >גברים</label>
                    <input name="women" id="נשים" value={'נשים'} type="checkbox" onClick={filterData} />
                    <label >נשים</label>
                    <input name="boys" id="בנים" value={'בנים'} type="checkbox" onClick={filterData} />
                    <label >בנים</label>
                </div>
                <div id="evaluated">
                    <input name="evaluated" id="true" value={'אבחון'} type="checkbox" onClick={filterData} />
                    <label>אבחון</label>
                    <input name="nonEvaluation" id="false" value={'ללא אבחון'} type="checkbox" onClick={filterData} />
                    <label >ללא אבחון</label>
                </div>
                <div id="treatmentPreference">
                    <input name="urgent" id="גבוהה" value={'דחופים'} type="checkbox" onClick={filterData} />
                    <label >דחופים</label>
                </div>
                {/* <select name="featureName" id="" onChange={(e) => setFeatureName(e.target.value)}> */}

                {/* </select> */}
            </div>
            {/* <label>הכנס מאפיין:</label>
                <input type="text" onInput={(e) => setFeatureName(e.target.value)}></input> 
             <p>
                <label>הכנס שם:</label>
                <input type="text" onInput={(e) => setName(e.target.value)}></input>
            </p>
            <button onClick={sendToMongo}>אישור</button> */}
            <p ref={ansref}></p>
            {
                ans.length > 0 ?
                    <><Table All={ans}></Table>
                    </> : ""
            }
            <p>סה"כ: <span>{ans.length}</span> ממתינים, מתוכם: <span>{urgentLen}</span> דחופים.</p>
        </div>
    </>
}

export default Read;
