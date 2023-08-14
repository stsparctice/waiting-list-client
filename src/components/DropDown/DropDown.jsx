import { useState } from "react"
import { createUseStyles } from "react-jss"
import AddClass from "./AddClass"
import React, { useContext } from "react"
import PoolTableContext from "../../contexts/PoolTable"
const useStyle = createUseStyles({
    wrapper: {
        width: '150px',
        height: '30px',
        backgroundColor: 'floralwhite'

    },

    title:{
        backgroundColor:'yellow',
        color:'black',

    },
    space:{
        display:'flex',
        direction:'rtl',
        justifyContent:'space-evenly',

    }

})

const DropDown = ({ thedetails }) => {
    const css = useStyle()
    const [choos, setChoos] = useState()
    const { setData } = useContext(PoolTableContext)


    const toChange = (ev) => {
       thedetails.forEach(elem => {
            if(elem.poolName==ev.target.value){
                setData({pool:elem})
            }
       })
       
    }
    return <>
    <div className={css.space}><h1 className={css.title}>שעות פעילות קבוצתיות בבריכה</h1></div>
        <div >
            <select id="gender" onChange={(ev) => toChange(ev)} className={css.wrapper}>
                {
                    thedetails.map(ele => (<AddClass name={ele.poolName} color={ele.poolColor} key={ele.poolName} />))
                }
            </select>
        </div>
        <br />


    </>
}
export default DropDown