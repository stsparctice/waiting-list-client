import React, { useEffect,  useState,  useCallback } from "react";
import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from 'react-redux'
import { getAllGenders, deleteGender } from "../../../store/genders";
import InsertForm from "../InsertForm/InsertForm";
import DeleteForm from "../../DeleteForm/DeleteForm";
import Table from "../../../basic-components/DynamicTable/Table/Table";
import { cellElementOptions } from "../../../basic-components/DynamicTable/Td/Td";
// import '../../OpenModalStyle.css'

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
    headers: [{ key: 'name', header: 'שם הקבוצה' },{key:'color', header:'צבע'}, { key: 'maxAge1', header: 'גיל מקסימלי בנים' }, { key: 'maxAge2', header: 'גיל מקסימלי בנות' }],
    hideKeys: ['id', 'addedDate', 'userName', 'disabled', 'disabledDate', 'disableUser', 'disableReason'],
    convertKeys: [],
    keyElements: [{ key: 'color', element: cellElementOptions.colorLabel }]
}

const MainGender = () => {
    const css = useStyles();
    const dispatch = useDispatch()
    const genders = useSelector(state => state.SwimmingPools.pools)
    const [selectedGender, setSelectedGender] = useState({})
    const [deleteGenderGroup, setDeleteGenderGroup] = useState(undefined)
    const [insert, setInsert] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    useEffect(() => {
        dispatch(getAllGenders())
    }, [dispatch]);

    const updateFunc = useCallback((data) => {
        console.log({ data })
        setShowModal(true)
        setInsert(false)
        setSelectedGender(data.id)
    }, [])
    const deleteFunc = useCallback( (data) => {
        console.log({ data })
        setShowDeleteModal(true)
        setInsert(false)
        setDeleteGenderGroup({data, name:data.name,title:'קבוצה', deleteFunc : deleteGender })
    }, [])
    const openModal = () => {
        console.log('modal')
        setInsert(true)
        setShowModal(true)
        setSelectedGender(0)
    }

    const closeModal = () => {
        setShowModal(false)
        setShowDeleteModal(false)
    }
    const cancel = useCallback(() => {
    }, [],)
    const confirm = useCallback(() => {
        setShowModal(false)
    }, [])
    return <>
        <div className={css.mainGender}>
            <h1>קבוצות</h1>
        </div>
        <button onClick={openModal}>insert new gender</button>
        {
        showModal? <InsertForm insert={insert} confirm={confirm} cancel={cancel}></InsertForm>:<></>
        }
        {showDeleteModal ?
            <DeleteForm obj={deleteGenderGroup} confirm={confirm} cancel={closeModal}></DeleteForm> : <></>
        }
        <Table config={tableConfig}  tbody={genders}  updateFunc={updateFunc} deleteFunc={deleteFunc}></Table>
    </>
}


export default MainGender