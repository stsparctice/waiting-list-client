import { createUseStyles } from "react-jss"
import ColorLabel from "../ColorLabel/ColorLabel"
import React, { useContext } from "react";
import './AutoComplete.css'
import AutoContext, { AutoCompleteActions } from "./AutoCompleteContext";


// const useStyle = createUseStyles({
//     color: {
//         backgroundColor: color,
//         textAlign: 'center',
        
//     }
// })



// const Option = ({ name, color }) => {
   
//     // const css = useStyle({color})
//     return <>
//         <option value={name} >
//             <ColorLabel text={name} backgroundColor={color}></ColorLabel>
//             {/* // <span  className={css.color}>{name}</span> */}
//         </option>
//     </>
// }
// export default Option


const AutoCompleteOptions = () => {

    const { autocomplete, setAutoComplete } = useContext(AutoContext)

    const selectOption = (option) => {
        console.log('click')
        setAutoComplete({ action: AutoCompleteActions.SELECTVALUE, value: option })
    }

    // useEffect(() => {
    // }, [autocomplete])

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