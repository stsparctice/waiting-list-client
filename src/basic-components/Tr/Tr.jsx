import React from "react";

import { createUseStyles } from "react-jss";
import Icon from "../Icon/Icon";
import Td from "../Td/Td";
import Th from "../Th/Th";

const useStyles = createUseStyles({
    tr: {

    }
})

const Tr = ({ tr, type, backgroundColor, updateFunc, deleteFunc }) => {
    const css = useStyles()
    return <>
        <tr className={css.tr} style={{ backgroundColor: backgroundColor }}>
            {type === 'td' ? tr.map(t => <Td key={t} td={t}></Td>) : tr.map(t => <Th key={t} th={t}></Th>)}
            {type === 'td' ? <Td key={'delete'} td={<Icon imgName={'deleteImg'} deleteFunc={() => deleteFunc(tr)}></Icon>}></Td> : <Th key={'delete'} th={''}></Th>}
            {type === 'td' ? <Td key={'details'} td={<Icon imgName={'edit'} updateFunc={() => updateFunc(tr, backgroundColor)}></Icon>}></Td> : <Th key={'details'} th={''}></Th>}
        </tr>
    </>
}

export default Tr;