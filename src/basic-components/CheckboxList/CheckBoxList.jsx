import React from "react";
import ListContextProvider from "./ListContext";
import CheckBox from "./Checkbox";




const CheckBoxList = ({ type, list ,set} = []) => {

    return <>
        <ListContextProvider>
            <CheckBox type={type} list={list} set={set}></CheckBox>
        </ListContextProvider>
    </>
}
export default CheckBoxList;

