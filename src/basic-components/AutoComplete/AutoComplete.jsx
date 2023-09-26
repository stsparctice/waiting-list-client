import { useRef, useContext, useEffect } from "react"
import React from "react"
import AutoCompleteOptions from "./Option";
import { AutoContext, AutoCompleteActions } from "./AutoCompleteContext";
import './AutoComplete.css'



const AutoComplete = ({ list, func }) => {
    const word = useRef()
    const { autocomplete, setAutoComplete } = useContext(AutoContext)
    const getSelectedItem = (value) => {
        let index = autocomplete.list.findIndex(it => it.value.trim() === value.value.trim())
        if (index !== -1) {
            setAutoComplete({ action: AutoCompleteActions.SELECTVALUE, value })
        }
        else {
            setAutoComplete({ action: AutoCompleteActions.CHANGEWORD, value })
        }
    }

    useEffect(() => {
        setAutoComplete({ action: AutoCompleteActions.CHANGELIST, value: { word: { value: '', id: -1 }, list: list, showList: [] } })
    }, [list, setAutoComplete])

    useEffect(() => {
        if (autocomplete.word.id === -1) {
        }
        if (autocomplete.word.id !== -1) {
            word.current.innerText = autocomplete.word.value
            func(autocomplete.word)
        }
    }, [autocomplete, func])


    return <>

        <div className="autocomplete">
            <div className="header">
                <div className="input" ref={word} contentEditable="true" tabIndex="0"
                    onKeyUp={(e) => {
                        getSelectedItem({ value: e.target.innerText, id: -1 });
                    }}>
                </div>
            </div>
            <div className="dropdown-content">
                <AutoCompleteOptions></AutoCompleteOptions>
            </div>
        </div>
    </>
}

export default AutoComplete;