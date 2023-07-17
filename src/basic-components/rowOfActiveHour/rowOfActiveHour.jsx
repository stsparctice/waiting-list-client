import React from "react";
import { createUseStyles } from "react-jss";
import BasicDetailsInRow from "../BasicDetailsInRow/BasicDetailsInRow";
import Icon from "../Icon/Icon";

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
    }
})

const RowOfActiveHour = ({ day, stratHour, endHour, exclamationMarkBool, backgroundColor }) => {
    const css = useStyles();

    return <>
        <div className={css.wrapper} style={{ backgroundColor: backgroundColor }}>
            <div className={css.basicDetailsInRow}>
                <BasicDetailsInRow key={day} day={day} stratHour={stratHour} endHour={endHour} exclamationMarkBool={exclamationMarkBool}></BasicDetailsInRow>
            </div>
            <div>
                <Icon imgName={"details"}></Icon>
            </div>
        </div>
    </>
}

export default RowOfActiveHour;