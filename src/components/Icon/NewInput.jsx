import React from "react"
import { createUseStyles } from "react-jss"
const useStyles = createUseStyles({
    space: {
        width: '48px',
        height: '48px'
    }
})

const NewInput = ({text}) => {
    console.log("in NewInput");
    const css = useStyles()
    return <>
        <input type="text" value={text} />
        <div className={css.space}></div>
    </>
}
export default NewInput