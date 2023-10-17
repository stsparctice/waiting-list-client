import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Checkbox from "../../../components2/Checkbox/Checkbox";
import { createUseStyles } from "react-jss";
import { server } from '../../../services/axios';
import Days from "../../../components2/Days/Days";
import Select from "../../../components2/selectTeachers/select/Select";
import Remarks from "../../../components2/Remarks/Remarks";
import RemarksContext from "../../../contexts/remarks";
import { listType } from "../../../basic-components/CheckboxList/ListContext"
import CheckBoxList from "../../../basic-components/CheckboxList/CheckBoxList";
import { information, levels, importent } from "../../../services/data"

const useStyles = createUseStyles({
    form: {
        direction: 'rtl'
    },
    ok: {
        margin: '7px',
        display: 'none'
    },
    button: {
        color: 'white',
        backgroundColor: 'black',
        padding: "5px",
        alignItems: "center"
    }
})
const evaluate = () => {
}

const Insert = (idPatient) => {
    // const Remarks=useContext(RemarksContext)

    const css = useStyles();
    const checkedGendersAndPools = useCallback(() => { })
    const sendRemarks = useCallback((remarksArray) => { setRemarks(remarksArray) })
    const [id, setId] = useState(idPatient);
    const [name, setName] = useState();
    const [medicalDocsDate, setMedicalDocsDate] = useState();
    const [embededDate, setEmbededDate] = useState(new Date().toISOString());
    const [genders, setGenders] = useState([]);
    const [treatmentLevel, setTreatmentLevel] = useState([{ text: "גבוהה", color: "rgb(255, 0, 0)" }
        , { text: "בינונית", color: "rgb(255, 165, 0)" }
        , { text: "נמוכה", color: "rgb(103, 165, 11)" }]);
    const [treatmentPreference, setTreatmentPreference] = useState([{ text: "גבוהה", color: 'rgb(255, 0, 0)', checked: false },
    { text: "בינונית", color: 'rgb(255, 165, 0)', checked: false },
    { text: "נמוכה", color: 'rgb(0, 128, 0)', checked: false },
    { text: "ללא מידע רפואי", color: 'rgb(0, 0, 255)', checked: false }]);
    const [evaluated, setEvaluated] = useReducer(evaluate, '');
    const [evaluationDate, setEvaluationDate] = useState('');
    const [swimmingPools, setSwimmingPools] = useState([]);
    const [teachers, setTeachers] = useState();
    const [days, setDays] = useState();
    const [remarks, setRemarks] = useState();
    const [user, setUser] = useState();

    const [checkedGenders, setCheckedGenders] = useState([]);
    const [checkedPools, setCheckedPools] = useState([]);

    const [newPatient, setnewPatient] = useState({});

    const noteref = useRef()
    const okref = useRef()
    const [value, setValue] = useState('')

    const checkedGendersFunc = async () => {
        setCheckedGenders(genders.filter(f => (f.checked)).map(m => (m.text)))
    }

    const checkedPoolsFunc = async () => {
        setCheckedPools(swimmingPools.filter(p => (p.checked)).map(m => (m.text)))
    }

    useEffect(() => {
        // const getDataFromSerevr = async () => {
        //     await Promise.all([findGenders, findPools, findTeachers].map(func => func()))
        // }
        // const findGenders = async () => {
        //     const res = await server.post('/gender/find', { project: { _id: 0, name: 1, genderColor: 1 } })
        //     let genders = res.data.map(m => ({ color: m.genderColor, checked: false, text: m.name }))

        //     setGenders([...genders])
        // }
        const findPools = async () => {
            const ans = await server.post('/pool/find', { filter: {}, project: { _id: 0, poolName: 1, poolColor: 1 } })
            console.log('ans ', ans);
            const pools = ans.data.map(m => ({ color: m.poolColor, checked: false, text: m.poolName }))
            setSwimmingPools([...pools])
        }
        const findTeachers = async () => {
            const ans = await server.get('/teachers/findTeacher')
            console.log('ans', ans);
            const teachers = ans.data.map(m => ({ checked: false, text: m.name }))
            setTeachers([...teachers])
        }
        // getDataFromSerevr()
    }, [])

    const insert = async () => {
        console.log(newPatient);
        const response = await server.post('/patient/insertPatient', newPatient);
        console.log(response);
    };

    const ok = async () => {
        okref.current = 'block'

        // if (!id || !name) {
        //     noteref.current.innerHTML = "אחד או יותר מהפרטים המבוקשים חסר"
        // }
        // else {
        const gen = genders.filter(f => (f.checked)).map(m => (m.text))
        const pool = swimmingPools.filter(p => (p.checked)).map(m => (m.text))
        const treatLevel = treatmentLevel.filter(f => (f.checked)).map(m => (m.text))
        const treatpref = treatmentPreference.filter(f => (f.checked)).map(m => (m.text))

        // if (gen.length > 0 && pool.length > 0 && treatLevel.length > 0 && treatpref.length > 0) {
        setnewPatient({
            id, name, medicalDocsDate, genders: gen, treatmentLevel: treatLevel, treatmentPreference: treatpref,
            evaluated, evaluationDate, swimmingPools: pool, teachers, days, remarks, user
        })
        // evaluated, evaluationDate,
        noteref.current.innerHTML = `הפרטים שהכנסת: ${id}, ${name}`
        okref.current.display = 'block'
        // }
        // else {
        // noteref.current.innerHTML = "אחד או יותר מהפרטים המבוקשים חסר"
        // }
        // }
    }

    const sendToDb = () => {

    }

    const del = () => {

    }
    console.log(value, 'value.......')

    return <>
        <form className={css.form}>
            {/* 
            <p>
                <label >תאריך הגשת מסמכים:</label>
                <input type="date" onInput={(e) => setMedicalDocsDate(e.target.value)} />
            </p> */}
            <p>
                <label >תאריך רישום: </label>
                <label>{new Date().toLocaleDateString()}</label>
            </p>
            {
                // genders.length > 0 ? <>
                //     <Checkbox title="בחר קבוצה:" type="checkbox" arr={genders} ></Checkbox>
                // </> : ""
            }

            {
                swimmingPools.length > 0 ? <>
                    <Checkbox title="בריכות:" type="checkbox" arr={swimmingPools}></Checkbox>
                </> : ""
            }
            <p>רמת הטיפול:</p>
            {
                <CheckBoxList type={listType.MULTIPLE} list={levels} set={(event) => setValue(event, 'treatmentLevel')}></CheckBoxList>
          
           }
            <p>רמת דחיפות:</p>
            {
                <CheckBoxList type={listType.SINGLE} list={importent} set={(event) => setValue(event, 'treatmentLevel')}></CheckBoxList>
         
            }
            {
                <CheckBoxList type={listType.SINGLE} list={information} set={(event) => setValue(event, 'treatmentLevel')}></CheckBoxList>
            }


            {/* <p>
                <label >מורים:</label>
                <input type="text" onInput={(e) => setTeachers(e.target.value)} />
            </p> */}
            <Select genders={genders} pools={swimmingPools}></Select>
            <p>
                {/* <label >ימים:</label>
                <input type="text" onInput={(e) => setDays(e.target.value)} /> */}
                {/* {checkedGendersFunc(),checkedPoolsFunc()} */}
                {
                    // checkedGenders.length > 0 && checkedPools.length > 0 ? <>
                    // <Days poolArray={swimmingPools} genderArray={genders}></Days>
                    // </> : ""
                }
            </p>
            <Remarks id={idPatient} sendRemarks={sendRemarks}></Remarks>
            <p>
                <label >משתמש:</label>
                <input type="text" onInput={(e) => setUser(e.target.value)} />
            </p>
            <p>
                <input type="button" onClick={ok} value="שמירה" className={css.button} />
                <input type="button" onClick={del} value="מחיקה" className={css.button} />
                {/* disabled={true} */}
                <input type="button" onClick={insert} value="אישור" className={css.ok} ref={okref} />
            </p>
            <h4 ref={noteref}>{ }</h4>
        </form>
       
    </>
};

export default Insert;
