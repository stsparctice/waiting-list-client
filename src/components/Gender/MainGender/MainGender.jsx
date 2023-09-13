import React, { useEffect, useState, useCallback } from "react";
import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from 'react-redux'
import { getAllGenders, deleteGender } from "../../../store/genders";
import DeleteForm from "../../DeleteForm/DeleteForm";
import Table from "../../../basic-components/DynamicTable/Table/Table";
import { cellElementOptions } from "../../../basic-components/DynamicTable/Td/Td";
import { stateStatus } from "../../../store/storeStatus";
import GenderForm from "../GenderForm/GenderForm";

const useStyles = createUseStyles({
    mainGender: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    insertGender: {
        textDecoration: 'none',
        border: '3px solid black',
        height: '5%'
    },
    table: {
        marginLeft: '15%',
        width: '70%',
        textAlign: 'center',
        direction: 'rtl',
        border: '1px solid black'
    },
    th: {
        width: '24%',
        border: '1px solid black'
    },
    th2: {
        width: '4%'
    }
})

const tableConfig = {
    headers: [
        { key: 'name', header: 'שם הקבוצה' },
        { key: 'color', header: 'צבע' },
        { key: 'maxAge1', header: 'גיל מקסימלי בנים' },
        { key: 'maxAge2', header: 'גיל מקסימלי בנות' }],
    hideKeys: ['id', 'sex1', 'sex2', 'addedDate', 'userName', 'disabled', 'disabledDate', 'disableUser', 'disableReason'],
    convertKeys: [{
        key: 'maxAge1', value: 0, display:'-'
    }, {
        key: 'maxAge2', value: 0, display:'-'
    }],
    keyElements: [{ key: 'color', element: cellElementOptions.colorLabel }]
}

const MainGender = () => {
    const css = useStyles();
    const dispatch = useDispatch()
    const genders = useSelector(state => state.Genders.genders)
    const genderStatus = useSelector(state => state.Genders.status)
    const [selectedGender, setSelectedGender] = useState({})
    const [deleteGenderGroup, setDeleteGenderGroup] = useState(undefined)
    const [insert, setInsert] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    useEffect(() => {
        if (genderStatus === stateStatus.EMPTY)
            dispatch(getAllGenders())
    }, [dispatch, genderStatus]);

    const updateFunc = useCallback((data) => {
        console.log({ data })
        setShowModal(true)
        setInsert(false)
        setSelectedGender(data.id)
    }, [])
    const deleteFunc = useCallback((data) => {
        console.log({ data })
        setShowDeleteModal(true)
        setInsert(false)
        setDeleteGenderGroup({ data, name: data.name, title: 'קבוצה', deleteFunc: deleteGender })
    }, [])
    const openModal = () => {
        console.log('modal')
        setInsert(true)
        setShowModal(true)
        setSelectedGender(0)
    }

    const cancel = useCallback(() => {
        setShowModal(false)
        setShowDeleteModal(false)
    }, [],)
    const confirm = useCallback(() => {
        setShowModal(false)
        setShowDeleteModal(false)
    }, [])
    return <>
        <div className={css.mainGender}>
            <h1>קבוצות</h1>
        </div>
        <button onClick={openModal}>הוספת קבוצה</button>
        {
            showModal ? <GenderForm id={selectedGender} insert={insert} confirm={confirm} cancel={cancel}></GenderForm> : <></>
        }
        {showDeleteModal ?
            <DeleteForm obj={deleteGenderGroup} confirm={confirm} cancel={cancel}></DeleteForm> : <></>
        }
        <Table config={tableConfig} data={genders} updateFunc={updateFunc} deleteFunc={deleteFunc}></Table>
    </>
}


export default MainGender