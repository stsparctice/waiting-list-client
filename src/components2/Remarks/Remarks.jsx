import React, { useCallback, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import dw3 from "../../assets/dw3.png"
import g3 from "../../assets/g3.png"
import { server } from "../../services/axios";
import ShowRemark from "../ShowRemark/ShowRemark";

const useStyles = createUseStyles({
    All: {
        marginRight: "30px",
        direction: "rtl",
        marginTop: "50px"
    },
    up: {
        display: "flex",
        flexDirection: "row"
    }
    , AllRemarks: {
        marginLeft: "500px"

    },
    buttonNew: {
        width: "33px",
        height: "25px",
        backgroundColor: "black",
        color: "white",
        padding: "6px",
        cursor: 'pointer'
    },
    hrr: {
        marginRight: "0px",
        width: "700px"
    },
    spanDeatails: {
        marginLeft: "40px"
    },
    spanDeatailsTrue: {
        marginLeft: "500px",
    },
    input: {
        display: "block",
        marginTop: "15px",
        marginBottom: "15px",
        width: "700px",
        height: "25px"
    },
    buttonafter: {
        marginLeft: "2px",
        width: "25px",
        height: "30px",
        backgroundColor: "black",
        color: "white",
        padding: "5px",
        cursor: 'pointer',
    },
    buttonafterB: {
        marginLeft: "2px",
        // marginBottom:"1px",
        width: "50px",
        height: "30px",
        backgroundColor: "black",
        color: "white",
        padding: "5px",
        cursor: 'pointer',
        fontSize: "100%"
    },
    AllbuttonsTrue: {
        marginRight: "230px",
        display: "flex",
        flexDirection: "row"
    },
    sortReamarxButton1: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "rgb(245, 218, 168)",
        fontWeight: "bold",
        width: "130px",
        height: "40px",
        marginLeft: "7px",
        color: "white",
        border: "2px orange solid",
        marginBottom: "25px"
    }, sortReamarxButton2: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        fontWeight: "bold",
        width: "130px",
        height: "40px",
        marginRight: "7px",
        color: "rgb(131, 194, 4) ",
        border: "2px rgb(131, 194, 4) solid",
        marginBottom: "25px"
    },
})

const Remarks = ({ id, sendRemarks }) => {
    const successRef = useRef()
    const [remarks, setRemarks] = useState([])
    const [remark, setRemark] = useState('')
    const [placing, setPlacing] = useState('')
    const [flagClick, setFlagClick] = useState('false');

    let date = new Date()
    let allDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    const css = useStyles()

    const changeFlagClick = () => {
        setFlagClick('true')
    }

    useEffect(
        () => {
            const getDataFromSerevr = async () => {
                await Promise.all([sendToMongo].map(func => func()))
            }

            const sendToMongo = async () => {
                if (id === '') {
                    // document.querySelector('#help').innerHTML = "אחד מן הפרטים חסר";
                    return
                }
                let response = await server.get(`/patient/findPatientesByFeature/id/${id}`)
                if (response.data.length > 0) {
                    console.log(response.data);
                    setRemarks(response.data[0].remarks)
                }
            }
            getDataFromSerevr()
        }, [])

    const addRemark = async () => {
        if (remark === '') {
            successRef.current.innerHTML = "חסרה הערה"
        }
        else {
            // const res = await server.post('/patient/updateAnArray', { id: id, remark: { text: remark, user: "בועות", placing, date: date.toISOString() } })
            setRemarks(...remarks, { text: remark, user: "בועות", placing, date: date.toISOString() })
            // successRef.current.innerHTML = "ההערה נשמרה בהצלחה"
            sendRemarks(remarks)
            setFlagClick('false')
            setRemark('')
            setPlacing('')
            // returnRemarks(remarks)
            // console.log(remarks);
        }
    }

    const removeRemark = useCallback((remarkText) => {
        setRemarks(remarks.filter(r => r.text !== remarkText))
    })

    const returnRemarks = async () => {
        sendRemarks(remarks)
        // const res = await server.post('/patient/basicupdate', { obj1: { id: id }, obj2: { remarks: remarks } })
    }

    return <>
        <div className={css.All}>
            <div className={css.up}>
                <span className={css.AllRemarks}>כל הערות</span>

                {flagClick === 'false' ?
                    <span className={css.buttonNew} onClick={changeFlagClick}>חדש</span> :
                    flagClick === 'true' ?
                        <div>
                            <button className={css.buttonafterB} onClick={addRemark}>אישור</button>
                            <span className={css.buttonafter} onClick={(_) => { setRemark('') }}>ביטול</span>
                        </div>
                        :
                        ""}
            </div>
            <hr className={css.hrr}></hr>
            {
                flagClick === 'true' ?
                    <div>
                        <span className={css.spanDeatailsTrue}>הערה</span>
                        <span className={css.spanDeatailsTrue} style={{ fontWeight: "bold" }}>{allDate}</span>
                        <input type="text" className={css.input} value={remark} onChange={(e) => (setRemark(e.target.value))} />

                        <div className={css.AllbuttonsTrue}>
                            <span className={css.sortReamarxButton1} onClick={(_) => { setPlacing('תיעוד') }}>
                                <img src={dw3} style={{ padding: "5px 0 5px 5px" }} />
                                <span style={{ fontSize: "14px", marginTop: "11px", marginRight: "0px" }}>הערת תיעוד</span>
                            </span>
                            <span className={css.sortReamarxButton2} onClick={(_) => { setPlacing('שיבוץ') }}>
                                <img src={g3} style={{ padding: "5px 0 5px 5px" }} />
                                <span style={{ fontSize: "14px", marginTop: "11px", marginRight: "0px" }}>הערת שיבוץ</span>
                            </span>
                        </div>

                    </div>
                    :
                    ""}
            <p ref={successRef}></p>
            <div style={{ width: "700px" }}>
                {
                    remarks.length > 0 ?
                        <> {
                            remarks.map(r => (<ShowRemark key={r.text} remark={r} removeRemark={removeRemark}></ShowRemark>))
                        }
                        </> : ""
                }
            </div>
        </div>
    </>
}
export default Remarks;