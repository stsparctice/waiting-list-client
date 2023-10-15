import React, { useContext, useEffect } from "react";
import { createUseStyles } from "react-jss";
import OneCheckbox from "./OneCheckbox/OneCheckbox";
import { ListContext, listActions } from "./ListContext";





const useStyles = createUseStyles({
    out: {
        display: 'flex',
        direction: 'rtl'
    }
})



const CheckBox = ({ type, list }) => {
    const css = useStyles()
    const { checklist, setCheckList } = useContext(ListContext)

    useEffect(() => {
        console.log('useEffect')
        console.log({list, type})
        setCheckList({ action: listActions.BUILD, value: { list, type } })
    }, [list, type])

    return <>
        <div className={css.out}>
            {
              
                checklist.list.length>0 ?
                    checklist.list.map(item => (
                        <OneCheckbox obj={item} key={item.text}></OneCheckbox>
                    )) : <></>
            }
        </div>
    </>
}
export default CheckBox;

