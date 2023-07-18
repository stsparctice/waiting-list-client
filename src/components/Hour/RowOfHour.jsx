import React, { useEffect, useContext, useState, useRef, useReducer, useCallback } from "react";
import { getData, postData } from "../../services/axios";
import { createUseStyles } from "react-jss";
import BasicDetailsInRow from "./BasicDetailsInRow";
// import DetailsContext from "../../context/DetailsContext";
import Icon from "../Icon/Icon";
import Details from "../Details/Details";

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
    rowdeleted:{
        display:'none'
    }
})


const RowOfHour = ({ day, stratHour, endHour, exclamationMarkBool, backgroundColor, funcDetails, funcDelete }) => {
    const css = useStyles();
    const [det, setDet] = useState([])
    const divRef = useRef()

    return <>
        <div className={css.wrapper} style={{ backgroundColor: backgroundColor }} onDoubleClick={async () => setDet(await funcDetails(day, divRef))}>
            <div className={css.basicDetailsInRow}>
                <BasicDetailsInRow key={day} day={day} stratHour={stratHour} endHour={endHour} exclamationMarkBool={exclamationMarkBool} funcDelete={async() =>await funcDelete(day)} funcDetails={async () => setDet(await funcDetails(day, divRef))}></BasicDetailsInRow>
            </div>
            <div>
                <Icon imgName={"details"} funcDelete={async() =>await funcDelete(day)} funcDetails={async () => setDet(await funcDetails(day, divRef))}></Icon>
            </div>
            {/* <button onClick={() => funcDelete(day)}>gfh26gfffffffffffff</button> */}
        </div>
        <div ref={divRef} className={css.details}>
            {det.length > 0 ? <Details day={day} details={det}></Details> : ''}
        </div>
    </>
}

export default RowOfHour;