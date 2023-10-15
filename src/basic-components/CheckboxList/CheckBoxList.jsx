import React from "react";
import ListContextProvider from "./ListContext";
import CheckBox from "./Checkbox";




const CheckBoxList = ({ type, list } = []) => {

    return <>
        <ListContextProvider>
            <CheckBox type={type} list={list}></CheckBox>
        </ListContextProvider>
    </>
}
export default CheckBoxList;

