import { useState, useRef, useReducer, useEffect } from "react"
import { createUseStyles } from "react-jss"
import React from "react"
import AutoCompleteOptions from "./Option";
import AutoContext, { reduceAutoComplete, AutoCompleteActions } from "./AutoCompleteContext";
import './AutoComplete.css'
import icons from "../../services/iconService"
const useStyle = createUseStyles({
    wrapper: {
        width: '170px',
        height: '25px',
        border: 'none',
        borderBottom: [2, 'solid', 'blue'],
        display: "flex",
        flexDirection: "row",


    },
    select: {
        width: 140,
        padding: [2, 5],
        '&:focus': {
            outline: 'none'
        }
    },
    figure: {
        margin: 0,
        padding: 5,
        cursor: "pointer",
        width: 30,
        '& img': {
            width: '100%'
        }
    }


})
//         <div >
//             <div className={css.wrapper}>
//                 <div contentEditable="true" className={css.select}>

//                 </div>
//                 <figure className={css.figure}>
//                     <img src={icons.ARROWDOWN} alt=""></img>
//                 </figure>
//             </div>
//             {/* <select onChange={(ev) => toChange(ev)} className={css.wrapper}>
//                 {
//                     list.map(ele => (<Option name={ele.name} color={ele.color} key={ele.name} />))
//                 }
//             </select> */}
//         </div>
//     </>



const AutoComplete = ({ list }) => {
    const word = useRef()
    console.log({ list })
    const [autocomplete, setAutoComplete] = useReducer(reduceAutoComplete, { word: { value: '', id: -1 }, list, showList: [] });

    const getSelectedItem = (value) => {
        console.log({ value })
        let index = autocomplete.list.findIndex(it => it.value.trim() === value.value.trim())
        if (index !== -1) {
            setAutoComplete({ action: AutoCompleteActions.SELECTVALUE, value })
        }
        else {
            setAutoComplete({ action: AutoCompleteActions.CHANGEWORD, value })
        }
    }

    const getOptions = async (value) => {

    }




    // useEffect(() => {
    //     console.log({selectedvalue})
    //     if (selectedvalue) {
    //         if (selectedvalue.id !== -1) {
    //             setAutoComplete({ action: AutoCompleteActions.SELECTVALUE, value: selectedvalue })
    //         }
    //     }

    // }, [selectedvalue, func])


    useEffect(() => {
        // autocompleteRef.current.innerText= autocomplete.word.value
        if (autocomplete.word.id === -1) {
            // func(autocomplete.word)
        }
        if (autocomplete.word.id !== -1) {
            word.current.innerText = autocomplete.word.value
            console.log('y')
            // console.log(func.toString())
            // func(autocomplete.word)
        }
    }, [autocomplete])


    return <>

        <AutoContext.Provider value={{ autocomplete, setAutoComplete }}>

            <div className="autocomplete">
                <div className="header">
                    <div className="input" ref={word} contentEditable="true" tabIndex="0"
                        onInput={(e) => {
                            console.log(e.key)
                            getSelectedItem({ value: e.target.innerText, id: -1 });
                        }}>
                    </div>
                </div>
                <div className="dropdown-content">
                    <AutoCompleteOptions></AutoCompleteOptions>
                </div>
            </div>
        </AutoContext.Provider>

    </>
}

export default AutoComplete;