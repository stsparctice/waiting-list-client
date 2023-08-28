import React ,{useContext} from "react";
import { createUseStyles } from "react-jss";
import edit from '../../../assets/edit.png';
import deleteImg from '../../../assets/delete-red.png';
import '../../OpenModalStyle.css'
import { postData } from "../../../services/axios";
import GenderContext from "../../../contexts/GenderContext";

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

const ShowGender = ({ td1, td2, td3, td4 }) => {
    const css = useStyles();
    const {setGenders}=useContext(GenderContext)
    let body={}
    async function deleteType() {
        body={name:td1,sex:td2,mmaxAge:td3,fmaxAge:td4}
        console.log(body);
        console.log(td1, td2, td3, td4);
        const response = await postData('/gender/delete', body)
        console.log(response);
        if(response){
            body['status']='remove'
            setGenders([body])
        }
    }
    function editType() {
        console.log(td1, td2, td3, td4);
    }
    return <>
        <tr className={css.tr}>
            <td className={css.td}>{td1}</td>
            <td className={css.td}>{td2}</td>
            <td className={css.td}>{td3}</td>
            <td className={css.td}>{td4}</td>
            <td>
                <img className={css.img} src={deleteImg} alt="delete" onClick={deleteType} />
                <img className={css.img} src={edit} alt="edit" onClick={editType} />
            </td>
        </tr>
    </>
}

export default ShowGender;