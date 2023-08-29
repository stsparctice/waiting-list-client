import React, {  useEffect,  useState } from "react";
import { createUseStyles } from "react-jss";
import '../../../styles/Form.css'
import '../../../styles/Modal.css'

import FormButton from '../../../basic-components/FormButton/FormButton'
import ButtonIcon, { icons } from "../../../basic-components/ButtonIcon/ButtonIcon";

const useStyles = createUseStyles({
    lefticon: {
        float: "left"
    }

});

const SwimmingPoolForm = ({ insert,data, confirm, cancel }) => {
    const css = useStyles();

    // const [oldName, setOldName] = useState(name)
    const [poolName, setPoolName] = useState('');
    const [poolColor, setPoolColor] = useState('#FFFFFF');
    const [poolAddress, setPoolAddress] = useState('');

    const confirmForm = () => {
        console.log({ poolName, poolAddress, poolColor })
        data.name = poolName
        data.address = poolAddress
        data.color = poolColor
        confirm(data)
    }

    useEffect(() => {
        console.log({insert,data})
       setPoolName(insert?'':data.name)
       setPoolColor(insert?'#000000':data.color)
       setPoolAddress(insert?'':data.address)
    }, [ insert, data])



    return <>
        <div className="modal" >
            <div className="form-wrapper container">
                <div className={css.lefticon}>
                    <ButtonIcon title="סגור" func={() => cancel()} imgName={icons.CLOSE} height="40px" width="40px" imageSize={{ height: "20px", width: "20px" }}></ButtonIcon>
                </div>
                <h2>
                    {insert ? <span>בריכה חדשה</span> : <span>עדכון בריכה</span>}
                </h2>


                <div className="form">
                    <p className="input-row">
                        <label className={css.label}>שם בריכה: </label>
                        <input type="text" value={poolName} onInput={(e) => setPoolName(e.target.value)}></input>
                    </p>
                    <p className="input-row">
                        <label className={css.label}>כתובת הבריכה: </label>
                        <input type="text" value={poolAddress} onInput={(e) => setPoolAddress(e.target.value)}></input>
                    </p>
                    <p className="input-row">
                        <label className={css.label}>צבע הבריכה: </label>
                        <input type="color" value={poolColor} onInput={(e) => setPoolColor(e.target.value)}></input>
                    </p>
                    <div className="button-row">
                        <FormButton text="אישור" func={confirmForm}></FormButton>
                        <FormButton text="ביטול" func={cancel}></FormButton>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SwimmingPoolForm