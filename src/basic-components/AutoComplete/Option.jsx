import React, { useContext } from "react";
import './AutoComplete.css'
import  { AutoCompleteActions ,AutoContext} from "./AutoCompleteContext";

const AutoCompleteOptions = () => {

    const { autocomplete, setAutoComplete } = useContext(AutoContext)

    const selectOption = (option) => {
        setAutoComplete({ action: AutoCompleteActions.SELECTVALUE, value: option })
    }

    return <>
    
        {
            autocomplete.showList.length > 0 ?
                autocomplete.showList.map((item, i) => {
                    return <div className="item" onClick={() => selectOption(item)} key={i} >{item.value}</div>
                }) : <></>
        }
    </>
}

export default AutoCompleteOptions;