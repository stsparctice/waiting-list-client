import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../services/axios";
import ButtonInput from '../../basic-components/ButtonInput/ButtonInput'
// import ButtonInput from '../../components2/ButtonInput/ButtonInput'
import Read from "./Read/Read";
import icons from "../../services/iconService";

const Patients = () => {
    const nav = useNavigate()
    const addPatient = useCallback(
        async (id) => {
            // const ans = await getData('/rapidMed/find', { id: id })
            // console.log('ans', ans);
            // if (ans.error) {
            //     console.log('error');
            // }
            // if (ans) {
                console.log("i am in patientsss");
                nav(`/clientDetails/${id}`);
            // }
        }, [],)
    return <>
        <div>
            <ButtonInput text={'הוספה'} imgName={icons.ADD} func={addPatient}></ButtonInput>
            
            <Read></Read>
        </div>
    </>
}

export default Patients;