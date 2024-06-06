import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import edit from '../../../../../assets/edit.png';
import deleteImg from '../../../../../assets/delete-red.png';
import { postData } from "../../../../../services/axios";
import HoursAccordingToDayContext from "../../HoursAccordingToDayContext";

const useStyles = createUseStyles({
    td: {
        border: '1px solid black'
    },
    tr: {
        border: '1px solid black'
    },
    img: {
        height: '50%',
        width: '50%'
    }
})

const AcorShowActiveHours = ({ td1, td2 }) => {
    const css = useStyles();
    let { info, setInfo } = useContext(HoursAccordingToDayContext)
    async function deleteHour() {
        // בריכה,יום,שעת התחלה
        let ans = await postData('/schedule/deleteActiveHourByDay', { poolName: info.poolName, day: info.day, startActiveHour: td1 })
    }
    async function editHour() {
        let ans = await postData('/schedule/updateActiveHourByDay', {
            poolName: info.poolName, day: info.day,
            old: { startActiveHour: "16:00", endActiveHour: "17:00" }, "new": { startActiveHour: td1, endActiveHour: td2 }
        })
    }
    return <>
        <tr className={css.tr}>
            <td className={css.td}>{td1}</td>
            <td className={css.td}>{td2}</td>
            <td>
                <img className={css.img} src={deleteImg} alt="delete" onClick={deleteHour} />
                <img className={css.img} src={edit} alt="edit" onClick={editHour} />
            </td>
        </tr>
    </>
}

export default AcorShowActiveHours;