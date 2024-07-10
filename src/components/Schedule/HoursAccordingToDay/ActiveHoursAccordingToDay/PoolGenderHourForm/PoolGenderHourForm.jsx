import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createUseStyles } from "react-jss";
import '../../../../../styles/Form.css'
import '../../../../../styles/Modal.css'

import ButtonIcon from "../../../../../basic-components/ButtonIcon/ButtonIcon";
import TextButton from "../../../../../basic-components/TextButton/TextButton";
import icons from "../../../../../services/iconService"
import SelectGender from "../../../../SelectGender/SelectGender";
import Select from "react-select";

import { addSchedule, updateSchedule, deleteSchedule } from "../../../../../store/schedule";
import { getTimesList } from "../../../../../services/dateAndTime";
import { checkAvailableHours, checkHoursDiff } from "../../../../../services/validations/scheduleValidation";

const useStyles = createUseStyles({
    lefticon: {
        float: "left"
    }

})

const poolGenderHourActions = {
    FULLDATA: 'fullData',
    STARTHOUR: 'startHour',
    ENDHOUR: 'endHour',
    GENDER: 'gender'
}


const poolGenderHour = (state, item) => {
    const { action, value } = item
    const { day, data, error } = state
    let obj = {}
    switch (action) {
        case poolGenderHourActions.STARTHOUR:
            obj = { ...data, startHour: value }
            state = { day, data: obj, error }
            break
        case poolGenderHourActions.ENDHOUR:
            obj = { ...data, endHour: value }
            state = { day, data: obj, error }
            break
        case poolGenderHourActions.GENDER:
            obj = { ...data, genderId: value }
            state = { day, data: obj, error }
            break
        case poolGenderHourActions.FULLDATA:
            obj = { ...value }
            state = { day, data: obj, error }
            break
        default:
            break
    }

    if (state.data.startHour && state.data.endHour) {
        let diff = checkHoursDiff(state.data.startHour, state.data.endHour)
        if (!diff) {
            state = { ...state, error: 'זמן סיום צריך להיות אחרי זמן התחלה' }
        }
        else {
            state = { ...state, error: undefined }
        }
        try {
            checkAvailableHours({ day, start: state.data.startHour, end: state.data.endHour, id: state.data.id })
        }
        catch (validationError) {
            state = { ...state, error: validationError }
        }
    }

    return state
}


const PoolGenderHourForm = ({ insert, confirm, cancel, day, selectedSchedule }) => {
    const css = useStyles();
    const dispatch = useDispatch()
    const pool = useSelector(state => state.Schedule.selectedPool)
    const [object, setObject] = useReducer(poolGenderHour, { day, data: { startHour: undefined, endHour: undefined, genderId: undefined }, error: 'undefined' })
    const [startHours, setStartHours] = useState([]);
    const [endHours, setEndHours] = useState([]);
    useEffect(() => {
        const starthours = getTimesList()
        setStartHours(starthours.map((h) => ({ label: h.toString(), value: h })))
        if (insert) {
        }
        else {
            let end = selectedSchedule.endHour.clone()
            const hours = getTimesList(end.addMinutes(-30))
            setEndHours(hours.map(h => ({ label: h.toString(), value: h })))
            setObject({ action: poolGenderHourActions.FULLDATA, value: selectedSchedule })
        }
    }, [insert, selectedSchedule])

    const selectStart = (value) => {
        setObject({ action: poolGenderHourActions.STARTHOUR, value: value.value })
        const hours = getTimesList(value.value.clone())
        setEndHours(hours.map(h => ({ label: h.toString(), value: h })))
    }

    const selectEnd = (value) => {
        setObject({ action: poolGenderHourActions.ENDHOUR, value: value.value })
    }

    const selectGroup = (value) => {
        setObject({ action: poolGenderHourActions.GENDER, value: value.value })
    }

    const deleteForm = () => {
        console.log({ object });
        const { data } = object
        try {
            dispatch(deleteSchedule(data))
        }
        catch (error) {
            console.log({ error })
        }
    }


    const confirmForm = () => {
        console.log({ object });
        if (object.error)
            return

        if (object.data.startHour && object.data.endHour && object.data.genderId) {
            const data = {
                swimmingPoolId: pool.id,
                day: day.day.number,
                genderId: object.data.genderId,
                startHour: object.data.startHour.toString(),
                endHour: object.data.endHour.toString()
            }
            try {
                if (object.data.id) {
                    data.id = object.data.id
                    dispatch(updateSchedule(data))
                }
                else {
                    dispatch(addSchedule(data))
                }
                cancel()
            }
            catch (error) {

            }
        }
    }


    return <>
        <div className="modal" >
            <div className="form-wrapper container">

                <div className={css.lefticon}>
                    <ButtonIcon title="סגור" func={cancel} imgName={icons.CLOSE} btnStyle={{ imgwidth: "20px", imgheight: "20px", height: "40px", width: "40px" }}></ButtonIcon>
                </div>
                <h2>

                    <span>יום {day.day.name}</span>
                </h2>

                <div className="form">

                    <div className="input-row">
                        <label className={css.label}>משעה:</label>
                        <div className="input-group" >
                            {console.log(object)}
                            <Select placeholder="בחר..." options={startHours} value={object.data.startHour ? startHours.find(sh =>
                                sh.label === object.data.startHour.toString()) : undefined} onChange={selectStart}></Select>
                        </div>
                    </div>
                    <div className="input-row">
                        <label className={css.label}> עד השעה: </label>
                        <div className="input-group" >
                            <Select placeholder="בחר..." options={endHours} value={object.data.endHour ? endHours.find(eh =>
                                eh.label === object.data.endHour.toString()) : undefined} onChange={selectEnd}></Select>
                        </div>
                    </div>

                    <div className="input-row">
                        <label className={css.label}>קבוצה: </label>
                        <div className="input-group" >
                            <SelectGender onSelect={selectGroup} value={object.data.genderId} />
                        </div>
                    </div>

                    <div style={{ color: 'red' }}>
                        {object.error ? object.error.message : ''}
                    </div>

                    <div className="button-row">
                        <TextButton text="אישור" func={confirmForm}></TextButton>
                        {insert ? '' : <TextButton text="מחיקה" func={deleteForm}></TextButton>}
                        <TextButton text="ביטול" func={cancel}></TextButton>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default PoolGenderHourForm;