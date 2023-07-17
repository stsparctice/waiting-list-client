import React from "react";

import { createUseStyles } from "react-jss";
import Tr from "../Tr/Tr";


const useStyles = createUseStyles({
    table: {
        marginLeft: '15%',
        width: '70%',
        textAlign: 'center',
        direction: 'rtl',
        border: '1px solid black'
    }
})

const Table = ({ th, tbody, style,updateFunc, deleteFunc }) => {
    const css = useStyles()
    return <>
        { }
        <table className={css.table}>
            <thead>
                {
                    <Tr tr={th} type={'th'}></Tr>
                    // <Tr key={Object.keys(table[0])} tr={Object.keys(table[0])} type={'th'}></Tr>
                }
            </thead>
            <tbody>
                {tbody ?
                    tbody.map((_, index) => (
                        <Tr key={Object.values(tbody[index])[0]} tr={Object.values(tbody[index])} type={'td'} backgroundColor={style[index]} updateFunc={updateFunc} deleteFunc={deleteFunc}></Tr>
                    )) : ''}
            </tbody>
        </table>
    </>
}

export default Table;