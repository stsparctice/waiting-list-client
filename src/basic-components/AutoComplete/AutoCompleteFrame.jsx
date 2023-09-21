import React from "react"
import AutoCompleteProvider from "./AutoCompleteContext";
import './AutoComplete.css'
import AutoComplete from "./AutoComplete";


const AutoCompleteFrame = ({ list, func }) => {
    return <>
        <AutoCompleteProvider>
            <AutoComplete list={list} func={func} ></AutoComplete>
        </AutoCompleteProvider>
    </>
}

export default AutoCompleteFrame;