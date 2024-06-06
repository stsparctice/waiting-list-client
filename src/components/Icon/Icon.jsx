import React from "react"
import { createUseStyles } from "react-jss"
import add from '../../assets/add.png'
import deleteImg from '../../assets/delete-red.png'
import details from '../../assets/details.png'
import edit from '../../assets/edit.png'
import exclamationMark from '../../assets/exclamationMark.png'
import find from '../../assets/find.png'
import vi from '../../assets/vi.png'
import empty from '../../assets/empty.png'

const images = {
    add: add,
    deleteImg: deleteImg,
    details: details,
    edit: edit,
    exclamationMark: exclamationMark,
    find: find,
    vi: vi,
    empty: empty
}

const useStyles = createUseStyles({
    wrapper: {
        // display: 'flex',
        // justifyContent:'space-around',
        // alignItems:'center'
    },
    comp: {
        width: '50%'
    },
    space: {
        width: '48px',
        height: '48px'
    }
})

const Icon = ({ imgName, funcDelete, funcDetails}) => {
    const css = useStyles()
    return <>
        <div className={css.wrapper} >
            {
                imgName === 'deleteImg' ?
                    <img src={images[imgName]} alt={imgName} className={css.img} onClick={() => funcDelete()} /> :
                    <img src={images[imgName]} alt={imgName} className={css.img} onClick={() => funcDetails()} />
            }

        </div>
    </>
}
export default Icon