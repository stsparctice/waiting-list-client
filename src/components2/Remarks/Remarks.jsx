import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import dw3 from "../../assets/dw3.png"
import g3 from "../../assets/g3.png"
import { server } from "../../services/axios";

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
        fontWeight:"bold",
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
    AllbuttonsTrue: {
        marginRight: "230px",
        display:"flex",
        flexDirection:"row"
    },
    sortReamarxButton1: {
        display:"flex",
        flexDirection:"row",
        backgroundColor: "rgb(245, 218, 168)",
        fontWeight: "bold",
        width: "130px",
        height: "40px",
        marginLeft: "7px",
        color: "white",
        border: "2px orange solid",
        marginBottom:"25px"
    },sortReamarxButton2: {
        display:"flex",
        flexDirection:"row",
        backgroundColor: "white",
        fontWeight: "bold",
        width: "130px",
        height: "40px",
        marginRight: "7px",
        color: "rgb(131, 194, 4) ",
        border: "2px rgb(131, 194, 4) solid",
        marginBottom:"25px"
    },
})

const Remarks = ({ name,featureName }) => {
    const [flagClick, setFlagClick] = useState('false');
    let date = new Date()
    let allDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    console.log("AllDate", allDate);
    // console.log("date",`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`);
    const css = useStyles()
    const changeFlagClick = () => {
        setFlagClick('true')
    }

    const sendToMongo=async ()=>{
        console.log(name)
        console.log(featureName)
                if(featureName==''){
                    // document.querySelector('#help').innerHTML = "אחד מן הפרטים חסר";
                    return
                }
                const getData = async ()=>{
                    let response = await server.get(`/patient/findPatientesByFeature/${name}/${name}`)
                    if(response.data .length ==0){
                        // document.querySelector('#help').innerHTML = "לא נמצאו  נתונים קיימים במערכת"
                    }
                    else{
                        console.log("t",response.data);
                    }
                }
                getData()
            }
    return <>
        <div className={css.All}>
            <div className={css.up}>
                <span className={css.AllRemarks}>כל הערות</span>
                {flagClick === 'false' ?
                    <span className={css.buttonNew} onClick={changeFlagClick}>חדש</span> :
                    flagClick === 'true' ?
                        <div>
                            <span className={css.buttonafter} >אישור</span>
                            <span className={css.buttonafter}>ביטול</span>
                        </div>
                        :
                        console.log("lll")
                }
            </div>
            <hr className={css.hrr}></hr>
            {
                flagClick == 'true' ?
                    <div>
                        <span className={css.spanDeatailsTrue}>הערה</span>
                        <span className={css.spanDeatailsTrue} style={{ fontWeight: "bold" }}>{allDate}</span>
                        <input type="text" className={css.input} />
                        <div className={css.AllbuttonsTrue}>
                            <button className={css.sortReamarxButton1}>
                                <img src={dw3} style={{padding:"5px 0 5px 5px"}}/>
                                <span style={{fontSize:"14px",marginTop:"11px",marginRight:"0px"}}>הערת תיעוד</span>
                            </button>
                            <button className={css.sortReamarxButton2}>
                                <img src={g3} style={{padding:"5px 0 5px 5px"}}/>
                                <span style={{fontSize:"14px",marginTop:"11px",marginRight:"0px"}}>הערת שיבוץ</span>
                            </button>
                        </div>
                    </div>
                    :
                    console.log("fffffff")
            }
            <div>
                {/* <span className={css.spanDeatails}>{RemarksObj.remark}</span>
                <span className={css.spanDeatails}>{RemarksObj.date}</span> */}
            </div>
        </div>
    </>
}
export default Remarks;