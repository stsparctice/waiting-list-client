import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/axios";
import ButtonInput from '../../basic-components/ButtonInput/ButtonInput'

const Patients = () => {
    const nav = useNavigate()
    const addPatient = useCallback(
        async (id) => {
            const ans = await postData('/rapidMed/find', { id: id })
            console.log('ans', ans);
            if (ans.error) {
                console.log('error');
            }
            else
                nav(`/clientDetails/${id}`)
        }, [],)
    return <>
        <ButtonInput text={'הוספה'} imgName={'add'} func={addPatient}></ButtonInput>
    </>
}

export default Patients;