import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import FormButton from "../../basic-components/FormButton/FormButton";
import ButtonIcon from "../../basic-components/ButtonIcon/ButtonIcon";
import icons from "../../services/iconService";

import '../../styles/Form.css'
import '../../styles/Modal.css'
import { createUseStyles } from "react-jss";



const useStyles = createUseStyles({
    lefticon: {
        float: "left"
    }

});

const DeleteForm = ({ obj, confirm, cancel }) => {
    const css = useStyles()
    const [reason, setReason] = useState('')
    const dispatch = useDispatch()

    const deleteObject = () => {
        const del = obj.deleteFunc
        const { data } = obj
        dispatch(del({ ...data, disableReason: reason }))
        confirm()
    }

    return <>
        <div className="modal" >
            <div className="form-wrapper container">
                <div className={css.lefticon}>
                    <ButtonIcon title="סגור" func={() => cancel()} imgName={icons.CLOSE} height="40px" width="40px" imageSize={{ height: "20px", width: "20px" }}></ButtonIcon>
                </div>
                <h2>האם למחוק את ה{obj.title} <span>{obj.name}</span>?</h2>

                <div className="form">
                    <p className="input-row">
                        <label>סיבה:</label>
                        <input type="text" value={reason} onInput={(e) => setReason(e.target.value)} style={{ width: 400 }}></input>
                    </p>
                    <div className="button-row">
                        <FormButton text="אישור" func={deleteObject}></FormButton>
                        <FormButton text="ביטול" func={cancel}></FormButton>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DeleteForm