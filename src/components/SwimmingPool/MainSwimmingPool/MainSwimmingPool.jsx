import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllPools } from '../../../store/swimmingPools'
import Table from "../../../basic-components/DynamicTable/Table/Table";
import SwimmingPoolForm from "../SwimmingPoolForm/SwimmingPoolForm";
import { cellElementOptions } from "../../../basic-components/DynamicTable/Td/Td";



const poolActions = {
    ADD: 'add',
    UPDATE: 'update',
    REMOVE: 'remove'

}

const updatePool = (state, item) => {
    const { action, value } = item

    switch (action) {
        case poolActions.ADD:
            state = [...state, value]
            break;
        case poolActions.REMOVE:
            state.splice(state.findIndex(p => p.id === value.id), 1)
            state = [...state]
            break;
        case poolActions.UPDATE:
            console.log({ action, value })
            console.log({ state })
            state = state.map(item => item.id === value.id ? value : item)
            console.log({ state })
            break;
        default:
            console.log('default in switch');
            break;
    }
    return state
}

const tableConfig = {
    headers: [{ key: 'name', header: 'שם הבריכה' }, { key: 'address', header: 'כתובת' }, { key: 'color', header: 'צבע' }],
    hideKeys: ['id', 'addedDate', 'userName', 'disabled', 'disabledDate', 'disableUser', 'disableReason'],
    convertKeys: [],
    keyElements: [{ key: 'color', element: cellElementOptions.colorLabel }]
}

const MainSwimmingPool = () => {
    const dispatch = useDispatch()
    const pools = useSelector(state => state.SwimmingPools.pools)
    // const [pools, setPools] = useReducer(updatePool, [])
    const [onePool, setOnePool] = useState({})
    const [insert, setInsert] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(getAllPools('/pool/getAll'))
    }, [dispatch]);

    const updateFunc = useCallback((data) => {
        console.log({ data })
        setShowModal(true)
        setInsert(false)
        setOnePool(data.id)
    }, [])

    // const deleteFunc = useCallback(
    //     async (tr) => {
    //         let body = { poolName: tr[0], poolAddress: tr[1], status: 'remove' }
    //         const response = await postData('/pool/delete', { poolName: tr[0] })
    //         let ans = JSON.stringify(response)
    //         if (ans) {
    //             setPools({ action: poolActions.REMOVE, value: body })
    //         }
    //     }, [])

    const confirm = useCallback(async (data) => {
        if (insert) {
            //  בדיקות ולידציה ???
            // let body = { poolName: poolName, poolColor: poolColor, poolAddress: poolAddress, status: 'add' }
            // if (pools.find(p => p.poolName === data.name) === undefined) {
            //     const response = await postData('/pool/add', data)
            //     if (response)
            //         setPools({action:poolActions.ADD, value:data})
            // }
            // else
            //     sameName()
        }
        else {

            // console.log({ data })
            // if (pools.find(p => p.name === data.name) !== undefined) {
            //     sameName()
            // }
            // else {
            //     const response = await postData('/pool/update', data)
            //     console.log(response);
            //     if (response.status === 204) {
            //         setPools({action:poolActions.UPDATE, value:data})
            //     }
            // }
        }
        closeModal()
    }, [])

    const openModal = () => {
        console.log('modal')
        setInsert(true)
        setShowModal(true)
        setOnePool(0)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    function sameName() {
        console.log('there is a pool with a same name');
    }
    return <>
        <h1>בריכות</h1>
        <button onClick={openModal}>הוספת בריכה חדשה</button>
        {showModal ?
            <SwimmingPoolForm id={onePool} insert={insert} confirm={confirm} cancel={closeModal}></SwimmingPoolForm> : <></>}
        <Table config={tableConfig} data={pools} updateFunc={updateFunc} ></Table>
        {/* <Table config={tableConfig} data={tableData} updateFunc={updateFunc} deleteFunc={deleteFunc}></Table> */}

    </>
}



export default MainSwimmingPool