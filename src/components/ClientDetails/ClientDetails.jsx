import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { postData } from "../../services/axios";
import Icon from '../../basic-components/Icon/Icon'
import { useNavigate } from "react-router-dom";
import SmallSquare from '../../basic-components/SmallSquare/SmallSquare'
import genderType from "../../models/genderType";
import Insert from "../Patients/Insert/Insert";

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
    }
});

const ClientDetails = () => {
    const css = useStyles();
    const nav = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState('');
    const [genderTypes, setGenderTypes] = useState([]);
    useEffect(() => {
        const findData = async () => {
            const ans = await postData('/rapidMed/find', { id: id })
            console.log('ans', ans);
            setGenderTypes(genderType(ans.Sex, parseInt(new Date().getFullYear()) - parseInt(new Date(ans.Birthdate).getFullYear())))
            setData(ans)
        }
        findData()
    }, [])

    const closePatientCard = useCallback(() => {
        nav('/patients')
    }, [],)

    return <>
        <div className={css.wrapper}>
            <div className={css.headerDetails}>
                <div className={css.square}>
                    {genderTypes.map(g => <SmallSquare key={g} backgroundColor={'blue'} gender={g}></SmallSquare>)}
                </div>
                <h2 className={css.header}>כרטיס ממתין - <span>{data.Name} {data['Family Name']}</span></h2>
                <div className={css.mainGender}></div>
                <div className={css.close}>
                    <Icon className={css.div} imgName={'close'} func={closePatientCard}></Icon>
                </div>
            </div>
            <div className={css.patientDetails}>
                <div className={css.group}>
                    <Icon imgName={'user'}></Icon>
                    <div className={css.details}>
                        <p className={css.id}>{data.ID}</p>
                        {
                            new Date(data.Birthdate) != 'Invalid Date' ?
                                <p className={css.dateOfBirth}>{new Date(data.Birthdate).toLocaleDateString()}</p> : <p className={css.dateOfBirth}>{data.Birthdate}</p>
                        }
                        {
                            new Date(data.Birthdate) != 'Invalid Date' ?
                                <p className={css.age}>{parseInt(new Date().getFullYear()) - parseInt(new Date(data.Birthdate).getFullYear())}</p> : ''
                        }
                    </div>
                </div>
                <div className={css.group}>
                    <Icon imgName={'telephone'}></Icon>
                    <div className={css.details}>
                        <p className={css.phone1}>{data.Phone}</p>
                        <p className={css.phone2}>{data['Cell Phone']}</p>
                        <p className={css.phone3}>{data['Work Phone']}</p>
                    </div>
                </div>
                <div className={css.group}>
                    <Icon imgName={'stethoscope'}></Icon>
                    <div className={css.details}>
                        <p><span className={css.span}>מחירון: </span><span>{data.priceList}</span></p>
                        <p><span className={css.span}>הערה: </span><span>{data.Comments}</span></p>
                        <p><span className={css.span}>מידע רפואי: </span><span>{data.medProb}</span></p>
                    </div>
                </div>
            </div>
            <Insert id={id}></Insert>
        </div>
    </>
}

export default ClientDetails