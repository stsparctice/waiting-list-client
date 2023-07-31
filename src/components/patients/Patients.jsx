import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/axios";
import ButtonInput from '../../basic-components/ButtonInput/ButtonInput'
import Read from "./Read/Read";

const Patients = () => {
    const nav = useNavigate()
    const addPatient = useCallback(
        async (id) => {
            console.log(id, 'id');
            let ans
            try {
                ans = await postData('/rapidMed/find', { id: id })
                console.log('ans', ans);
            }
            catch (error) {
                console.log('error');
            }
            if (ans) {
                nav(`/clientDetails/${id}`);
            }
        }, [],)
    return <>
        <div>
            <ButtonInput text={'הוספה'} imgName={'add'} func={addPatient}></ButtonInput>
            <Read></Read>
        </div>
    </>
}

export default Patients;