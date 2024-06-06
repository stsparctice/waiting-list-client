import React, { useState } from "react";
import Remarks from "../Remarks/Remarks";

const BeforRemarks = () => {
    const [name, setName] = useState('');
    const [flag, setFlag] = useState('false');

    const [featureName, setFeatureName] = useState('');
    const ok = () => {
        setFlag('true')
        setName('name')
    }
    return <>
        <p>
            <input type="text" onInput={(e) => setFeatureName(e.target.value)}></input>
            <label> :הכנס שם פציינט</label>
            {flag === 'true' ?
                <Remarks name={name} featureName={featureName} key={name}></Remarks> :<></>
            }
            {/* <input type="text" onInput={(e) => setName(e.target.value)}></input>
        <label>הכנס שם:</label> */}

        </p>
        <button onClick={ok}>אישור</button>
    </>
}

export default BeforRemarks;