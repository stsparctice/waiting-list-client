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

const OneCheckbox = ({ obj, set }) => {
    const { setCheckList } = useContext(ListContext)
    const css = useStyles()
    const checkOption = () => {
        if (!obj.item.disabled)
            setCheckList({ action: listActions.CHECKITEM, value: obj.item })
    }

    return <>
        <div className={css.out}>
            {
                <div key={obj.text} className={css.wrapper} id={obj.item.color} style={{ borderTopColor: obj.item.disabled?'rgb(92,92,92)': obj.item.color, backgroundColor: obj.checked ? setbackgroundColor(obj.item) : 'white' }}
                    onClick={checkOption} onMouseDown={set.set}>

                    <div className={`${obj.item.color}`}>
                        {
                            obj.item.text ? <>
                                <span className={css.span}>{obj.item.text}</span>
                            </> : <span className={css.span}>{obj.item.name}</span>
                        }
                    </div>
                </div>
            }
        </div>
    </>
}
export default OneCheckbox;

