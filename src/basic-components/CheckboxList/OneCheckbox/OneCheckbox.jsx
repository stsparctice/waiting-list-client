import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import { ListContext, listActions } from "../ListContext";

const useStyles = createUseStyles({
    out: {
        display: 'flex',
    },
    span: {
        fontSize: '1em'
    },
    wrapper: {
        margin: '0.8em',
        cursor: 'pointer',
        width: 80,
        height: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStyle: 'solid',
        borderTopWidth: 5,
        textAlign: 'center',

    },

})

export const setbackgroundColor = (obj) => {
    console.log({ obj })
    let index = obj.color.indexOf(')')
    if (obj.color.indexOf(')') !== -1) {
        let backgroundColor = obj.color.slice(4, index)
        return `rgba(${backgroundColor}, 0.26)`;
    }
    if (obj.color.indexOf('#') !== -1) {
        return `${obj.color}42`
    }
    else {
        return 'white'
    }

}

const OneCheckbox = ({ obj ,set}) => {
    console.log({ obj })
    // console.log({set},'set');
    const { setCheckList } = useContext(ListContext)
    const css = useStyles()


    const isChecked = () => {
        setCheckList({ action: listActions.CHECKITEM, value: obj.item })
    }

    const checkedToDb = () => {
        console.log('helooooowwwwwwwwwwwwwwwwww');
    }

    return <>
        <div className={css.out}>
        {console.log({set},'set')}
            {
                <div key={obj.text} className={css.wrapper} id={obj.item.color} style={{ borderTopColor: obj.item.color, backgroundColor: obj.checked ? setbackgroundColor(obj.item) : 'white' }} onClick={isChecked} onMouseDown={set.set}>

                    <div className={`${obj.item.color}`}>
                        <span className={css.span}>{obj.item.text}</span>
                    </div>
                </div>
            }
        </div>
    </>
}
export default OneCheckbox;

