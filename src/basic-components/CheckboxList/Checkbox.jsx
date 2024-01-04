import React, { useContext, useEffect } from "react";
import { createUseStyles } from "react-jss";
import OneCheckbox from "./OneCheckbox/OneCheckbox";
import { ListContext, listActions, listStatus } from "./ListContext";





const useStyles = createUseStyles({
    out: {
        display: 'flex',
        direction: 'rtl'
    }
})



const CheckBox = ({ type, list, set, selectedItems }) => {
    const css = useStyles()
    const { checklist, setCheckList } = useContext(ListContext)

    useEffect(() => {
        console.log('useEffect1')
        console.log({list, type, selectedItems})
        setCheckList({ action: listActions.BUILD, value: { list, type, selectedItems } })
    }, [list, type, selectedItems])

    // useEffect(() => {
    //     console.log('useEffect')
    //     console.log({selectedItems})
    //     setCheckList({ action: listActions.SELECTEDITEMS, value: { list } })
    // }, [selectedItems])
    useEffect(() => {
        console.log('useEffect2')
        if (checklist.status === listStatus.SELECT) {
            const checkedItems = checklist.list.filter(item => item.checked)
            set(checkedItems)
        }
    }, [checklist])

    return <>
        <div className={css.out}>
            {
                checklist.list.length > 0 ?
                    checklist.list.map(item => (
                        <OneCheckbox obj={item} key={item.item.id} set={set}></OneCheckbox>
                    )) : <></>
            }
        </div>
    </>
}
export default CheckBox;

