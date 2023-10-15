import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({

})

const DropDown = ({name, arr }) => {

    const css = useStyles()

    return <>
        <p>
        <label >{name}:</label>
            <select name={name}>
                    {
                        arr.map(a => (
                            <option key={a} value={a}>{a}</option>
                        ))
                    }
            </select>
        </p>
    </>
}
export default DropDown;

