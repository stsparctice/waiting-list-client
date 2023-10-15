import React, { memo } from "react"
import { createUseStyles } from "react-jss"
import add from '../../assets/add.png'
import details from '../../assets/details3.png'
import edit from '../../assets/edit3.png'
import exclamationMark from '../../assets/exclamationMark.png'
import find from '../../assets/find.png'
import vi from '../../assets/vi.png'
import empty from '../../assets/empty.png'
import stethoscope from "../../assets/stethoscope.png"
import telephone from "../../assets/telephone.png"
import user from "../../assets/user.png"
import excel from "../../assets/excel.png"
import Close from "../../assets/Close.png"

const images = {
    add: add,
    details: details,
    edit: edit,
    exclamationMark: exclamationMark,
    find: find,
    vi: vi,
    empty: empty,
    stethoscope: stethoscope,
    telephone: telephone,
    user: user,
    excel: excel,
    close: Close
}

const useStyles = createUseStyles({
    wrapper: {

    }

})

const IconButton = ({ imgName, func }) => {
    const css = useStyles()
    return <>
        <div className={css.wrapper}>
            <img src={images[imgName]} alt={imgName} className={css.img} onClick={func} />
        </div>
    </>
}

export default IconButton