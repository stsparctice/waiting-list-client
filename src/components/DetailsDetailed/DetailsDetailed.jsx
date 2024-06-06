import React,{useState,useCallback} from "react"
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
    },
    none:{
        display:'none'
    },
    button:{
        backgroundColor:'red',
        borderRadius:'3px'
    }

})

const DetailsDetailed = ({stratHour,endHour,flag,funcDelete,day,editDetails}) => {
    const [hours,setHours]=useState({})
    const[newStart,setNewStart]=useState()
    const[newEnd,setNewEnd]=useState()
    const[flagBtn,setFlagBtn]=useState(false)
    let det;
    const funcDetails=(day,stratHour,endHour)=>{
        setFlagBtn(true)
        setHours({day:day,shour:stratHour,ehour:endHour})
    }
    const btn = useCallback(async (day,stratHour,endHour,newStart,newEnd) => {
        await editDetails(day,stratHour,endHour,newStart,newEnd)
        setFlagBtn(false)
    }, [])
    const css=useStyles()
    return <>
        <div className={css.wrapper}>
           {!flag?<Icon imgName={"deleteImg"} funcDelete={async () => await funcDelete(day,stratHour,endHour)}></Icon>:<div className={css.space}></div>}
           {!flag?<Icon imgName={"edit"} funcDetails={()=>funcDetails(day,stratHour,endHour)}></Icon>:<div className={css.space}></div>}
           {hours.day!==undefined&&hours.day===day&&hours.shour===stratHour?<span>    משעה         <input type="text" defaultValue={stratHour} onInput={(e) => setNewStart(e.target.value)} /> </span>:<span>  משעה     {stratHour} </span>}
            <span className={css.space}>      </span>
           {hours.day!==undefined&&hours.day===day&&hours.ehour===endHour? <span>עד שעה  <input type="text" defaultValue={endHour} onInput={(e) => setNewEnd(e.target.value)}/> </span>:<span>   עד שעה        {endHour} </span>}
           <span className={css.space}>      </span>
           {flagBtn?<button className={css.button} onClick={async()=>await btn(day,stratHour,endHour,newStart,newEnd)}>{'אישור'}</button>:''}
</div>
    </>
}
// funcDelete={} funcDetails={}
export default DetailsDetailed