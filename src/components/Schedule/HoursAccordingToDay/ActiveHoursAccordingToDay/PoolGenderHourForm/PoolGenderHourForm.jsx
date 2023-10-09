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

import { addSchedule } from "../../../../../store/schedule";
import { getTimesList } from "../../../../../services/dateAndTime";
import { checkAvailableHours, checkHoursDiff } from "../../../../../services/validations/scheduleValidation";

const useStyles = createUseStyles({
    lefticon: {
        float: "left"
    }

})

const poolGenderHourActions = {
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
            obj = { ...data, gender: value }
            state = { day, data: obj, error }
            break
        default:
            break
    }

    if (state.data.startHour && state.data.endHour) {
        let diff = checkHoursDiff(state.data.startHour.value, state.data.endHour.value)
        if (!diff) {
            state = { ...state, error: 'זמן סיום צריך להיות אחרי זמן התחלה' }
        }
        else {
            state = { ...state, error: undefined }
        }
        try {
            checkAvailableHours(day, state.data.startHour.value, state.data.endHour.value)
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
    const [object, setObject] = useReducer(poolGenderHour, { day, data: { startHour: undefined, endHour: undefined, gender: undefined }, error: 'undefined' })
    const [startHours, setStartHours] = useState([]);
    const [endHours, setEndHours] = useState([]);
console.log({day})
console.log({selectedSchedule})
    useEffect(() => {
        const starthours = getTimesList()
        setStartHours(starthours.map((h, i) => ({ label: `${h.getHours().toString().padStart(2, '0')}:${h.getMinutes().toString().padStart(2, '0')}`, value: h })))
        if(!insert){
            console.log('update')
            setObject({ action: poolGenderHourActions.STARTHOUR,value: selectedSchedule.startHour })
           // const endhours = getTimesList(day,object.startHour.value )
            // setEndHours(endhours.map(h => ({ label: `${h.getHours().toString().padStart(2, '0')}:${h.getMinutes().toString().padStart(2, '0')}`, value: h })))
        }
    }, [insert, selectedSchedule])

    const selectStart = (value) => {
console.log({value})
        setObject({ action: poolGenderHourActions.STARTHOUR, value })
        const hours = getTimesList(day, value.value)
        setEndHours(hours.map(h => ({ label: `${h.getHours().toString().padStart(2, '0')}:${h.getMinutes().toString().padStart(2, '0')}`, value: h })))
    }

    const selectEnd = (value) => {
        setObject({ action: poolGenderHourActions.ENDHOUR, value })
    }

    const selectGroup = (value) => {
        setObject({ action: poolGenderHourActions.GENDER, value })
    }


    const confirmForm = () => {
        if (object.error)
            return
        if (object.data.startHour && object.data.endHour && object.data.gender) {
            const data = {
                swimmingPoolId: pool.id,
                day: day.day.number,
                genderId: object.data.gender.value,
                startHour: object.data.startHour.value.toISOString(),
                endHour: object.data.endHour.value.toISOString()
            }
            try {
                dispatch(addSchedule(data))
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
                            <Select placeholder="בחר..."   options={startHours} onChange={selectStart}></Select>
                        </div>
                    </div>
                    <div className="input-row">
                        <label className={css.label}> עד השעה: </label>
                        <div className="input-group" >
                            <Select placeholder="בחר..." options={endHours} onChange={selectEnd}></Select>
                        </div>
                    </div>

                    <div className="input-row">
                        <label className={css.label}>קבוצה: </label>
                        <div className="input-group" >
                            <SelectGender onSelect={selectGroup} />
                        </div>
                    </div>

                    <div>
                        {object.error ? object.error.message : ''}
                    </div>

                    <div className="button-row">
                        <TextButton text="אישור" func={confirmForm}></TextButton>
                        <TextButton text="ביטול" func={cancel}></TextButton>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default PoolGenderHourForm;