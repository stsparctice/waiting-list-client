import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import edit from '../../../../../assets/edit.png';
import deleteImg from '../../../../../assets/delete-red.png';
import HoursAccordingToDayContext from "../../HoursAccordingToDayContext";
import { postData } from "../../../../../services/axios";

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

const ShowHours = ({ td1, td2, td3 }) => {
    const css = useStyles();
    const { info, setInfo } = useContext(HoursAccordingToDayContext)

    async function deleteHour() {
        let ans = await postData('/schedule/deleteHourByDay', { poolName: info.poolName, day: info.day, startHour: td1, endHour: td2, gender: td3 })

    }
    async function editHour() {
    }
    return <>
        <tr className={css.tr}>
            <td className={css.td}>{td1}</td>
            <td className={css.td}>{td2}</td>
            <td className={css.td}>{td3}</td>
            <td>
                <img className={css.img} src={deleteImg} alt="delete" onClick={deleteHour} />
                <img className={css.img} src={edit} alt="edit" onClick={editHour} />
            </td>
        </tr>
    </>
}

export default ShowHours;