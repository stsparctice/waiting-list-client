import React from "react";
import ListContextProvider from "./ListContext";
import CheckBox from "./Checkbox";




const CheckBoxList = ({ type, list ,set, selectedItems} ) => {
console.log({selectedItems})
    return <>
        <ListContextProvider>
            <CheckBox type={type} list={list} set={set} selectedItems={selectedItems}></CheckBox>
        </ListContextProvider>
    </>
}
export default CheckBoxList;

