import React, { lazy, useEffect, useReducer, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import OneCheckbox from "../OneCheckbox/OneCheckbox";
import { createContext } from "react";
// import OneCheckbox from "../../small-components/OneCheckbox/OneCheckbox";
export const setbackgroundColor = (obj) => {
    let index = obj.color.indexOf(')')
    if (obj.color.indexOf(')') != -1) {
        let backgroundColor = obj.color.slice(4, index)
        obj.backgroundColor = `rgba(${backgroundColor}, 0.5)`;
}

}
const ListReducer = (state, item) => {
    if (state.type === "radio") {
        if (state.arr.some(x => x.checked)) {
            let switch1 = state.arr.find(x => x.checked)
            switch1.checked = false;
        }
        state.arr.find(x => x.text === item.obj.text).checked = true
        const onetrue = state.arr.find(x => x.checked === true)
        let index = onetrue.color.indexOf(')')
        if (onetrue.color.indexOf(')') !== -1) {
            let backgroundColor = onetrue.color.slice(4, index)
            onetrue.backgroundColor = `rgba(${backgroundColor}, 0.5)`;
        }
        const somefalse = state.arr.filter(x => x.checked !== true)
        somefalse.map(a => {
            a.backgroundColor = "rgb(235, 235, 235)"
        })
    }
    else {
        const checkbox = state.arr.find(x => x.text === item.obj.text)
        if (checkbox.checked !== true) {
            checkbox.checked = true
            if (checkbox.color) {
                checkbox.backgroundColor = checkbox.color
                let index = checkbox.color.indexOf(')')
                if (checkbox.color.indexOf(')') !== -1) {
                    let backgroundColor = checkbox.color.slice(4, index)
                    checkbox.backgroundColor = `rgba(${backgroundColor}, 0.5)`;
                }
            }
            else{
                // checkbox.color="blue"
                checkbox.backgroundColor='yellow'
            }
        }
        else {

            checkbox.backgroundColor = "rgb(235, 235, 235)"
            checkbox.checked = false;
        }

        // state.arr.find(x => x.text == item.obj.text).checked = true
        // const onetrue=state.arr.find(x=>x.checked==true)
        // onetrue.backgroundColor=onetrue.color
        // let index = onetrue.color.indexOf(')')
        // if(onetrue.color.indexOf(')')!==-1){
        // let backgroundColor = onetrue.color.slice(4, index)
        // onetrue.backgroundColor = `rgba(${backgroundColor}, 0.5)`;}

    }

    return { ...state }
}

const useStyles = createUseStyles({
    out: {
        display: 'flex',
        direction: 'rtl'
    },
    wrapper: {
        margin: 4,
        cursor: 'pointer',
        width: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStyle: 'solid',
        borderTopWidth: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    red: {
        color: 'red',
    }
})

export const ListContext = createContext()

const Checkbox = ({ title, type, arr } = []) => {
    const css = useStyles()
    const [object, setObject] = useReducer(ListReducer, { type, arr })

    return <>
        <ListContext.Provider value={{ object, setObject }}>
            <div className={css.out}>
                <p>{title}</p>
                {type === "checkbox" ?
                    arr.map(a => (
                        <OneCheckbox obj={a} key={a.text}></OneCheckbox>
                    ))
                    : arr.map(a => (
                        <OneCheckbox obj={a} key={a.text}></OneCheckbox>
                    ))}
            </div>
        </ListContext.Provider>
    </>
}
export default Checkbox;

