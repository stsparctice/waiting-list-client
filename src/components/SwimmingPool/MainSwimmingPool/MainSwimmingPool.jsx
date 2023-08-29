import React, { useCallback, useEffect, useState, useRef, useReducer } from "react";
import { getData, postData } from "../../../services/axios";
import Table from "../../../basic-components/DynamicTable/Table/Table";
import SwimmingPoolForm from "../SwimmingPoolForm/SwimmingPoolForm";
import { cellElementOptions } from "../../../basic-components/DynamicTable/Td/Td";
// import '../../OpenModalStyle.css'

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
            state = state.map(item => item.id === value.id ? value : { ...item })
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

    const [pools, setPools] = useReducer(updatePool, [])
    const [onePool, setOnePool] = useState({})
    const [tableData, setTableData] = useState([])
    const [insert, setInsert] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const response = await getData('/pool/getAll')

            setTableData(response)
        }
        fetchData();
    }, []);

    const updateFunc = useCallback((data) => {
        console.log({ data })
        setShowModal(true)
        setInsert(false)
        setOnePool(data)
    }, [])
    const deleteFunc = useCallback(
        async (tr) => {
            let body = { poolName: tr[0], poolAddress: tr[1], status: 'remove' }
            const response = await postData('/pool/delete', { poolName: tr[0] })
            let ans = JSON.stringify(response)
            if (ans) {
                setPools({ action: poolActions.REMOVE, value: body })
                console.log(pools);
            }
        }, [])

    const confirm = useCallback(async (data) => {
        console.log({ data });
        console.log('insert', insert);
        if (insert) {
            console.log({ data })
            //  בדיקות ולידציה ???
            // let body = { poolName: poolName, poolColor: poolColor, poolAddress: poolAddress, status: 'add' }
            if (pools.find(p => p.poolName === data.name) === undefined) {
                const response = await postData('/pool/add', data)
                console.log('after added', response);
                if (response)
                    setPools({action:poolActions.ADD, value:data})
            }
            else
                sameName()
        }
        else {

            console.log({ data })
            if (pools.find(p => p.name === data.name) !== undefined) {
                sameName()
            }
            else {
                const response = await postData('/pool/update', data)
                console.log('response in confirm, update  ', response);
                if (response) {
                    setPools({action:poolActions.UPDATE, value:data})
                }
                console.log('after update ', pools);
            }
        }
        closeModal()
    }, [insert],)

    const openModal = () => {
        console.log('modal')
        setInsert(true)
        setShowModal(true)
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
            <SwimmingPoolForm data={onePool} insert={insert} confirm={confirm} cancel={closeModal}></SwimmingPoolForm> : <></>}
        <Table config={tableConfig} data={tableData} updateFunc={updateFunc} deleteFunc={deleteFunc}></Table>

    </>
}



export default MainSwimmingPool