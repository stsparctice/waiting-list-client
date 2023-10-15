import { createContext, useState, useReducer } from 'react';


export const ListContext = createContext()

export const listActions = {
    BUILD: 'build',
    CHECKITEM: 'check-item'
}

export const listType = {
    SINGLE: 'single',
    MULTIPLE: 'multiple'
}

const listReducer = (state, item) => {
    const { action, value } = item
    switch (action) {
        case listActions.BUILD:
            const list = value.list.map(x => ({ item: x, checked: false }))
            state = { type:value.type, list }
            break;
        case listActions.CHECKITEM:
            const { type } = state
            if (type === listType.SINGLE) {
                const list = state.list.map(x => {
                    let checked = false
                    if (value.id === x.item.id) {
                        checked = true
                    }
                    return { item: x.item, checked }
                })
                state = { type, list }

            }

            if (type === listType.MULTIPLE) {
                const list = state.list.map(x => {
                    let checked = x.checked
                    if (value.id === x.item.id) {
                        checked = !checked
                    }
                    return { item: x.item, checked }
                })
                state = { type, list }

            }
            break;
        default:
            state = { ...state }
            break;
    }
    console.log({ state })
    return state
    // if (state.type === "radio") {
    //     if (state.arr.some(x => x.checked)) {
    //         let switch1 = state.arr.find(x => x.checked)
    //         switch1.checked = false;
    //     }
    //     state.arr.find(x => x.text === item.obj.text).checked = true
    //     const onetrue = state.arr.find(x => x.checked === true)
    //     // setbackgroundColor(onetrue)
    //     const somefalse = state.arr.filter(x => x.checked !== true)
    //     somefalse.map(a => {
    //         a.backgroundColor = "white"
    //     })
    // }
    // if (state.type === "radioBox") {
    //     const ispress = state.arr.find(x => x.text === item.obj.text)
    //     if (ispress.checked === false) {
    //         ispress.checked = true
    //         // setbackgroundColor(ispress)
    //         if (ispress.isradio === true) {
    //             const filter = state.arr.filter(x => x.text !== ispress.text)
    //             filter.map(a => {
    //                 a.backgroundColor = "white"
    //                 a.checked = false
    //             })
    //         }
    //         else {
    //             const filter = state.arr.filter(x => x.isradio !== false)
    //             filter.map(a => {
    //                 a.backgroundColor = "white"
    //                 a.checked = false
    //             })
    //         }
    //     }
    //     else {
    //         ispress.backgroundColor = "white"
    //         ispress.checked = false
    //     }
    // }
    // if (state.type === "checkbox") {
    //     const checkbox = state.arr.find(x => x.text === item.obj.text)
    //     if (checkbox.checked !== true) {
    //         checkbox.checked = true
    //         checkbox.backgroundColor = checkbox.color
    //         let index = checkbox.color.indexOf(')')
    //         if (checkbox.color.indexOf(')') !== -1) {
    //             let backgroundColor = checkbox.color.slice(4, index)
    //             checkbox.backgroundColor = `rgba(${backgroundColor}, 0.5)`;
    //         }
    //     }
    //     else {
    //         checkbox.backgroundColor = "white"
    //         checkbox.checked = false;
    //     }
    // }
    // return { ...state }
}



const ListContextProvider = ({ children }) => {
    const [checklist, setCheckList] = useReducer(listReducer, { type: undefined, list: [] })
    return <>
        <ListContext.Provider value={{
            checklist, setCheckList,
        }}>
            {children}
        </ListContext.Provider>
    </>
}


export default ListContextProvider

