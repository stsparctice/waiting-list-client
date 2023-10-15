import React, { useContext } from "react";
import deleteImg from '../../../../assets/delete-red.png'
import details from '../../../../assets/details.png'
import { postData } from "../../../../services/axios"

import { createUseStyles } from "react-jss";
import ActiveHoursContext from "../../../../contexts/ActiveHours";
import { Link, useNavigate } from "react-router-dom";
import MainHoursAccordingToDay from "../../HoursAccordingToDay/MainHoursAccordingToDay/MainHoursAccordingToDay";
const useStyles = createUseStyles({
    td: {
        border: '1px solid black'
    },
    tr: {
        border: '1px solid black'
    },
    img: {
        // height: '50%',
        // width: '50%'
    }
})

const ShowActiveHours = ({poolName, day, startActiveHour, endActiveHour }) => {
    const css = useStyles();
    const nav = useNavigate()
    const { activeHours, setActiveHours } = useContext(ActiveHoursContext)

    async function deleteActiveHours() {
        setActiveHours({ day: day.day, option: 'remove' })
        const response = await postData('/schedule/deleteDay', { poolName: 'ashdod', day: day })
        console.log(activeHours);
        console.log(response);
    }

    function showDetails() {
        // const response = await getData(`/schedule/getAllHoursByDay?poolName=ashdod&day=${day}`)
        // console.log(response);
        console.log("Hello");
        // <MainHoursAccordingToDay/>
        nav(`/schedule/mainAccordingToDay/${poolName}/${day}`)
    }
    return <>
        <tr className={css.tr}>
            <td className={css.td}>{day}</td>
            <td className={css.td}>{startActiveHour}</td>
            <td className={css.td}>{endActiveHour}</td>
            <td >
                <img className={css.img} src={deleteImg} alt="delete" onClick={deleteActiveHours} />
            </td>
            <td >
                <img className={css.img} src={details} alt="details" onClick={showDetails} />
            </td>
        </tr>
    </>
}
export default ShowActiveHours;