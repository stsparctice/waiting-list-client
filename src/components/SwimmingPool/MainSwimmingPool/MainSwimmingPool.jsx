import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllPools, deleteSwimmingPool } from '../../../store/swimmingPools'
import Table from "../../../basic-components/DynamicTable/Table/Table";
import SwimmingPoolForm from "../SwimmingPoolForm/SwimmingPoolForm";
import DeleteForm from "../../DeleteForm/DeleteForm";
import { cellElementOptions } from "../../../basic-components/DynamicTable/Td/Td";
import { stateStatus } from "../../../store/storeStatus";






const tableConfig = {
    headers: [{ key: 'name', header: 'שם הבריכה' }, { key: 'address', header: 'כתובת' }, { key: 'color', header: 'צבע' }],
    hideKeys: ['id', 'addedDate', 'userName', 'disabled', 'disabledDate', 'disableUser', 'disableReason'],
    convertKeys: [],
    keyElements: [{ key: 'color', element: cellElementOptions.colorLabel }]
}

const MainSwimmingPool = () => {
    const dispatch = useDispatch()
    const pools = useSelector(state => state.SwimmingPools.pools)
    const poolsStatus = useSelector(state => state.SwimmingPools.status)
    const [selectedPool, setSelectedPool] = useState({})
    const [deletePool, setDeletePool] = useState(undefined)
    const [insert, setInsert] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        if (poolsStatus === stateStatus.EMPTY)
            dispatch(getAllPools('/pool/getAll'))
    }, [dispatch, poolsStatus]);

    const updateFunc = useCallback((data) => {
        console.log({ data })
        setShowModal(true)
        setInsert(false)
        setSelectedPool(data.id)
    }, [])

    const deleteFunc = useCallback((data) => {
        console.log({ data })
        setShowDeleteModal(true)
        setInsert(false)
        setDeletePool({ data, name: data.name, title: 'בריכה', deleteFunc: deleteSwimmingPool })
    }, [])

    const confirm = useCallback(() => {
        closeModal()
    }, [])


    const openModal = () => {
        console.log('modal')
        setInsert(true)
        setShowModal(true)
        setSelectedPool(0)
    }

    const closeModal = () => {
        setShowModal(false)
        setShowDeleteModal(false)
    }

    return <>
        <h1>בריכות</h1>
        <button onClick={openModal}>הוספת בריכה חדשה</button>
        {showModal ?
            <SwimmingPoolForm id={selectedPool} insert={insert} confirm={confirm} cancel={closeModal}></SwimmingPoolForm> : <></>}
        {showDeleteModal ?
            <DeleteForm obj={deletePool} confirm={confirm} cancel={closeModal}></DeleteForm> : <></>
        }
        <Table config={tableConfig} data={pools} updateFunc={updateFunc} deleteFunc={deleteFunc}></Table>

    </>
}



export default MainSwimmingPool