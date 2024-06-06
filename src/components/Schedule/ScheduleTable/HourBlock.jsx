import { useEffect, useState } from 'react'
import './ScheduleTable.css'

const HourBlock = ({ data, selectSchedule }) => {
    const [backgroundColor, setBackgroundColor] = useState(undefined)
    const [title, setTitle] = useState('')
    useEffect(() => {
        setBackgroundColor(data.schedule ? data.schedule.backgroundColor : undefined)
        setTitle(data.schedule ? data.schedule.genderId.name : '')
    }, [data])

    const showData= ()=>{
        if(data.schedule){

            selectSchedule(data.schedule)
        }
    }
    return <>
        <div className="table-block" style={{cursor:data.schedule?'pointer':'default', backgroundColor}} title={title}  onClick={showData}>

        </div>
    </>
}

export default HourBlock
