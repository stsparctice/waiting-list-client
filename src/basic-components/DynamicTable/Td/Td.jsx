import React from "react";

import { createUseStyles } from "react-jss";
import ColorLabel from "../../ColorLabel/ColorLabel";


export const cellElementOptions = {
    colorLabel: 'colorLabel'
}

const useStyles = createUseStyles({
    td: {
        border: '1px solid black'
    }
})

const cellElements = {
    colorLabel: (color, text) => 
         (<ColorLabel backgroundColor={color} text={text}></ColorLabel>)
    

}

const Td = ({ datacell }) => {
    const css = useStyles()

    const getCellElement = (keyElement) => {
        const func = cellElements[keyElement]
        return func(datacell.value, '')
    }

    return <>
        <td className={css.td}>
            {

                datacell.element ? getCellElement(datacell.element) : datacell.value
            }
        </td>
    </>
}

export default Td;