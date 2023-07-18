import React, { useContext } from "react";
import deleteImg from '../../assets/delete.png'
import details from '../../assets/edit.png'
import { postData } from "../../services/axios"

import { createUseStyles } from "react-jss";
// import HoursContext from "../../../../contexts/Hours";
import {  useNavigate } from "react-router-dom";
// import MainHoursAccordingToDay from "../../HoursAccordingToDay/MainHoursAccordingToDay/MainHoursAccordingToDay";
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

const ShowHours = ({poolName, day, startHour, endHour }) => {
    const css = useStyles();
    const nav = useNavigate()
    // const { Hours, setHours } = useContext(HoursContext)

    async function deleteHours() {
        // setHours({ day: day.day, option: 'remove' })
        const response = await postData('/schedule/deleteDay', { poolName: 'ashdod', day: day })
        // console.log(Hours);
        console.log(response);
    }

    function showDetails() {
        // const response = await getData(`/schedule/getAllHoursByDay?poolName=ashdod&day=${day}`)
        // console.log(response);
        console.log("Hello");
        // <MainHoursAccordingToDay/>
        // nav(`/schedule/mainAccordingToDay/${poolName}/${day}`)
    }
    return <>
        <tr className={css.tr}>
            <td className={css.td}>{day}</td>
            <td className={css.td}>{startHour}</td>
            <td className={css.td}>{endHour}</td>
            <td >
                <img className={css.img} src={deleteImg} alt="delete" onClick={deleteHours} />
            </td>
            <td >
                <img className={css.img} src={details} alt="details" onClick={showDetails} />
            </td>
        </tr>
    </>
}
export default ShowHours;