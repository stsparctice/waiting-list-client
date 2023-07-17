import React, { useEffect, useRef, useState, useReducer, useCallback } from "react";
import { createUseStyles } from "react-jss";
import { getData, postData } from "../../../services/axios";
import InsertForm from "../InsertForm/InsertForm";
import Table from "../../../basic-components/Table/Table";
import '../../OpenModalStyle.css'

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

const MainGender = () => {
    const css = useStyles();

    const [genders, setGenders] = useReducer(updateGenders, [])
    const [th] = useState(['name', 'sex', 'mmaxAge', 'fmaxAge'])
    // const [th] = useState({ name: 'שם בריכה', sex: 'מין', mmaxAge: 'גיל מקסימלי בנים', fmaxAge: 'גיל מקסימלי בנות' })
    const [style, setStyle] = useReducer((state, item) => [...state, item], [])
    const insertGenderRef = useRef()
    const [newresponse, setNewresponse] = useReducer((state, item) => {
        console.log('state', state);
        return [...state, item]
    }, [])

    // useEffect(() => {
    //     async function refresh() {
    //         const response = await getData('/gender/getAll')
    //         response.forEach((e,index) => {
    //             setStyle(e['genderColor'])
    //             let detail = []
    //             for (let key in e) {
    //                 if (Object.keys(th).indexOf(key) > -1) {
    //                     detail.push(key)
    //                     delete response[index][key]
    //                 }
    //             }
    //             console.log('details', detail);
    //             setNewresponse(e)
    //         });
    //         console.log('+_+++++++++++response++++++++++', response);
    //         // setGenders(response)
    //         console.log('newresponse',newresponse);
    //         setGenders(newresponse)
    //         insertGenderRef.current.style.display = 'none'
    //     }
    //     refresh();
    // }, []);

    useEffect(() => {
        async function refresh() {
            const response = await getData('/gender/getAll')
            console.log('response', response);
            let style = response.map(r => {
                console.log('r',r);
                
            })
            console.log('style', style);
            insertGenderRef.current.style.display = 'none'
        }
        refresh();
    }, []);

    const updateFunc = useCallback((tr, color) => {
        console.log('update');
        console.log('tr', tr);
        console.log('color', color);
        // setTrDetails({ name: name, color: color, address: address })
        // setInsert(false)
        // insertGenderRef.current.style.display = 'block'
    }, [])
    const deleteFunc = useCallback(async (tr) => {
        console.log('delete', tr);
        const response = await postData('/gender/delete', { name: tr[0] })
        let ans = JSON.stringify(response)
        if (ans) {
            setGenders([{ name: tr[0], status: 'remove' }])
        }
    }, [])
    function openInsert() {
        insertGenderRef.current.style.display = 'block'
    }
    const cancel = useCallback(() => {
        insertGenderRef.current.style.display = 'none'
    }, [],)
    const confirm = useCallback(async (name, sex, mmaxAge, fmaxAge, genderColor) => {
        insertGenderRef.current.style.display = 'none'
        let body = { name: name, sex: sex, mmaxAge: mmaxAge, fmaxAge: fmaxAge, genderColor: genderColor }
        //  בדיקות ולידציה
        if (mmaxAge && fmaxAge)
            body.sex = ''
        if (!mmaxAge)
            body.mmaxAge = ''
        if (!fmaxAge)
            body.fmaxAge = ''
        console.log('body', body);
        const response = await postData('/gender/add', body)
        if (response) {
            body['status'] = 'add'
            setGenders([body])
        }
    }, [])
    return <>
        <div className={css.mainGender}>
            <h1>welcome to gender...</h1>
        </div>
        <button onClick={openInsert}>insert new gender</button>
        <div ref={insertGenderRef}>
            <InsertForm confirm={confirm} cancel={cancel}></InsertForm>
        </div>
        <Table th={['שם הקבוצה', 'מין', 'גיל מקסימלי בנים', 'גיל מקסימלי בנות']} tbody={genders} style={style} updateFunc={updateFunc} deleteFunc={deleteFunc}></Table>
    </>
}

const updateGenders = (state, item) => {
    item.forEach(i => {
        switch (i.status) {
            case undefined:
                console.log('undefined---');
                state = [...state, i]
                break;
            case 'add':
                console.log('added-------');
                delete i.status
                state = [...state, i]
                break;
            case 'remove':
                console.log('removed------');
                delete i.status
                state.splice(state.findIndex(g => g.name === i.name), 1)
                state = [...state]
                break;
            case 'update':
                console.log('update-------');
                delete i.status
                state[state.findIndex(p => p.name === i.oldName)] = i
                delete i.oldPoolName
                state = [...state]
                break;
            default:
                console.log('default in switch');
                break;
        }
    });
    console.log(state);
    return state
}

export default MainGender