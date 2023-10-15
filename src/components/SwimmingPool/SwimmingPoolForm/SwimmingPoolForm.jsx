import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addSwimmingPool, selectById, updateSwimmingPool } from '../../../store/swimmingPools'
import { createUseStyles } from "react-jss";
import '../../../styles/Form.css'
import '../../../styles/Modal.css'

import TextButton from '../../../basic-components/TextButton/TextButton'
import ButtonIcon from "../../../basic-components/ButtonIcon/ButtonIcon";
import icons from "../../../services/iconService";

const useStyles = createUseStyles({
    lefticon: {
        float: "left"
    }

});

const SwimmingPoolForm = ({ insert, id, confirm, cancel }) => {
    const dispatch = useDispatch()
    const css = useStyles();
    const onePool = useSelector(state => state.SwimmingPools.onePool)
    const [poolName, setPoolName] = useState('');
    const [poolColor, setPoolColor] = useState('#5214f4');
    const [poolAddress, setPoolAddress] = useState('');

    const confirmForm = () => {

        console.log({ poolName, poolAddress, poolColor })
        if (insert) {
            const data = {
                name: poolName,
                address: poolAddress,
                color: poolColor
            }
            dispatch(addSwimmingPool(data))
        }
        else {
            const data = {
                ...onePool,
                name: poolName,
                address: poolAddress,
                color: poolColor
            }
            dispatch(updateSwimmingPool(data))
        }
        confirm()
    }

    useEffect(() => {
        dispatch(selectById(id))
    }, [dispatch, id])

    useEffect(() => {
        console.log({ onePool })
        if (id !== 0) {
            setPoolName(onePool.name)
            setPoolColor(onePool.color)
            setPoolAddress(onePool.address)
        }
        else {
            setPoolName('')
            setPoolColor('#000000')
            setPoolAddress('')
        }
    }, [id, onePool])



    return <>
        <div className="modal" >
            <div className="form-wrapper container">
                <div className={css.lefticon}>
                    <ButtonIcon title="סגור" func={() => cancel()} imgName={icons.CLOSE}  btnStyle={{ imgwidth: "20px", imgheight: "20px", height: "40px", width: "40px" }}></ButtonIcon>
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
                        <TextButton text="אישור" func={confirmForm}></TextButton>
                        <TextButton text="ביטול" func={cancel}></TextButton>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default memo(SwimmingPoolForm)