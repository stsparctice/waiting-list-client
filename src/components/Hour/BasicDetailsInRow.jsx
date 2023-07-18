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

const BasicDetailsInRow = ({ day, stratHour, endHour, exclamationMarkBool ,funcDelete,funcDetails}) => {
    console.log(";;;;;;;;;;;;;;;;;");
    const css = useStyles();
    console.log('BasicDetailsInRow --- exclamationMarkBool',exclamationMarkBool);
    return <>
        <div className={css.wrapper}>
            <Icon imgName={"deleteImg"} funcDelete={funcDelete} funcDetails={funcDetails}></Icon>
            <span>יום {day}</span>
            <span>משעה {stratHour}</span>
            <span>עד שעה {endHour}</span>
            {exclamationMarkBool ? <Icon imgName={"exclamationMark"}  funcDelete={funcDelete} funcDetails={funcDetails}></Icon> : <div className={css.space}></div>}
        </div>
    </>
}

export default BasicDetailsInRow;