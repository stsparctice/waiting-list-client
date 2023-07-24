import React, { useEffect, useContext, useState, useRef, useReducer, useCallback } from "react";
import { getData, postData } from "../../services/axios";
import { createUseStyles } from "react-jss";
import BasicDetailsInRow from "./BasicDetailsInRow";
// import DetailsContext from "../../context/DetailsContext";
import Icon from "../Icon/Icon";
import Details from "../Details/Details";
import HoursDetailContext from '../../contexts/HoursDetails'

const useStyles = createUseStyles({
    wrapper: {
        direction: 'rtl',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid',
        borderRadius: '5px',
        alignItems: 'center',
    },
    basicDetailsInRow: {
        width: '50%'
    },
    details: {
        display: 'none',
        border: '1px solid black',
        borderRadius: '5px'
    },
    rowdeleted: {
        display: 'none'
    }
})

const RowOfHour = ({ day, stratHour, endHour, poolName, backgroundColor, funcDetails, funcDelete ,funcDeleHour,editDetails}) => {
    const {details}= useContext(HoursDetailContext)

    console.log('in RowOfHour');
    const [flagExclamationMarkBool, setFlagExclamationMarkBool] = useState(false)
    const css = useStyles();
    const [type, setType] = useState([])
    const divRef = useRef()
    useEffect(() => {
        const ifExclamationMarkBool = async () => {
            let d = await getActiveDetails()
            let j = 1
            let bool = false
            if(d!==undefined){
            if (d.length > 1) {
                for (let i in d) {
                    for (j in d) {
                        if (d[i].endActiveHour < d[j].startActiveHour) {
                            bool = true
                        }
                    }
                }

            }
            setFlagExclamationMarkBool(bool)}
            return bool
        }

        const getActiveDetails = async () => {
            let detail = await postData(`/schedule/getAllActiveHoursByDay?poolName=${poolName}&day=${day}`)
            return detail.activeHours
        }

        ifExclamationMarkBool();
    }, [])
    return <>
        <div className={css.wrapper} style={{ backgroundColor: backgroundColor }} onDoubleClick={async () => setType(await funcDetails(day, divRef,'hour'))}>
            <div className={css.basicDetailsInRow}>
                {/* כללי */}
                <BasicDetailsInRow key={day} day={day} stratHour={stratHour} endHour={endHour} exclamationMarkBool={flagExclamationMarkBool} funcDelete={async () => await funcDelete(day)} funcDetails={async () => setType(await funcDetails(day, divRef,'notInActiveHours'))}></BasicDetailsInRow>
            </div>
            <div>
                {/* פרטים */}
                <Icon imgName={"details"} funcDelete={async () => await funcDelete(day)} funcDetails={async () => setType(await funcDetails(day, divRef,'hour'))}></Icon>
            </div>
            {/* <button onClick={() => funcDelete(day)}>gfh26gfffffffffffff</button> */}
        </div>

        <div ref={divRef} className={css.details}>
            {type.length > 0 ? <Details day={day} type={type} funcDelete={funcDeleHour} funcDetails={editDetails}></Details> : ''}
        </div>
    </>
}

export default RowOfHour;