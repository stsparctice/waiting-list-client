import React, { useCallback, useEffect, useState, useRef, useReducer } from "react";
import { getData, postData } from "../../../services/axios";
import Table from "../../../basic-components/DynamicTable/Table/Table";
import InsertFormSwimmingPool from "../InsertFormSwimmingPool/InsertFormSwimmingPool";
import { cellElementOptions } from "../../../basic-components/DynamicTable/Td/Td";
// import '../../OpenModalStyle.css'

const poolActions = {
    ADD:'add',
    UPDATE:'update',
    REMOVE:'remove'

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
    const insertPoolRef = useRef()
    const [pool, setPool] = useReducer(updatePool, [])
    const [tableData, setTableData] = useState([])
    const [insert, setInsert] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [trDetails, setTrDetails] = useState()

    useEffect(() => {
        async function fetchData() {
            const response = await getData('/pool/getAll')

            setTableData(response)
        }
        fetchData();
    }, []);
    // function updateTBody(arr) {
    //     let style = []
    //     let th = { poolName: 'שם בריכה', poolAddress: 'כתובת הבריכה' }
    //     arr.forEach((e, index) => {
    //         // setStyle(...style,e['poolColor'])
    //         style.push(e['poolColor'])
    //         for (let key in e) {
    //             if (Object.keys(th).indexOf(key) === -1) {
    //                 delete e[key]
    //             }
    //         }
    //     });
    //     setTbody(arr)
    //     setStyle(style)
    // }
    const updateFunc = useCallback((tr, color) => {
        setTrDetails({ name: tr[0], color: color, address: tr[1] })
        setInsert(false)
    }, [])
    const deleteFunc = useCallback(
        async (tr) => {
            let body = { poolName: tr[0], poolAddress: tr[1], status: 'remove' }
            const response = await postData('/pool/delete', { poolName: tr[0] })
            let ans = JSON.stringify(response)
            if (ans) {
                setPool({action:poolActions.REMOVE, value:body})
                console.log(pool);
            }
        }, [])
    const confirm = useCallback(async (oldName, poolName, poolColor, poolAddress) => {
        console.log(oldName, poolName, poolColor, poolAddress);
        console.log('insert', insert);
        if (insert) {
            //  בדיקות ולידציה ???
            let body = { poolName: poolName, poolColor: poolColor, poolAddress: poolAddress, status: 'add' }
            if (pool.find(p => p.poolName === body.poolName) === undefined) {
                const response = await postData('/pool/add', body)
                console.log('after added', response);
                if (response)
                    setPool({action:poolActions.ADD, value:body})
            }
            else
                sameName()
        }
        else {
            if (pool.find(p => p.poolName === poolName) !== undefined) {
                sameName()
            }
            else {
                !poolName ? poolName = oldName : poolName = poolName
                let body = { oldPoolName: oldName, poolName: poolName, poolColor: poolColor, poolAddress: poolAddress }
                const response = await postData('/pool/update', body)
                console.log('response in confirm, update  ', response);
                if (response) {
                    setPool({action:poolActions.REMOVE, value:body})
                }
                console.log('after update ', pool);
            }
        }
    }, [],)
    const cancel = useCallback(() => {
        insertPoolRef.current.style.display = 'none'
    }, [],)

    const openModal = ()=>{
        console.log('modal')
        setShowModal(true)
    }

    const closeModal = ()=>{
        setShowModal(false)
    }

    function openInsert() {
        setInsert(true)
    }
    function sameName() {
        console.log('there is a pool with a same name');
    }
    return <>
        <h1>בריכות</h1>
          <button onClick={openModal}>הוספת בריכה חדשה</button>
          {console.log({showModal})}
        {showModal?
        <InsertFormSwimmingPool  cancel={closeModal}></InsertFormSwimmingPool>:<></>}
        {/* <button onClick={openModal}>הוספת בריכה חדשה</button>
        {showModal?
        (<div >

            {!trDetails ?
                <InsertFormSwimmingPool name={''} color={''} address={''} confirm={confirm} cancel={closeModal}></InsertFormSwimmingPool>
                : <InsertFormSwimmingPool name={trDetails.name} color={trDetails.color} address={trDetails.address} confirm={confirm} cancel={cancel}></InsertFormSwimmingPool>
            }
        </div>):<div></div>} */}
        <Table config={tableConfig} data={tableData} updateFunc={updateFunc} deleteFunc={deleteFunc}></Table>

    </>
}



export default MainSwimmingPool