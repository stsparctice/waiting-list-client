import React, {  useEffect,  useState , memo} from "react";
import { createUseStyles } from "react-jss";
import icons from "../../services/iconService";
const useStyles = createUseStyles({

    btn: {
        cursor: "pointer",
        padding: [3],

        background: 'none',
        
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'transparent',
        transitionDuration: '0.3s',
        transitionProperty: 'all',
        transitionTimingFunction: 'linear',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)'
        },

        '& figure': {
            padding: 0,
            margin: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& img': {
            objectFit: 'contain',
        }

    }
   



})


const ButtonIcon = ({ imgName, title, func, btnStyle}) => {

    const [imageSrc, setImageSrc] = useState()
    const css = useStyles()

    const {width, height, imgheight, imgwidth} = btnStyle
    useEffect(() => {
        setImageSrc(imgName)
    }, [imgName])

    return <>
        <button className={css.btn} style={{height, width}} title={title} onClick={func} >
            <figure>
                <img src={imageSrc} alt="" style={{height:imgheight, width:imgwidth}} />
            </figure>
        </button>

    </>
}
export default memo(ButtonIcon);