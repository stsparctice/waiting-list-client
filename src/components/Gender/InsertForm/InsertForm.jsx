import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

import { useSelector, useDispatch } from 'react-redux'
import { addGender, selectById, updateGender } from '../../../store/genders'
import '../../../styles/Form.css'
import '../../../styles/Modal.css'

import FormButton from '../../../basic-components/FormButton/FormButton'
import ButtonIcon, { icons } from "../../../basic-components/ButtonIcon/ButtonIcon";

const useStyles = createUseStyles({
    hide: {
        display: 'none'
    },
    lefticon: {
        float: "left"
    }
});

const InsertForm = ({ insert, confirm, cancel }) => {
    const css = useStyles();
    const dispatch = useDispatch()
    const [name, setName] = useState();
    const [sex, setSex] = useState();
    const [mmaxAge, setmmaxAge] = useState();
    const [fmaxAge, setfmaxAge] = useState();
    const [genderColor, setGenderColor] = useState();

    const disMaxAgeMale = useRef();
    const disMaxAgeFemale = useRef();
    const confirmForm = () => {

        // console.log({ poolName, poolAddress, poolColor })
        if (insert) {
            const data = {
                name, sex, 
                maxAge1:mmaxAge,
                maxAge2:fmaxAge,
                color: genderColor
            }
            dispatch(addGender(data))
        }
        // else {
        //     const data = {
        //         ...onePool,
        //         name: poolName,
        //         address: poolAddress,
        //         color: poolColor
        //     }
        //     dispatch(updateSwimmingPool(data))

        confirm()
    }

    const female = () => {
        disMaxAgeFemale.current.classList.remove(css.hide)
    }
    const noFemale = () => {
        setfmaxAge('')
        disMaxAgeFemale.current.classList.add(css.hide)
    }
    function male() {
        disMaxAgeMale.current.classList.remove(css.hide);
    }
    function noMale() {
        setmmaxAge('')
        disMaxAgeMale.current.classList.add(css.hide);
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
                    <p>
                        <label>שם קבוצה: </label>
                        <input type="text" onInput={(e) => setName(e.target.value)}></input>
                    </p>
                    <p>
                        <label>צבע הקבוצה</label>
                        <input type="color" onInput={(e) => setGenderColor(e.target.value)}></input>
                    </p>
                    <p>
                        <label>מין: </label>
                        <input type="checkbox" name="gender" id="male" onInput={(e) => {
                            setSex(e.target.id);
                            (e.target.checked) ? male() : noMale()
                        }}></input>
                        <span>זכר</span>
                        <input type="checkbox" name="gender" id="female" onInput={(e) => {
                            setSex(e.target.id);
                            (e.target.checked) ? female() : noFemale()
                        }}></input>
                        <span>נקבה</span>
                    </p>
                    <p className={css.hide} ref={disMaxAgeMale}>
                        <label>גיל מקסימלי בנים: </label>
                        <input type="number" min={0} max={120} onInput={(e) => setmmaxAge(e.target.value)}></input>
                    </p>
                    <p className={css.hide} ref={disMaxAgeFemale}>
                        <label>גיל מקסימלי בנות: </label>
                        <input type="number" min={0} max={120} onInput={(e) => setfmaxAge(e.target.value)}></input>
                    </p>
                    <div className="button-row">
                        <FormButton text="אישור" func={confirmForm}></FormButton>
                        <FormButton text="ביטול" func={cancel}></FormButton>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default InsertForm