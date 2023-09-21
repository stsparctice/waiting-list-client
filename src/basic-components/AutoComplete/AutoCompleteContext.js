import { createContext, useReducer } from 'react';
export const AutoCompleteActions = {
    CHANGEWORD: 'changeword',
    CHANGELIST: 'changelist',
    SELECTVALUE: 'selectvalue'
}

export const reduceAutoComplete = (state, item) => {
    let { word, list, showList } = state
    if (item.action === AutoCompleteActions.CHANGEWORD) {
        word = item.value
        if (word && word !== '') {
            let index = list.findIndex(it => it.value.trim() === word.value.trim())
            if (index !== -1) {
                word = { value: list[index].value, id: list[index].id }
            }
            else {
                console.log({word})
                console.log(list[1].value)
                console.log(list[1].value.indexOf(word.value))
                showList = list.filter(({ value }) => value.indexOf(word.value) !== -1)
            }
        }
    }
    if (item.action === AutoCompleteActions.CHANGELIST) {
        list = item.value.list;
    }
    if (item.action === AutoCompleteActions.SELECTVALUE) {
        word = item.value;
        showList = []
    }
    return { word, list, showList };
}


export const AutoContext = createContext();

const AutoCompleteProvider = ({children})=>{
    const [autocomplete, setAutoComplete] = useReducer(reduceAutoComplete, { word: { value: '', id: -1 }, list: [], showList: [] });

    return <>
      <AutoContext.Provider value={{ autocomplete, setAutoComplete }}>
        {children}
      </AutoContext.Provider>
    </>
}


export default AutoCompleteProvider