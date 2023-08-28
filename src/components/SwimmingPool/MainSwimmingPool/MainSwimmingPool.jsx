import React, { useCallback, useEffect, useState, useRef, useReducer } from "react";
import { getData, postData } from "../../../services/axios";
import Table from "../../../basic-components/DynamicTable/Table/Table";
import InsertFormSwimmingPool from "../InsertFormSwimmingPool/InsertFormSwimmingPool";
import '../../OpenModalStyle.css'

const updatePool = (state, item) => {
   
    item.forEach(i => {
        switch (i.status) {
            case 'add':
                console.log('in add++++++++++++++');
                delete i.status
                state = [...state, i]
                break;
            case 'remove':
                console.log('===============');
                delete i.status
                console.log('index', state.findIndex(p => p.poolName === i.poolName));
                console.log('state', state);
                state.splice(state.findIndex(p => p.poolName === i.poolName), 1)
                state = [...state]
                break;
            case 'update':
                delete i.status
                let index = state.findIndex(p => p.poolName === i.oldPoolName)
                state[index] = i
                state = [...state]
                delete i.oldPoolName
                break;
            default:
                console.log('default in switch');
                break;
        }
    });
    return state
}

const tableConfig = {
    headers: [{key:'name', header:'שם הבריכה'},{key:'address', header:'כתובת'} , {key:'color', header:'צבע'}],
    hideKeys:['id', 'addedDate', 'userName', 'disabled', 'disabledDate', 'disableUser', 'disableReason'], 
    convertKeys:[]
}

const MainSwimmingPool = () => {
    const insertPoolRef = useRef()
    const [pool, setPool] = useReducer(updatePool, [])
    const [tableData, setTableData] = useState([])
    const [insert, setInsert] = useState(false)
    const [trDetails, setTrDetails] = useState()

    useEffect(() => {
        async function fetchData() {
            const response = await getData('/pool/getAll')
            setTableData(response)
            insertPoolRef.current.style.display = 'none'
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
        insertPoolRef.current.style.display = 'block'
    }, [])
    const deleteFunc = useCallback(
        async (tr) => {
            let body = { poolName: tr[0], poolAddress: tr[1], status: 'remove' }
            const response = await postData('/pool/delete', { poolName: tr[0] })
            let ans = JSON.stringify(response)
            if (ans) {
                setPool([body])
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
                    setPool([body])
            }
            else
                sameName()
        }
        else {
            if (pool.find(p => p.poolName === poolName) !== undefined) {
                sameName()
            }
            else {
                console.log('in update:)............');
                console.log('oldName', oldName, 'poolName', poolName, 'poolColor', poolColor, 'poolAddress', poolAddress);
                !poolName ? poolName = oldName : poolName = poolName
                let body = { oldPoolName: oldName, poolName: poolName, poolColor: poolColor, poolAddress: poolAddress }
                console.log(body);
                const response = await postData('/pool/update', body)
                console.log('response in confirm, update  ', response);
                if (response) {
                    body['status'] = 'update'
                    setPool([body])
                }
                console.log('after update ', pool);
            }
        }
    }, [],)
    const cancel = useCallback(() => {
        insertPoolRef.current.style.display = 'none'
    }, [],)
    function openInsert() {
        setInsert(true)
        insertPoolRef.current.style.display = 'block'
    }
    function sameName() {
        console.log('there is a pool with a same name');
    }
    return <>
        <h1>בריכות</h1>
        <button onClick={openInsert}>הוספת בריכה חדשה</button>
        <div ref={insertPoolRef}>
            
            {!trDetails ?
                <InsertFormSwimmingPool name={''} color={''} address={''} confirm={confirm} cancel={cancel}></InsertFormSwimmingPool>
                : <InsertFormSwimmingPool name={trDetails.name} color={trDetails.color} address={trDetails.address} confirm={confirm} cancel={cancel}></InsertFormSwimmingPool>
            }
        </div>
        <Table config={tableConfig} data={tableData} updateFunc={updateFunc} deleteFunc={deleteFunc}></Table>

    </>
}



export default MainSwimmingPool