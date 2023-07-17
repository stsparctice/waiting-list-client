import React, {  useReducer} from "react";
import { createUseStyles } from "react-jss";
import OneCheckbox from "../OneCheckbox/OneCheckbox";
import { createContext } from "react";

export const setbackgroundColor = (obj) => {
        let index = obj.color.indexOf(')')
        if (obj.color.indexOf(')') !== -1) {
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
        setbackgroundColor(onetrue)
        const somefalse = state.arr.filter(x => x.checked !== true)
        somefalse.map(a => {
            a.backgroundColor = "white"
        })
    }
    if (state.type === "radioBox") {
        const ispress = state.arr.find(x => x.text === item.obj.text)
        if (ispress.checked === false) {
            ispress.checked = true
            setbackgroundColor(ispress)
            if (ispress.isradio === true) {
                const filter = state.arr.filter(x => x.text !== ispress.text)
                filter.map(a => {
                    a.backgroundColor = "white"
                    a.checked = false
                })
            }
            else {
                const filter = state.arr.filter(x => x.isradio !== false)
                filter.map(a => {
                    a.backgroundColor = "white"
                    a.checked = false
                })
            } 
        }
        else{
            ispress.backgroundColor = "white"
            ispress.checked = false
        }
    }
    if (state.type === "checkbox") {
        const checkbox = state.arr.find(x => x.text === item.obj.text)
        if (checkbox.checked !== true) {
            checkbox.checked = true
            checkbox.backgroundColor = checkbox.color
            let index = checkbox.color.indexOf(')')
            if (checkbox.color.indexOf(')') !== -1) {
                let backgroundColor = checkbox.color.slice(4, index)
                checkbox.backgroundColor = `rgba(${backgroundColor}, 0.5)`;
            }
        }
        else {
            checkbox.backgroundColor = "white"
            checkbox.checked = false;
        }
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
        textAlign: 'center',
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
                {
                    arr.map(a => (
                        <OneCheckbox obj={a} key={a.text}></OneCheckbox>
                    ))
                }
            </div>
        </ListContext.Provider>
    </>
}
export default Checkbox;

