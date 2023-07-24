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

const DetailsDetailed = ({stratHour,endHour,flag,funcDelete,day,funcDetails}) => {
    console.log("in DetailsDetailed");
    const css=useStyles()
    return <>
        <div className={css.wrapper}>
           {!flag?<Icon imgName={"deleteImg"} funcDelete={async () => await funcDelete(day,stratHour,endHour)}></Icon>:<div className={css.space}></div>}
           {!flag?<Icon imgName={"edit"} funcDetails={()=>funcDetails(day,stratHour,endHour)}></Icon>:<div className={css.space}></div>}
            <span>  משעה     {stratHour} </span>
            <span className={css.space}>      </span>
            <span>   עד שעה        {endHour} </span>
        </div>
    </>
}
// funcDelete={} funcDetails={}
export default DetailsDetailed