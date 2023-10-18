import { createContext, useState, useReducer } from 'react';


export const ListContext = createContext()

export const listActions = {
    BUILD: 'build',
    CHECKITEM: 'check-item',
    SELECTEDITEMS: 'selectedItems'
}

export const listStatus={
LOAD:'load', SELECT:'select'
}

export const listType = {
    SINGLE: 'single',
    MULTIPLE: 'multiple',
    HYBRID: 'hybrid'
}

const listReducer = (state, item) => {
    const { action, value } = item
    console.log({ action, value })
    switch (action) {
        case listActions.BUILD:
            let list = value.list.map(x => ({ item: x, checked: false }))
            if (value.selectedItems &&value.selectedItems.length > 0) {
                list = list.map(({ item, checked }) => {
                    const { id } = item
                    const selectedItem = value.selectedItems.find(li => li.id === id)
                    if (selectedItem) {
                        checked = true
                    }
                    return { item, checked }
                })
            }
            state = { type: value.type, list, status:listStatus.LOAD }
            break;
        case listActions.CHECKITEM:
            const { type } = state
            switch (type) {
                case listType.SINGLE: {
                    const list = state.list.map(x => {
                        let checked = false
                        if (value.id === x.item.id) {
                            checked = true
                        }
                        return { item: x.item, checked }
                    })
                    state = { type, list,  status:listStatus.SELECT }
                    break;
                }
                case listType.MULTIPLE: {
                    const list = state.list.map(x => {
                        let checked = x.checked
                        if (value.id === x.item.id) {
                            checked = !checked
                        }
                        return { item: x.item, checked }
                    })
                    state = { type, list,  status:listStatus.SELECT }
                    break;
                }
                case listType.HYBRID:
                    {
                        console.log(listType.HYBRID)
                        console.log({ value })
                        console.log(value.type)
                        console.log(state.list)
                        switch (value.type) {
                            case listType.SINGLE: {
                                console.log(value.type)
                                const list = state.list.map(x => {
                                    let checked = false
                                    if (value.id === x.item.id) {
                                        checked = true
                                    }
                                    return { item: x.item, checked }
                                })
                                state = { type, list,  status:listStatus.SELECT }
                                break;
                            }
                            case listType.MULTIPLE: {
                                console.log(value.type)
                                const list = state.list.map(x => {
                                    let checked = x.checked
                                    if (x.item.option === value.option) {
                                        if (value.id === x.item.id) {
                                            checked = !checked
                                        }
                                    }
                                    else {
                                        if (x.checked) {
                                            checked = false
                                        }
                                    }

                                    return { item: x.item, checked }
                                })
                                state = { type, list,  status:listStatus.SELECT }
                                break;
                            }
                            default:
                                break;
                        }
                        break;
                    }
                default:
                    break;
            }
            break;
        case listActions.SELECTEDITEMS: {
            const list = state.list.map(({ item, checked }) => {
                const { id } = item
                const selectedItem = value.find(li => li.id === id)
                if (selectedItem) {
                    checked = true
                }
                return { item, checked }
            })
            state = { type: state.type, list }
            break;
        }
        default:
            state = { ...state }
            break;
    }
    console.log({ state })
    return state
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

