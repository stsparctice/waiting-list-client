import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { getData, postData } from "../../services/axios";
import Icon from '../../basic-components/Icon/Icon'
import { useNavigate } from "react-router-dom";
import genderType from "../../models/genderType";
import Insert from "../patients/Insert/Insert";
import ColorLabel from "../../basic-components/ColorLabel/ColorLabel";
import { useSelector, useDispatch } from 'react-redux'
import { stateStatus } from "../../store/storeStatus";
import { getPatientById } from '../../store/patients'
import icons from "../../services/iconService";
import { logDOM } from "@testing-library/react";
import { server } from "../../services/axios";
import Sexs from "./Sexs";

const useStyles = createUseStyles({
    wrapper: {
        backgroundColor: "rgb(235, 235, 235)",
    },
    patientDetails: {
        direction: 'rtl',
        paddingBottom: '30px',
        display: "flex",
    },
    group: {
        display: "flex",
        marginTop: "5px",
        marginBottom: "5px",
        marginRight: "100px"
    },
    details: {

    },
    span: {
        fontWeight: 'bold'
    },
    headerDetails: {
        width: '100%',
        height: '70px',
        backgroundColor: 'rgb(100, 171, 255)',
    },
    header: {
        textAlign: "center",
        margin: 0,
        padding: '20px'
    },
    close: {
        position: 'absolute',
        top: '20px',
        left: '5px'
    },
    square: {
        direction: 'rtl',
        position: 'absolute',
        right: '20px',
        top: '15px',
        display: 'flex',
    },
    gender: {
        backgroundColor: 'rgb(0, 128, 0)',
        textAline: 'center',
        color: 'white',
        height: '50px',
        widows: '100px ',
        pedding: '10px',
        marginLeft: '500px'
    }
});

const ClientDetails = () => {
    const dispatch = useDispatch()
    const patient = useSelector(state => state.Patients.selectedPatient)
    const patientsStatus = useSelector(state => state.Patients.status)
    const css = useStyles();
    const nav = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState('');
    const [genderTypes, setGenderTypes] = useState([]);
    const [gender, setGender] = useState()

    useEffect(() => {

        console.log("i am here!!!!!!!!!!!!!!");
        if (patientsStatus === stateStatus.EMPTY)
            dispatch(getPatientById(id))

        // const findData = async () => {
        //     const ans = await getData('/rapidMed/find', { id: id })
        //     console.log('ans', ans);
        //     setGenderTypes(genderType(ans.sex, parseInt(new Date().getFullYear()) - parseInt(new Date(ans.birthdate).getFullYear())))
        //     setData(ans)
        // }
        // findData()
        sex()
    }, [dispatch, patientsStatus]);

    const closePatientCard = useCallback(() => {
        nav('/patients')
    }, [],)

    const sex = async () => {
        let age = parseInt(new Date().getFullYear()) - parseInt(new Date(patient.birthdate).getFullYear())
        let response = await server.get(`/gender/getGender/${patient.sex}`)
        let genders = response.data.filter((a) => a.maxAge1 > age || a.maxAge2 > age)
        setGender(genders)
    }

    return <>
        {patient ?
            < div className={css.wrapper}>

                <div className={css.headerDetails}>
                    <div className={css.square}>

                        {genderTypes.map((g, i) => <ColorLabel key={i} backgroundColor={'blue'} gender={g}></ColorLabel>)}
                        <div >
                            {/* {gender ? <div className={css.gender}>{gender[0].name}</div> : <></>} */}
                            {gender ? <Sexs genderName={gender[0].name}></Sexs> : <></>}
                        </div>
                    </div>
                    {/* {patient['name']} {patient['familyName']} */}
                    <h2 className={css.header}>כרטיס ממתין - <span> {patient.name} {patient.familyName} </span></h2>

                    <div className={css.close}>
                        <Icon className={css.div} imgName={'close'} func={closePatientCard}></Icon>
                    </div>
                </div>
                <div className={css.patientDetails}>
                    <div className={css.group}>
                        {/* <Icon imgName={'user'}></Icon> */}
                        <img src={icons.USER} />
                        <div className={css.details}>
                            {/* --{patient['id']} */}
                            <p className={css.id}>{patient.id}</p>

                            {/* <p className={css.dateOfBirth}>{new Date(patient.birthdate).toLocaleDateString()}</p> */}
                            {/* --{patient['birthdate']} */}
                            {new Date(patient.birthdate) != 'Invalid Date' ?
                                <p className={css.dateOfBirth}>{new Date(patient.birthdate).toLocaleDateString()}</p> : <p className={css.dateOfBirth}>{data.Birthdate}</p>
                            }
                            {
                                new Date(patient.birthdate) != 'Invalid Date' ?
                                    <p className={css.age}>{parseInt(new Date().getFullYear()) - parseInt(new Date(patient.birthdate).getFullYear())}</p> : ''
                            }
                        </div>
                    </div>
                    <div className={css.group}>
                        {/* <Icon imgName={'telephone'}></Icon> */}
                        <img src={icons.PHONE} />
                        <div className={css.details}>
                            <p className={css.phone1}>{patient.phone}</p>
                            <p className={css.phone2}>{patient.cellPhone}</p>
                            <p className={css.phone3}>{patient.workPhone}</p>
                        </div>
                    </div>
                    <div className={css.group}>
                        {/* <Icon imgName={'stethoscope'}></Icon> */}
                        <img src={icons.STETHOSCOPE} />
                        <div className={css.details}>
                            <p><span className={css.span}>מחירון: </span><span>{patient.priceList}</span></p>
                            <p><span className={css.span}>הערה: </span><span>{patient.comments}</span></p>
                            <p><span className={css.span}>מידע רפואי: </span><span>{data.medProb}</span></p>
                        </div>
                    </div>
                </div>
                <Insert id={id}></Insert>
            </div > : <></>
        }
    </>
}

export default ClientDetails