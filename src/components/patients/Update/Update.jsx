import React, { useState } from "react";
// import { createUseStyles } from "react-jss";
import { server } from "../../../services/axios";


const Update = () => {
    const [id, setId] = useState('');
    const [featureName, setFeatureName] = useState('');
    const [featureValue, setFeatureValue] = useState('');
    const sendToMongo = async () => {
        const getData = async () => {
            if(id===''||featureName===''||featureValue===''){
                document.querySelector('#help').innerHTML = "אחד מן הפרטים חסר";
                return
            }
            let response = await server.get(`/patient/findPatientesByFeature/id/${id}`)
            console.log("jkjkj");
            if(response.data.length ===0){
                document.querySelector('#help').innerHTML = "לא נמצא כזה פציינט במערכת";
                return;
            }
            if(response.data[0][featureName]===undefined){
                document.querySelector('#help').innerHTML = "אין מאפיין כזה במערכת";
                return;
            }
            let  obj1 = {}
            obj1['id']=id
            let obj2 = {}
            obj2[featureName]=featureValue
            console.log(obj1);
            console.log(obj2);
            // let ans = await server.post(`/patient/Basicupdate/${obj1}/${obj2}`)
            // let ans = await server.post(`/patient/basicupdate/${featureName}/${response.data[0][featureName]}/${featureValue}`)
            let ans = await server.post('/patient/Basicupdate',{obj1,obj2});
            console.log(ans.data);
        }
        getData()
    }

    return <>
        <h1>Update</h1>
        <p>
            <label>id:</label>
            <input type="text" onInput={(e) => setId(e.target.value)}></input>
        </p>
        <p>
            <input type="text" onInput={(e) => setFeatureName(e.target.value)}></input>
            <label>השדה אותו אתה רוצה לשנות</label>

        </p>
        <p>
            <input type="text" onInput={(e) => setFeatureValue(e.target.value)}></input>
            <label>הערך החדש</label>

        </p>
        <button onClick={sendToMongo}>אישור</button>

        <p id="help" ></p>
    </>


}

export default Update;