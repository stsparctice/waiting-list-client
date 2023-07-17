import React from "react";
import { createUseStyles } from "react-jss";
import ButtonIcon from '../ButtonIcon/ButtonIcon'

const useStyles = createUseStyles({
 input:{
    height:'30px',
    width:'200px',
 },
 p:{
    display:'flex',
    marginLeft:'56px',
    margin:15
 },
 label:{
    fontSize:22,
    fontFamily: 'Calibri',
    margin:[4,0,0,3]
    
 }
})

const Input = ({ text ,imgName}) => {
    const css = useStyles()
    return <>
        <p className={css.p}>
        <ButtonIcon imgName={imgName}></ButtonIcon>
            <input type="text"  className={css.input}/>
            <label className={css.label}>:{text}</label>
          
        </p>
    </>
}
export default Input;