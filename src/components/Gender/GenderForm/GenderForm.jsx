import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";

import { useDispatch, useSelector } from 'react-redux'
import { addGender, selectById, updateGender } from '../../../store/genders'
import '../../../styles/Form.css'
import '../../../styles/Modal.css'

import FormButton from '../../../basic-components/FormButton/FormButton'
import ButtonIcon from "../../../basic-components/ButtonIcon/ButtonIcon";
import icons from "../../../services/iconService";
const useStyles = createUseStyles({
    hide: {
        display: 'none'
    },
    lefticon: {
        float: "left"
    }
});

const GenderForm = ({ insert, id, confirm, cancel }) => {
    const css = useStyles();
    const dispatch = useDispatch()
    const selectedGender = useSelector(state => state.Genders.gender)
    const [name, setName] = useState('');
    const [sex1, setSex1] = useState(0);
    const [sex2, setSex2] = useState(0);
    const [mmaxAge, setmmaxAge] = useState('');
    const [fmaxAge, setfmaxAge] = useState('');
    const [genderColor, setGenderColor] = useState('#000000');

    useEffect(() => {
        dispatch(selectById(id))
    }, [dispatch, id])

    useEffect(() => {
        console.log({ selectedGender })
        if (id !== 0) {
            setName(selectedGender.name)
            setfmaxAge(selectedGender.maxAge2)
            setmmaxAge(selectedGender.maxAge1)
            setGenderColor(selectedGender.color)
            setSex1(selectedGender.sex1)
            setSex2(selectedGender.sex2)
        }

    }, [id, selectedGender])

    const confirmForm = () => {
        if (insert) {
            const data = {
                name, sex1, sex2,
                maxAge1: mmaxAge,
                maxAge2: fmaxAge,
                color: genderColor
            }
            dispatch(addGender(data))
        }
        else {
            const data = {
                ...selectedGender,
                name, sex1, sex2,
                maxAge1: mmaxAge,
                maxAge2: fmaxAge,
                color: genderColor
            }
            dispatch(updateGender(data))
        }
        confirm()
    }

    function female() {
        setSex2(2)
    }
    const noFemale = () => {
        setSex2(0)
        setfmaxAge('')
    }
    function male() {
        setSex1(1)
    }
    function noMale() {
        setSex1(0)
        setmmaxAge('')
    }
    return <>
        <div className="modal">
            <div className="form-wrapper container">
                <div className={css.lefticon}>
                    <ButtonIcon title="סגור" func={() => cancel()} imgName={icons.CLOSE} height="40px" width="40px" imageSize={{ height: "20px", width: "20px" }}></ButtonIcon>
                </div>
                <h2>
                    {insert ? <span>קבוצה חדשה</span> : <span>עדכון קבוצה</span>}
                </h2>
                <div className="form">
                    <p className="input-row">
                        <label>שם קבוצה: </label>
                        <input type="text" value={name} onInput={(e) => setName(e.target.value)}></input>
                    </p>
                    <p className="input-row">
                        <label>צבע הקבוצה:</label>
                        <input type="color" value={genderColor} onInput={(e) => setGenderColor(e.target.value)}></input>
                    </p>
                    <div>
                        <p style={{ textAlign: 'right' }}>מין: </p>
                        <p className="input-row">
                            <span>
                                <input type="checkbox" name="gender" id="cbxmale" checked={sex1 === 1 ? true : false} value="1"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            male()
                                        else
                                            noMale()
                                    }}></input>
                                <label htmlFor="cbxmale">זכר</label>
                            </span>
                            <span className={sex1 === 0 ? css.hide : ''} >
                                <label>גיל מקסימלי בנים: </label>
                                <input type="number" min={0} max={120} value={mmaxAge} onInput={(e) => setmmaxAge(e.target.value)}></input>
                            </span>
                        </p>
                        <p className="input-row">
                            <span>
                                <input type="checkbox" name="gender" id="cbxfemale" checked={sex2 === 2 ? true : false} value="2" onChange={(e) => {
                                    if (e.target.checked)
                                        female()
                                    else
                                        noFemale()
                                }}></input>
                                <label htmlFor="cbxfemale">נקבה</label>
                            </span>
                            <span className={sex2 === 0 ? css.hide : ''} >
                                <label>גיל מקסימלי בנות: </label>
                                <input type="number" min={0} max={120} value={fmaxAge} onInput={(e) => setfmaxAge(e.target.value)}></input>
                            </span>
                        </p>
                    </div>


                    <div className="button-row">
                        <FormButton text="אישור" func={confirmForm}></FormButton>
                        <FormButton text="ביטול" func={cancel}></FormButton>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default GenderForm