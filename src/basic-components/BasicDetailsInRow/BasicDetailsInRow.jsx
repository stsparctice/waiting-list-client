import React from "react";
import { createUseStyles } from "react-jss";
import Icon from "../Icon/Icon";

const useStyles = createUseStyles({
    wrapper: {
        direction: 'rtl',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    space:{
        width:'48px',
        height:'48px'
    }
})

const BasicDetailsInRow = ({ day, stratHour, endHour, exclamationMarkBool }) => {
    const css = useStyles();
    return <>
        <div className={css.wrapper}>
            <Icon imgName={"deleteImg"}></Icon>
            <span>יום {day}</span>
            <span>משעה {stratHour}</span>
            <span>עד שעה {endHour}</span>
            {exclamationMarkBool ? <Icon imgName={"exclamationMark"}></Icon> : <div className={css.space}></div>}
        </div>
    </>
}

export default BasicDetailsInRow;