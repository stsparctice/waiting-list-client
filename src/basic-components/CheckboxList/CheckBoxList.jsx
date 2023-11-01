import React from "react";
import ListContextProvider from "./ListContext";
import CheckBox from "./Checkbox";




const CheckBoxList = ({header, type, list ,set, selectedItems} ) => {
    return <>
    <label>{header}</label>
        <ListContextProvider>
            <CheckBox type={type} list={list} set={set} selectedItems={selectedItems}></CheckBox>
        </ListContextProvider>
    </>
}
export default CheckBoxList;

