import React from "react";

import { createUseStyles } from "react-jss";
import TableRow from "../TableRow/TableRow";
import TableHeader from "../TableHeader/TableHeader";


const useStyles = createUseStyles({
    table: {
       margin:'auto',
        width: '70%',
        textAlign: 'center',
        direction: 'rtl',
        borderCollapse:'collapse', 
       
    }
})

const Table = ({ config,data, updateFunc, deleteFunc }) => {
    const css = useStyles()
    return <>
        { }
        <table className={css.table}>
            <thead>
                {
                    <TableHeader headers={config.headers}></TableHeader>
                }
            </thead>
            <tbody>
                {data ?
                    data.map((item, index) => (
                        <TableRow key={index} data={item}  config={config} updateFunc={updateFunc} deleteFunc={deleteFunc}>
                            
                        </TableRow>
                    )) : ''}
            </tbody>
        </table>
    </>
}

export default Table;