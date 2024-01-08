import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { stateStatus } from "../../../store/storeStatus";
import { getAllLevels } from "../../../store/levels";
import { getAllGenders } from "../../../store/genders";
import { getAllPools } from "../../../store/swimmingPools";

import { createUseStyles } from "react-jss";
import { server } from '../../../services/axios';
import Select from "../../../components2/selectTeachers/select/Select";
import Checkbox from "../../../components2/Checkbox/Checkbox";
import Remarks from "../../../components2/Remarks/Remarks";
import { listType } from "../../../basic-components/CheckboxList/ListContext"
import CheckBoxList from "../../../basic-components/CheckboxList/CheckBoxList";
import { information, importent } from "../../../services/data"

const useStyles = createUseStyles({
    form: {
        direction: 'rtl'
    },
    button: {
        color: 'white',
        backgroundColor: 'black',
        padding: "5px",
        alignItems: "center"
    }
})
// const evaluate = () => {
// }

const Insert = ({ idPatient, gender ,patientName,medDate}) => {
    // const Remarks=useContext(RemarksContext)
    const css = useStyles();
    const dispatch = useDispatch()
    const levels = useSelector(state => state.Levels.levels)
    const levelStatus = useSelector(state => state.Levels.status)
    const swimmingPools = useSelector(state => state.SwimmingPools.pools)
    const swimmingPoolsStatus = useSelector(state => state.SwimmingPools.status)
    const checkedGendersAndPools = useCallback(() => { })
    const sendRemarks = useCallback((remarksArray) => { setRemarks(remarksArray) })
    const [id, setId] = useState(idPatient);
    const [name, setName] = useState(patientName);
    const [medicalDocsDate, setMedicalDocsDate] = useState(medDate);
    // const [embededDate, setEmbededDate] = useState(new Date().toISOString());
    const [genders, setGenders] = useState(gender);
    // const [evaluated, setEvaluated] = useReducer(evaluate, '');
    const [evaluationDate, setEvaluationDate] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [days, setDays] = useState([]);
    const [remarks, setRemarks] = useState([]);
    const [user, setUser] = useState('');

    const [checkedPools, setCheckedPools] = useState([]);
    const [checkedLevels, setCheckedLevels] = useState([]);
    const [checkedTreatment, setCheckedTreatment] = useState([]);
    const [checkedEvaluation, setCheckedEvaluation] = useState([]);

    const noteref = useRef()

    useEffect(() => {
        if (levelStatus === stateStatus.EMPTY)
            dispatch(getAllLevels())
    }, [dispatch, levelStatus]);

    useEffect(() => {
        if (swimmingPoolsStatus === stateStatus.EMPTY)
            dispatch(getAllPools())
    }, [dispatch, swimmingPoolsStatus]);


    useEffect(() => {
        // const getDataFromSerevr = async () => {
        //     await Promise.all([findGenders, findPools, findTeachers].map(func => func()))
        // }
        const findTeachers = async () => {
            const ans = await server.get('/teachers/findTeacher')
            console.log('ans', ans);
            const teachers = ans.data.map(m => ({ checked: false, text: m.name }))
            setTeachers([...teachers])
        }
        // getDataFromSerevr()
    }, [])
    
    const insert = async () => {
        // if (gen.length > 0 && pool.length > 0 && treatLevel.length > 0 && treatpref.length > 0) {
        // if (!id || !name) {
        //     noteref.current.innerHTML = "אחד או יותר מהפרטים המבוקשים חסר"
        // }
        // else {
            // noteref.current.innerHTML = `הפרטים שהכנסת: ${id}, ${name}`
            // okref.current.display = 'block'
            // }
            // }
            console.log(genders,'cp'); 
        const data = {
            id, name, medicalDocsDate,
            genders: genders.map((item) => ({ genderId: item.id })),
            treatmentLevel: checkedLevels.map(({ item }) => ({ levelId: item.id })),
            treatmentPreference: checkedTreatment.map(({ item }) => ({ treatmentId: item.id })),
            evaluated:checkedEvaluation.map(({item})=>({evaluated:item.id})),
            evaluationDate,
            swimmingPools: checkedPools.map(({ item }) => ({ poolId: item.id })),
            teachers, days, remarks, user
        }
        console.log({data});
        const response = await server.post('/patients/insertPatient', data);
        console.log(response);
    }


    const del = () => {

    }

    const setPools = (pools) => {
        setCheckedPools(pools)
    }
    const setLevels = (levels) => {
        setCheckedLevels(levels)
    }
    const setTreatment = (treatment) => {
        setCheckedTreatment(treatment)
    }
    const setInformation = (information) => {
        setCheckedEvaluation(information)
    }
    // console.log(value, 'value.......')

    return <>
        <form className={css.form}>
            {
            /* 
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
            <p>בריכות:</p>
            {
                swimmingPools.length > 0 ? <>
                    <CheckBoxList type={listType.MULTIPLE} list={swimmingPools} set={setPools}></CheckBoxList>
                </> : ""
            }
            <p>רמת הטיפול:</p>
            {
                <CheckBoxList type={listType.MULTIPLE} list={levels} set={setLevels}></CheckBoxList>

            }
            <p>רמת דחיפות:</p>
            {
                <CheckBoxList type={listType.SINGLE} list={importent} set={setTreatment}></CheckBoxList>

            }
            {
                <CheckBoxList type={listType.SINGLE} list={information} set={setInformation}></CheckBoxList>
            }


            {/* <p>
                <label >מורים:</label>
                <input type="text" onInput={(e) => setTeachers(e.target.value)} />
            </p> */}
            {/* <Select genders={genders} pools={swimmingPools}></Select> */}
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
            <h4 ref={noteref}>{ }</h4>
            <p>
                <input type="button" onClick={insert} value="שמירה" className={css.button} />
                <input type="button" onClick={del} value="מחיקה" className={css.button} />
            </p>
        </form>

    </>
};

export default Insert;
