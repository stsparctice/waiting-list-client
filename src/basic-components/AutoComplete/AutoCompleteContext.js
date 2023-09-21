import { createContext } from 'react';
export const AutoCompleteActions = {
    CHANGEWORD: 'changeword',
    CHANGELIST: 'changelist',
    SELECTVALUE: 'selectvalue'
}

export const reduceAutoComplete = (state, item) => {
    let { word, list, showList } = state
    console.log({ word, list, item })
    if (item.action === AutoCompleteActions.CHANGEWORD) {
        word = item.value
        if (word &&word !== '') {
            let index = list.findIndex(it => it.value.trim() === state.word.value.trim())
            showList = list.filter(({ value }) => value.indexOf(word.value) !== -1)
            if (index !== -1) {
                word = { value: list[index].value, id: list[index].id }
            }
        }
    }
    if (item.action === AutoCompleteActions.CHANGELIST) {
        list = item.list;
    }
    if (item.action === AutoCompleteActions.SELECTVALUE) {
        word = item.value;
        showList = []
    }
    console.log({ word, list, showList })
    return { word, list, showList };
}


const AutoContext = createContext();


export default AutoContext