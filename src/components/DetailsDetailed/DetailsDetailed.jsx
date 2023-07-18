import React from "react"
import Icon from "../Icon/Icon"
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    wrapper: {
        direction: 'rtl',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    space:{
        width:'48px',
        height:'48px'
    }
})

const DetailsDetailed = ({stratHour,endHour}) => {
    const css=useStyles()
    return <>
        <div className={css.wrapper}>
            <Icon imgName={"deleteImg"}></Icon>
            <span>  משעה     {stratHour} </span>
            <span className={css.space}>      </span>
            <span>   עד שעה        {endHour} </span>
        </div>
    </>
}

export default DetailsDetailed