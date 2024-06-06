import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addSwimmingPool, selectById, updateSwimmingPool } from '../../../store/swimmingPools'
import '../../../styles/Form.css'
import '../../../styles/Modal.css'

import TextButton from '../../../basic-components/TextButton/TextButton'
import ButtonIcon from "../../../basic-components/ButtonIcon/ButtonIcon";
import icons from "../../../services/iconService";
import StandartInput from "../../../basic-components/StandartInput/StandartInput";


const SwimmingPoolForm = ({ insert, id, confirm, cancel }) => {
    const dispatch = useDispatch()
    const onePool = useSelector(state => state.SwimmingPools.onePool)
    const [poolName, setPoolName] = useState('');
    const [poolColor, setPoolColor] = useState('#5214f4');
    const [poolAddress, setPoolAddress] = useState('');

    const confirmForm = () => {

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
                <div className="lefticon">
                    <ButtonIcon title="סגור" func={() => cancel()} imgName={icons.CLOSE} btnStyle={{ imgwidth: "20px", imgheight: "20px", height: "40px", width: "40px" }}></ButtonIcon>
                </div>
                <h2>
                    {insert ? <span>בריכה חדשה</span> : <span>עדכון בריכה</span>}
                </h2>


                <div className="form">
                    <StandartInput type="text" text="שם הבריכה" value={poolName} set={(e) => setPoolName(e.target.value)}></StandartInput>
                    <StandartInput type="text" text="כתובת הבריכה" value={poolAddress} set={(e) => setPoolAddress(e.target.value)}></StandartInput>
                    <StandartInput type="color" text="צבע הבריכה" value={poolColor} set={(e) => setPoolColor(e.target.value)}></StandartInput>

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